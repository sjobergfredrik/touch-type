"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";

const lessons = {
  basic: [
    "fff jjj fff jjj",
    "asdf jkl; asdf jkl;",
    "fj dk sl a; fj dk sl a;",
    "dad sad lad fall",
    "ask flask task desk",
  ],
  practice: [
    "The quick brown fox jumps over the lazy dog",
    "Pack my box with five dozen liquor jugs",
    "How vexingly quick daft zebras jump",
    "The five boxing wizards jump quickly",
    "Sphinx of black quartz, judge my vow",
  ],
};

interface TypingExerciseProps {
  mode?: "lesson" | "practice";
  onWpmChange: (wpm: number) => void;
  onAccuracyChange: (accuracy: number) => void;
}

export function TypingExercise({
  mode = "lesson",
  onWpmChange,
  onAccuracyChange,
}: TypingExerciseProps) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);

  const calculateMetrics = useCallback(() => {
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = input.length / 5; // approximate words
      const wpm = Math.round(wordsTyped / timeElapsed);
      const accuracy = Math.round(
        ((input.length - errors) / input.length) * 100
      );

      onWpmChange(wpm);
      onAccuracyChange(accuracy);
    }
  }, [input.length, errors, startTime, onWpmChange, onAccuracyChange]);

  useEffect(() => {
    const currentLessons = mode === "lesson" ? lessons.basic : lessons.practice;
    setText(currentLessons[Math.floor(Math.random() * currentLessons.length)]);
  }, [mode]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.length <= text.length) {
      setInput(value);
      let currentErrors = 0;
      for (let i = 0; i < value.length; i++) {
        if (value[i] !== text[i]) currentErrors++;
      }
      setErrors(currentErrors);
      calculateMetrics();

      if (value.length === text.length) {
        setTimeout(() => {
          setInput("");
          setStartTime(null);
          setText(
            mode === "lesson"
              ? lessons.basic[Math.floor(Math.random() * lessons.basic.length)]
              : lessons.practice[
                  Math.floor(Math.random() * lessons.practice.length)
                ]
          );
        }, 1000);
      }
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-lg font-medium text-center mb-4">
        {mode === "lesson" ? "Basic Lesson" : "Practice Text"}
      </div>
      <div className="text-2xl font-mono text-center mb-6 min-h-[3rem]">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={
              index < input.length
                ? input[index] === char
                  ? "text-green-500"
                  : "text-red-500"
                : index === input.length
                ? "bg-primary/20"
                : ""
            }
          >
            {char}
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={handleInput}
        className="w-full p-4 text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Start typing..."
        autoFocus
      />
    </Card>
  );
}