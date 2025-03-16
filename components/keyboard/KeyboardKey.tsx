"use client";

import { cn } from "@/lib/utils";

interface KeyboardKeyProps {
  letter: string;
  isPressed: boolean;
  isHomeKey: boolean;
}

export function KeyboardKey({ letter, isPressed, isHomeKey }: KeyboardKeyProps) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded flex items-center justify-center text-sm font-medium transition-colors",
        "border border-border",
        isPressed && "bg-primary text-primary-foreground",
        !isPressed && "bg-card hover:bg-muted",
        isHomeKey && "border-primary/50"
      )}
    >
      {letter}
    </div>
  );
}