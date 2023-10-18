import React, { createContext, useEffect, useState, ReactNode } from "react";
import supabase from "@/lib/supabaseClient";
import { PostgrestError, User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/use-toast";

interface UserContextProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  handleLogin: (
    email: string,
    password: string
  ) => Promise<
    | false
    | { success: boolean; emailIsValid: boolean; passwordIsValid: boolean }
  >;
  handleSignUp: (
    email: string,
    password: string,
    confirmPassword: string
  ) => Promise<boolean | undefined>;
  hasUsername: boolean | null;
  checkForUsername: () => Promise<boolean>;
  updateUsername: (newUsername: string) => Promise<void>;
  updateEmail: (newEmail: string) => Promise<void>
  fetchUserProfile: (
    userId: string
  ) => Promise<Record<string, any> | undefined>;
  updateUserProfileState: () => Promise<void>;
  userProfile: Record<string, any> | null;
  updateProfilePic: (userId: string) => Promise<void>;
  editProfilePic: (randomSeed: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

const isValidEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const isValidPassword = (password: string) => {
  return password.length >= 6;
};

const validateUsername = (username: string) => {
  const regex = /^[a-zA-Z0-9_]{5,12}$/;
  return regex.test(username);
};

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [hasUsername, setHasUsername] = useState<boolean | null>(null);
  const { toast } = useToast();
  const [userProfile, setUserProfile] = useState<Record<string, any> | null>(
    null
  );

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching user profile:", error);
      return;
    }

    return data;
  };

  const updateUserProfileState = async () => {
    const userId = user?.id; // Assuming 'user' is the logged-in user object
    if (!userId) return;

    const profileData = await fetchUserProfile(userId);
    if (profileData) {
      setUserProfile(profileData); // Update the global state
    }
  }; // ... (existing useEffects and other functions)

  useEffect(() => {
    updateUserProfileState();
  }, [user]);

  const checkForUsername = async () => {
    const userId = (await supabase.auth.getUser()).data.user?.id;
    console.log("userId:", userId);

    if (!userId) {
      return false;
    }

    const { data, error } = await supabase
      .from("user_profiles")
      .select("username")
      .eq("user_id", userId)
      .single();

    if (error && error.code !== "PGRST116") {
      return false;
    }

    const usernameExists = Boolean(data?.username);
    if (!usernameExists) {
      console.log("Username does not exist or is not populated");
    }

    setHasUsername(usernameExists);
    console.log("usernameExists:", usernameExists);
    console.log("hasUsername after setting:", hasUsername);
    return usernameExists;
  };

  useEffect(() => {
    (async () => {
      const result = await checkForUsername();
      console.log("Checking for username...");
      console.log("Result:", result);
    })();
  }, []);

  const updateUsername = async (newUsername: string) => {
    const isValid = validateUsername(newUsername);
    if (!isValid) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Invalid Username",
        description:
          "Username must be 5-12 characters long and contain no spaces or special characters.",
      });
      return;
    }

    const userId = (await supabase.auth.getUser()).data.user?.id;
    if (!userId) return;

    const { data, error } = await supabase
      .from("user_profiles")
      .upsert([{ user_id: userId, username: newUsername }], {
        onConflict: "user_id",
      });

    if (error) {
      console.error("Error upserting username:", error);
      if (error.code === "23505") {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Username already taken",
          description: "Please choose another username.",
        });
      } else {
        toast({
          variant: "destructive",
          duration: 3000,
          title: "Error setting username",
          description: "Please try again or contact the developer.",
        });
      }
    } else {
      console.log("Upserted username:", data);

      await checkForUsername();
      await fetchUserProfile(userId);

      toast({
        variant: "default",
        duration: 3000,
        title: "Username set!",
        description: "Your username has been set to " + newUsername + ".",
      });
    }
  };

  const updateEmail = async (newEmail: string) => {
    // Validate the email format
    if (!isValidEmail(newEmail)) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Invalid Email",
        description: "Please enter a valid email address.",
      });
      return;
    }
  
    // Update the email using Supabase Auth API
    const { error } = await supabase.auth.updateUser({ email: newEmail });
  
    if (error) {
      console.error("Error updating email:", error);
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Email Update Failed",
        description: "Please try again or contact the developer.",
      });
    } else {
      toast({
        variant: "default",
        duration: 3000,
        title: "Email Updated",
        description: `Your email has been updated to ${newEmail}.`,
      });
      // Optionally, you can refresh the session here if it doesn't cause a re-login
    }
  };
  
  
  

  const updateProfilePic = async (userId: string) => {
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${userId}`;
    user

    const { error } = await supabase
      .from("user_profiles")
      .upsert([{ user_id: userId, avatar: avatarUrl }], {
        onConflict: "user_id",
      });

    if (error) {
      console.error("Error setting display picture", error);
    } else {
      console.log("Display picture set.");
      checkForUsername();
    }
  };

  const editProfilePic = async (randomSeed: string) => {
    const avatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${randomSeed}`;
    user

    const { error } = await supabase
      .from("user_profiles")
      .upsert([{ user_id: user?.id as string, avatar: avatarUrl }], {
        onConflict: "user_id",
      });

    if (error) {
      console.error("Error setting display picture", error);
    } else {
      console.log("Display picture set.");
      checkForUsername();
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const emailIsValid = isValidEmail(email);
    const passwordIsValid = isValidPassword(password);

    if (!emailIsValid || !passwordIsValid) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Validation Failed",
        description: "Check email and password fields for errors.",
      });
      return { success: false, emailIsValid, passwordIsValid };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Login Failed",
        description: error.message || "An error occurred",
      });
      return false;
    }

    if (data?.user.email_confirmed_at === null) {
      toast({
        variant: "destructive",
        duration: 2000,
        title: "Email Not Confirmed",
        description: "Please confirm your email before logging in.",
      });
      // Optionally, sign the user out immediately
      await supabase.auth.signOut();
      return false;
    }

    checkForUsername();
    fetchUserProfile(data?.user.id);
    updateUserProfileState();

    toast({
      variant: "default",
      duration: 3000,
      title: "Logged in!",
    });

    return { success: true, emailIsValid: true, passwordIsValid: true };
  };

  const handleSignUp = async (
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        duration: 3000,
        title: "Password Mismatch",
        description: "Please check your password and try again.",
      });
      return;
    }

    // Sign up the user
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      if (signUpError.message.includes("already exists")) {
        // Show toast for user already registered
        toast({
          variant: "destructive",
          duration: 3000,
          title: "User Already Registered",
          description: "Please sign in instead.",
        });
      }
      return;
    }

    if (!signUpError) {
      return true; // return true if sign-up is successful
    }
    return false;
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("An error occurred during sign out:", error);
    }
    setUser(null);
    toast({
      variant: "default",
      title: "Signed out successfully!",
      duration: 2000,
    });
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        handleSignOut,
        handleLogin,
        handleSignUp,
        hasUsername,
        checkForUsername,
        updateUsername,
        updateEmail,
        fetchUserProfile,
        updateUserProfileState,
        userProfile,
        updateProfilePic,
        editProfilePic
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
