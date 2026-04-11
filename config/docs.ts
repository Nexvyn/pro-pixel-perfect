import type { SidebarNavItem } from "@/types/nav"

export const docsConfig: SidebarNavItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs", iconName: "book-open" },
      { title: "Installation", href: "/docs/getting-started/installation", iconName: "download" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Overview", href: "/docs/components", iconName: "layout-grid" },
      { title: "Button", href: "/docs/components/button", iconName: "square" },
      { title: "Card", href: "/docs/components/card", iconName: "credit-card" },
      { title: "Cards", href: "/docs/components/cards", iconName: "layout-grid" },
      { title: "Input", href: "/docs/components/input", iconName: "text-cursor-input" },
      { title: "Parallax", href: "/docs/components/parallax", iconName: "layers" },
      { title: "Mouse Follower", href: "/docs/components/mouse-follower", iconName: "mouse" },
      { title: "Morphing Text", href: "/docs/components/morphing-text", iconName: "text" },
      { title: "Spinning Text", href: "/docs/components/spinning-text", iconName: "text" },
    ],
  },
  {
    title: "Icons",
    items: [{ title: "Overview", href: "/docs/icons", iconName: "star" }],
  },
  {
    title: "Utilities",
    items: [{ title: "Utilities", href: "/docs/utilities/utilities", iconName: "wrench" }],
  },
]
