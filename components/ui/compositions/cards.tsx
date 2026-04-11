"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

export interface CardItem {
  name: string
  className: string
  link: string
}

export interface CardStackAnimateProps {
  items?: CardItem[]
  title?: string
  className?: string
  cardClassName?: string
}

const defaultItems: CardItem[] = [
  { name: "Pink", className: "bg-pink-300", link: "/card_animation/pink.png" },
  { name: "Blue", className: "bg-blue-300", link: "/card_animation/blue.png" },
  {
    name: "Yellow",
    className: "bg-yellow-200",
    link: "/card_animation/yellow.png",
  },
  { name: "Green", className: "bg-green-200", link: "/card_animation/green.png" },
  {
    name: "Purple",
    className: "bg-purple-200",
    link: "/card_animation/purple.png",
  },
  {
    name: "Orange",
    className: "bg-orange-200",
    link: "/card_animation/orange.png",
  },
]

const CardStackAnimate = ({
  items = defaultItems,
  title = "Card Collection",
  className,
  cardClassName,
}: CardStackAnimateProps) => {
  const first = useRef(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!first.current) return
    const tl = gsap.timeline({})
    const cards = gsap.utils.toArray(".card", first.current)

    tl.from(cards, {
      y: "100vh",
      stagger: 1,
      ease: "power3.out",
      duration: 1,
      scrollTrigger: {
        trigger: first.current,
        start: "top top",
        end: "2000",
        scrub: 1,
        pin: true,
      },
    })
  })

  return (
    <div className={cn("bg-background h-full w-full", className)}>
      <div
        ref={first}
        className="bg-background relative flex h-screen w-full items-center justify-center"
      >
        <div className="text-foreground text-9xl font-light">{title}</div>
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "card absolute h-[400px] w-[300px] overflow-hidden rounded-3xl p-4 shadow-lg",
              item.className,
              cardClassName
            )}
            style={{
              left: `calc(50% + (${i * 70}px - ${(items.length / 2) * 70}px))`,
              transform: `translateX(-50%) rotate(${(i - items.length / 2) * 10}deg)`,
            }}
          >
            <div className="flex justify-between">
              <div className="text-xs text-neutral-700">Card {i + 1}</div>
              <div className="text-muted-foreground text-xs">Color {item.className}</div>
            </div>
            <img src={item.link} alt={item.name} className="absolute left-0" />
          </div>
        ))}
      </div>
      <div className="flex h-screen w-full items-center justify-center">hi</div>
    </div>
  )
}

export default CardStackAnimate
