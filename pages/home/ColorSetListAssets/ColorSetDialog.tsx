import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getTextColor } from "@/lib/getTextColor";

const ColorSetDialog = ({ ten, sixty, thirty, setSetName, handleAddColorSet }) => {
  return (
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
                <ColorBox color={sixty} />
                <ColorBox color={thirty} />
                <ColorBox color={ten} />
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
  );
};

const ColorBox = ({ color }) => {
  return (
    <div
      style={{
        backgroundColor: color,
        color: getTextColor(color),
        boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="w-20 h-20 flex justify-center items-center"
    >
      {color}
    </div>
  );
};

export default ColorSetDialog;
