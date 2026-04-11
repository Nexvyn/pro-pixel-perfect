"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/primitives/button"
import { V0Icon, TerminalIcon } from "@/components/features/home/icons/action-icons"

interface IconCardProps {
  name: string
  icon: React.ComponentType<{ size?: number; isActive?: boolean }>
  onClick?: () => void
}

export function IconCard({ name, icon: IconComponent, onClick }: IconCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [copiedType, setCopiedType] = useState<string | null>(null)

  const getPascalCase = (str: string) =>
    str
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("")

  // Copy CLI command (shadcn-style)
  const handleCopyCli = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const cliCommand = `npx shadcn@latest add https://ui.nexvyn.dev/r/icons/${name}`
    await navigator.clipboard.writeText(cliCommand)
    setCopiedType("cli")
    setTimeout(() => setCopiedType(null), 2000)
  }

  // Copy full icon code
  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const pascalCase = getPascalCase(name)
    const iconCode = `import { ${pascalCase}Icon } from "@/components/ui/icons/animated";

<${pascalCase}Icon size={24} />`
    await navigator.clipboard.writeText(iconCode)
    setCopiedType("code")
    setTimeout(() => setCopiedType(null), 2000)
  }

  // Open in V0
  const handleOpenV0 = (e: React.MouseEvent) => {
    e.stopPropagation()
    const pascalCase = getPascalCase(name)
    const v0Url = `https://v0.dev/chat?q=Create a component using the ${pascalCase} animated icon`
    window.open(v0Url, "_blank")
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Select ${name} icon`}
      className={cn(
        "group relative flex flex-col items-center",
        "border-border/50 bg-card cursor-pointer rounded-xl border",
        "aspect-square transition-all duration-200",
        "hover:border-border hover:shadow-sm"
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon preview */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 pt-6 pb-2">
        <div className="text-foreground mb-3 flex items-center justify-center">
          <IconComponent size={36} />
        </div>
        <span className="text-muted-foreground max-w-full truncate text-center font-mono text-xs">
          {name}
        </span>
      </div>

      {/* Action buttons - appear on hover at bottom */}
      <div
        className={cn(
          "flex w-full items-center justify-center gap-1 pt-1 pb-3",
          "transition-all duration-200",
          isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        {/* Terminal - Copy CLI command */}
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted/80 hover:bg-muted size-7 rounded-md"
          onClick={handleCopyCli}
          title="Copy CLI command"
          aria-label="Copy CLI command"
        >
          {copiedType === "cli" ? (
            <Check className="size-3.5 text-green-500" aria-hidden="true" />
          ) : (
            <TerminalIcon className="size-3.5" aria-hidden="true" />
          )}
        </Button>

        {/* Copy - Copy icon code */}
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted/80 hover:bg-muted size-7 rounded-md"
          onClick={handleCopyCode}
          title="Copy icon code"
          aria-label="Copy icon code"
        >
          {copiedType === "code" ? (
            <Check className="size-3.5 text-green-500" aria-hidden="true" />
          ) : (
            <Copy className="size-3.5" aria-hidden="true" />
          )}
        </Button>

        {/* V0 - Open in V0 */}
        <Button
          variant="ghost"
          size="icon"
          className="bg-muted/80 hover:bg-muted size-7 rounded-md"
          onClick={handleOpenV0}
          title="Open in V0"
          aria-label="Open in V0"
        >
          <V0Icon className="size-3.5" aria-hidden="true" />
        </Button>
      </div>
    </div>
  )
}
