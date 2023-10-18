import React, { useState, useEffect, useContext } from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useFetchColorSets } from "../api/colorSets/fetchColorSet";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import updateLoggedColors from "../api/colorSets/updateLoggedColors";
import { UserContext } from "@/contexts/UserContext";
import { Input } from "@/components/ui/input";
import { BiCheck } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HexAlphaColorPicker } from "react-colorful";

interface ColorPreference {
  sixty: string | null;
  thirty: string | null;
  ten: string | null;
}

interface userColorSetList {
  id: number;
  name?: string | null;
  user_id?: string | null;
  colorpreferences: ColorPreference[];
}

type Props = {};

export default function ColorSetList({}: Props) {
  const { user } = useContext(UserContext) ?? {};
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [fadingOutId, setFadingOutId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [tempSetName, setTempSetName] = useState<string | null>(null);
  const [tempSixty, setTempSixty] = useState<string | null>(null);
  const [tempThirty, setTempThirty] = useState<string | null>(null);
  const [tempTen, setTempTen] = useState<string | null>(null);

  const userColorSetList = useFetchColorSets();
  const {
    ten,
    sixty,
    handleDelete,
    applyColorSet,
    fetchColorSets,
    currentSetName,
    editColorSet,
  } = useColor();
  const { toast } = useToast();
  const handleDeleteColorSet = async (set: any) => {
    setDeletingId(0);
    setFadingOutId(set.id);
    setTimeout(() => {
      setFadingOutId(null);
    }, 700);
    await handleDelete(set.id);

    toast({
      variant: "destructive",
      title: "Successfully deleted",
      description: `${set.name} has been deleted.`,
      duration: 2000,
    });
  };

  const submitEditColorSet = async (setId: number, setName: string) => {
    await editColorSet(
      tempSetName || setName,
      tempSixty as string,
      tempThirty as string,
      tempTen as string,
      setId
    );

    toast({
      variant: "default",
      title: "Successfully updated",
      description: `Color set has been updated.`,
      duration: 2000,
    });

    fetchColorSets(user?.id as string);
    setEditingId(0);
  };


  useEffect(() => {
    fetchColorSets(user?.id as string);
  }, []);

  return (
    <>
      <div className="flex flex-col w-full justify-center items-center pr-2">
        <span
          className="hidden lg:block font-bold mb-2 text-lg"
          style={{ color: getTextColor(sixty) }}
        >
          {currentSetName}
        </span>
        <Dialog>
          <DialogTrigger
            style={{
              backgroundColor: ten,
              color: getTextColor(ten),
              boxShadow: "2px 2px 3px 0px rgba(0, 0, 0, 0.25)",
              transition:
                "background-color 0.3s ease-in-out, color 0.3s ease-in-out",
            }}
            className="w-[92%] text-sm h-10 rounded-lg font-bold"
            onClick={() => {
              fetchColorSets(user?.id as string);
            }}
          >
            All Color Sets
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>All saved Color Sets</DialogTitle>
              <DialogDescription asChild>
                <div className="max-h-[400px] overflow-y-scroll overflow-x-hidden p-4 gap-x-4">
                  {Array.isArray(userColorSetList) &&
                  userColorSetList.length > 0 ? (
                    userColorSetList.map((set, index) => (
                      <div
                        key={set.id}
                        className={`relative mb-4 ${
                          fadingOutId === set.id
                            ? "opacity-0 transition-opacity duration-1000"
                            : ""
                        }`}

                        // Assuming colorpreferences is an array with one element
                      >
                        <div
                          className={`flex justify-between items-center transition-all duration-300 ${
                            deletingId === set.id
                              ? "translate-x-[-100%]"
                              : editingId === set.id
                              ? "translate-x-[110%]"
                              : ""
                          }`}
                        >
                          <div className="flex flex-col justify-center items-center w-full">
                            <p className="mb-1 font-bold">{set.name}</p>
                            {set.colorpreferences.map((colorPref, i) => (
                              <div
                                onClick={() => {
                                  applyColorSet(set.colorpreferences[0]);
                                  // updateLoggedColors();
                                }}
                                key={i}
                                className="flex flex-row justify-center items-center w-[95%] font-bold text-center text-[8px] lg:text-xs h-10 rounded-lg"
                              >
                                <div
                                  className="flex flex-row justify-center items-center w-[33%] h-full rounded-l-lg"
                                  style={{
                                    backgroundColor: colorPref.sixty || "",
                                    color: getTextColor(colorPref.sixty || ""),
                                  }}
                                >
                                  {colorPref.sixty}
                                </div>
                                <div
                                  className="flex flex-row justify-center items-center w-[34%] h-full"
                                  style={{
                                    backgroundColor: colorPref.thirty || "",
                                    color: getTextColor(colorPref.thirty || ""),
                                  }}
                                >
                                  {colorPref.thirty}
                                </div>
                                <div
                                  className="flex flex-row justify-center items-center w-[33%] h-full rounded-r-lg"
                                  style={{
                                    backgroundColor: colorPref.ten || "",
                                    color: getTextColor(colorPref.ten || ""),
                                  }}
                                >
                                  {colorPref.ten}
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-row justify-center items-end gap-x-1 h-[64px] pb-[6px]">
                            <Button
                              onClick={() => {
                                setEditingId(set.id);
                                setTempSetName(set.name);
                                setTempSixty(set.colorpreferences[0]?.sixty);
                                setTempThirty(set.colorpreferences[0]?.thirty);
                                setTempTen(set.colorpreferences[0]?.ten);
                              }}
                              className="w-7 h-7 p-0 pb-[2px] pl-[2px] rounded-sm"
                            >
                              <FiEdit />
                            </Button>

                            <Button
                              onClick={() => setDeletingId(set.id)}
                              variant={"destructive"}
                              className="w-7 h-7 p-0 rounded-sm text-white mr-4"
                            >
                              <MdDelete />
                            </Button>
                          </div>
                        </div>
                        <div
                          className={`ml-4 absolute top-0 right-0 h-full w-full bg-red-500 text-white flex items-center justify-center transition-all duration-300 ${
                            deletingId === set.id
                              ? "translate-x-0"
                              : "translate-x-[110%]"
                          }`}
                        >
                          <div className="flex flex-col justify-center items-center">
                            <h1 className="text-[10px] lg:text-sm">
                              Are you sure you want to delete this color set?
                            </h1>
                            <div className="flex flex-row items-center justify-center w-full gap-x-4 mt-1">
                              <Button
                                variant={"outline"}
                                size={"sm"}
                                className="h-7 text-[10px] lg:text-sm"
                                onClick={() => handleDeleteColorSet(set)}
                              >
                                <BiCheck />
                              </Button>

                              <Button
                                variant={"outline"}
                                size={"sm"}
                                className="h-7 text-[10px] lg:text-sm "
                                onClick={() => setDeletingId(0)}
                              >
                                <MdOutlineCancel />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`mr-2 absolute top-0 left-0 h-full w-full bg-blue-500 text-white flex items-center justify-center transition-all duration-300 ${
                            editingId === set.id
                              ? "translate-x-0"
                              : "translate-x-[-110%]"
                          }`}
                        >
                          <div className="flex flex-row justify-center items-center p-2">
                            <Input
                              type="text"
                              placeholder={set.name || "New set name"}
                              style={{
                                backgroundColor: "whitesmoke",
                                color: "black",
                              }}
                              className="w-[150px] p-2 m-1"
                              value={tempSetName || ""}
                              onChange={(e) => setTempSetName(e.target.value)}
                            />
                            <div className="flex flex-col w-full">
                              <div className="flex flex-row justify-center items-center p-0 h-fit border-2 m-1 border-white">
                                <Popover>
                                  <PopoverTrigger className="w-[33%] p-0 m-0">
                                    <div
                                      className="w-[100%] h-5 text-[10px] font-bold text-center align-middle"
                                      style={{
                                        backgroundColor: tempSixty as string,
                                        color: getTextColor(
                                          tempSixty as string || set.colorpreferences[0]?.sixty as string
                                        ),
                                      }}
                                    >
                                      60%
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col justify-center items-center w-fit">
                                    <span>
                                      <h1 className="font-bold text-md mb-2">
                                        sixty.
                                      </h1>
                                    </span>
                                    <HexAlphaColorPicker
                                      color={tempSixty as string}
                                      onChange={setTempSixty}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <Popover>
                                  <PopoverTrigger className="w-[34%] p-0 m-0">
                                    <div
                                      className="w-[100%] h-5 text-[10px] font-bold text-center align-middle"
                                      style={{
                                        backgroundColor: tempThirty as string,
                                        color: getTextColor(
                                          tempThirty as string || set.colorpreferences[0]?.thirty as string
                                        ),
                                      }}
                                    >
                                      30%
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col justify-center items-center w-fit">
                                    <span>
                                      <h1 className="font-bold text-md mb-2">
                                        thirty.
                                      </h1>
                                    </span>
                                    <HexAlphaColorPicker
                                      color={tempThirty as string}
                                      onChange={setTempThirty}
                                    />
                                  </PopoverContent>
                                </Popover>
                                <Popover>
                                  <PopoverTrigger className="w-[33%] p-0 m-0">
                                    <div
                                      className="w-[100%] h-5 text-[10px] font-bold text-center align-middle"
                                      style={{
                                        backgroundColor: tempTen as string,
                                        color: getTextColor(
                                          tempTen as string || set.colorpreferences[0]?.ten as string
                                        ),
                                      }}
                                    >
                                      10%
                                    </div>
                                  </PopoverTrigger>
                                  <PopoverContent className="flex flex-col justify-center items-center w-fit">
                                    <span>
                                      <h1 className="font-bold text-md mb-2">
                                        ten.
                                      </h1>
                                    </span>
                                    <HexAlphaColorPicker
                                      color={tempTen as string}
                                      onChange={setTempTen}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </div>
                              <div className="flex flex-row items-center justify-center w-[100px] gap-x-2">
                                <Button
                                  variant={"outline"}
                                  size={"sm"}
                                  className="h-5 w-10 text-[10px] lg:text-sm rounded-sm"
                                  onClick={() =>
                                    submitEditColorSet(
                                      set.id,
                                      set.name as string
                                    )
                                  }
                                >
                                  <BiCheck />
                                </Button>
                                <Button
                                  variant={"outline"}
                                  size={"sm"}
                                  className="h-5 w-10 text-[10px] lg:text-sm rounded-sm"
                                  onClick={() => setEditingId(0)}
                                >
                                  <MdOutlineCancel />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No color sets found.</p>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
