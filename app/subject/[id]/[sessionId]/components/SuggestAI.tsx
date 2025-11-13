"use client"
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { Sparkles, BookMarked, PenTool } from 'lucide-react'

interface SuggestAIProps {
    sessionId: string
}

export default function SuggestAI({ sessionId }: SuggestAIProps) {

    return (
        <>
            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-gradient-to-br from-purple-50/50 to-blue-50/50 dark:from-purple-950/20 dark:to-blue-950/20">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                                <Sparkles className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Gợi ý từ AI</CardTitle>
                                <CardDescription>Bài học liên quan và bài tập thực hành</CardDescription>
                            </div>
                        </div>
                        <Button className="gap-2 bg-gradient-to-r from-purple-500 to-blue-500" disabled>
                            <Sparkles className="h-4 w-4" />
                            Xem gợi ý
                        </Button>
                    </div>
                </CardHeader>

                <CardContent>
                    <Tabs defaultValue="related" className="w-full">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="related" className="gap-2">
                                <BookMarked className="h-4 w-4" />
                                Bài học liên quan
                            </TabsTrigger>
                            <TabsTrigger value="practice" className="gap-2">
                                <PenTool className="h-4 w-4" />
                                Bài tập thực hành
                            </TabsTrigger>
                        </TabsList>

                        {/* Related Lessons Tab */}
                        <TabsContent value="related" className="space-y-4 mt-4">
                            <p className="text-center text-muted-foreground py-8">Chưa có bài học liên quan</p>
                        </TabsContent>

                        {/* Practice Exercises Tab */}
                        <TabsContent value="practice" className="space-y-4 mt-4">
                            <p className="text-center text-muted-foreground py-8">Chưa có bài tập thực hành</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </>
    )
}
