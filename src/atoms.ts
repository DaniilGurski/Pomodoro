import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type TimeSettings = {
  pomodoro: number;
  short: number;
  long: number;
};

type AppConfig = {
  theme: string;
  font: string;
  timeSettings: TimeSettings;
};

export const themeAtom = atomWithStorage<"red" | "cyan" | "purple">(
  "pomodoro-theme",
  "red",
);

export const timeModeAtom = atom<"pomodoro" | "short" | "long">("pomodoro");

export const settingsOpenedAtom = atom(false);

export const appConfigAtom = atom<AppConfig>({
  theme: "red",
  font: "sans",
  timeSettings: {
    pomodoro: 1,
    short: 1,
    long: 1,
  },
});
