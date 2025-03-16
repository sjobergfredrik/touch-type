"use client";

import { useState } from "react";
import { Keyboard } from "@/components/keyboard/Keyboard";
import { TypingExercise } from "@/components/typing/TypingExercise";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Keyboard as KeyboardIcon, Type, Trophy } from "lucide-react";

export default function Home() {
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  return (
    <div className="min-h-screen bg-background p-6">
      <main className="container mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Nordic Typing Master</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn to type faster and more accurately using the Nordic keyboard layout.
            Master special characters like å, ä, and ö while improving your typing speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Type className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Current Speed</h2>
            </div>
            <div className="text-3xl font-bold">{wpm} WPM</div>
            <Progress value={wpm} max={100} className="mt-2" />
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Accuracy</h2>
            </div>
            <div className="text-3xl font-bold">{accuracy}%</div>
            <Progress value={accuracy} max={100} className="mt-2" />
          </Card>
        </div>

        <Tabs defaultValue="lesson" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-[600px] mx-auto">
            <TabsTrigger value="lesson">Basic</TabsTrigger>
            <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
          </TabsList>
          <TabsContent value="lesson" className="space-y-8">
            <TypingExercise mode="lesson" onWpmChange={setWpm} onAccuracyChange={setAccuracy} />
            <Keyboard />
          </TabsContent>
          <TabsContent value="intermediate" className="space-y-8">
            <TypingExercise mode="intermediate" onWpmChange={setWpm} onAccuracyChange={setAccuracy} />
            <Keyboard />
          </TabsContent>
          <TabsContent value="advanced" className="space-y-8">
            <TypingExercise mode="advanced" onWpmChange={setWpm} onAccuracyChange={setAccuracy} />
            <Keyboard />
          </TabsContent>
          <TabsContent value="practice" className="space-y-8">
            <TypingExercise mode="practice" onWpmChange={setWpm} onAccuracyChange={setAccuracy} />
            <Keyboard />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}