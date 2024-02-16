"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";

export function TypewriterEffectSmoothDemo() {
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
      text: "Arch.",
      className: "text-black dark:text-black",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center mt-20 border border-gray-600 rounded-xl w-3/4 h-48 backdrop-blur-2xl backdrop-brightness-200 backdrop-opacity-25">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
