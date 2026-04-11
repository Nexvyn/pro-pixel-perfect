"use client"

import * as React from "react"
import dynamic from "next/dynamic"

// Card Stack Animation Wrapper - dynamically imported for MDX
export const CardStackAnimateWrapper = dynamic(
  () => import("@/components/ui/compositions/cards").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    ),
  }
)

// Parallax Wrapper - dynamically imported for MDX
export const ParallaxWrapper = dynamic(
  () => import("@/components/ui/compositions/parallax").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-screen w-full items-center justify-center">Loading...</div>
    ),
  }
)

// Preview Props type
export interface PreviewProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  code?: string
  githubUrl?: string
}

// Preview Wrapper - dynamically imported for MDX
const PreviewComponent = dynamic(
  () => import("@/components/ui/internal/preview").then((mod) => mod.Preview),
  { ssr: false }
)

export function PreviewWrapper(props: PreviewProps) {
  return <PreviewComponent {...props} />
}
