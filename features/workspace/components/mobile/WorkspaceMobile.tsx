import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shared/ui/tabs'
import { FileText, MessageSquare, Wrench } from 'lucide-react'
import React from 'react'
import { TranscripPanel } from '../TranscripPanel'
import { ChatPanel } from '../ChatPanel/ChatPanel'
import { SmartToolsPanel } from '@/shared/components/Tools/SmartToolsPanel'
export default function WorkspaceMobile() {
  return (
    <>
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
    </>
  )
}
