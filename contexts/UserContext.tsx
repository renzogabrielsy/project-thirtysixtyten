import React, { createContext, useEffect, useState, ReactNode } from "react";
import supabase from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";


interface UserContextProps {
  user: User | null;
  handleSignOut: () => Promise<void>;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleSignUp: (email: string, password: string) => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      console.error("An error occurred during sign-up:", error);
    } else {
      setUser(data?.user ?? null);
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("An error occurred during sign out:", error);
    }
    setUser(null);
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
      value={{ user, handleSignOut, handleLogin, handleSignUp }}
    >
      {children}
    </UserContext.Provider>
  );
};
