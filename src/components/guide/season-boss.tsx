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
import { StatusBadge } from "@/components/status-badge"
import {
  BLUEBERRY_FARM,
  CHALLENGER_WORLD_RULES,
  GENESIS_PASS,
  ITEM_BURNING_PLUS,
  MAYRIN,
  MONSTER_PARK,
  SOURCES,
} from "@/lib/event-data"

function FactList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{title}</p>
      <ul className="flex flex-col gap-1.5">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-muted-foreground">
            <span aria-hidden>•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SeasonBoss() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{MAYRIN.name} — season boss</CardTitle>
        <CardDescription>{MAYRIN.frequency}</CardDescription>
        <CardAction>
          <StatusBadge status={MAYRIN.status} />
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Normal — Lv. {MAYRIN.normalLevel}+</Badge>
          <Badge variant="outline">Hard — Lv. {MAYRIN.hardLevel}+</Badge>
          <Badge variant="outline">Solo</Badge>
          <Badge variant="outline">{MAYRIN.timeLimitMinutes} minute limit</Badge>
        </div>
        <p className="text-xs text-muted-foreground">{MAYRIN.period}</p>
        <Separator />
        <FactList title="How it works" items={MAYRIN.notes} />
        <p className="text-xs text-muted-foreground">Source: {SOURCES[MAYRIN.source].title}</p>
      </CardContent>
    </Card>
  )
}

export function ConfirmedEvents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Confirmed event details</CardTitle>
        <CardDescription>
          Straight from the v.272 Public Test Server patch notes.
        </CardDescription>
        <CardAction>
          <Badge variant="outline">Official</Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <FactList
          title={`Challenger World — ${CHALLENGER_WORLD_RULES.maxCharacters} characters`}
          items={CHALLENGER_WORLD_RULES.notes}
        />
        <Separator />
        <FactList
          title={`Blueberry Farm — Lv. ${BLUEBERRY_FARM.minLevel}-${BLUEBERRY_FARM.maxLevel}`}
          items={[
            `${BLUEBERRY_FARM.timeLimitMinutes}-minute limit, re-enterable within ${BLUEBERRY_FARM.reentryWindowHours} hours of using an entry pass.`,
            ...BLUEBERRY_FARM.notes,
          ]}
        />
        <Separator />
        <FactList
          title="Item Burning Plus"
          items={[
            `${ITEM_BURNING_PLUS.stageMissions} stage missions, each unlocking Challenger Equipment perks.`,
            ...ITEM_BURNING_PLUS.notes,
          ]}
        />
        <Separator />
        <FactList title="Monster Park" items={MONSTER_PARK.notes} />
        <Separator />
        <FactList
          title="Genesis Pass"
          items={[`On sale ${GENESIS_PASS.salePeriod}.`, ...GENESIS_PASS.notes]}
        />
        <p className="text-xs text-muted-foreground">Source: {SOURCES["nexon-pts-v272"].title}</p>
      </CardContent>
    </Card>
  )
}
