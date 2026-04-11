"use client"

import { motion, useReducedMotion } from "motion/react"
import { MotionIconProps } from "./types"
import { iconVariants } from "./icon-variants"
import { cn } from "@/lib/utils"

/**
 * Base MotionIcon wrapper component
 *
 * Wraps all animated icons with:
 * - Consistent sizing and viewBox
 * - Accessibility support (reduced motion)
 * - Shared animation states (idle/hover/active)
 * - Proper SVG attributes for crisp rendering
 *
 * @example
 * ```tsx
 * <MotionIcon variants={iconVariants.bounce}>
 *   <path d="..." />
 * </MotionIcon>
 * ```
 */

// Detect touch-primary devices to disable hover animations
const isTouchDevice = typeof window !== "undefined" &&
  window.matchMedia("(hover: none) and (pointer: coarse)").matches
export function MotionIcon({
  size = 20,
  isActive = false,
  variants,
  strokeWidth = 1.5,
  children,
  className,
  ...props
}: MotionIconProps) {
  const shouldReduceMotion = useReducedMotion()

  // Use no animation variant if user prefers reduced motion
  const effectiveVariants = shouldReduceMotion ? iconVariants.none : variants

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      initial="idle"
      whileHover={shouldReduceMotion || isTouchDevice ? undefined : "hover"}
      animate={isActive ? "active" : "idle"}
      variants={effectiveVariants}
      className={cn(
        "inline-block flex-shrink-0",
        // Only apply will-change when animations are active
        !shouldReduceMotion && effectiveVariants !== iconVariants.none && "will-change-transform",
        className
      )}
      {...props}
      // Accessibility
      role={props.role || "img"}
      aria-hidden={props["aria-label"] ? undefined : "true"}
    >
      {children}
    </motion.svg>
  )
}
