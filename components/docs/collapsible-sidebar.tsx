"use client"

import { useState, useEffect, useCallback } from "react"
import { ScrollArea } from "@/components/ui/internal/scroll-area"
import { ScrollMaskContainer } from "@/components/ui/internal/scroll-mask-container"
import { DocsSidebarNav, type SidebarNavItem } from "@/components/ui/internal/sidebar-nav"
import { cn } from "@/lib/utils"
import { Menu, SidebarClose, SidebarOpen, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import { useOs } from "@/hooks/use-os"

interface CollapsibleSidebarProps {
  items: SidebarNavItem[]
  open?: boolean
  onToggle?: () => void
}

export function CollapsibleSidebar({ items, open, onToggle }: CollapsibleSidebarProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const { isMac } = useOs()

  const isSidebarOpen = open ?? internalIsOpen

  const toggleSidebar = useCallback(() => {
    if (onToggle) {
      onToggle()
    } else {
      setInternalIsOpen((prev) => !prev)
    }
  }, [onToggle])

  const toggleMobileSidebar = useCallback(() => {
    setIsMobileOpen((prev) => !prev)
  }, [])

  const closeMobileSidebar = useCallback(() => {
    setIsMobileOpen(false)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+B to toggle desktop sidebar
      if ((e.ctrlKey || e.metaKey) && e.key === "b") {
        e.preventDefault()
        toggleSidebar()
      }
      // Escape to close mobile sidebar
      if (e.key === "Escape" && isMobileOpen) {
        closeMobileSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleSidebar, isMobileOpen, closeMobileSidebar])

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Mobile hamburger button */}
      <button
        onClick={toggleMobileSidebar}
        className={cn(
          "fixed top-16 left-4 z-50 flex lg:hidden",
          "size-10 items-center justify-center rounded-md",
          "border-border bg-background/95 border backdrop-blur-sm",
          "text-foreground hover:bg-muted",
          "shadow-sm transition-all duration-200"
        )}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Mobile backdrop */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
            onClick={closeMobileSidebar}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Mobile drawer sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-[100] w-[280px] lg:hidden",
          "bg-background border-border border-r",
          "transform transition-transform duration-300 ease-in-out",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile sidebar header */}
        <div className="border-border bg-background relative z-10 flex items-center justify-between border-b p-4">
          <span className="text-sm font-semibold">Navigation</span>
          <button
            onClick={closeMobileSidebar}
            className="hover:bg-muted text-muted-foreground hover:text-foreground flex size-8 items-center justify-center rounded-md transition-colors"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Mobile sidebar content */}
        <ScrollArea className="h-[calc(100vh-57px)] px-4 py-4">
          {/* Main Navigation Links */}
          <div className="border-border mb-6 border-b pb-4">
            <a
              href="/docs"
              className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
            >
              Docs
            </a>
            <a
              href="/docs/components"
              className="text-foreground hover:text-primary block py-2 text-sm font-medium transition-colors"
            >
              Components
            </a>
          </div>

          {/* Docs Navigation */}
          <DocsSidebarNav items={items} />
        </ScrollArea>
      </aside>

      {/* Desktop sidebar with integrated toggle */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 260 : 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="border-border relative hidden h-full flex-col overflow-hidden border-r lg:flex"
      >
        {/* Toggle Button - Absolute Positioned */}
        <motion.button
          type="button"
          layout
          onClick={toggleSidebar}
          className={cn(
            "hover:bg-muted group absolute z-20 flex cursor-pointer items-center justify-center rounded-md",
            "size-6"
          )}
          style={{
            top: isSidebarOpen ? 20 : 12, // Align with "GETTING STARTED" (20px) vs Centered (12px approx)
            right: isSidebarOpen ? 12 : "auto",
            left: isSidebarOpen ? "auto" : 12, // Centered in 48px width (12px margin)
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          title={
            isSidebarOpen
              ? `Close sidebar (${isMac ? "⌘" : "Ctrl"}+B)`
              : `Open sidebar (${isMac ? "⌘" : "Ctrl"}+B)`
          }
        >
          {isSidebarOpen ? (
            <SidebarClose className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
          ) : (
            <SidebarOpen className="text-muted-foreground group-hover:text-foreground size-4 transition-colors" />
          )}
        </motion.button>

        {/* Content */}
        <motion.div
          animate={{ opacity: isSidebarOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn("flex-1 overflow-hidden", !isSidebarOpen && "pointer-events-none")}
        >
          <div className="h-full w-[260px]">
            <ScrollMaskContainer className="h-full px-2">
              <DocsSidebarNav items={items} />
            </ScrollMaskContainer>
          </div>
        </motion.div>
      </motion.aside>
    </>
  )
}
