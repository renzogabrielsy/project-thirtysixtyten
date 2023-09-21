import React, { useState, useEffect } from "react";
import { useColor } from "@/contexts/ColorContext";
import { SixtyPicker } from "@/components/ui/components/ColorPicker/SixtyPicker";
import { ThirtyPicker } from "@/components/ui/components/ColorPicker/ThirtyPicker";
import { TenPicker } from "@/components/ui/components/ColorPicker/TenPicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTextColor } from "@/lib/getTextColor";

export const ColorPickerComponent: React.FC = () => {
  const { sixty, thirty, ten } = useColor();
  return (
    <div
      style={{ backgroundColor: sixty }}
      className="flex justify-center items-center w-full h-full rounded-md"
    >
      <div className="scale-[90%]">
        <Tabs
          defaultValue="sixty"
          className="flex flex-col justify-center items-center"
        >
          <TabsList style={{boxShadow: "2px 4px 5px 0px rgba(0, 0, 0, 0.25)"}}>
            <TabsTrigger value="sixty">sixty %</TabsTrigger>
            <TabsTrigger value="thirty">thirty %</TabsTrigger>
            <TabsTrigger value="ten">ten %</TabsTrigger>
          </TabsList>
          <TabsContent value="sixty">
            <div>
              <h1
                style={{ color: getTextColor(sixty) }}
                className="text-sm lg:text-lg font-mono text-center mb-2"
              >
                {sixty}
              </h1>
              <SixtyPicker />
            </div>
          </TabsContent>
          <TabsContent value="thirty">
            <div>
              <h1
                style={{ color: getTextColor(sixty) }}
                className="text-sm md:text-lg font-mono text-center mb-2"
              >
                {thirty}
              </h1>
              <ThirtyPicker />
            </div>
          </TabsContent>
          <TabsContent value="ten">
            <div>
              <h1
                style={{ color: getTextColor(sixty) }}
                className="text-sm md:text-lg font-mono text-center mb-2"
              >
                {ten}
              </h1>
              <TenPicker />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
