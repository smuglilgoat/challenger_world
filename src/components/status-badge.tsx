import { Badge } from "@/components/ui/badge"
import { STATUS_LABEL, type Status } from "@/lib/event-data"

export function StatusBadge({ status }: { status: Status }) {
  return <Badge variant={status === "confirmed" ? "default" : "secondary"}>{STATUS_LABEL[status]}</Badge>
}
