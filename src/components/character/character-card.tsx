import { useState } from "react"
import { Trash2Icon, UserRoundCheckIcon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { StatDialog } from "@/components/character/stat-dialog"
import { WeeklyChecklist } from "@/components/character/weekly-checklist"
import { CREST_RULES, GENESIS_RULES, TIERS } from "@/lib/event-data"
import { crestProgress, genesisProgress, nextTier, tierFor } from "@/lib/progress"
import type { Character, CharacterRole } from "@/hooks/use-characters"

const ROLE_LABEL: Record<CharacterRole, string> = {
  main: "Main",
  mule: "Mule",
  quanah: "Quanah",
}

type Props = {
  character: Character
  currentWeekIndex: number
  onUpdate: (patch: Partial<Character>) => void
  onToggleTask: (taskKey: string, weekIndex: number) => void
  onTogglePlanTarget: (weekIndex: number, targetIndex: number) => void
  onRemove: () => void
}

export function CharacterCard({
  character,
  currentWeekIndex,
  onUpdate,
  onToggleTask,
  onTogglePlanTarget,
  onRemove,
}: Props) {
  const [weekIndex, setWeekIndex] = useState(currentWeekIndex)
  const crests = crestProgress(character.crests)
  const genesis = genesisProgress(character.genesisPoints)
  const tier = tierFor(character.points, TIERS)
  const upcoming = nextTier(character.points, TIERS)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
        <CardDescription>
          {character.job || "No job set"} · Lv. {character.level}
        </CardDescription>
        <CardAction className="flex flex-wrap items-center justify-end gap-2">
          <Badge variant="outline">{character.world === "heroic" ? "Heroic" : "Interactive"}</Badge>
          <Badge variant={character.role === "quanah" ? "default" : "secondary"}>
            {ROLE_LABEL[character.role]}
          </Badge>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon-sm" aria-label={`Delete ${character.name}`}>
                <Trash2Icon data-icon="inline-start" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete {character.name}?</AlertDialogTitle>
                <AlertDialogDescription>
                  This removes the character and their weekly progress from this browser. It cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction variant="destructive" onClick={onRemove}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">Item Burning crests</span>
              <span className="tabular-nums text-muted-foreground">
                {crests.current.toLocaleString()} / {crests.max.toLocaleString()}
              </span>
            </div>
            <Progress value={crests.percent} className="h-2" />
            <span className="text-sm text-muted-foreground">{crests.weeklyCap} crests per week</span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 text-sm">
              <span className="font-medium">Genesis points</span>
              <span className="tabular-nums text-muted-foreground">
                {genesis.current.toLocaleString()} / {genesis.max.toLocaleString()}
              </span>
            </div>
            <Progress value={genesis.percent} className="h-2" />
            <span className="text-sm text-muted-foreground">
              {genesis.gapAfterThreeWeeks} short after three full weeks
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="text-muted-foreground">Tier</span>
          <Badge variant="secondary">{tier?.name ?? "Unranked"}</Badge>
          <span className="tabular-nums text-muted-foreground">
            {character.points.toLocaleString()} pts
          </span>
          {upcoming ? (
            <span className="text-muted-foreground">
              · {upcoming.pointsNeeded.toLocaleString()} to {upcoming.tier.name}
            </span>
          ) : (
            <span className="text-muted-foreground">· Max tier</span>
          )}
          {character.targetTier && <Badge variant="outline">Target {character.targetTier}</Badge>}
        </div>

        <div className="flex flex-wrap gap-2">
          <StatDialog
            label="Level"
            value={character.level}
            description="Character level."
            onSave={(value) => onUpdate({ level: value })}
          />
          <StatDialog
            label="Tier points"
            value={character.points}
            description="Season tier points."
            onSave={(value) => onUpdate({ points: value })}
          />
          <StatDialog
            label="Crests"
            value={character.crests}
            description={`Item Burning Plus crests, up to ${CREST_RULES.max.toLocaleString()}.`}
            onSave={(value) => onUpdate({ crests: value })}
          />
          <StatDialog
            label="Genesis points"
            value={character.genesisPoints}
            description={`Genesis liberation points, up to ${GENESIS_RULES.pointsToLiberate.value.toLocaleString()}.`}
            onSave={(value) => onUpdate({ genesisPoints: value })}
          />
          <Button
            variant={character.role === "quanah" ? "secondary" : "outline"}
            size="sm"
            onClick={() => onUpdate({ role: character.role === "quanah" ? "mule" : "quanah" })}
          >
            <UserRoundCheckIcon data-icon="inline-start" />
            {character.role === "quanah" ? "Quanah designated" : "Designate for Quanah"}
          </Button>
        </div>

        <Separator />

        <WeeklyChecklist
          character={character}
          weekIndex={weekIndex}
          onWeekChange={setWeekIndex}
          onToggleTask={onToggleTask}
          onTogglePlanTarget={onTogglePlanTarget}
          onUpdate={onUpdate}
        />
      </CardContent>
    </Card>
  )
}
