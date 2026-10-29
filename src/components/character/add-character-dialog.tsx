import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldGroup, FieldLabel, FieldTitle } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { TIERS } from "@/lib/event-data"
import type { CharacterRole, CharacterWorld, NewCharacter } from "@/hooks/use-characters"

type Props = {
  onAdd: (input: NewCharacter) => void
  triggerLabel?: string
}

export function AddCharacterDialog({ onAdd, triggerLabel = "Add character" }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [job, setJob] = useState("")
  const [world, setWorld] = useState<CharacterWorld>("heroic")
  const [role, setRole] = useState<CharacterRole>("main")
  const [level, setLevel] = useState("260")
  const [targetTier, setTargetTier] = useState<string>()
  const [nameError, setNameError] = useState(false)

  function reset() {
    setName("")
    setJob("")
    setWorld("heroic")
    setRole("main")
    setLevel("260")
    setTargetTier(undefined)
    setNameError(false)
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim()) {
      setNameError(true)
      return
    }
    onAdd({
      name,
      job,
      world,
      role,
      level: Math.max(1, Number(level) || 1),
      targetTier,
    })
    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <PlusIcon data-icon="inline-start" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add character</DialogTitle>
          <DialogDescription>
            Track a Challenger World character. Data stays in this browser.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field data-invalid={nameError}>
              <FieldLabel htmlFor="character-name">Name</FieldLabel>
              <Input
                id="character-name"
                value={name}
                aria-invalid={nameError}
                onChange={(event) => {
                  setName(event.target.value)
                  if (event.target.value.trim()) setNameError(false)
                }}
                placeholder="e.g. LetheMain"
              />
              {nameError && <FieldError>Name is required.</FieldError>}
            </Field>

            <Field>
              <FieldLabel htmlFor="character-job">Job</FieldLabel>
              <Input
                id="character-job"
                value={job}
                onChange={(event) => setJob(event.target.value)}
                placeholder="e.g. Lethe"
              />
            </Field>

            <Field>
              <FieldTitle>World</FieldTitle>
              <ToggleGroup
                type="single"
                variant="outline"
                value={world}
                onValueChange={(value) => value && setWorld(value as CharacterWorld)}
              >
                <ToggleGroupItem value="heroic">Heroic</ToggleGroupItem>
                <ToggleGroupItem value="interactive">Interactive</ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field>
              <FieldTitle>Role</FieldTitle>
              <ToggleGroup
                type="single"
                variant="outline"
                value={role}
                onValueChange={(value) => value && setRole(value as CharacterRole)}
              >
                <ToggleGroupItem value="main">Main</ToggleGroupItem>
                <ToggleGroupItem value="mule">Mule</ToggleGroupItem>
                <ToggleGroupItem value="quanah">Quanah</ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="character-level">Level</FieldLabel>
              <Input
                id="character-level"
                type="number"
                min={1}
                max={300}
                value={level}
                onChange={(event) => setLevel(event.target.value)}
              />
            </Field>

            <Field>
              <FieldTitle>Target tier</FieldTitle>
              <Select value={targetTier ?? ""} onValueChange={setTargetTier}>
                <SelectTrigger aria-label="Target tier">
                  <SelectValue placeholder="No target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TIERS.map((tier) => (
                      <SelectItem key={tier.name} value={tier.name}>
                        {tier.name} — {tier.points.value.toLocaleString()} pts
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          </FieldGroup>

          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Add character</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
