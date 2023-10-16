import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserContext } from "@/contexts/UserContext";
import { useColor } from "@/contexts/ColorContext";

type Props = {
    className?: string;
};

export const DisplayPicture = (props: Props) => {
  const { fetchUserProfile, user } = React.useContext(UserContext) ?? {};
  const [profilePicture, setProfilePicture] = useState<string | null>(null);
  const { sixty, thirty, ten } = useColor();

  useEffect(() => {
    const getProfilePicture = async () => {
      if (fetchUserProfile && user?.id) {
        const profile = await fetchUserProfile(user.id);
        if (profile) {
          const { avatar } = profile;
          setProfilePicture(avatar);
        }
      }
    };

    getProfilePicture();
  }, [fetchUserProfile, user]);


  return (
    <Avatar style={{
        border: `2.5px solid`,
        borderColor: thirty,
    }}
    className={props.className}
    >
      {profilePicture ? (
        <AvatarImage src={profilePicture} />
      ) : (
        <AvatarFallback />
      )}
    </Avatar>
  );
};
