"use client"

import { useEffect, useRef } from "react"

/**
 * Custom hook that calls a callback function on every animation frame
 * @param callback - Function to call on each animation frame
 * @param active - Whether the animation is currently active
 */
export function useAnimationFrame(callback: () => void, active: boolean = true) {
  const requestRef = useRef<number | undefined>(undefined)
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    if (!active) {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
        requestRef.current = undefined
      }
      return
    }

    const animate = () => {
      callbackRef.current()
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [active])
}
