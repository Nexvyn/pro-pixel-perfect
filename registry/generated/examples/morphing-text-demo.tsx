"use client"

import { MorphingText } from "@/components/ui/primitives/morphing-text"

export default function MorphingTextDemo() {
  return (
    <div className="bg-background flex min-h-[200px] w-full items-center justify-center p-8">
      <MorphingText
        texts={["Hello", "World", "Nexvyn", "UI"]}
        className="text-foreground text-4xl"
      />
    </div>
  )
}
