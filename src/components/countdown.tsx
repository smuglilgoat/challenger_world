import { useEffect, useState } from "react"
import { ClockIcon } from "lucide-react"
import { formatDate } from "@/lib/format"

const MINUTE = 60_000
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

export function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), MINUTE)
    return () => clearInterval(id)
  }, [])

  const diff = new Date(`${target}T00:00:00`).getTime() - now

  if (diff <= 0) {
    return (
      <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
        <ClockIcon className="size-4 text-muted-foreground" />
        <span>Launched {formatDate(target)}</span>
      </div>
    )
  }

  const days = Math.floor(diff / DAY)
  const hours = Math.floor((diff % DAY) / HOUR)
  const minutes = Math.floor((diff % HOUR) / MINUTE)

  return (
    <div className="flex items-center gap-2 rounded-lg border bg-muted/40 px-3 py-2 text-sm">
      <ClockIcon className="size-4 text-muted-foreground" />
      <span className="text-muted-foreground">Launches in</span>
      <span className="font-medium tabular-nums">
        {days}d {hours}h {minutes}m
      </span>
    </div>
  )
}
