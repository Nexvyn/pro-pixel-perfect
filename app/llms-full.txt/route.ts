import { getLLMText, source } from "@/lib/source"
import { metadata } from "@/app/layout"

export const revalidate = false

const PROJECT_STRUCTURE = `
Project Name: ${metadata.title?.toString() || "nexvyn/ui"}
Description: ${metadata.description || "A lightweight documentation UI library"}

File Structure Overview:
- app/: Next.js App Router directory
  - (app)/: Main application routes (landing pages)
  - docs/: Documentation routes
  - og/docs/: OpenGraph image generation
  - llms-full.txt/: LLM context endpoint
- components/: React components
  - ui/primitives/: Atomic distributable components (Button, Card, Input)
  - ui/compositions/: Complex UI compositions (MouseFollower, Parallax, CardStackAnimate)
  - ui/internal/: Site-only internal components
  - icons/animated/: Animated icon library with 31+ icons
  - features/: Site-specific feature components
    - home/: Landing page sections
    - docs/: Documentation UI components
- config/: Site configuration (docs.ts, sidebar.ts)
- lib/: Utilities and helper functions
- content/docs/: MDX documentation files
- registry/: Component registry manifests for shadcn CLI

---
`

export async function GET() {
  const scan = source.getPages().map(getLLMText)
  const scanned = await Promise.all(scan)

  const fullText = [PROJECT_STRUCTURE, ...scanned].join("\n\n")

  return new Response(fullText)
}
