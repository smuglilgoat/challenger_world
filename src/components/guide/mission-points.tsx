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
import {
  BOSS_MISSIONS,
  LEVEL_MISSIONS,
  SOURCES,
  WEEKLY_MISSIONS,
  WEEKLY_MISSION_MAX_COINS,
} from "@/lib/event-data"

const SOURCE = "nexon-pts-v272"

export function MissionPoints() {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Level missions</CardTitle>
          <CardDescription>
            Reaching a level completes its mission automatically in the Challenger World UI.
          </CardDescription>
          <CardAction>
            <Badge variant="outline">Official</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-right">Level</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Coins</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {LEVEL_MISSIONS.map((mission) => (
                <TableRow key={mission.level}>
                  <TableCell className="text-right tabular-nums">{mission.level}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {mission.points.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {mission.coins.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Boss missions</CardTitle>
          <CardDescription>
            Practice Mode clears count, but only when solo or in a solo party. Clearing a harder
            difficulty counts for every lower difficulty of the same boss.
          </CardDescription>
          <CardAction>
            <Badge variant="outline">Official</Badge>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Boss</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead className="text-right">Points</TableHead>
                <TableHead className="text-right">Coins</TableHead>
                <TableHead className="text-right">Advanced</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {BOSS_MISSIONS.map((mission) => (
                <TableRow key={`${mission.boss}-${mission.difficulty}`}>
                  <TableCell className="font-medium">{mission.boss}</TableCell>
                  <TableCell className="text-muted-foreground">{mission.difficulty}</TableCell>
                  <TableCell className="text-right tabular-nums">
                    {mission.points.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {mission.coins.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right tabular-nums">
                    {mission.advancedCoins || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly progression missions</CardTitle>
          <CardDescription>
            Complete one of the three, then click &quot;Complete&quot; in the Challenger World UI.
            Resets every Wednesday at 12:00 AM UTC.
          </CardDescription>
          <CardAction>
            <Badge variant="outline">Official</Badge>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <ul className="flex flex-col gap-2">
            {WEEKLY_MISSIONS.map((mission) => (
              <li key={mission.label} className="flex items-center justify-between gap-3 text-sm">
                <span>{mission.label}</span>
                <span className="tabular-nums text-muted-foreground">
                  {mission.coins ? `${mission.coins.toLocaleString()} coins` : "—"}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground">
            Max {WEEKLY_MISSION_MAX_COINS.toLocaleString()} Challenger Coins per week, even if you
            finish all three. A missed mission can be backfilled with a Weekly Progression Pass for
            10,000 Maple Points.
          </p>
          <p className="text-xs text-muted-foreground">Source: {SOURCES[SOURCE].title}</p>
        </CardContent>
      </Card>
    </div>
  )
}
