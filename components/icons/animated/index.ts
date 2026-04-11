/**
 * Animated Icon System
 *
 * Production-ready animated icons for sidebar navigation
 * Built with Motion (motion/react) and SVG
 *
 * Usage:
 * ```tsx
 * import { ButtonIcon, ChartIcon } from '@/components/ui/icons/animated';
 *
 * <ButtonIcon size={20} isActive={true} />
 * ```
 *
 * API Patterns:
 * This directory contains TWO incompatible icon API patterns:
 *
 * 1. MotionIcon-based system (./icons/*) - RECOMMENDED
 *    - Uses MotionIcon wrapper component
 *    - Props: BaseIconProps (extends SVGElement attributes)
 *    - Animation: Declarative variants system (idle/hover/active)
 *    - Features: Reduced motion support, consistent ARIA
 *    - Examples: ButtonIcon, CardIcon, ChartIcon (31 icons in ./icons/)
 *
 * 2. Imperative animation system (root directory files)
 *    - Uses useAnimation() + event handlers
 *    - Props: HTMLAttributes<HTMLDivElement> or custom shapes
 *    - Animation: Imperative startAnimation/stopAnimation via ref
 *    - Used by: Site-only feature components (moved to components/features/home/icons/)
 *
 * When adding new icons, use the MotionIcon-based pattern (see ./icons/button.tsx)
 */

export { MotionIcon } from "./motion-icon"
export { iconVariants, iconEasing, ANIMATION_CONFIG } from "./icon-variants"
export type { BaseIconProps, MotionIconProps, IconComponent } from "./types"

export {
  iconRegistry,
  getIconByName,
  getIconsByCategory,
  iconMap,
  iconNames,
  type IconRegistryEntry,
} from "./icon-registry"

export { AlertDialogIcon } from "./icons/alert-dialog"
export { AlertIcon } from "./icons/alert"
export { AspectRatioIcon } from "./icons/aspect-ratio"
export { AvatarIcon } from "./icons/avatar"
export { BadgeIcon } from "./icons/badge"
export { BookIcon } from "./icons/book"
export { BreadcrumbIcon } from "./icons/breadcrumb"
export { ButtonIcon } from "./icons/button"
export { ButtonGroupIcon } from "./icons/button-group"
export { CalendarIcon } from "./icons/calendar"
export { CardIcon } from "./icons/card"
export { CarouselIcon } from "./icons/carousel"
export { ChartIcon } from "./icons/chart"
export { CheckboxIcon } from "./icons/checkbox"
export { CollapsibleIcon } from "./icons/collapsible"
export { ComboboxIcon } from "./icons/combobox"
export { CommandIcon } from "./icons/command"
export { ContextMenuIcon } from "./icons/context-menu"
export { DataTableIcon } from "./icons/data-table"

export { AccordionIcon } from "./icons/accordion"
export { DialogIcon } from "./icons/dialog"
export { InputIcon } from "./icons/input"
export { LayersIcon } from "./icons/layers"
export { MenuIcon } from "./icons/menu"
export { NotificationIcon } from "./icons/notification"
export { PaginationIcon } from "./icons/pagination"
export { ProgressIcon } from "./icons/progress"
export { RadioIcon } from "./icons/radio"
export { SearchIcon } from "./icons/search"
export { SelectIcon } from "./icons/select"
export { SettingsIcon } from "./icons/settings"
export { ShieldIcon } from "./icons/shield"
export { SliderIcon } from "./icons/slider"
export { SwitchIcon } from "./icons/switch"
export { TabsIcon } from "./icons/tabs"
export { TooltipIcon } from "./icons/tooltip"
