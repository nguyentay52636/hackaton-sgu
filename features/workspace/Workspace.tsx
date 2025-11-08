"use client"

import { useState } from "react"
// import { TopBar } from "./top-bar"
import { TranscripPanel } from "./components/TranscripPanel"
// import { ChatPanel } from "./chat-panel"
import { SmartToolsPanel } from "@/shared/components/Tools/SmartToolsPanel"
// import { SettingsModal } from "./settings-modal"
// import { HistoryModal } from "./history-modal"
// import { OnboardingModal } from "./onboarding-modal"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, FileText, Wrench } from "lucide-react"
import { ChatPanel } from "./components/ChatPanel/ChatPanel"
import { Tabs, TabsContent, TabsTrigger, TabsList } from "@/shared/ui/tabs"

export function Workspace() {
  const [showSettings, setShowSettings] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-background via-background to-muted/30">


      <main className="flex-1 overflow-hidden p-2 md:p-4">
        <div className="hidden xl:grid xl:grid-cols-[1fr_1fr_380px] h-full gap-4 animate-fade-in">
          <TranscripPanel />
          <ChatPanel />
          <SmartToolsPanel />
        </div>

        <div className="xl:hidden h-full">
          <Tabs defaultValue="transcript" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-3 mb-2">
              <TabsTrigger value="transcript" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">Văn bản</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Trò chuyện</span>
              </TabsTrigger>
              <TabsTrigger value="tools" className="gap-2">
                <Wrench className="w-4 h-4" />
                <span className="hidden sm:inline">Công cụ</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="transcript" className="flex-1 mt-0">
              <TranscripPanel />
            </TabsContent>

            <TabsContent value="chat" className="flex-1 mt-0">
              <ChatPanel />
            </TabsContent>

            <TabsContent value="tools" className="flex-1 mt-0">
              <SmartToolsPanel />
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
            <HistoryModal open={showHistory} onOpenChange={setShowHistory} /> */}
      {/* <OnboardingModal open={showOnboarding} onOpenChange={setShowOnboarding} /> */}
    </div>
  )
}
