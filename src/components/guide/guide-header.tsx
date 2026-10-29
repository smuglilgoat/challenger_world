import { CalendarDaysIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Countdown } from "@/components/countdown"
import { StatusBadge } from "@/components/status-badge"
import { DATA_REVISION, EVENT, STATUS_LABEL } from "@/lib/event-data"
import { formatDate } from "@/lib/format"

export function GuideHeader() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">{EVENT.name}</CardTitle>
        <CardDescription>
          {EVENT.game} · {formatDate(EVENT.startDate)} → {formatDate(EVENT.endDate)} ·{" "}
          {EVENT.totalWeeks} weekly resets
        </CardDescription>
        <CardAction>
          <StatusBadge status={EVENT.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <Countdown target={EVENT.startDate} />
          <Badge variant="outline">
            <CalendarDaysIcon data-icon="inline-start" />
            Part 2: {formatDate(EVENT.part2Date)}
          </Badge>
        </div>

        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <span>
            Data as of {DATA_REVISION.label} ({DATA_REVISION.date})
          </span>
          {DATA_REVISION.patchNotesUrl && (
            <a
              href={DATA_REVISION.patchNotesUrl}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-primary"
            >
              GMS patch notes
            </a>
          )}
        </p>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Part 1 — {formatDate(EVENT.startDate)}</p>
          <ul className="flex flex-wrap gap-2">
            {EVENT.part1.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
          <p className="text-sm font-medium">Part 2 — {formatDate(EVENT.part2Date)}</p>
          <ul className="flex flex-wrap gap-2">
            {EVENT.part2.map((item) => (
              <li key={item}>
                <Badge variant="outline">{item}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <div className="flex flex-col gap-1 text-sm text-muted-foreground">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="confirmed" />
            <span>{STATUS_LABEL.confirmed} — shipped or announced for GMS.</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status="projected" />
            <span>{STATUS_LABEL.projected} — KMS numbers and the pre-season plan, not yet GMS patch notes.</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
