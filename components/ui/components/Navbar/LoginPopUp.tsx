import React, { useState, useContext, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";
import { UserContext } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {};

const isValidEmail = (email: string) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
};

const isValidPassword = (password: string) => {
  return password.length >= 6; // Replace with your password policy
};

export const LoginPopUp = (props: Props) => {
  const { sixty, thirty, ten } = useColor();
  const { handleLogin } = useContext(UserContext) ?? {};
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValidEmail(email)) {
        setEmailError(false);
      }
    }, 1000); // Resets error after 1 second
    return () => clearTimeout(timer);
  }, [email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isValidPassword(password)) {
        setPasswordError(false);
      }
    }, 1000); // Resets error after 1 second
    return () => clearTimeout(timer);
  }, [password]);

  const handleSubmit = async () => {
    if (handleLogin) {
      const result = await handleLogin(email, password);
      if (result !== false) {
        const { success, emailIsValid, passwordIsValid } = result;
        // Do something with success, emailIsValid, and passwordIsValid
        // For example, you could set state variables or show a toast message
      } else {
        // Handle the case where result is false
        // For example, you could show a toast message saying login failed
        console.error("Login failed");
      }
    } else {
      console.error("handleLogin is not defined");
    }
  };
  

  return (
    <Popover>
      <PopoverTrigger>Login</PopoverTrigger>
      <PopoverContent
        style={{
          backgroundColor: sixty,
          border: `1px solid ${sixty}`,
          color: getTextColor(sixty),
          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
        }}
        align="end"
      >
        <div className="mb-4">
          <h1 className="text-lg font-bold">Login</h1>
          <h3 className="text-sm opacity-60">Enter your details below.</h3>
        </div>
        <div className="flex flex-col mb-1">
          <Input
            type="email"
            placeholder={`${
              emailError ? "Please enter a valid email" : "Email"
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-2 mb-4 rounded-md w-full placeholder:text-[${getTextColor(sixty)}] ${
              emailError ? "bg-red-200 border-red-300" : "border-gray-700"
            } transition duration-300`}
          />

          <Input
            type="password"
            placeholder={`${
              passwordError ? "Please enter a password" : "Password"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`p-2 mb-4 rounded-md w-full placeholder:text-[${getTextColor(sixty)}] ${
              passwordError ? "bg-red-200 border-red-300" : "border-gray-700"
            } transition duration-300`}
          />
        </div>
        <div className="flex flex-row justify-start">
          <Button
            style={{ backgroundColor: ten, color: getTextColor(ten) }}
            className=""
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
          <div style={{color: getTextColor(sixty)}} className="text-xs flex flex-col justify-center items-start ml-3">
            <p>Not yet registered? </p>
            <Link
              href="/auth"
              className="opacity-90 hover:underline font-bold"
            >
              Click here to sign up!
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
