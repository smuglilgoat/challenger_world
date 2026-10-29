import { Badge } from "@/components/ui/badge"
import { STATUS_LABEL, type ClaimStatus } from "@/lib/event-data"

const STATUS_VARIANT: Record<ClaimStatus, "default" | "secondary" | "warning"> = {
  confirmed: "default",
  projected: "secondary",
  disputed: "warning",
}

export function StatusBadge({ status }: { status: ClaimStatus }) {
  return <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
}
