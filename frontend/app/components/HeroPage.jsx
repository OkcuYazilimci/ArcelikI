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
    <div className="flex flex-col items-center justify-center mt-20 border border-gray-600 rounded-xl w-3/4 h-48 backdrop-blur-2xl backdrop-brightness-200 backdrop-opacity-25">
      <TypewriterEffectSmooth words={user ? greeting : words} />
    </div>
  );
}
