import React from "react";
import { useColor } from "@/contexts/ColorContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getTextColor } from "@/lib/getTextColor";

type Props = {};

export const Demo = (props: Props) => {
  const { sixty, thirty, ten } = useColor();
  return (
    <>
      <div className="flex justify-center w-full items-center h-full">
        <Card
          style={{ backgroundColor: sixty, border: "none" }}
          className="w-full h-full p-4 flex flex-col justify-around items-center"
        >
          <CardHeader
            style={{ backgroundColor: thirty, boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)"  }}
            className="w-full h-14 text-xs lg:text-sm p-4 justify-center rounded-md"
          >
            <CardTitle style={{ color: getTextColor(thirty) }} className="">
              Demo Layout
            </CardTitle>
            <CardDescription
              style={{ color: getTextColor(thirty), opacity: 0.6 }}
              className="text-[10px] lg:text-xs"
            >
              Preview your choices here
            </CardDescription>
          </CardHeader>
          <CardContent className="text-[10px] lg:text-[13px] pl-4 pr-4 py-4">
            <div className="flex flex-row gap-4">
              <div
                style={{ backgroundColor: sixty, color: getTextColor(sixty) }}
                className="w-[50%]"
              >
                <p className="">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                  distinctio officia provident numquam qui fugit earum, suscipit
                  tenetur autem expedita enim!
                </p>
              </div>
              <div
                style={{ backgroundColor: thirty, color: getTextColor(thirty), boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)" }}
                className="w-[50%] p-4 rounded-md"
              >
                <p>
                  Sapiente repudiandae provident, eos nam accusamus qui odit
                  reprehenderit!
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter
            style={{ backgroundColor: ten, color: getTextColor(ten), boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)" }}
            className="w-full h-12 text-xs lg:text-sm p-4 flex-col items-end justify-center rounded-md mt-2 lg:mt-0"
          >
            <p>Demo Footer</p>
            <CardDescription
              style={{ color: getTextColor(ten), opacity: 0.6 }}
              className="text-[10px] lg:text-xs"
            >
              Login to save your choices!
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
