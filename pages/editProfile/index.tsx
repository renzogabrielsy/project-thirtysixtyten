import React, { useState, useContext, useEffect } from "react";
import { useColor } from "@/contexts/ColorContext";
import { UserContext } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DisplayPicture } from "@/components/ui/components/Profile/DisplayPicture";
import { Toggle } from "@/components/ui/toggle";
import { TbLock, TbLockOpen } from "react-icons/tb";
import { getTextColor } from "@/lib/getTextColor";
import { Button } from "@/components/ui/button";
import { IoDiceSharp } from "react-icons/io5";
import Image from "next/image";

export default function EditProfile() {
  const { sixty, thirty, ten } = useColor();
  const { userProfile, user, updateUsername, editProfilePic, updateEmail } =
    useContext(UserContext) ?? {};
  const [isUsernameEditable, setUsernameEditable] = useState(false);
  const [isEmailEditable, setEmailEditable] = useState(false);

  const toggleUsernameLock = isUsernameEditable ? <TbLockOpen /> : <TbLock />;
  const toggleEmailLock = isEmailEditable ? <TbLockOpen /> : <TbLock />;

  const [editedUsername, setEditedUsername] = useState<string | null>(null);
  const [editedEmail, setEditedEmail] = useState<string | null>(null);

  const currentProfilePicture = userProfile?.avatar;

  const [editedProfilePicture, setEditedProfilePicture] = useState<string>(
    currentProfilePicture
  );

  const [newSeedPic, setNewSeedPic] = useState<string | null>(null);

  useEffect(() => {
    if (userProfile?.avatar) {
      setEditedProfilePicture(userProfile.avatar);
    }
  }, [userProfile]);

  const generateNewProfilePic = () => {
    const randomSeed = Math.random().toString(36).substring(7);
    const newAvatarUrl = `https://api.dicebear.com/7.x/micah/svg?seed=${randomSeed}`;
    setEditedProfilePicture(newAvatarUrl);
    setNewSeedPic(randomSeed);
  };

  const handleApplyChanges = () => {
    if (updateUsername && editedUsername) {
      updateUsername(editedUsername);
    }

    if (editProfilePic && editedProfilePicture) {
      editProfilePic(newSeedPic as string);
    }

    if (updateEmail && editedEmail) {
      updateEmail(editedEmail);
    }
  };

  return (
    <div className="h-[100vh] p-8" style={{color: getTextColor(sixty)}}>
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <h2>Change your profile information here.</h2>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center p-6 gap-y-4 mb-4">
          <Label className="font-bold">Profile Picture</Label>
          <div className="h-20 w-20 rounded-full">
            <img src={editedProfilePicture} alt="current profile picture" />
          </div>
          <Button
            size={"sm"}
            style={{ backgroundColor: ten, color: getTextColor(ten) }}
            className="hover:scale-105 transition-all duration-200"
            onClick={generateNewProfilePic}
          >
            Generate New Picture
            <IoDiceSharp className="text-md ml-2 inline" />
          </Button>
        </div>
        <div>
          <div className="flex flex-col items-start gap-y-2 mb-4 w-fit">
            <Label className="font-bold">Username</Label>
            <div className="flex items-center gap-x-4">
              <Input
                type="text"
                placeholder={userProfile?.username}
                className="bg-whitesmoke"
                disabled={!isUsernameEditable}
                onChange={(e) => setEditedUsername(e.target.value)}
              />
              <Toggle
                className="text-xl"
                size={"lg"}
                onClick={() => setUsernameEditable(!isUsernameEditable)}
                style={{ backgroundColor: ten, color: getTextColor(ten) }}
              >
                {toggleUsernameLock}
              </Toggle>
            </div>
          </div>
          <div className="flex flex-col items-start gap-y-2 mb-4 w-fit">
            <Label className="font-bold">E-mail</Label>
            <div className="flex items-center gap-x-4">
              <Input
                type="text"
                placeholder={user?.email}
                className="bg-whitesmoke"
                disabled={!isEmailEditable}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
              <Toggle
                className="text-xl"
                size={"lg"}
                onClick={() => setEmailEditable(!isEmailEditable)}
                style={{ backgroundColor: ten, color: getTextColor(ten) }}
              >
                {toggleEmailLock}
              </Toggle>
            </div>
          </div>
        </div>
        <Button
          style={{ backgroundColor: ten, color: getTextColor(ten) }}
          className="w-full max-w-[276.667px] h-14 text-md font-bold mt-6"
          onClick={handleApplyChanges}
        >
          Apply Changes
        </Button>
      </div>
    </div>
  );
}
