"use client"

import { SpinningText } from "@/components/ui/primitives/spinning-text"

export default function SpinningTextDemo() {
  return (
    <div className="bg-background flex min-h-[250px] w-full items-center justify-center p-8">
      <SpinningText radius={6} duration={8} className="text-foreground text-xl font-medium">
        nexvyn • ui • components •
      </SpinningText>
    </div>
  )
}
