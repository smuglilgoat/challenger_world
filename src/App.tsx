import { Countdown } from "@/components/countdown"
import { GuideTab } from "@/components/guide/guide-tab"
import { CharactersTab } from "@/components/character/characters-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EVENT } from "@/lib/event-data"
import { formatDate } from "@/lib/format"

export default function App() {
  return (
    <div className="min-h-dvh bg-background">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
          <div className="flex flex-col gap-1">
            <h1 className="font-heading text-xl font-semibold tracking-tight">{EVENT.name}</h1>
            <p className="text-sm text-muted-foreground">
              {formatDate(EVENT.startDate)} → {formatDate(EVENT.endDate)}
            </p>
          </div>
          <Countdown target={EVENT.startDate} />
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl p-4 md:px-6 md:py-6">
        <Tabs defaultValue="guide" className="gap-6">
          <TabsList>
            <TabsTrigger value="guide">Guide</TabsTrigger>
            <TabsTrigger value="characters">Characters</TabsTrigger>
          </TabsList>
          <TabsContent value="guide">
            <GuideTab />
          </TabsContent>
          <TabsContent value="characters">
            <CharactersTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
