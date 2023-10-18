import React, { useRef } from "react";
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
import { Button } from "@/components/ui/button";

import {
  TbBrandNextjs,
  TbBrandTypescript,
  TbBrandTailwind,
  TbBrandSupabase,
  TbBrandVercel,
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandGoogle,
  TbArrowBigDownLines
} from "react-icons/tb";

import { SiAxios } from "react-icons/si";
import Link from "next/link";

const techs = [
  { name: "Next.JS", icon: TbBrandNextjs, href: "https://nextjs.org/" },
  {
    name: "Typescript",
    icon: TbBrandTypescript,
    href: "https://www.typescriptlang.org/",
  },
  { name: "Tailwind", icon: TbBrandTailwind, href: "https://tailwindcss.com/" },
  { name: "Axios", icon: SiAxios, href: "https://axios-http.com/" },
  { name: "Supabase", icon: TbBrandSupabase, href: "https://supabase.com" },
  { name: "Vercel", icon: TbBrandVercel, href: "https://vercel.com" },
  // Add more technologies here
];

const contacts = [
  {
    name: "@renzo.code",
    icon: TbBrandInstagram,
    href: "https://instagram.com/renzo.code",
  },
  {
    name: "renzogabrielsy@gmail.com",
    icon: TbBrandGoogle,
    href: "mailto:renzogabrielsy@gmail.com",
  },
  {
    name: "renzogabrielsy",
    icon: TbBrandGithub,
    href: "https://github.com/renzogabrielsy/",
  },
];

const About: React.FC = () => {
  const { sixty, thirty, ten } = useColor();
  const bottomRef = useRef<HTMLDivElement | null>(null); // Add type annotation for the ref

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="h-[100vh]">
      <div
        className="pb-8 px-8 lg:px-20 h-[100vh] sm:h-fit pt-6 sm:pt-0 "
        style={{ color: getTextColor(sixty) }}
      >
        <h1 className="text-4xl font-bold py-4 lg:py-8">
          About sixtythirtyten.
        </h1>
        <div className="text-sm md:text-md">
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
          The full working code is available on its <span className="font-bold">Github repositiory</span>.
          <div className="mt-4">Deployed via <span className="font-bold">Vercel</span>.</div>
        </div>
        <div className="flex flex-col justify-center items-center h-[40%] pb-10">
          <Button
            onClick={scrollToBottom}
            className="sm:hidden flex flex-row justify-center items-center text-xl font-bold p-6 gap-2"
            style={{
              color: getTextColor(ten),
              backgroundColor: ten,
              boxShadow: "2px 2px 6px 0px rgba(0,0,0,0.55)",
            }}
          >
            More info
            <TbArrowBigDownLines className="text-2xl" />
          </Button>
        </div>
      </div>
      <div
        className="flex flex-row flex-wrap justify-center items-center p-2 sm:p-8 sm:gap-y-8 h-fit sm:h-fit "
        style={{ backgroundColor: sixty }}
      >
        <div className="w-[80%] sm:w-[90%] flex flex-row flex-wrap justify-between items-center gap-x-[4%] gap-y-4 sm:gap-y-8">
          <Card
            className="w-full"
            style={{
              color: getTextColor(thirty),
              backgroundColor: thirty,
              borderColor: thirty,
              boxShadow: "2px 2px 6px 1px rgba(0,0,0,0.55)",
            }}
          >
            <CardHeader className="text-center p-4">
              <CardTitle className="font-bold text-lg sm:text-2xl p-0">
                tech stack used.
              </CardTitle>
            </CardHeader>
            <CardContent className="w-full flex flex-row justify-center items-center pb-4">
              <div className="flex flex-row justify-center items-center p-2 gap-x-8 gap-y-2 flex-wrap w-fit">
                {techs.map((tech, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center w-[70px] lg:w-[100px]"
                  >
                    <a href={tech.href} target="_blank">
                      <div className="flex flex-col justify-center items-center">
                        <tech.icon
                          className="text-[2rem] lg:text-[3rem]"
                          style={{
                            color: getTextColor(thirty),
                          }}
                        />
                        <span className="text-[10px] lg:text-lg font-bold">
                          {tech.name}
                        </span>
                      </div>
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* <div className="flex flex-col md:flex-row justify-center items-center w-full gap-y-8 gap-x-8 h-[40%]"> */}
          <Card
            className="w-[100%] sm:w-[48%] h-fit"
            style={{
              color: getTextColor(thirty),
              backgroundColor: thirty,
              borderColor: thirty,
              boxShadow: "2px 2px 6px 1px rgba(0,0,0,0.55)",
            }}
          >
            <CardHeader className="text-center p-4">
              <CardTitle className="font-bold text-lg sm:text-2xl p-0">
                github repo.
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <a
                href={
                  "https://github.com/renzogabrielsy/project-thirtysixtyten"
                }
                target="_blank"
                className="flex flex-col justify-center items-center gap-y-4"
              >
                <div className="text-6xl font-bold">
                  <TbBrandGithub />
                </div>
                <div className="text-xs text-center font-bold">
                  /project-thirtysixtyten
                </div>
              </a>
            </CardContent>
          </Card>
          <Card
            className="w-[100%] sm:w-[48%]"
            style={{
              color: getTextColor(thirty),
              backgroundColor: thirty,
              borderColor: thirty,
              boxShadow: "2px 2px 6px 1px rgba(0,0,0,0.55)",
            }}
          >
            <CardHeader className="text-center p-4">
              <CardTitle className="font-bold text-lg sm:text-2xl p-0">
                contact info.
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center">
              <div className="flex flex-col gap-y-2 w-fit justify-center">
                {contacts.map((contact, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-start items-center"
                  >
                    <contact.icon
                      className="text-lg lg:text-2xl mr-3"
                      style={{
                        color: getTextColor(thirty),
                      }}
                    />
                    <a
                      href={contact.href}
                      target="_blank"
                      className="text-sm font-semibold"
                    >
                      {contact.name}
                    </a>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div ref={bottomRef}></div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default About;
