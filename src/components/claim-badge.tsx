import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import { SOURCES, type Claim } from "@/lib/event-data"
import { cn } from "@/lib/utils"

function claimValue(value: unknown): string {
  return typeof value === "number" ? value.toLocaleString() : String(value)
}

export function ClaimBadge({ claim, className }: { claim: Claim<unknown>; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1", className)}>
      <StatusBadge status={claim.status} />
      {claim.alternatives?.map((alternative) => (
        <Badge
          key={`${alternative.source}:${String(alternative.value)}`}
          variant="outline"
          title={alternative.note}
        >
          {claimValue(alternative.value)} · {SOURCES[alternative.source].title}
        </Badge>
      ))}
    </div>
  )
}
