"use client"

import { useState } from "react"
import { CollapsibleSidebar } from "@/components/docs/collapsible-sidebar"
import { GitHubStarPrompt } from "@/components/docs/github-star-prompt"
import { cn } from "@/lib/utils"
import type { SidebarNavItem } from "@/components/ui/internal/sidebar-nav"

interface DocsLayoutClientProps {
  children: React.ReactNode
  items: SidebarNavItem[]
}

export function DocsLayoutClient({ children, items }: DocsLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-background focus:text-foreground focus:ring-primary sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2"
      >
        Skip to content
      </a>
      <div className="flex">
        <div className="sticky top-[72px] hidden h-[calc(100vh-88px)] shrink-0 self-start lg:block">
          <CollapsibleSidebar
            items={items}
            open={isSidebarOpen}
            onToggle={() => setIsSidebarOpen((prev) => !prev)}
          />
        </div>
        <div className="relative flex min-w-0 flex-1">
          <main
            id="main-content"
            className={cn(
              "min-w-0 flex-1 transition-all duration-200",
              !isSidebarOpen && "xl:pl-48"
            )}
          >
            <div className="min-h-[calc(100vh-80px)] w-full">
              <div className="flex justify-center p-4">
                <div className="docs-content w-full max-w-4xl">{children}</div>
              </div>
            </div>
          </main>
          <div
            className={cn(
              "hidden shrink-0 transition-all duration-200 ease-out lg:block",
              isSidebarOpen ? "lg:w-[260px] xl:w-[68px]" : "w-12"
            )}
          />
          <div className="hidden w-48 shrink-0 xl:block" />
        </div>
        <GitHubStarPrompt />
      </div>
    </>
  )
}
