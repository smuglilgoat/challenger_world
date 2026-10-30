import { GuideHeader } from "@/components/guide/guide-header"
import { WeeklyTimeline } from "@/components/guide/weekly-timeline"
import { TierTable } from "@/components/guide/tier-table"
import { CrestGenesisPanel } from "@/components/guide/crest-genesis-panel"
import { PrepChecklist } from "@/components/guide/prep-checklist"
import { SeasonChanges } from "@/components/guide/season-changes"
import { QuanahWorld } from "@/components/guide/quanah-world"
import { MissionPoints } from "@/components/guide/mission-points"
import { ConfirmedEvents, SeasonBoss } from "@/components/guide/season-boss"
import { SourcesCard } from "@/components/guide/sources-card"

export function GuideTab() {
  return (
    <div className="flex flex-col gap-4">
      <GuideHeader />
      <WeeklyTimeline />
      <TierTable />
      <MissionPoints />
      <SeasonBoss />
      <QuanahWorld />
      <ConfirmedEvents />
      <CrestGenesisPanel />
      <PrepChecklist />
      <SeasonChanges />
      <SourcesCard />
    </div>
  )
}
