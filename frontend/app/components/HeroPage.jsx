"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { useAuth } from "@/context/AuthContext";


export function TypewriterEffectSmoothDemo() {
  const { user } = useAuth();

  const greeting = [
    {
      text: "Welcome, ",
      className: "text-9xl text-white"
    },
    {
      text: `${user?.displayName}!`,
      className: "text-9xl text-white"
    },
  ];

  const words = [
    {
      text: "Welcome ",
      className: "text-9xl text-white"
    },
    {
      text: "to ",
      className: "text-9xl text-white"
    },
    {
      text: "Arch!",
      className: "text-9xl text-white"
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center hero_page justify-center mt-32 rounded-xl w-3/4 h-fit">
        <TypewriterEffectSmooth words={words} className="text-9xl text-white"/>
      </div>
    </>
  );
}
