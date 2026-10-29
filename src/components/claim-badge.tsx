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
      <Badge>{claimValue(claim.value)}</Badge>
      {claim.alternatives?.map((alternative) => (
        <span
          key={`${alternative.source}:${String(alternative.value)}`}
          className="inline-flex flex-wrap items-center gap-1"
        >
          <Badge variant="outline">
            {claimValue(alternative.value)} · {SOURCES[alternative.source].title}
          </Badge>
          {alternative.note && (
            <span className="text-xs text-muted-foreground">{alternative.note}</span>
          )}
        </span>
      ))}
    </div>
  )
}
