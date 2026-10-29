import { UsersIcon } from "lucide-react"
import { AddCharacterDialog } from "@/components/character/add-character-dialog"
import { CharacterCard } from "@/components/character/character-card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { useCharacters } from "@/hooks/use-characters"
import { WEEKS } from "@/lib/event-data"
import { currentWeek } from "@/lib/progress"

export function CharactersTab() {
  const {
    characters,
    addCharacter,
    updateCharacter,
    removeCharacter,
    toggleTask,
    togglePlanTarget,
  } = useCharacters()
  const weekIndex = Math.max(0, currentWeek(new Date(), WEEKS))

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="font-heading text-lg font-semibold">Characters</h2>
          <p className="text-sm text-muted-foreground">Progress is saved in this browser only.</p>
        </div>
        <AddCharacterDialog onAdd={addCharacter} />
      </div>

      {characters.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <UsersIcon />
            </EmptyMedia>
            <EmptyTitle>No characters yet</EmptyTitle>
            <EmptyDescription>
              Add a Challenger World character to track crests, Genesis points and weekly tasks.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <AddCharacterDialog onAdd={addCharacter} triggerLabel="Add your first character" />
          </EmptyContent>
        </Empty>
      ) : (
        <div className="flex flex-col gap-4">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              currentWeekIndex={weekIndex}
              onUpdate={(patch) => updateCharacter(character.id, patch)}
              onToggleTask={(taskKey, week) => toggleTask(character.id, taskKey, week)}
              onTogglePlanTarget={(week, targetIndex) =>
                togglePlanTarget(character.id, week, targetIndex)
              }
              onRemove={() => removeCharacter(character.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
