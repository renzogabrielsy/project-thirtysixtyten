import React, { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "../../label";
import { Input } from "../../input";
import { Button } from "../../button";
import { useColor } from "@/contexts/ColorContext";
import { getTextColor } from "@/lib/getTextColor";

type Props = {};

export const CheckForUsername = (props: Props) => {
  const { hasUsername, updateUsername, updateProfilePic, user } = useContext(UserContext) ?? {};
  const [newUsername, setNewUsername] = useState("");
  const { ten } = useColor();

  const handleSubmit = async () => {
    if (updateUsername) {
      await updateUsername(newUsername);
    }
    if (updateProfilePic && user?.id) {
      await updateProfilePic(user?.id);
    }
  };

  return (
    hasUsername === false && (
      <Dialog open>
        <DialogContent>
          <DialogTitle>Set Your Username</DialogTitle>
          <DialogDescription className="flex flex-col justify-center items-start gap-y-4">
            {"Don't worry. This is just a one-time thing."}
            <Label>New Username</Label>
            <Input
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <Button
              onClick={handleSubmit}
              style={{
                backgroundColor: ten,
                color: getTextColor(ten),
              }}
              className="w-full h-12 font-bold"
            >
              Set Username
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    )
  );
};
