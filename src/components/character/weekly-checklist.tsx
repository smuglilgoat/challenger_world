import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { PLANS, WEEKLY_TASKS, WEEKS } from "@/lib/event-data"
import { planCompletion, taskCompletion } from "@/lib/progress"
import type { Character } from "@/hooks/use-characters"

type Props = {
  character: Character
  weekIndex: number
  onWeekChange: (weekIndex: number) => void
  onToggleTask: (taskKey: string, weekIndex: number) => void
  onTogglePlanTarget: (weekIndex: number, targetIndex: number) => void
  onUpdate: (patch: Partial<Character>) => void
}

export function WeeklyChecklist({
  character,
  weekIndex,
  onWeekChange,
  onToggleTask,
  onTogglePlanTarget,
  onUpdate,
}: Props) {
  const tasks = WEEKLY_TASKS.filter((task) => task.kind !== "note")
  const noteTask = WEEKLY_TASKS.find((task) => task.kind === "note")
  const completion = taskCompletion(character, tasks, weekIndex)
  const week = WEEKS[weekIndex]
  const plan = PLANS.find((item) => item.id === character.planId)
  const planTargets = plan?.weeks.find((item) => item.weekIndex === weekIndex)?.targets ?? []
  const planDone = planCompletion(character, planTargets, weekIndex)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-medium">Weekly checklist</span>
          <span className="text-sm text-muted-foreground">
            {completion.done} / {completion.total} tasks done
          </span>
        </div>
        <Select value={String(weekIndex)} onValueChange={(value) => onWeekChange(Number(value))}>
          <SelectTrigger size="sm" aria-label="Select week">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {WEEKS.map((item) => (
                <SelectItem key={item.index} value={String(item.index)}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Progress
        value={completion.percent}
        aria-label="Weekly checklist completion"
        className="h-2"
      />

      {week && <p className="text-sm text-muted-foreground">{week.focus}</p>}

      <FieldGroup className="gap-3">
        {tasks.map((task) => {
          const storageKey = `${weekIndex}:${task.key}`
          const checked = character.weeks[storageKey] ?? false
          const inputId = `task-${character.id}-${weekIndex}-${task.key}`
          return (
            <Field key={task.key} orientation="horizontal">
              <Checkbox
                id={inputId}
                checked={checked}
                onCheckedChange={() => onToggleTask(task.key, weekIndex)}
              />
              <FieldContent>
                <FieldLabel htmlFor={inputId}>{task.label}</FieldLabel>
                <FieldDescription>{task.detail}</FieldDescription>
              </FieldContent>
              {task.kind === "count" && (
                <Input
                  type="number"
                  min={0}
                  max={task.target}
                  aria-label={`${task.label} count`}
                  className="w-24"
                  value={character.counts[storageKey] ?? 0}
                  onChange={(event) => {
                    const count = Math.max(0, Number(event.target.value) || 0)
                    onUpdate({
                      counts: { ...character.counts, [storageKey]: count },
                      weeks:
                        task.target && count >= task.target
                          ? { ...character.weeks, [storageKey]: true }
                          : character.weeks,
                    })
                  }}
                />
              )}
            </Field>
          )
        })}

        {noteTask && (
          <Field>
            <FieldLabel htmlFor={`note-${character.id}`}>{noteTask.label}</FieldLabel>
            <Textarea
              id={`note-${character.id}`}
              value={character.notes}
              onChange={(event) => onUpdate({ notes: event.target.value })}
              placeholder={noteTask.detail}
            />
          </Field>
        )}
      </FieldGroup>

      <Separator />

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-medium">Progression plan</span>
            <span className="text-sm text-muted-foreground">
              {plan
                ? `${plan.author} · ${planDone.done} / ${planDone.total} targets`
                : "Attach a community route to this character."}
            </span>
          </div>
          <Select
            value={character.planId ?? "none"}
            onValueChange={(value) =>
              onUpdate({ planId: value === "none" ? undefined : value })
            }
          >
            <SelectTrigger size="sm" aria-label="Select progression plan">
              <SelectValue placeholder="No plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="none">No plan</SelectItem>
                {PLANS.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {plan && (
          <>
            <Progress
              value={planDone.percent}
              aria-label="Progression plan completion"
              className="h-2"
            />
            <p className="text-sm text-muted-foreground">{plan.summary}</p>
            {planTargets.length > 0 ? (
              <FieldGroup className="gap-3">
                {planTargets.map((target, targetIndex) => {
                  const storageKey = `${weekIndex}:${targetIndex}`
                  const inputId = `plan-${character.id}-${weekIndex}-${targetIndex}`
                  return (
                    <Field key={storageKey} orientation="horizontal">
                      <Checkbox
                        id={inputId}
                        checked={character.planProgress[storageKey] ?? false}
                        onCheckedChange={() => onTogglePlanTarget(weekIndex, targetIndex)}
                      />
                      <FieldContent>
                        <FieldLabel htmlFor={inputId}>{target.label}</FieldLabel>
                        {target.detail && <FieldDescription>{target.detail}</FieldDescription>}
                      </FieldContent>
                    </Field>
                  )
                })}
              </FieldGroup>
            ) : (
              <p className="text-sm text-muted-foreground">No targets for this week.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
