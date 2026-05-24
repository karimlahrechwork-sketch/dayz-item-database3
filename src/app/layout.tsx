import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DayZ Item Database | Console Official Servers',
  description: 'Complete DayZ item database for console official servers. Search weapons, gear, medical supplies, food, and tools with stats, spawn locations, and map availability.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
