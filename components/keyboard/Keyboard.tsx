"use client";

import { useState, useEffect } from "react";
import { KeyboardRow } from "./KeyboardRow";
import { nordicLayout } from "@/lib/keyboard-layouts";

export function Keyboard() {
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKey(e.key.toLowerCase());
    };

    const handleKeyUp = () => {
      setPressedKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 bg-card rounded-lg shadow-lg">
      <div className="space-y-2">
        {nordicLayout.main.map((row, index) => (
          <KeyboardRow
            key={index}
            keys={row}
            pressedKey={pressedKey}
            homeRow={nordicLayout.homeRow}
          />
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Home row position: Place your fingers on A S D F (left hand) and J K L Ö Ä (right hand)
      </div>
    </div>
  );
}