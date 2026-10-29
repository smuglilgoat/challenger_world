import { TriangleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ClaimBadge } from "@/components/claim-badge"
import { StatusBadge } from "@/components/status-badge"
import { QUANAH, SEASON_CHANGES } from "@/lib/event-data"

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

export function QuanahExplainer() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{QUANAH.name} — the new event world</CardTitle>
        <CardDescription>{QUANAH.summary}</CardDescription>
        <CardAction>
          <StatusBadge status={QUANAH.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Transfer requirements</p>
          <ul className="flex flex-wrap gap-2">
            {QUANAH.requirements.map((requirement) => (
              <li key={requirement}>
                <Badge variant="outline">{requirement}</Badge>
              </li>
            ))}
          </ul>
        </div>

        <Separator />

        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>One designated character, one way</AlertTitle>
          <AlertDescription>
            You move one designated Challenger World character into Quanah. The transfer is irreversible.
          </AlertDescription>
        </Alert>

        <Alert>
          <TriangleAlertIcon />
          <AlertTitle className="flex flex-wrap items-center gap-2">
            Profile badge portability
            <ClaimBadge claim={QUANAH.badgePortability} />
          </AlertTitle>
          <AlertDescription>{QUANAH.badgePortability.note}</AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )
}
