"use client"

import { useEffect, useId, useRef, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "motion/react"
import { Send, Loader2, Link2, ImagePlus, Trash2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/primitives/button"
import { Input } from "@/components/ui/primitives/input"
import { cn } from "@/lib/utils"

const DISCORD_WEBHOOK_URL = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
const MotionButton = motion(Button)

const TRANSITION = {
  duration: 0.2,
  ease: "easeOut" as const,
}

interface FeedbackFormProps {
  onSuccess?: () => void
  autoFocus?: boolean
}

function isValidUrl(value: string) {
  try {
    new URL(value)
    return true
  } catch {
    return false
  }
}

export function FeedbackForm({ onSuccess, autoFocus = false }: FeedbackFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    link: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()
  const fileInputId = useId()
  const resetTimerRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        window.clearTimeout(resetTimerRef.current)
      }
    }
  }, [])

  const processFile = (file: File) => {
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage("Image must be smaller than 8MB.")
      return
    }

    setErrorMessage(null)
    setImage(file)

    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        setErrorMessage("Please select an image file.")
        return
      }
      processFile(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const submitForm = async () => {
    if (!formData.message.trim()) {
      setErrorMessage("Message is required.")
      return
    }

    if (formData.link && !isValidUrl(formData.link)) {
      setErrorMessage("Please enter a valid URL.")
      return
    }

    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      if (DISCORD_WEBHOOK_URL) {
        const embed = {
          title: "New Feedback",
          color: 0x5865f2,
          fields: [
            ...(formData.email ? [{ name: "Email", value: formData.email, inline: true }] : []),
            { name: "Message", value: formData.message },
            ...(formData.link ? [{ name: "Link", value: formData.link, inline: true }] : []),
          ],
          timestamp: new Date().toISOString(),
          footer: { text: "nexvyn/ui Feedback" },
        }

        if (image) {
          const formDataToSend = new FormData()
          formDataToSend.append("file", image)
          formDataToSend.append("payload_json", JSON.stringify({ embeds: [embed] }))

          const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            body: formDataToSend,
          })

          if (!response.ok) {
            throw new Error("Unable to send feedback right now. Please try again.")
          }
        } else {
          const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ embeds: [embed] }),
          })

          if (!response.ok) {
            throw new Error("Unable to send feedback right now. Please try again.")
          }
        }
      } else if (process.env.NODE_ENV !== "production") {
        await new Promise((resolve) => setTimeout(resolve, 1500))
      } else {
        throw new Error("Feedback is temporarily unavailable. Please try again later.")
      }

      setShowSuccess(true)

      resetTimerRef.current = window.setTimeout(() => {
        setShowSuccess(false)
        setFormData({ email: "", message: "", link: "" })
        setShowLinkInput(false)
        setErrorMessage(null)
        removeImage()
        onSuccess?.()
      }, 2000)
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send feedback. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitForm()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault()
      submitForm()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items
    if (!items) return

    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith("image/")) {
        e.preventDefault()
        const file = item.getAsFile()
        if (file) processFile(file)
        break
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex flex-col items-center justify-center py-8"
          aria-live="polite"
        >
          <div className="bg-primary/10 mb-4 flex size-16 items-center justify-center rounded-full">
            <CheckCircle2 className="text-primary size-8" />
          </div>
          <h3 className="mb-1 text-lg font-medium">Thank you!</h3>
          <p className="text-muted-foreground px-4 text-center text-sm">
            Your feedback has been sent successfully.
          </p>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit}
          className="space-y-4"
          onPaste={handlePaste}
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email <span className="text-muted-foreground">(optional)</span>
              </label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="hello@nexvyn.dev"
                className="bg-muted/30"
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Message <span className="text-destructive">*</span>
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onKeyDown={handleKeyDown}
                placeholder="How can we help?"
                rows={4}
                className="placeholder:text-muted-foreground bg-muted/30 focus:ring-primary/20 border-border w-full resize-none rounded-lg border px-3 py-2 text-sm transition-all focus:ring-2 focus:outline-none"
                aria-invalid={Boolean(errorMessage) && !formData.message.trim() ? true : undefined}
                required
                autoFocus={autoFocus}
              />
            </div>

            <AnimatePresence>
              {showLinkInput && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-1.5"
                >
                  <label htmlFor="link" className="block text-sm font-medium">
                    Link <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <Input
                    id="link"
                    type="url"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                    placeholder="https://..."
                    className="bg-muted/30"
                    aria-invalid={
                      Boolean(formData.link) && !isValidUrl(formData.link) ? true : undefined
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {imagePreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-border relative overflow-hidden rounded-lg border"
                >
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="bg-muted/50 h-auto max-h-48 w-full object-contain"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 size-8"
                    aria-label="Remove attached image"
                    onClick={removeImage}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {errorMessage ? (
            <p className="text-destructive text-sm" role="alert">
              {errorMessage}
            </p>
          ) : null}

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                setErrorMessage(null)
                setShowLinkInput(!showLinkInput)
              }}
            >
              <motion.div
                whileHover={shouldReduceMotion ? {} : { rotate: 15, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link2 className="mr-1.5 size-4" />
              </motion.div>
              {showLinkInput ? "Remove Link" : "Add Link"}
            </Button>
            <label htmlFor={fileInputId} className="cursor-pointer">
              <input
                id={fileInputId}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="text-muted-foreground h-8 px-3 py-1"
              >
                <div>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { rotate: 15, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="inline-block"
                  >
                    <ImagePlus className="mr-1.5 size-4" />
                  </motion.div>
                  Add Image
                </div>
              </Button>
            </label>
          </div>

          <MotionButton
            type="submit"
            className="w-full"
            disabled={isSubmitting || !formData.message.trim()}
            layout
            whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitting ? (
                <motion.div
                  key="submitting"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={TRANSITION}
                >
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Sending...
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={TRANSITION}
                >
                  <Send className="mr-2 size-4" />
                  Send Feedback
                </motion.div>
              )}
            </AnimatePresence>
          </MotionButton>
        </motion.form>
      )}
    </AnimatePresence>
  )
}
