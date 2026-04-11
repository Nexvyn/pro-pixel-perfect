"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Users } from "lucide-react"

/**
 * LiveVisitors - Displays approximate visitor count
 * Note: This is a decorative element showing simulated activity.
 * For production, connect to real analytics (e.g., Vercel Analytics).
 */
export function LiveVisitors() {
  // Simulated visitor count for demo purposes
  // TODO: Replace with real-time analytics data
  const [visitors, setVisitors] = useState(12)

  useEffect(() => {
    // Simulate live visitor fluctuation for demo effect
    const interval = setInterval(() => {
      setVisitors((prev) => {
        const change = Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
        const newValue = prev + change
        return newValue < 5 ? 5 : newValue // Minimum 5 visitors
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border-border/40 bg-background/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 shadow-sm backdrop-blur-sm">
      <div className="relative flex size-2 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
      </div>

      <AnimatePresence mode="popLayout">
        <motion.span
          key={visitors}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          className="text-muted-foreground flex items-center gap-1.5 font-mono text-xs font-medium tabular-nums"
          aria-label={`Approximately ${visitors} people viewing`}
        >
          ~{visitors}
          <span className="hidden sm:inline">people viewing</span>
          <span className="sm:hidden">live</span>
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
