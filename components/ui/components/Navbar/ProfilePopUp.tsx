import React, { useState, useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../button";
import { RiUserSettingsLine } from "react-icons/ri";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DisplayPicture } from "../Profile/DisplayPicture";
import { useRouter } from "next/router";

type Props = {};

export const ProfilePopUp = (props: Props) => {
  const { user, handleSignOut, userProfile } = useContext(UserContext) ?? {};
  const { sixty, thirty, ten, currentSetName } = useColor();
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger className="text-2xl">
        <RiUserSettingsLine style={{ color: getTextColor(thirty) }} />
      </PopoverTrigger>
      <PopoverContent
        style={{
          backgroundColor: sixty,
          border: `1px solid ${sixty}`,
          color: getTextColor(sixty),
          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
        }}
        align="end"
        className="p-2 gap-4"
      >
        <div className="p-2 flex flex-col justify-center items-center text-sm gap-y-1">
          <DisplayPicture />
          <h1 className="">Signed in as:</h1>
          <h2 className="font-bold">{userProfile?.username}</h2>
          <h1 className="">Current color set:</h1>
          <h2 className="font-bold">{currentSetName}</h2>
        </div>
        <div className="flex flex-col justify-center items-center w-full gap-2">
          <Button
            style={{
              boxShadow: "2px 2px 1px 0px rgba(0, 0, 0, 0.25)",
              backgroundColor: ten,
              color: getTextColor(ten),
            }}
            className="w-full"
            variant={"default"}
            onClick={() => {
              router.push("/editProfile");
            }}
          >
            Edit Profile
          </Button>
          <Button
            style={{
              boxShadow: "2px 2px 1px 0px rgba(0, 0, 0, 0.25)",
            }}
            className="w-full"
            variant={"destructive"}
            onClick={handleSignOut}
          >
            Sign Out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
