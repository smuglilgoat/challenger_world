import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/status-badge"
import { SEASON_CHANGES } from "@/lib/event-data"

export function SeasonChanges() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>What changed in Season 4</CardTitle>
        <CardDescription>Compared with Challenger World Season 3.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {SEASON_CHANGES.map((change) => (
            <li key={change.title} className="flex flex-col gap-1 rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium">{change.title}</span>
                <StatusBadge status={change.status} />
              </div>
              <p className="text-sm text-muted-foreground">{change.detail}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
