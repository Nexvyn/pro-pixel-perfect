declare global {
  interface Window {
    datafast?: (eventName: string, properties?: Record<string, unknown>) => void
  }
}

export {}
