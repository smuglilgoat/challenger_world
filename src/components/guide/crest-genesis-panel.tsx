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
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/status-badge"
import { CREST_RULES, GENESIS_RULES, MILESTONES } from "@/lib/event-data"
import { crestProgress, genesisProgress } from "@/lib/progress"

export function CrestGenesisPanel() {
  const crests = crestProgress(CREST_RULES.perWeek)
  const genesis = genesisProgress(GENESIS_RULES.pointsAfterThreeWeeks)

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Crest &amp; Genesis math</CardTitle>
          <CardDescription>
            Crests cap at {CREST_RULES.max.toLocaleString()}; Genesis needs{" "}
            {GENESIS_RULES.pointsToLiberate.value.toLocaleString()} to liberate.
          </CardDescription>
          <CardAction>
            <StatusBadge status={GENESIS_RULES.status} />
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">Item Burning crests</span>
              <span className="tabular-nums text-muted-foreground">
                {CREST_RULES.perWeek} / {CREST_RULES.max} per week
              </span>
            </div>
            <Progress value={crests.percent} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {CREST_RULES.perWeek} crests per week from {CREST_RULES.mobsPerWeek.toLocaleString()} mobs, plus up
              to {CREST_RULES.bossCap.toLocaleString()} boss crests that accrue instead of resetting. About{" "}
              {CREST_RULES.weeksToMax} weeks to max; stage 8 lands around {CREST_RULES.stage8Window}.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">Genesis points after 3 weeks</span>
              <span className="tabular-nums text-muted-foreground">
                {genesis.current.toLocaleString()} / {genesis.max.toLocaleString()}
              </span>
            </div>
            <Progress value={genesis.percent} className="h-2" />
            <p className="text-sm text-muted-foreground">
              Full Cernium clears plus one Black Mage solo leave you{" "}
              {GENESIS_RULES.gapAfterThreeWeeks.value} points short.
            </p>
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <p className="text-sm font-medium">Crest rules</p>
            <ul className="flex list-disc flex-col gap-1 pl-4 text-sm text-muted-foreground">
              {CREST_RULES.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <Alert>
            <TriangleAlertIcon />
            <AlertTitle>The {GENESIS_RULES.gapAfterThreeWeeks.value}-point gap</AlertTitle>
            <AlertDescription>
              Kill Black Mage on {GENESIS_RULES.realisticDate} for the last ~
              {GENESIS_RULES.gapAfterThreeWeeks.value} points, or accept a {GENESIS_RULES.fallbackWeek}{" "}
              liberation. A {GENESIS_RULES.dayZeroDate} liberation needs ~
              {GENESIS_RULES.gapAfterThreeWeeks.value} points on day zero in about 3 hours — improbable.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Level milestones</CardTitle>
          <CardDescription>What each stop unlocks.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-3">
            {MILESTONES.map((milestone) => (
              <li key={milestone.level} className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline">{milestone.label}</Badge>
                  <StatusBadge status={milestone.status} />
                </div>
                <p className="text-sm text-muted-foreground">{milestone.note}</p>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
