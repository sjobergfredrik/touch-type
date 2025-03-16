"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { TypingText } from "./TypingText";
import { TypingInput } from "./TypingInput";
import { nordicLessons } from "@/lib/lessons";

interface TypingExerciseProps {
  mode?: "lesson" | "practice" | "intermediate" | "advanced";
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
      const timeElapsed = (Date.now() - startTime) / 1000 / 60;
      const wordsTyped = input.length / 5;
      const wpm = Math.round(wordsTyped / timeElapsed);
      const accuracy = Math.round(
        ((input.length - errors) / input.length) * 100
      );

      onWpmChange(wpm);
      onAccuracyChange(accuracy);
    }
  }, [input.length, errors, startTime, onWpmChange, onAccuracyChange]);

  useEffect(() => {
    const getLessons = () => {
      switch (mode) {
        case "intermediate":
          return nordicLessons.intermediate || nordicLessons.basic;
        case "advanced":
          return nordicLessons.advanced || nordicLessons.basic;
        case "practice":
          return nordicLessons.practice;
        default:
          return nordicLessons.basic;
      }
    };
    
    const currentLessons = getLessons();
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
          const nextLessons = mode === "lesson" ? nordicLessons.basic :
                            mode === "intermediate" ? nordicLessons.intermediate :
                            mode === "advanced" ? nordicLessons.advanced :
                            nordicLessons.practice;
          setText(nextLessons[Math.floor(Math.random() * nextLessons.length)]);
        }, 1000);
      }
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <div className="text-lg font-medium text-center mb-4">
        {mode === "lesson" ? "Basic Lesson" :
         mode === "intermediate" ? "Intermediate Lesson" :
         mode === "advanced" ? "Advanced Lesson" :
         "Practice Text"}
      </div>
      <TypingText text={text} input={input} currentIndex={input.length} />
      <TypingInput value={input} onChange={handleInput} />
    </Card>
  );
}