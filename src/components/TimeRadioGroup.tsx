import { timeModeAtom } from "@/atoms";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useAtom } from "jotai";

const timeModes = ["pomodoro", "short break", "long break"];

export default function TimeRadioGroup() {
  const [timeMode, setTimeMode] = useAtom(timeModeAtom);

  return (
    <RadioGroup
      className="flex rounded-4xl bg-blue-900 p-2 text-xs font-bold sm:text-sm"
      value={timeMode}
      onChange={setTimeMode}
      aria-label="time mode"
    >
      {timeModes.map((mode) => {
        return (
          <Field
            className="has-data-checked:text-blue-850 cyan:has-data-checked:bg-cyan-300 purple:has-data-checked:bg-purple-400 rounded-3xl px-6 py-4 text-nowrap text-blue-100/40 hover:text-blue-100 focus:text-blue-100 has-data-checked:bg-red-400"
            key={mode}
          >
            <Radio value={mode.split(" ")[0]} />
            <Label className="cursor-pointer">{mode}</Label>
          </Field>
        );
      })}
    </RadioGroup>
  );
}
