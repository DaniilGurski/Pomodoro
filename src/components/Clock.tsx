import { useEffect, useRef, useState } from "react";
import { useAtomValue } from "jotai";
import { appConfigAtom, timeModeAtom } from "@/atoms";

export default function Clock() {
  const { timeSettings } = useAtomValue(appConfigAtom);
  const timeMode = useAtomValue(timeModeAtom);

  const INITIAL_TIME_SECONDS = timeSettings[timeMode] * 60;
  const [timeRemaining, setTimeRemaining] =
    useState<number>(INITIAL_TIME_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // SVG circle settings
  const RADIUS = window.matchMedia("(width >= 40rem)").matches ? 170 : 110;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const progress = timeRemaining / INITIAL_TIME_SECONDS;
  // Responsible for moving the stroke line
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  const formatTime = (seconds: number) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const updateClock = () => {
    if (isRunning) return;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1 && intervalRef.current) {
          clearInterval(intervalRef.current);
          setIsRunning(false);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    if (!intervalRef.current) return;

    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleRestart = () => {
    if (!intervalRef.current) return;

    setIsRunning(true);
    setTimeRemaining(INITIAL_TIME_SECONDS);
    clearInterval(intervalRef.current);
  };

  // When switching time mode
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
    setTimeRemaining(timeSettings[timeMode] * 60);
  }, [timeMode, timeSettings]);

  // When changing time settings in the app config
  useEffect(() => {
    setIsRunning(false);
    setTimeRemaining(timeSettings[timeMode] * 60);
  }, [timeSettings, timeMode]);

  return (
    <div className="aspect-square w-72 rounded-full bg-linear-(--gradient-1) p-4 text-blue-100 sm:h-[410px] sm:w-[410px]">
      <div className="relative grid aspect-square w-full place-items-center rounded-full bg-blue-900 p-2.5">
        <div className="z-40 grid place-items-center text-center font-bold">
          <time className="text-[4.375rem] sm:text-[6.25rem]" dateTime="">
            {formatTime(timeRemaining)}
          </time>
          <button
            className="red:hover:text-red-400 cyan:hover:text-cyan-300 purple:hover:text-purple-400 cursor-pointer text-sm tracking-[13px] sm:text-base"
            onClick={() => {
              if (isRunning && intervalRef.current) {
                handlePause();
              } else if (!isRunning && timeRemaining <= 0) {
                handleRestart();
              }
              updateClock();
            }}
          >
            {isRunning ? "Pause" : timeRemaining > 0 ? "Start" : "Restart"}
          </button>
        </div>

        <svg className="absolute h-full w-full rotate-z-[270deg]">
          <circle
            className="progress-bar red:stroke-red-400 cyan:stroke-cyan-300 purple:stroke-purple-400"
            cx="50%"
            cy="50%"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            fill="none"
          ></circle>
        </svg>
      </div>
    </div>
  );
}
