"use client"

import { useState, useMemo } from "react"
import { Search, ExternalLink } from "lucide-react"
import Link from "next/link"
import { LoaderCard } from "./loader-card"

const SVG_LOADERS = [
  "12-dots-scale-rotate",
  "180-ring-with-bg",
  "180-ring",
  "270-ring-with-bg",
  "270-ring",
  "3-dots-bounce",
  "3-dots-fade",
  "3-dots-move",
  "3-dots-rotate",
  "3-dots-scale-middle",
  "3-dots-scale",
  "6-dots-rotate",
  "6-dots-scale-middle",
  "6-dots-scale",
  "8-dots-rotate",
  "90-ring-with-bg",
  "90-ring",
  "audio",
  "ball-triangle",
  "bars-fade",
  "bars-rotate-fade",
  "bars-scale-fade",
  "bars-scale-middle",
  "bars-scale",
  "bars",
  "blocks-scale",
  "blocks-shuffle-2",
  "blocks-shuffle-3",
  "blocks-wave",
  "bouncing-ball",
  "circles",
  "clock",
  "dot-revolve",
  "eclipse-half",
  "eclipse",
  "gooey-balls-1",
  "gooey-balls-2",
  "grid",
  "hearts",
  "oval",
  "puff",
  "pulse-2",
  "pulse-3",
  "pulse-multiple",
  "pulse-ring",
  "pulse-rings-2",
  "pulse-rings-3",
  "pulse-rings-multiple",
  "pulse",
  "ring-resize",
  "rings",
  "spinning-circles",
  "tadpole",
  "tail-spin",
  "three-dots",
  "wifi-fade",
  "wifi",
  "wind-toy",
]

function formatLoaderName(filename: string): string {
  return filename
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function SvgLoadersSection() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredLoaders = useMemo(() => {
    if (!searchQuery.trim()) return SVG_LOADERS
    const query = searchQuery.toLowerCase()
    return SVG_LOADERS.filter(
      (name) =>
        name.toLowerCase().includes(query) || formatLoaderName(name).toLowerCase().includes(query)
    )
  }, [searchQuery])

  return (
    <section className="bg-background mt-2 w-full rounded-3xl border border-dashed">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        {/* Header */}
        <header className="mb-10 space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-primary text-3xl font-bold tracking-tight sm:text-4xl">
              SVG Loaders
            </h2>
            <p className="text-muted-foreground mx-auto max-w-md text-sm">
              58 animated SVG loading spinners. MIT licensed, no attribution required.
            </p>
          </div>

          {/* Source Badges */}
          <div className="flex items-center justify-center gap-4">
            <span className="bg-muted inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs">
              <span className="opacity-50">Source:</span>
              <Link
                href="https://github.com/n3r4zzurr0/svg-spinners"
                target="_blank"
                className="text-primary flex items-center gap-0.5 font-medium hover:underline"
              >
                svg-spinners <ExternalLink className="h-2.5 w-2.5" />
              </Link>
              <span className="opacity-30">|</span>
              <Link
                href="https://github.com/SamHerbert/SVG-Loaders"
                target="_blank"
                className="text-primary flex items-center gap-0.5 font-medium hover:underline"
              >
                SVG-Loaders <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </span>
          </div>

          {/* Search */}
          <div className="flex justify-center pt-4">
            <div className="relative w-full max-w-sm">
              <Search className="text-muted-foreground absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search loaders..."
                className="bg-muted focus:ring-primary/20 w-full rounded-xl border border-transparent py-2.5 pr-4 pl-11 text-sm transition-all focus:ring-2 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* Grid */}
        {filteredLoaders.length === 0 ? (
          <div className="bg-muted/30 flex flex-col items-center justify-center rounded-2xl border border-dashed py-24 text-center">
            <div className="text-muted-foreground mb-4 text-4xl">Search</div>
            <p className="text-muted-foreground font-medium">No loaders found</p>
            <p className="text-muted-foreground/60 mt-1 text-sm">Try a different search term</p>
          </div>
        ) : (
          <div className="border-border bg-background overflow-hidden rounded-xl border">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {filteredLoaders.map((name, index) => (
                <LoaderCard key={name} name={name} index={SVG_LOADERS.indexOf(name)} />
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-xs font-medium">
            Use the action buttons to copy CLI command, SVG code, or React component •{" "}
            {SVG_LOADERS.length} loaders
          </p>
        </div>
      </div>
    </section>
  )
}
