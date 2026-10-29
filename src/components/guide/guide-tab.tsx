import { GuideHeader } from "@/components/guide/guide-header"
import { WeeklyTimeline } from "@/components/guide/weekly-timeline"
import { TierTable } from "@/components/guide/tier-table"
import { CrestGenesisPanel } from "@/components/guide/crest-genesis-panel"
import { PrepChecklist } from "@/components/guide/prep-checklist"
import { QuanahExplainer, SeasonChanges } from "@/components/guide/season-changes"

export function GuideTab() {
  return (
    <div className="flex flex-col gap-4">
      <GuideHeader />
      <WeeklyTimeline />
      <TierTable />
      <CrestGenesisPanel />
      <PrepChecklist />
      <SeasonChanges />
      <QuanahExplainer />
    </div>
  )
}
