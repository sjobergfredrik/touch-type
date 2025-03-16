"use client";

import { KeyboardKey } from "./KeyboardKey";

interface KeyboardRowProps {
  keys: string[];
  pressedKey: string | null;
  homeRow: string;
}

export function KeyboardRow({ keys, pressedKey, homeRow }: KeyboardRowProps) {
  return (
    <div className="flex justify-center gap-1">
      {keys.map((key) => {
        if (key === "space bar") {
          return (
            <div className="keyboard-key full-width-key" key={key}>
              {key}
            </div>
          );
        }
        return (
          <KeyboardKey
            key={key}
            letter={key}
            isPressed={pressedKey === key}
            isHomeKey={homeRow.includes(key)}
          />
        );
      })}
    </div>
  );
}