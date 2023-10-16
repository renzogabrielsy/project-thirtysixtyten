import React from "react";
import { getTextColor } from "@/lib/getTextColor";
import { useColor } from "@/contexts/ColorContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
} from "react-icons/tb";

const techs = [
  { name: "Next.JS", icon: TbBrandNextjs, href: "https://nextjs.org/" },
  {
    name: "Typescript",
    icon: TbBrandTypescript,
    href: "https://www.typescriptlang.org/",
  },
  { name: "Tailwind", icon: TbBrandTailwind, href: "https://tailwindcss.com/" },
  { name: "Next.JS", icon: TbBrandNextjs, href: "https://nextjs.org/" },
  { name: "Next.JS", icon: TbBrandNextjs, href: "https://nextjs.org/" },
  { name: "Next.JS", icon: TbBrandNextjs, href: "https://nextjs.org/" },
  // Add more technologies here
];

const About: React.FC = () => {
  const { sixty, thirty, ten } = useColor();

  return (
    <div className="h-[100vh]">
      <div className="px-8 lg:px-20" style={{ color: getTextColor(sixty) }}>
        <h1 className="text-4xl font-bold py-4 lg:py-8">
          About sixtythirtyten.
        </h1>
        <div className="text-lg">
          <span className="font-bold">sixtythirtyten. </span>
          is a little project that uses{" "}
          <span className="font-bold">Next.JS, TailwindCSS,</span> and{" "}
          <span className="font-bold">TypeScript</span> to create a simple
          method of creating 3-itemed color sets. This project was made by Renzo
          Sy to showcase his knowledge and understanding of the technologies
          used. The main things internalized from this project are as follows:
          <div className="ml-8 my-4">
            <li>Context Management</li>
            <li>
              Next.JS API Route handling using{" "}
              <span className="font-bold">Axios</span>
            </li>
            <li>Async operations</li>
            <li>Race Conditions</li>
            <li>Supabase integrations</li>
          </div>
          The full working code is available on its Github repository.
          <div className="mt-4">Deployed via Vercel.</div>
        </div>
      </div>
      <div
        className="flex flex-col justify-evenly items-center p-2 lg:p-8 lg:gap-y-8"
        style={{ backgroundColor: sixty }}
      >
        <Card
          className="w-[80%] lg:w-[60%]"
          style={{
            color: getTextColor(thirty),
            backgroundColor: thirty,
            borderColor: thirty,
          }}
        >
          <CardHeader className="text-center">
            <CardTitle>tech used.</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-row justify-center items-center">
            <div className="flex flex-row justify-start items-center gap-x-4 gap-y-2 flex-wrap w-fit">
              {techs.map((tech, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-center items-center w-fit"
                >
                  <tech.icon
                    className="text-lg lg:text-[4rem]"
                    style={{
                      color: getTextColor(thirty),
                    }}
                  />
                  <span className="text-[10px] lg:text-xl font-bold">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card
          className="w-[30%]"
          style={{
            color: getTextColor(thirty),
            backgroundColor: thirty,
            borderColor: thirty,
          }}
        >
          <CardHeader className="text-center">
            <CardTitle>github repo.</CardTitle>
          </CardHeader>
          <CardContent>
            <p>icon</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
