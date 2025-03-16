'use client'

import { useState, useEffect, useCallback } from 'react'

interface TypingTestProps {
  onComplete: (results: {
    wpm: number
    accuracy: number
    text: string
    duration: number
  }) => void
}

export default function TypingTest({ onComplete }: TypingTestProps) {
  const [text, setText] = useState('')
  const [input, setInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [isComplete, setIsComplete] = useState(false)

  // Sample texts - you can expand this
  const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Pack my box with five dozen liquor jugs.",
    "How vexingly quick daft zebras jump!",
  ]

  useEffect(() => {
    // Randomly select a text when component mounts
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    setText(randomText)
  }, [])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value
    setInput(newInput)

    // Start timer on first input
    if (!startTime && newInput.length === 1) {
      setStartTime(Date.now())
    }

    // Check if test is complete
    if (newInput.length === text.length) {
      const endTime = Date.now()
      const duration = (endTime - (startTime || endTime)) / 1000 // duration in seconds
      const correctChars = [...newInput].filter((char, i) => char === text[i]).length
      const accuracy = (correctChars / text.length) * 100
      const wpm = Math.round((text.length / 5) / (duration / 60))

      setIsComplete(true)
      onComplete({
        wpm,
        accuracy,
        text,
        duration: Math.round(duration)
      })
    }
  }, [text, startTime, onComplete])

  const resetTest = useCallback(() => {
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
    setText(randomText)
    setInput('')
    setStartTime(null)
    setIsComplete(false)
  }, [])

  return (
    <div className="space-y-4">
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-lg font-mono">{text}</p>
      </div>
      
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={isComplete}
          className="w-full p-2 border rounded-lg font-mono"
          placeholder="Start typing..."
        />
      </div>

      {isComplete && (
        <div className="flex justify-between items-center">
          <div className="text-green-600">Test complete!</div>
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  )
} 