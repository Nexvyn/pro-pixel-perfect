"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/primitives/button"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function GlobalSponsorButton() {
  const pathname = usePathname()
  const isHome = pathname === "/"

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[9999] transition-all duration-300",
        isHome
          ? "right-4 bottom-4 sm:right-6 sm:bottom-24"
          : "right-4 bottom-4 sm:right-10 sm:bottom-10"
      )}
    >
      <Link
        href="https://github.com/sponsors/Nexvyn"
        target="_blank"
        rel="noreferrer"
        aria-label="Sponsor Nexvyn UI on GitHub"
        className="pointer-events-auto block"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            className="btn-3d-primary group size-10 overflow-hidden rounded-md p-0"
            variant="default"
          >
            <div className="relative size-5">
              {/* Layer 1: White Outline (Background) */}
              <Heart
                className="pointer-events-none absolute inset-0 z-10 size-5 fill-transparent text-red-500"
                strokeWidth={2}
              />

              {/* Layer 2: Red Liquid Fill (Foreground, masked) */}
              <motion.div
                className="absolute right-0 bottom-0 left-0 w-full overflow-hidden"
                initial={{ height: "0%" }}
                whileHover={{ height: "50%" }}
                whileTap={{ height: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <Heart
                  className="absolute bottom-0 left-0 size-5 fill-red-500 text-transparent"
                  strokeWidth={0}
                />
              </motion.div>
            </div>
          </Button>
        </motion.div>
      </Link>
    </div>
  )
}
