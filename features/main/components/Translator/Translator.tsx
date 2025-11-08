"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Languages, Clock, BookOpen } from "lucide-react"
import {
    useTranslation,
    useVoiceRecognition,
    useTextToSpeech,
    useSavedWords,
    useHistory,
    useClipboard,
} from "./hooks"
import {
    LanguageSelector,
    SourceTextPanel,
    TranslationPanel,
    AlternativesSection,
    ExamplesSection,
    TranslateButton,
    TranslatorHeader,
    HistoryTab,
    SavedWordsTab,
} from "./components"
import { TabType, TranslationHistory } from "./types"

export function Translator() {
    const [sourceText, setSourceText] = useState("")
    const [sourceLang, setSourceLang] = useState("vi")
    const [targetLang, setTargetLang] = useState("en")
    const [activeTab, setActiveTab] = useState<TabType>("translate")

    const { history, addToHistory, clearHistory } = useHistory()
    const { savedWords, saveWord, toggleFavorite, deleteWord, exportSavedWords } = useSavedWords()
    const { copied, copyToClipboard } = useClipboard()
    const { speakText } = useTextToSpeech()

    const { isRecording, startRecording } = useVoiceRecognition(sourceLang, (transcript) => {
        setSourceText(transcript)
    })

    const {
        translatedText,
        examples,
        alternatives,
        isTranslating,
        handleTranslate,
        setTranslatedText,
    } = useTranslation(sourceText, sourceLang, targetLang, (translation) => {
        addToHistory({
            original: sourceText,
            translation,
            fromLang: sourceLang,
            toLang: targetLang,
        })
    })

    const swapLanguages = () => {
        const temp = sourceLang
        setSourceLang(targetLang)
        setTargetLang(temp)
        setSourceText(translatedText)
        setTranslatedText(sourceText)
    }

    const handleSaveWord = () => {
        if (!sourceText || !translatedText) return
        saveWord({
            original: sourceText,
            translation: translatedText,
            fromLang: sourceLang,
            toLang: targetLang,
            examples,
        })
    }

    const handleSelectHistoryItem = (item: TranslationHistory) => {
        setSourceText(item.original)
        setTranslatedText(item.translation)
        setSourceLang(item.fromLang)
        setTargetLang(item.toLang)
        setActiveTab("translate")
    }

    return (
        <div className="min-h-screen">
            <TranslatorHeader savedWordsCount={savedWords.length} historyCount={history.length} />

            <div className="container mx-auto px-4 py-6">
                <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v)} className="space-y-6">
                    <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 h-12">
                        <TabsTrigger value="translate" className="gap-2">
                            <Languages className="w-4 h-4" />
                            Dịch
                        </TabsTrigger>
                        <TabsTrigger value="history" className="gap-2">
                            <Clock className="w-4 h-4" />
                            Lịch sử
                        </TabsTrigger>
                        <TabsTrigger value="saved" className="gap-2">
                            <BookOpen className="w-4 h-4" />
                            Từ vựng
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="translate" className="space-y-6">
                        <LanguageSelector
                            sourceLang={sourceLang}
                            targetLang={targetLang}
                            onSourceLangChange={setSourceLang}
                            onTargetLangChange={setTargetLang}
                            onSwap={swapLanguages}
                        />

                        <div className="grid lg:grid-cols-2 gap-6">
                            <SourceTextPanel
                                sourceText={sourceText}
                                sourceLang={sourceLang}
                                isRecording={isRecording}
                                onTextChange={setSourceText}
                                onStartRecording={startRecording}
                                onSpeak={() => speakText(sourceText, sourceLang)}
                            />

                            <TranslationPanel
                                translatedText={translatedText}
                                isTranslating={isTranslating}
                                copied={copied}
                                onSpeak={() => speakText(translatedText, targetLang)}
                                onCopy={() => copyToClipboard(translatedText)}
                                onSave={handleSaveWord}
                            />
                        </div>

                        <TranslateButton
                            isTranslating={isTranslating}
                            disabled={isTranslating || !sourceText.trim()}
                            onClick={() => handleTranslate(false)}
                        />

                        <AlternativesSection
                            alternatives={alternatives}
                            onSelect={setTranslatedText}
                        />

                        <ExamplesSection examples={examples} />
                    </TabsContent>

                    <TabsContent value="history" className="space-y-4">
                        <HistoryTab
                            history={history}
                            onClear={clearHistory}
                            onSelectHistoryItem={handleSelectHistoryItem}
                        />
                    </TabsContent>

                    <TabsContent value="saved" className="space-y-4">
                        <SavedWordsTab
                            savedWords={savedWords}
                            onExport={exportSavedWords}
                            onToggleFavorite={toggleFavorite}
                            onDelete={deleteWord}
                            onSpeak={speakText}
                            onCopy={copyToClipboard}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
