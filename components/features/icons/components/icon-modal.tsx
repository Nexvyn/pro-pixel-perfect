"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, Copy, Check, Code, FileCode } from "lucide-react"
import { cn } from "@/lib/utils"
import { Dialog, DialogPortal, DialogOverlay } from "@/components/ui/internal/dialog"
import * as DialogPrimitive from "@radix-ui/react-dialog"

interface IconModalProps {
  isOpen: boolean
  onClose: () => void
  iconName: string
  icon: React.ComponentType<{ size?: number; isActive?: boolean }> | null
}

export function IconModal({ isOpen, onClose, iconName, icon: Icon }: IconModalProps) {
  const [iconSize, setIconSize] = useState(32)
  const [isActive, setIsActive] = useState(false)
  const [copiedType, setCopiedType] = useState<"component" | "svg" | null>(null)

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIconSize(32)
      setIsActive(false)
      setCopiedType(null)
    }
  }, [isOpen])

  const componentName = iconName.replace(/\s+/g, "") + "Icon"
  const kebabName = iconName.toLowerCase().replace(/\s+/g, "-")

  const componentCode = `import { ${componentName} } from '@/components/ui/icons/animated';

<${componentName} size={${iconSize}} isActive={${isActive}} />`

  const usageCode = `import { ${componentName} } from '@/components/ui/icons/animated';

function MyComponent() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <button onClick={() => setIsActive(!isActive)}>
      <${componentName} size={20} isActive={isActive} />
      <span>${iconName}</span>
    </button>
  );
}`

  const copyToClipboard = useCallback(async (text: string, type: "component" | "svg") => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedType(type)
      setTimeout(() => setCopiedType(null), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }, [])

  if (!Icon) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogPortal forceMount>
            <DialogOverlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
              />
            </DialogOverlay>

            <div className="pointer-events-none fixed inset-0 z-[51] flex items-center justify-center p-4">
              <DialogPrimitive.Content asChild forceMount>
                <motion.div
                  className="bg-card border-border pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-xl border shadow-2xl"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <DialogPrimitive.Title className="sr-only">{kebabName}</DialogPrimitive.Title>
                  {/* Header */}
                  <div className="border-border flex items-center justify-between border-b p-4">
                    <div>
                      <h2 className="text-lg font-semibold">{kebabName}</h2>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        Component: {componentName}
                      </p>
                    </div>
                    <button
                      onClick={onClose}
                      className="hover:bg-muted rounded-lg p-2 transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Icon Preview */}
                  <div className="bg-muted/30 flex flex-col items-center gap-6 p-8">
                    <div
                      className="border-border bg-card flex items-center justify-center rounded-xl border p-8"
                      style={{ minWidth: 120, minHeight: 120 }}
                    >
                      <Icon size={iconSize} isActive={isActive} />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-6 text-sm">
                      {/* Size slider */}
                      <div className="flex items-center gap-2">
                        <label className="text-muted-foreground">Size:</label>
                        <input
                          type="range"
                          min="16"
                          max="64"
                          value={iconSize}
                          onChange={(e) => setIconSize(Number(e.target.value))}
                          className="w-20"
                        />
                        <span className="text-muted-foreground w-8">{iconSize}px</span>
                      </div>

                      {/* Active toggle */}
                      <button
                        onClick={() => setIsActive(!isActive)}
                        className={cn(
                          "rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
                          isActive
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        )}
                      >
                        {isActive ? "Active" : "Inactive"}
                      </button>
                    </div>
                  </div>

                  {/* Code section */}
                  <div className="space-y-3 p-4">
                    {/* Copy component button */}
                    <button
                      onClick={() => copyToClipboard(componentCode, "component")}
                      className="bg-muted hover:bg-muted/80 group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Code className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm font-medium">Copy Component Code</span>
                      </div>
                      {copiedType === "component" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
                      )}
                    </button>

                    {/* Copy usage example button */}
                    <button
                      onClick={() => copyToClipboard(usageCode, "svg")}
                      className="bg-muted hover:bg-muted/80 group flex w-full items-center justify-between rounded-lg px-4 py-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileCode className="text-muted-foreground h-4 w-4" />
                        <span className="text-sm font-medium">Copy Usage Example</span>
                      </div>
                      {copiedType === "svg" ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="text-muted-foreground group-hover:text-foreground h-4 w-4 transition-colors" />
                      )}
                    </button>
                  </div>
                </motion.div>
              </DialogPrimitive.Content>
            </div>
          </DialogPortal>
        )}
      </AnimatePresence>
    </Dialog>
  )
}
