import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field"
import { StatusBadge } from "@/components/status-badge"
import { PREP_CHECKLIST } from "@/lib/event-data"
import { formatDate } from "@/lib/format"

const PREP_KEY = "cws4.prep.v1"

function loadChecked(): Record<string, boolean> {
  try {
    const parsed = JSON.parse(localStorage.getItem(PREP_KEY) ?? "{}")
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, boolean>) : {}
  } catch {
    return {}
  }
}

export function PrepChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>(loadChecked)

  useEffect(() => {
    try {
      localStorage.setItem(PREP_KEY, JSON.stringify(checked))
    } catch {
      // Storage can be full or blocked; the checklist still works in memory.
    }
  }, [checked])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pre-launch prep</CardTitle>
        <CardDescription>
          Do these before 2026-11-11. Each item carries its own Confirmed / Projected tag.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          {PREP_CHECKLIST.map((item) => (
            <Field key={item.key} orientation="horizontal">
              <Checkbox
                id={`prep-${item.key}`}
                checked={checked[item.key] ?? false}
                onCheckedChange={(value) =>
                  setChecked((current) => ({ ...current, [item.key]: value === true }))
                }
              />
              <FieldContent>
                <div className="flex flex-wrap items-center gap-2">
                  <FieldLabel htmlFor={`prep-${item.key}`}>{item.label}</FieldLabel>
                  <StatusBadge status={item.status} />
                  {item.expiry && <Badge variant="destructive">Expires {formatDate(item.expiry)}</Badge>}
                </div>
                <FieldDescription>{item.detail}</FieldDescription>
              </FieldContent>
            </Field>
          ))}
        </FieldGroup>
      </CardContent>
    </Card>
  )
}
