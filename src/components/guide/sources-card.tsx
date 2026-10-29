import { ExternalLinkIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SOURCES, SOURCE_KIND_LABEL, type SourceKind } from "@/lib/event-data"
import { formatDate } from "@/lib/format"

const KIND_VARIANT: Record<SourceKind, "default" | "secondary" | "outline"> = {
  official: "default",
  community: "secondary",
  local: "outline",
}

export function SourcesCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources</CardTitle>
        <CardDescription>Every fact in this guide traces back to one of these.</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-3">
          {Object.values(SOURCES).map((source) => (
            <li key={source.id} className="flex flex-col gap-1 rounded-lg border p-3">
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium underline underline-offset-4 hover:text-primary"
                >
                  {source.title}
                  <ExternalLinkIcon className="size-3" aria-hidden />
                </a>
                <Badge variant={KIND_VARIANT[source.kind]}>{SOURCE_KIND_LABEL[source.kind]}</Badge>
                <span className="text-sm text-muted-foreground">
                  Retrieved {formatDate(source.retrieved)}
                </span>
              </div>
              <span className="truncate text-sm text-muted-foreground">{source.url}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
