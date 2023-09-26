import React, { useState, useEffect, useContext } from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
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
import { useFetchColorSets } from "../api/colorSets/fetchColorSet";

type Props = {};

export default function ColorSet({}: Props) {
  const { user } = useContext(UserContext) ?? {};
  const { sixty, thirty, ten, createColorSet } = useColor();
  const colorSets = useFetchColorSets();
  const colors = [
    { label: "sixty", color: sixty },
    { label: "thirty", color: thirty },
    { label: "ten", color: ten },
  ];
  const [setName, setSetName] = useState("");

  const textColor = getTextColor(sixty);

  const handleAddColorSet = async () => {
    const userId = user?.id;
    await createColorSet(userId as string, setName);
  };

  return (
    <div className="h-[50%] flex flex-col justify-center items-center w-full">
      {!user ? (
        <Button
          style={{
            backgroundColor: ten,
            color: getTextColor(ten),
            boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
          }}
          className="w-full gap-x-3 flex flex-row justify-center items-center hover:opacity-90"
        >
          <FcGoogle />
          <Link href="/auth">Login to save choices</Link>
        </Button>
      ) : (
        <div className="h-full flex flex-col justify-center items-center w-full">
          <div className="h-[90%] w-full">
            {colorSets.map((set, index) => (
              <li key={index}>
                {set.name ? set.name : "Unnamed Set"}
                {set.colorpreferences.map((pref, idx) => (
                  <div key={idx}>
                    Sixty: {pref.sixty}, Thirty: {pref.thirty}, Ten: {pref.ten}
                  </div>
                ))}
              </li>
            ))}
          </div>
          <div className="flex flex-row items-center justify-center gap-x-3">
            <Dialog>
              <DialogTrigger
                style={{
                  backgroundColor: ten,
                  color: getTextColor(ten),
                }}
                className="text-[12px] font-bold w-14 h-7 rounded-md"
              >
                Save
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save your Color Set</DialogTitle>
                  <DialogDescription>
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
                          onClick={handleAddColorSet}
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
                </DialogHeader>
              </DialogContent>
            </Dialog>

            <Button
              size={"sm"}
              style={{
                backgroundColor: ten,
                color: getTextColor(ten),
              }}
              className="text-[12px] font-bold w-14 h-7"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
