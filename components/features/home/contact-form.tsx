"use client"

import { useEffect, useId, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/primitives/button"
import { FeedbackIcon } from "./icons/feedback-icon"
import { FeedbackForm } from "./feedback-form"

const TRANSITION = {
  duration: 0.2,
  ease: "easeOut" as const,
}

export function ContactForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="ghost"
        size="icon"
        className="size-9 sm:size-10"
        aria-label="Send Feedback"
        onClick={() => setIsOpen(true)}
      >
        <FeedbackIcon className="size-4 sm:size-[18px]" />
      </Button>

      {/* Modal - Portalled to body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setIsOpen(false)}
                  aria-hidden="true"
                />

                {/* Modal Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={shouldReduceMotion ? { duration: 0 } : TRANSITION}
                  className="relative w-full max-w-md"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                >
                  <div className="bg-background border-border relative overflow-hidden rounded-xl border p-6 shadow-2xl">
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between">
                      <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                        Send Feedback
                      </h2>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground size-8"
                        aria-label="Close feedback dialog"
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="size-4" />
                      </Button>
                    </div>

                    <FeedbackForm onSuccess={() => setIsOpen(false)} autoFocus />
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
