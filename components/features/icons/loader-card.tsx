"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Terminal, Code } from "lucide-react"

interface LoaderCardProps {
  name: string
  index: number
}

function formatLoaderName(filename: string): string {
  return filename
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
}

export function LoaderCard({ name, index }: LoaderCardProps) {
  const [copied, setCopied] = useState<"svg" | "react" | "cli" | null>(null)
  const [svgCode, setSvgCode] = useState("")

  useEffect(() => {
    fetch(`/svg-loaders/${name}.svg`)
      .then((res) => res.text())
      .then((code) => setSvgCode(code))
      .catch(() => {})
  }, [name])

  const copyCLI = async () => {
    const cliCommand = `npx shadcn@latest add "https://ui.nexvyn.dev/r/styles/new-york-v4/icon-${name}.json"`
    await navigator.clipboard.writeText(cliCommand)
    setCopied("cli")
    setTimeout(() => setCopied(null), 2000)
  }

  const copySVG = async () => {
    await navigator.clipboard.writeText(svgCode)
    setCopied("svg")
    setTimeout(() => setCopied(null), 2000)
  }

  const copyReact = async () => {
    const pascalName = name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("")
    const componentName = /^\d/.test(pascalName) ? `Loader${pascalName}` : `${pascalName}Loader`

    const reactComponent = `"use client";

import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export interface ${componentName}Props extends Omit<ComponentProps<"svg">, "ref"> {
  size?: number;
  className?: string;
}

export function ${componentName}({
  size = 24,
  className,
  ...props
}: ${componentName}Props) {
  return (
    <svg
      width={size}
      height={size}
      className={cn("inline-block flex-shrink-0", className)}
      role="img"
      aria-label="${formatLoaderName(name)}"
      {...props}
    >
      ${svgCode.match(/<svg[^>]*>([\s\S]*?)<\/svg>/)?.[1] || ""}
    </svg>
  );
}`

    await navigator.clipboard.writeText(reactComponent)
    setCopied("react")
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="group bg-background border-border hover:bg-muted/50 relative flex flex-col items-center justify-between border-r border-b p-6 transition-colors duration-200">
      {/* Loader */}
      <div className="mb-4 flex flex-1 items-center justify-center">
        {/* eslint-disable-next-line */}
        <img
          src={`/svg-loaders/${name}.svg`}
          alt={formatLoaderName(name)}
          className="h-12 w-12"
          style={{
            filter:
              "invert(32%) sepia(98%) saturate(1234%) hue-rotate(213deg) brightness(97%) contrast(101%)",
          }}
        />
      </div>

      {/* Action buttons */}
      <div className="bg-muted flex items-center gap-1 rounded-md p-1 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <button
          onClick={copyCLI}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy CLI command"
          aria-label="Copy CLI command"
        >
          {copied === "cli" ? (
            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
          ) : (
            <Terminal className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <button
          onClick={copySVG}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy SVG code"
          aria-label="Copy SVG source"
        >
          {copied === "svg" ? (
            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
          ) : (
            <Copy className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
        <button
          onClick={copyReact}
          className="hover:bg-background relative rounded p-1.5 transition-colors"
          title="Copy React component"
          aria-label="Copy React component code"
        >
          {copied === "react" ? (
            <Check className="h-4 w-4 text-green-500" aria-hidden="true" />
          ) : (
            <Code className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Index */}
      <span className="text-muted-foreground absolute right-2 bottom-1 mt-2 text-xs">#{index}</span>
    </div>
  )
}
