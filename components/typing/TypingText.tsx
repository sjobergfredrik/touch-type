"use client";

interface TypingTextProps {
  text: string;
  input: string;
  currentIndex: number;
}

export function TypingText({ text, input, currentIndex }: TypingTextProps) {
  return (
    <div 
      className="text-2xl font-mono text-center mb-6 min-h-[3rem]"
      role="region"
      aria-label="Text to type"
    >
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
          aria-hidden="true"
        >
          {char}
        </span>
      ))}
    </div>
  );
}