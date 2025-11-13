// "use client"
// import React, { useState } from 'react'
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card'
// import { Button } from '@/shared/ui/button'
// import { MessageSquare } from 'lucide-react'
// import { ScrollArea } from '@/shared/ui/scroll-area'
// import { Textarea } from '@/shared/ui/textarea'
// import { Mic } from 'lucide-react'
// export default function SuggestAI() {
//     const [chatInput, setChatInput] = useState("")
//     const [isSendingChat, setIsSendingChat] = useState(false)
//     const [isRecording, setIsRecording] = useState(false)
//     const handleVoiceInput = () => {
//         setIsRecording(!isRecording)
//     }
//     const handleSendChat = () => {
//         setIsSendingChat(true)
//     }

//     return (
//         <>
//             <div className="space-y-6">
//                 {/* AI Chat */}
//                 <Card className="sticky top-6">
//                     <CardHeader>
//                         <CardTitle className="flex items-center gap-2">
//                             <MessageSquare className="h-5 w-5" />
//                             Trợ lý AI
//                         </CardTitle>
//                         <CardDescription>Hỏi bất kỳ câu hỏi nào về bài học</CardDescription>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                         {/* Chat Mode */}
//                         <div className="flex gap-2">
//                             <Button
//                                 variant={chatMode === "simple" ? "default" : "outline"}
//                                 size="sm"
//                                 onClick={() => setChatMode("simple")}
//                                 className="flex-1"
//                             >
//                                 Đơn giản
//                             </Button>
//                             <Button
//                                 variant={chatMode === "full" ? "default" : "outline"}
//                                 size="sm"
//                                 onClick={() => setChatMode("full")}
//                                 className="flex-1"
//                             >
//                                 Chi tiết
//                             </Button>
//                         </div>

//                         {/* Chat Messages */}
//                         <ScrollArea className="h-[300px] border rounded-lg p-4">
//                             {chatMessages.length === 0 ? (
//                                 <div className="text-center text-muted-foreground py-8">
//                                     <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
//                                     <p className="text-sm">Bắt đầu hỏi AI về bài học</p>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-4">
//                                     {chatMessages.map((msg) => (
//                                         <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
//                                             <div
//                                                 className={`max-w-[85%] rounded-lg p-3 ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-muted"
//                                                     }`}
//                                             >
//                                                 <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
//                                                 <p className="text-xs opacity-70 mt-1">
//                                                     {msg.timestamp.toLocaleTimeString("vi-VN", {
//                                                         hour: "2-digit",
//                                                         minute: "2-digit",
//                                                     })}
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                     {isSendingChat && (
//                                         <div className="flex justify-start">
//                                             <div className="bg-muted rounded-lg p-3">
//                                                 <div className="flex gap-1">
//                                                     <div
//                                                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                                                         style={{ animationDelay: "0ms" }}
//                                                     />
//                                                     <div
//                                                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                                                         style={{ animationDelay: "150ms" }}
//                                                     />
//                                                     <div
//                                                         className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
//                                                         style={{ animationDelay: "300ms" }}
//                                                     />
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </ScrollArea>

//                         {/* Chat Input */}
//                         <div className="space-y-2">
//                             <Textarea
//                                 placeholder="Nhập câu hỏi của bạn..."
//                                 value={chatInput}
//                                 onChange={(e) => setChatInput(e.target.value)}
//                                 onKeyDown={(e) => {
//                                     if (e.key === "Enter" && !e.shiftKey) {
//                                         e.preventDefault()
//                                         handleSendChat()
//                                     }
//                                 }}
//                                 rows={3}
//                             />
//                             <div className="flex gap-2">
//                                 <Button variant="outline" size="sm" onClick={handleVoiceInput} className="gap-2 bg-transparent">
//                                     <Mic className={`h-4 w-4 ${isRecording ? "text-red-500 animate-pulse" : ""}`} />
//                                     {isRecording ? "Đang ghi..." : "Ghi âm"}
//                                 </Button>
//                                 <Button
//                                     onClick={handleSendChat}
//                                     disabled={!chatInput.trim() || isSendingChat}
//                                     className="flex-1 gap-2"
//                                 >
//                                     Gửi
//                                     <ChevronRight className="h-4 w-4" />
//                                 </Button>
//                             </div>
//                         </div>
//                     </CardContent>
//                 </Card>

//                 {/* Quick AI Tools */}
//                 <Card>
//                     <CardHeader>
//                         <CardTitle className="text-sm">Công cụ AI nhanh</CardTitle>
//                     </CardHeader>
//                     <CardContent className="space-y-2">
//                         <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
//                             <Lightbulb className="h-4 w-4" />
//                             Tóm tắt bài học
//                         </Button>
//                         <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
//                             <Languages className="h-4 w-4" />
//                             Giải thích từ khó
//                         </Button>
//                         <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
//                             <FileQuestion className="h-4 w-4" />
//                             Tạo câu hỏi ôn tập
//                         </Button>
//                     </CardContent>
//                 </Card>
//             </div>
//         </>
//     )
// }   