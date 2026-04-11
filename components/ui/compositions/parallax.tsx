"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

export interface ParallaxLayer {
  src: string
  alt: string
  className?: string
  speed?: number
  position?: "absolute" | "relative"
}

export interface ParallaxProps {
  mainImage?: {
    src: string
    alt: string
    className?: string
  }
  layers?: ParallaxLayer[]
  secondaryImage?: {
    src: string
    alt: string
    className?: string
  }
  className?: string
}

// NOTE: Provide your own images for production use.
// These placeholders demonstrate the component structure only.
const defaultMainImage = {
  src: "/placeholder.svg",
  alt: "Main parallax image",
}

const defaultLayers: ParallaxLayer[] = [
  {
    src: "/placeholder.svg",
    alt: "Parallax layer 1",
    className: "absolute right-[50%] bottom-[-20%] w-80",
    speed: -220,
  },
  {
    src: "/placeholder.svg",
    alt: "Parallax layer 2",
    className: "absolute top-10 right-[-50%] h-56",
    speed: -150,
  },
]

const defaultSecondaryImage = {
  src: "/placeholder.svg",
  alt: "Secondary parallax image",
  className: "object-cover",
}

const Parallax = ({
  mainImage = defaultMainImage,
  layers = defaultLayers,
  secondaryImage = defaultSecondaryImage,
  className,
}: ParallaxProps) => {
  const containerRef = useRef(null)
  const container2 = useRef(null)
  const layerRefs = useRef<(HTMLImageElement | null)[]>([])
  const secondaryRef = useRef(null)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    if (!containerRef.current || !container2.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })

    layers.forEach((layer, index) => {
      if (layerRefs.current[index]) {
        tl.to(layerRefs.current[index], { y: layer.speed ?? -100, ease: "power2" }, 0)
      }
    })

    if (secondaryRef.current) {
      gsap.from(secondaryRef.current, {
        y: -120,
        ease: "linear",
        scrollTrigger: {
          trigger: container2.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    }
  }, [layers])

  return (
    <div className={cn("bg-muted text-muted-foreground/30 text-9xl", className)}>
      <div ref={containerRef} className="flex h-screen w-full items-start justify-center">
        <div className="border-border relative mt-10 border-2">
          <img src={mainImage.src} alt={mainImage.alt} className={mainImage.className} />
          {layers.map((layer, index) => (
            <img
              key={index}
              ref={(el) => {
                layerRefs.current[index] = el
              }}
              src={layer.src}
              alt={layer.alt}
              className={layer.className}
            />
          ))}
        </div>
      </div>
      <div ref={container2} className="flex h-screen w-full items-center justify-center">
        <div className="h-96 w-96 overflow-hidden">
          <img
            ref={secondaryRef}
            src={secondaryImage.src}
            alt={secondaryImage.alt}
            className={cn("object-cover", secondaryImage.className)}
          />
        </div>
      </div>
      <div className="h-screen w-full"></div>
    </div>
  )
}

export default Parallax
