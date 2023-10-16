import React, { useState, useEffect, useContext } from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useFetchColorSets, fetchColorSets } from "../api/colorSets/fetchColorSet";

type Props = {};
interface ColorPreference {
  sixty: string | null;
  thirty: string | null;
  ten: string | null;
}

interface ColorSet {
  id: number;
  name?: string | null;
  user_id?: string | null;
  colorpreferences: ColorPreference[];
}

export default function ColorSet({}: Props) {
  
  const { user } = useContext(UserContext) ?? {};
  const {
    sixty,
    thirty,
    ten,
    createColorSet,
    updateLoggedColors,
  } = useColor();
  const [setName, setSetName] = useState("");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleAddColorSet = async () => {
    setOpen(false);
    toast({
      variant: "default",
      title: "Creating set...",
    });

    const userId = user?.id;
    await createColorSet(userId as string, setName);

    // Show "Set created!" toast
    toast({
      variant: "default",
      title: "Set created!",
      duration: 2000,
    });

    // Close the dialog
  };

  return (
    <div className="h-fit flex flex-col justify-center items-center w-full">
      {!user ? (
        <></>
      ) : (
        <div className="h-full flex flex-col justify-center items-center w-full">
          <div className="flex flex-row items-center justify-center gap-x-3">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                style={{
                  backgroundColor: ten,
                  color: getTextColor(ten),
                  boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.25)",
                  transition:
                    "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
                }}
                className="text-[12px] font-bold w-14 h-7 rounded-md"
              >
                Save
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save your Color Set</DialogTitle>
                </DialogHeader>
                <DialogDescription asChild>
                  <div className="flex flex-col justify-start items-center mt-4 gap-y-5">
                    <Input
                      id="setName"
                      defaultValue="Name your color set."
                      onChange={(e) => setSetName(e.target.value)}
                      className="w-[60%] p-4 mt-2"
                    />
                    <div className="flex flex-row justify-center items-center gap-x-5">
                      <div
                        style={{
                          backgroundColor: sixty,
                          color: getTextColor(sixty),
                          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        }}
                        className="w-20 h-20 flex justify-center items-center"
                      >
                        {sixty}
                      </div>
                      <div
                        style={{
                          backgroundColor: thirty,
                          color: getTextColor(thirty),
                          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        }}
                        className="w-20 h-20 flex justify-center items-center"
                      >
                        {thirty}
                      </div>
                      <div
                        style={{
                          backgroundColor: ten,
                          color: getTextColor(ten),
                          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        }}
                        className="w-20 h-20 flex justify-center items-center"
                      >
                        {ten}
                      </div>
                    </div>
                    <div className="flex flex-row justify-center items-center gap-x-4">
                      <Button
                        onClick={() => {
                          handleAddColorSet()
                          
                        }}
                        style={{
                          backgroundColor: ten,
                          color: getTextColor(ten),
                          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        Save
                      </Button>
                      <Button
                        variant={"destructive"}
                        style={{
                          boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
                        }}
                      >
                        Go back
                      </Button>
                    </div>
                  </div>
                </DialogDescription>
              </DialogContent>
            </Dialog>

            <Button
              size={"sm"}
              style={{
                backgroundColor: ten,
                color: getTextColor(ten),
                boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.25)",
                transition:
                  "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
              }}
              className="text-[12px] font-bold w-14 h-7"
              onClick={() => {
                updateLoggedColors();
              }}
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
