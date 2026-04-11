import React from "react"
import { COLOR_VARIANTS, COMPONENT_SIZES } from "@/lib/constants"

export type ComponentSize = (typeof COMPONENT_SIZES)[number]
export type ColorVariant = (typeof COLOR_VARIANTS)[number]

export type Size = "sm" | "md" | "lg"
export type Variant = "primary" | "secondary" | "outline" | "ghost" | "destructive"

export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

export type ComponentWithRef<T, P = {}> = React.ForwardRefExoticComponent<
  P & React.RefAttributes<T>
>

export type PolymorphicComponentProps<T extends React.ElementType, Props = {}> = {
  as?: T
} & Props &
  Omit<React.ComponentPropsWithoutRef<T>, keyof Props>

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>
