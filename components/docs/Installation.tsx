"use client"

import React, { useCallback } from "react"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { motion, AnimatePresence, MotionConfig } from "motion/react"
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./installation.module.css"

interface InstallationProps {
  command?: string
}

const iconSwapVariants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
}

export function Installation({ command = "npm install your-package" }: InstallationProps) {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const onCopy = useCallback(() => {
    copyToClipboard(command)
  }, [command, copyToClipboard])

  return (
    <button
      type="button"
      className={cn(
        "group relative flex w-full items-center justify-between rounded-lg bg-transparent text-left font-mono text-sm",
        styles.code
      )}
      onClick={onCopy}
      aria-label={`Copy installation command: ${command}`}
    >
      <code className="flex-1 overflow-x-auto pr-10 whitespace-nowrap">{command}</code>
      <div className={styles.copy} aria-hidden="true">
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence mode="wait" initial={false}>
            {isCopied ? (
              <motion.div
                key="check"
                variants={iconSwapVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CheckIcon className="size-4" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                variants={iconSwapVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <CopyIcon className="size-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </div>
      <span className="sr-only" aria-live="polite">
        {isCopied ? "Installation command copied to clipboard" : ""}
      </span>
    </button>
  )
}
