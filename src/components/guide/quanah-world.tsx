import { TriangleAlertIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ClaimBadge } from "@/components/claim-badge"
import { StatusBadge } from "@/components/status-badge"
import { QUANAH, SOURCES } from "@/lib/event-data"

export function QuanahWorld() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{QUANAH.name} — event world</CardTitle>
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
          <p className="text-xs text-muted-foreground">{QUANAH.period}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Inspector Level</p>
          <p className="text-sm text-muted-foreground">
            Separate from your Character Level, up to Lv. {QUANAH.inspectorLevel.max}. Every 5
            Inspector Levels earns a Dimensional Skill Coupon, and you can hold 5 skills at a time.
          </p>
          <p className="text-sm text-muted-foreground">{QUANAH.inspectorLevel.note}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Proving Fields</p>
          <ul className="flex flex-wrap gap-2">
            {QUANAH.provingFields.map((field) => (
              <li key={field.difficulty}>
                <Badge variant="outline">
                  {field.difficulty} — Lv. {field.level} mobs
                </Badge>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">{QUANAH.provingFieldsNote}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Inspector&apos;s Mapae</p>
          <p className="text-sm text-muted-foreground">{QUANAH.badge.source}</p>
          <p className="text-sm text-muted-foreground">{QUANAH.badge.note}</p>
        </div>

        <Separator />

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">Equipment</p>
          <p className="text-sm text-muted-foreground">{QUANAH.equipment.note}</p>
        </div>

        <Separator />

        <ul className="flex flex-col gap-1.5">
          {QUANAH.notes.map((note) => (
            <li key={note} className="flex gap-2 text-sm text-muted-foreground">
              <span aria-hidden>•</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>

        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>One designated character, one way</AlertTitle>
          <AlertDescription>
            You move one designated Challenger World character into Quanah, and the transfer is
            irreversible. Quanah World Leap characters cannot be designated for Beyond Burning.
          </AlertDescription>
        </Alert>

        <Alert>
          <TriangleAlertIcon />
          <AlertTitle className="flex flex-wrap items-center gap-2">
            Badge portability
            <ClaimBadge claim={QUANAH.badgePortability} />
          </AlertTitle>
          <AlertDescription>{QUANAH.badgePortability.note}</AlertDescription>
        </Alert>

        <p className="text-xs text-muted-foreground">Source: {SOURCES[QUANAH.source].title}</p>
      </CardContent>
    </Card>
  )
}
