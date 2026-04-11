import { SponsorsSection } from "@/components/features/sponsors/sponsors-section"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sponsors | Nexvyn UI",
  description: "Nexvyn UI is free and open source, made possible by our sponsors and contributors.",
}

export default function SponsorsPage() {
  return <SponsorsSection />
}
