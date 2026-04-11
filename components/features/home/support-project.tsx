"use client"

import { useState } from "react"
import NextImage from "next/image"
import { Button } from "@/components/ui/primitives/button"
import { motion, AnimatePresence } from "motion/react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Code, Terminal, Cpu, Zap, Database, Globe, Server } from "lucide-react"

const TIERS = [
  {
    amount: 5,
    label: "$5",
    name: "Chill Guy Certificate",
    icon: Terminal,
    title: "$5 Donation",
    desc: "The icons will always be free and open-source, regardless of donations",
  },
  {
    amount: 10,
    label: "$10",
    name: "Cool Guy Certificate",
    icon: Code,
    title: "$10 Donation",
    desc: "A coffee for the developer to keep building awesome stuff",
  },
  {
    amount: 25,
    label: "$25",
    name: "Legend Certificate",
    icon: Cpu,
    title: "$25 Donation",
    desc: "Serious support that helps maintain the servers and infrastructure",
  },
  {
    amount: 50,
    label: "$50",
    name: "Hero Certificate",
    icon: Database,
    title: "$50 Donation",
    desc: "Major contribution to the long-term sustainability of the project",
  },
  {
    amount: 100,
    label: "$100",
    name: "Titan Certificate",
    icon: Server,
    title: "$100 Donation",
    desc: "Elite status support. You are truly making a difference",
  },
  {
    amount: 200,
    label: "$200",
    name: "Godlike Certificate",
    icon: Zap,
    title: "$200 Donation",
    desc: "Unbelievable generosity. You are powering the future of UI",
  },
  {
    amount: 500,
    label: "$500",
    name: "Immortal Certificate",
    icon: Globe,
    title: "$500 Donation",
    desc: "Maximum support level. Your name echoes in eternity",
  },
]

export function SupportProject() {
  const [selectedAmount, setSelectedAmount] = useState(5)
  const currentTier = TIERS.find((t) => t.amount === selectedAmount) || TIERS[0]
  const TierIcon = currentTier.icon

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mx-auto mb-12 max-w-lg text-center">
        <h2 className="font-pixelify mb-4 text-3xl font-bold">Support the project</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          This is a place for those who want to go beyond a simple thank you. I'm grateful for any
          kind of support, whether it's just a DM with kind words or something more. Your donation
          is by no means required - this page is made just for those who asked for it. I am
          incredibly grateful for any support you choose to provide.
        </p>
        <p className="text-muted-foreground mt-6 font-mono text-sm font-medium tracking-widest uppercase">
          Select donation amount:
        </p>
      </div>

      {/* Amount Selector */}
      <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
        {TIERS.map((tier) => (
          <motion.button
            key={tier.amount}
            onClick={() => setSelectedAmount(tier.amount)}
            layout
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95, y: 0 }}
            animate={{
              backgroundColor:
                selectedAmount === tier.amount ? "var(--foreground)" : "var(--background)",
              borderColor: selectedAmount === tier.amount ? "var(--foreground)" : "var(--border)",
              color:
                selectedAmount === tier.amount ? "var(--background)" : "var(--muted-foreground)",
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              backgroundColor: { duration: 0.2 },
            }}
            className={cn(
              "font-pixelify min-w-[60px] rounded-md border-2 px-4 py-2 text-sm",
              selectedAmount === tier.amount
                ? "border-foreground translate-x-[-1px] translate-y-[-1px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
                : "border-border/60 hover:border-border shadow-none"
            )}
          >
            {tier.label}
          </motion.button>
        ))}
      </div>

      {/* Ticket Card */}
      <div className="relative z-10 mx-auto w-full max-w-2xl drop-shadow-2xl">
        {/* Mascots - Decorative Peeking */}
        <div className="pointer-events-none absolute -top-24 -left-32 z-[-1] hidden select-none xl:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <NextImage
              src="/mascots/mascot-black.png"
              alt="Nexvyn Mascot Black"
              width={220}
              height={220}
              className="rotate-[-12deg] object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>
        <div className="pointer-events-none absolute -top-24 -right-32 z-[-1] hidden select-none xl:block">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <NextImage
              src="/mascots/mascot-white.png"
              alt="Nexvyn Mascot White"
              width={220}
              height={220}
              className="rotate-[12deg] object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedAmount}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full"
          >
            <div
              className="bg-card text-card-foreground group border-border relative isolate h-[280px] w-full overflow-hidden border"
              style={{
                borderRadius: "16px",
                // Creating the ticket shape with side stub
                maskImage: `
                  radial-gradient(circle at 75% 0, transparent 12px, black 12px), 
                  radial-gradient(circle at 75% 100%, transparent 12px, black 12px)
                `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            >
              {/* Subtle Grid Pattern Overlay */}
              <div
                className="bg-foreground pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
                style={{
                  maskImage: `linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)`,
                  maskSize: "20px 20px",
                }}
              />

              {/* Vertical Dashed Line Divider - Aligned with notches */}
              <div className="border-border/60 pointer-events-none absolute top-3 bottom-3 left-[75%] z-10 w-px -translate-x-1/2 border-l-2 border-dashed" />

              <div className="relative z-10 flex h-full">
                {/* Left Section - Main Info */}
                <div className="relative flex flex-1 flex-col justify-between overflow-hidden p-6 pr-10 sm:p-8">
                  {/* Header */}
                  <div className="relative z-20 flex items-start justify-between">
                    <div>
                      <h3 className="text-foreground font-pixelify text-xl tracking-tight sm:text-2xl">
                        {currentTier.name}
                      </h3>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="border-border bg-muted/50 text-muted-foreground inline-flex items-center rounded-sm border px-2 py-1 font-mono text-[10px] tracking-wide uppercase">
                          {new Date().getFullYear()} Edition
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Giant Vector Character (Replaces Image) */}
                  <div className="pointer-events-none absolute -right-16 -bottom-16 z-0 select-none">
                    <motion.div
                      key={currentTier.name}
                      initial={{ scale: 0.8, rotate: -30, opacity: 0 }}
                      animate={
                        currentTier.amount === 500
                          ? { scale: 1, rotate: 360, opacity: 1 }
                          : { scale: 1, rotate: -15, opacity: 1 }
                      }
                      transition={
                        currentTier.amount === 500
                          ? {
                              scale: { type: "spring", stiffness: 200, damping: 20 },
                              opacity: { duration: 0.2 },
                              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                            }
                          : { type: "spring", stiffness: 200, damping: 20, delay: 0.05 }
                      }
                    >
                      <TierIcon className="text-foreground/5 size-80" strokeWidth={1} />
                    </motion.div>
                  </div>

                  {/* Description */}
                  <div className="relative z-20 mt-auto flex items-center gap-4">
                    <div className="border-border bg-card flex size-14 shrink-0 items-center justify-center rounded-sm border-2 shadow-sm">
                      <TierIcon className="text-foreground size-6" strokeWidth={1.5} />
                    </div>
                    <p className="text-muted-foreground max-w-[240px] font-mono text-xs leading-relaxed">
                      {currentTier.desc}
                    </p>
                  </div>
                </div>

                {/* Right Section - Stub (Amount) */}
                <div className="bg-muted/20 border-border relative flex w-[25%] flex-col items-center justify-between border-l p-4 text-center">
                  <span className="font-pixelify text-muted-foreground border-border bg-card mt-2 rounded-sm border px-2 py-0.5 text-[10px]">
                    ADM ONE
                  </span>

                  <div className="my-auto flex flex-col items-center">
                    <h4 className="font-pixelify text-foreground text-3xl leading-none tracking-tighter">
                      {currentTier.label}
                    </h4>
                    <span className="text-muted-foreground mt-1 block font-mono text-[9px] tracking-widest uppercase">
                      Donation
                    </span>
                  </div>

                  <div className="mt-auto flex w-full flex-col items-center gap-4">
                    <Link
                      href="https://github.com/sponsors/Nexvyn"
                      target="_blank"
                      className="z-20 w-full"
                    >
                      <Button className="bg-foreground text-background hover:bg-foreground/90 font-pixelify h-8 w-full rounded-sm text-[10px] font-bold tracking-wider uppercase shadow-sm transition-all active:translate-y-[1px]">
                        Sponsor
                      </Button>
                    </Link>

                    {/* Vertical Barcode */}
                    <div className="text-foreground h-6 w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjEwMCUiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] bg-repeat-x opacity-20" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
