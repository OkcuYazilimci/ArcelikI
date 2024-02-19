"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { useAuth } from "@/context/AuthContext";

export function TypewriterEffectSmoothDemo() {
  const { user } = useAuth();

  const greeting = [
    {
      text: "Welcome back,",
    },
    {
      text: `${user?.displayName}!`,
    },
  ];

  const words = [
    {
      text: "Build",
    },
    {
      text: "awesome",
    },
    {
      text: "arts",
    },
    {
      text: "with",
    },
    {
      text: "Arch!",
    },
  ];
  return (
    <div className="flex flex-col items-center hero_page justify-center mt-20 rounded-xl w-3/4 h-fit">
      <TypewriterEffectSmooth words={user ? greeting : words} className=""/>
    </div>
  );
}
