import React, { useState, useContext, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserContext } from "@/contexts/UserContext";
import { useColor } from "@/contexts/ColorContext";
import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { getTextColor } from "@/lib/getTextColor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const Auth: React.FC = () => {
  const { user, handleLogin, handleSignUp } = useContext(UserContext) ?? {};
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(!!user);
  const { sixty, thirty, ten, updateLoggedColorsOnLogin } = useColor();
  const router = useRouter();

  useEffect(() => {
    setIsLogin(!!user);
    console.log(user);
  }, [user]);

  const handleAuthLogin = async () => {
    if (handleLogin) {
      try {
        // Update colors before actual login
        // await updateLoggedColorsOnLogin(email, password);

        await handleLogin(email, password);
        toast({
          variant: "default",
          title: "Login successful!",
          description: " Redirecting you back...",
          duration: 2000,
        });
        router.push("/");
      } catch (error) {
        console.error("Login or color update failed:", error);
      }
    } else {
      console.error("handleLogin is not defined");
    }
  };

  const handleAuthSignUp = async () => {
    toast({
      variant: "default",
      duration: 3000,
      title: "Signing you up...",
      description: "Please give it a minute.",
    });

    if (handleSignUp) {
      const success = await handleSignUp(email, password, confirmPassword);
      if (success) {
        toast({
          variant: "default",
          duration: 3000,
          title: "Successfully signed up!",
        });
        router.push({
          pathname: "/confirmation",
          query: { email: encodeURIComponent(email) },
        });
      }
    } else {
      console.error("handleSignup is not defined");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh]">
      <div
        style={{
          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
        }}
        className="p-6 rounded-md w-[80%] lg:w-[400px] flex flex-col justify-center items-center h-[480px]"
      >
        <Tabs defaultValue={"login"} className="w-full h-full">
          <div className="flex flex-row justify-center items-center w-full">
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="login" className="">
            <div className="flex flex-col justify-center items-start w-full gap-y-4 mt-0 px-5 h-[350px]">
              <h1
                style={{ color: getTextColor(sixty) }}
                className="text-md lg:text-sm font-bold text-start"
              >
                Login with your email and password
              </h1>

              <div className="flex flex-col w-full gap-y-2">
                <div>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <Button
                onClick={handleAuthLogin}
                className="p-2 rounded-md w-full text-md font-bold h-12 hover:shadow-lg hover:scale-[102%] hover:opacity-80 transition-all ease-in-out"
                style={{
                  backgroundColor: ten,
                  color: getTextColor(ten),
                }}
              >
                Login
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="signup" className="">
            <div className="flex flex-col justify-center items-start w-full gap-y-4 mt-0 px-5 h-[350px]">
              <h1
                style={{ color: getTextColor(sixty) }}
                className="text-md lg:text-sm font-bold text-start"
              >
                Sign up with your email and password
              </h1>
              <div className="flex flex-col w-full gap-y-2">
                <div>
                  <Label>Email:</Label>
                  <Input
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <Label>Password:</Label>
                  <Input
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                </div>
                <div>
                  <Label>Confirm password:</Label>
                  <Input
                    type="password"
                    placeholder=""
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  handleAuthSignUp();
                }}
                className="p-2 rounded-md w-full text-md font-bold h-12 hover:shadow-lg hover:scale-[102%] hover:opacity-80 transition-all ease-in-out"
                style={{
                  backgroundColor: ten,
                  color: getTextColor(ten),
                }}
              >
                Sign Up
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Auth;
