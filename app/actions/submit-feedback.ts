"use server"

import { headers } from "next/headers"

// TODO: Replace with persistent store (Vercel KV/Redis) for production
// See: https://vercel.com/docs/storage/vercel-kv
// Current implementation uses in-memory Map which resets on each deployment
const rateLimiter = new Map<string, { lastRequest: number; count: number }>()
const RATE_LIMIT_WINDOW_MS = 60000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 2

export async function submitFeedback(feedback: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL

  if (!webhookUrl) {
    return { success: false, error: "Configuration error. Please contact support." }
  }

  if (!feedback.trim()) {
    return { success: false, error: "Feedback cannot be empty." }
  }

  try {
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") ?? "unknown"
    const now = Date.now()

    const rateData = rateLimiter.get(ip)
    if (rateData) {
      if (now - rateData.lastRequest < RATE_LIMIT_WINDOW_MS) {
        if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
          return { success: false, error: "Rate limit exceeded. Please try again later." }
        }
        rateData.count += 1
        rateData.lastRequest = now
      } else {
        rateLimiter.set(ip, { lastRequest: now, count: 1 })
      }
    } else {
      rateLimiter.set(ip, { lastRequest: now, count: 1 })
    }

    // Sanitize feedback (truncate if excessively long)
    const sanitizedFeedback = feedback.slice(0, 1000)

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `**New Feedback Received:**\n${sanitizedFeedback}`,
      }),
    })

    if (!response.ok) {
      throw new Error(`Discord API error: ${response.statusText}`)
    }

    return { success: true }
  } catch (error) {
    console.error("Failed to submit feedback:", error)
    return { success: false, error: "Failed to submit feedback. Please try again." }
  }
}
