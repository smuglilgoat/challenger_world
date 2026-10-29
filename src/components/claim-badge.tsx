import { Badge } from "@/components/ui/badge"
import { StatusBadge } from "@/components/status-badge"
import { SOURCES, type Claim } from "@/lib/event-data"

function claimValue(value: unknown): string {
  return typeof value === "number" ? value.toLocaleString() : String(value)
}

export function ClaimBadge({ claim }: { claim: Claim<unknown> }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
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
