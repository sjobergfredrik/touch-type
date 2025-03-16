"use client";

interface TypingInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TypingInput({ value, onChange }: TypingInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className="w-full p-4 text-lg font-mono border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
      placeholder="Start typing..."
      autoFocus
      aria-label="Typing input"
    />
  );
}