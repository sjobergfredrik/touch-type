"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const keyboardLayout = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";"],
  ["z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
];

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
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1">
            {row.map((key) => (
              <div
                key={key}
                className={cn(
                  "w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-colors",
                  "border border-border",
                  pressedKey === key
                    ? "bg-primary text-primary-foreground"
                    : "bg-card hover:bg-muted"
                )}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-muted-foreground">
        Home row position: Place your fingers on A S D F (left hand) and J K L ; (right hand)
      </div>
    </div>
  );
}