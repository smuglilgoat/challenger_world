import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ClaimBadge } from "@/components/claim-badge"
import { TIERS } from "@/lib/event-data"

export function TierTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tier thresholds</CardTitle>
        <CardDescription>
          Season 3 point thresholds, shipped until the GMS patch notes land.
        </CardDescription>
        <CardAction>
          <Badge variant="secondary">Projected — S3 thresholds</Badge>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tier</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead>Rewards</TableHead>
              <TableHead className="text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {TIERS.map((tier) => (
              <TableRow key={tier.name}>
                <TableCell className="font-medium">{tier.name}</TableCell>
                <TableCell className="text-right tabular-nums">
                  {tier.points.value.toLocaleString()}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <ul className="flex flex-col gap-0.5">
                    {tier.rewards.map((reward) => (
                      <li key={reward.label}>
                        {reward.label}
                        {reward.detail && (
                          <span className="text-muted-foreground"> — {reward.detail}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell className="text-right">
                  <ClaimBadge claim={tier.points} className="justify-end" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
