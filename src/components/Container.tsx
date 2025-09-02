import { useAtomValue } from "jotai";
import { type PropsWithChildren } from "react";
import { appConfigAtom } from "@/atoms";

export default function Container({ children }: PropsWithChildren) {
  const { theme } = useAtomValue(appConfigAtom);

  return (
    <div className="mx-auto grid w-[90%] gap-y-12" data-theme={theme}>
      {children}
    </div>
  );
}
