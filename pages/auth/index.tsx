import React, { useState, useContext, useEffect } from "react";
import supabase from "@/lib/supabaseClient";
import axios from "axios";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/contexts/UserContext";

const Auth: React.FC = () => {
  const { user, handleLogin, handleSignUp } = useContext(UserContext) ?? {};
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(!!user);

  useEffect(() => {
    setIsLogin(!!user);
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="p-4 border rounded-md w-[400px]">
        <Tabs defaultValue={"signup"}>
          <TabsList>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <>
              {/* Your Login form components */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 mb-4 border rounded-md"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 mb-4 border rounded-md"
                />
              </div>
              <button
                onClick={() => {
                  if (handleLogin) {
                    handleLogin(email, password);
                  } else {
                    console.error("handleLogin is not defined");
                  }
                }}
                className="p-2 bg-blue-600 text-white rounded-md"
              >
                Login
              </button>
            </>
          </TabsContent>

          <TabsContent value="signup">
            <>
              {/* Your Sign Up form components */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 mb-4 border rounded-md"
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 mb-4 border rounded-md"
                />
              </div>
              <button
                onClick={() => {
                  if (handleSignUp) {
                    handleSignUp(email, password);
                  } else {
                    console.error("handleSignup is not defined");
                  }
                }}
                className="p-2 bg-blue-600 text-white rounded-md"
              >
                Sign Up
              </button>
            </>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
