import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import { useAtom, useSetAtom } from "jotai";
import { appConfigAtom, settingsOpenedAtom } from "@/atoms";
import iconSettings from "@assets/icon-settings.svg";
import iconClose from "@assets/icon-close.svg";
import iconCheck from "@assets/icon-checkmark.svg";

import clsx from "clsx";
import { useState } from "react";

const fontOptions = [
  { font: "sans", fontClass: "font-sans" },
  { font: "serif", fontClass: "font-serif" },
  { font: "mono", fontClass: "font-mono" },
];

const colorOptions = [
  { color: "red", colorClass: "bg-red-400" },
  { color: "cyan", colorClass: "bg-cyan-300" },
  { color: "purple", colorClass: "bg-purple-400" },
];

export default function SettingsDialog() {
  const [settingsOpened, setSettingsOpened] = useAtom(settingsOpenedAtom);
  const setAppConfig = useSetAtom(appConfigAtom);

  const [timeSettings, setTimeSettings] = useState({
    pomodoro: 1,
    short: 1,
    long: 1,
  });
  const [currentFont, setCurrentFont] = useState<"sans" | "serif" | "mono">(
    "sans",
  );
  const [currentTheme, setCurrentTheme] = useState<"red" | "cyan" | "purple">(
    "red",
  );

  const handleApply = () => {
    setAppConfig({
      theme: currentTheme,
      font: currentFont,
      timeSettings,
    });

    setSettingsOpened(false);
  };

  const handleClose = () => {
    setSettingsOpened(false);
    setTimeSettings({
      pomodoro: 1,
      short: 1,
      long: 1,
    });
    setCurrentFont("sans");
    setCurrentTheme("red");
  };

  return (
    <>
      <button
        className="cursor-pointer"
        onClick={() => setSettingsOpened(true)}
      >
        <span className="sr-only"> Settings </span>
        <img src={iconSettings} alt="" />
      </button>

      <Dialog open={settingsOpened} onClose={handleClose}>
        <div className="bg-blue-850 fixed inset-0 z-50 grid h-full w-screen place-items-center overflow-y-auto">
          <DialogPanel className="relative w-[90%] max-w-lg divide-y-2 divide-gray-200 rounded-2xl bg-white font-bold text-blue-900">
            <header className="flex items-center justify-between px-6 py-4 text-[1.75rem]">
              <DialogTitle as="h2"> Settings </DialogTitle>

              <button
                className="cursor-pointer"
                onClick={() => setSettingsOpened(false)}
              >
                <span className="sr-only"> Close settings </span>
                <img src={iconClose} alt="" />
              </button>
            </header>

            <div className="px-6 py-4 pb-12">
              <form className="grid gap-y-6 divide-gray-200">
                <div className="grid gap-y-4">
                  <h3 className="text-center text-xs tracking-widest sm:text-start">
                    TIME (MINUTES){" "}
                  </h3>

                  <div className="grid gap-y-2 sm:grid-cols-3">
                    <Field className="flex items-center justify-between gap-y-2 sm:flex-col sm:items-start">
                      <Label className="text-gray-400"> pomodoro </Label>
                      <Input
                        className="max-w-36 rounded-lg bg-blue-50 px-4 py-3 tracking-[5px]"
                        onChange={(e) => {
                          const parsedInput = e.target.value
                            ? parseInt(e.target.value)
                            : 1;

                          setTimeSettings((prev) => ({
                            ...prev,
                            pomodoro: parsedInput > 0 ? parsedInput : 1,
                          }));
                        }}
                        defaultValue={timeSettings.pomodoro}
                        type="number"
                        inputMode="numeric"
                        min="1"
                      />
                    </Field>
                    <Field className="flex items-center justify-between gap-y-2 sm:flex-col sm:items-start">
                      <Label className="text-gray-400"> short break </Label>
                      <Input
                        className="max-w-36 rounded-lg bg-blue-50 px-4 py-3 tracking-[5px]"
                        onChange={(e) => {
                          const parsedInput = e.target.value
                            ? parseInt(e.target.value)
                            : 1;

                          setTimeSettings((prev) => ({
                            ...prev,
                            short: parsedInput > 0 ? parsedInputd : 1,
                          }));
                        }}
                        defaultValue={timeSettings.short}
                        type="number"
                        inputMode="numeric"
                        min="1"
                      />
                    </Field>
                    <Field className="flex items-center justify-between gap-y-2 sm:flex-col sm:items-start">
                      <Label className="text-gray-400"> long break </Label>
                      <Input
                        className="max-w-36 rounded-lg bg-blue-50 px-4 py-3 tracking-[5px]"
                        onChange={(e) => {
                          const parsedInput = e.target.value
                            ? parseInt(e.target.value)
                            : 1;

                          setTimeSettings((prev) => ({
                            ...prev,
                            long: parsedInput > 0 ? parsedInput : 1,
                          }));
                        }}
                        defaultValue={timeSettings.long}
                        type="number"
                        inputMode="numeric"
                        min="1"
                      />
                    </Field>
                  </div>
                </div>

                <span className="block h-0.5 bg-gray-200"> </span>

                <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-center text-xs tracking-widest">FONT</h3>

                  <RadioGroup
                    className="flex justify-center gap-x-4"
                    onChange={setCurrentFont}
                    value={currentFont}
                    aria-label="font options"
                  >
                    {fontOptions.map(({ font, fontClass }) => {
                      return (
                        <Field
                          className="grid size-10 cursor-pointer place-items-center rounded-full bg-blue-50 outline-offset-4 outline-blue-50 hover:outline-2 focus:outline-2 has-data-checked:bg-blue-900 has-data-checked:text-white"
                          key={font}
                        >
                          <Radio className={fontClass} value={font}>
                            Aa
                          </Radio>
                        </Field>
                      );
                    })}
                  </RadioGroup>
                </div>

                <span className="block h-0.5 bg-gray-200"> </span>

                <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-center text-xs tracking-widest">COLOR</h3>

                  <RadioGroup
                    className="flex justify-center gap-x-4"
                    onChange={setCurrentTheme}
                    value={currentTheme}
                    aria-label="color options"
                  >
                    {colorOptions.map(({ color, colorClass }) => {
                      return (
                        <Field key={color}>
                          <Radio
                            className={clsx(
                              "group focus-outline-2 grid size-10 cursor-pointer place-items-center rounded-full outline-offset-4 outline-blue-50 hover:outline-2",
                              colorClass,
                            )}
                            value={color}
                          >
                            <img
                              className="invisible group-data-checked:visible"
                              src={iconCheck}
                              alt=""
                            />
                          </Radio>
                        </Field>
                      );
                    })}
                  </RadioGroup>
                </div>

                <button
                  className="absolute bottom-0 left-1/2 max-w-36 -translate-x-1/2 translate-y-1/2 cursor-pointer rounded-4xl bg-red-400 px-12 py-4 text-white"
                  type="button"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </form>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
