import React, { createContext, useEffect, useState, ReactNode } from 'react';
import supabase from '@/lib/supabaseClient';
import { Session, User } from '@supabase/supabase-js';
import axios from 'axios';
import Router from 'next/router';

interface UserContextProps {
  user: User | null;
  signOut: () => Promise<void>
  handleLogin: (email: string, password: string) => Promise<void>
  handleSignUp: (email: string, password: string) => Promise<void>
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/login', { email, password });
      if (res.status === 200 && res.data.user) {
        setUser(res.data.user);
        // Redirect to the homepage
        Router.push('/');
      }
    } catch (error: any) {
      console.error("An error occurred during login:", error);
    }
  };

  const handleSignUp = async (email: string, password: string) => {
    try {
      const res = await axios.post('/api/signup', { email, password });
      setUser(res.data.user);
    } catch (error: any) {
      console.error("An error occurred during sign-up:", error);
    }
  };
  
  const signOut = async () => {
    try {
      const res = await axios.post('/api/signout');
      if (res.status === 200) {
        setUser(null); // Set user to null to trigger a re-render
      } else {
        throw new Error('Failed to sign out');
      }
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error);
      } else {
        setUser(data?.user ?? null);
      }
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error on auth state change:", error);
      } else {
        setUser(data?.user ?? null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };

    
  }, []);

  
  

  return (
    <UserContext.Provider value={{ user, signOut, handleLogin, handleSignUp}}>
      {children}
    </UserContext.Provider>
  );
};
