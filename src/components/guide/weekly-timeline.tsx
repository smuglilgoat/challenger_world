import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { cn } from "@/lib/utils"
import { currentWeek } from "@/lib/progress"
import { DAY_ZERO, EVENT, WEEKS } from "@/lib/event-data"
import { formatShortDate } from "@/lib/format"

export function WeeklyTimeline() {
  const activeWeek = currentWeek(new Date(), EVENT.startDate, EVENT.totalWeeks)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Weekly timeline</CardTitle>
          <CardDescription>
            {EVENT.totalWeeks} weeks from launch. Reset day is Monday; dates are confirmed, weekly focus is
            projected.
          </CardDescription>
          <CardAction>
            <StatusBadge status="projected" />
          </CardAction>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-2">
            {WEEKS.map((week) => {
              const isActive = week.index === activeWeek
              return (
                <li
                  key={week.index}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-3",
                    isActive && "border-primary bg-primary/5"
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium">{week.label}</span>
                    <span className="text-sm text-muted-foreground">{formatShortDate(week.startDate)}</span>
                    {isActive && <Badge variant="secondary">Current week</Badge>}
                  </div>
                  <p className="text-sm">{week.focus}</p>
                  <ul className="flex flex-col gap-0.5 text-sm text-muted-foreground">
                    {week.keyTargets.map((target) => (
                      <li key={target} className="flex gap-2">
                        <span aria-hidden>·</span>
                        <span>{target}</span>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Day zero priorities</CardTitle>
          <CardDescription>Roughly 3 hours before reset on launch day.</CardDescription>
          <CardAction>
            <StatusBadge status={DAY_ZERO.status} />
          </CardAction>
        </CardHeader>
        <CardContent>
          <ol className="flex list-decimal flex-col gap-1 pl-4 text-sm">
            {DAY_ZERO.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
