"use client"

import * as React from "react"

/**
 * DataFast analytics client
 * Single module for all analytics tracking via window.datafast
 */

export interface Event {
  name: string
  properties?: Record<string, unknown>
}

export const Events = {
  COPY_CODE: "copy_code",
  COPY_COMMAND: "copy_command",
  VIEW_COMPONENT: "view_component",
} as const

export function trackEvent(event: Event | string, properties?: Record<string, unknown>) {
  const eventName = typeof event === "string" ? event : event.name
  const eventProps = typeof event === "string" ? properties : event.properties

  if (typeof window !== "undefined" && window.datafast) {
    window.datafast(eventName, eventProps)
  }
}

export function useDataFast() {
  const track = React.useCallback((eventName: string, properties?: Record<string, unknown>) => {
    trackEvent(eventName, properties)
  }, [])

  return { track }
}
