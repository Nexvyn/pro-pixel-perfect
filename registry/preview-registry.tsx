import * as React from "react"

type RegistryEntry = {
  name: string
  component: React.ComponentType<unknown>
  description?: string
}

const ButtonDemo = React.lazy(() => import("@/registry/generated/examples/button-demo"))
const CardDemo = React.lazy(() => import("@/registry/generated/examples/card-demo"))
const InputDemo = React.lazy(() => import("@/registry/generated/examples/input-demo"))
const CardsDemo = React.lazy(() => import("@/registry/generated/examples/cards-demo"))
const ParallaxDemo = React.lazy(() => import("@/registry/generated/examples/parallax-demo"))
const MouseFollowerDemo = React.lazy(
  () => import("@/registry/generated/examples/mouse-follower-demo")
)
const MorphingTextDemo = React.lazy(
  () => import("@/registry/generated/examples/morphing-text-demo")
)
const SpinningTextDemo = React.lazy(
  () => import("@/registry/generated/examples/spinning-text-demo")
)

export const Index: Record<string, RegistryEntry> = {
  "button-demo": {
    name: "button-demo",
    component: ButtonDemo,
    description: "Button component with multiple variants",
  },
  "card-demo": {
    name: "card-demo",
    component: CardDemo,
    description: "Card component with header, content, and footer",
  },
  "input-demo": {
    name: "input-demo",
    component: InputDemo,
    description: "Input component with various types",
  },
  "cards-demo": {
    name: "cards-demo",
    component: CardsDemo,
    description: "Scroll-triggered card stack animation with GSAP",
  },
  "parallax-demo": {
    name: "parallax-demo",
    component: ParallaxDemo,
    description: "Smooth parallax scrolling with layered image animations",
  },
  "mouse-follower-demo": {
    name: "mouse-follower-demo",
    component: MouseFollowerDemo,
    description: "Interactive mouse follower with image trail effect",
  },
  "morphing-text-demo": {
    name: "morphing-text-demo",
    component: MorphingTextDemo,
    description: "Text that smoothly morphs between words",
  },
  "spinning-text-demo": {
    name: "spinning-text-demo",
    component: SpinningTextDemo,
    description: "Circular text that spins around a center point",
  },
}

export type ComponentName = keyof typeof Index
