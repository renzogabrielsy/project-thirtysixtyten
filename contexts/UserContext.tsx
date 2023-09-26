import React, { createContext, useEffect, useState, ReactNode } from "react";
import supabase from "@/lib/supabaseClient";
import { Session, User } from "@supabase/supabase-js";
import axios from "axios";
import Router from "next/router";
import { signInWithPassword } from "@/lib/supabaseClient";

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
    const { error } = await signInWithPassword(email, password);
    if (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const res = await axios.post("/api/signup", { email, password });
      setUser(res.data.user);
    } catch (error: any) {
      console.error("An error occurred during sign-up:", error);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/signout', { method: 'POST' });
    setUser(null);  // You may need to handle this based on the response from the server
  };
  

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Fetching user...");
      try {
        const { data, error } = await supabase.auth.getUser(); // Notice the 'await' here
        if (error) {
          console.error("Error fetching user:", error);
          return;
        }
        setUser(data?.user ?? null);
      } catch (error) {
        console.error("An exception occurred:", error);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const { data, error } = await supabase.auth.getUser(); // And here
        if (error) {
          console.error("Error on auth state change:", error);
          return;
        }
        setUser(data?.user ?? null);
        console.log("User data:", data);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
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
