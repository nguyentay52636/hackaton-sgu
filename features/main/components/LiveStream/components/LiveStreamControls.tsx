import { Button } from "@/shared/ui/button"
import { Volume2, VolumeX, Settings, Maximize } from "lucide-react"

interface LiveStreamControlsProps {
    isMuted: boolean
    onMuteToggle: () => void
}

export default function LiveStreamControls({ isMuted, onMuteToggle }: LiveStreamControlsProps) {
    return (
        <div className="absolute bottom-20 left-4 right-4 flex items-center gap-2">
            <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border border-white/10"
                onClick={onMuteToggle}
            >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border border-white/10"
            >
                <Settings className="h-5 w-5" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                className="bg-black/50 backdrop-blur-md hover:bg-black/70 text-white border border-white/10 ml-auto"
            >
                <Maximize className="h-5 w-5" />
            </Button>
        </div>
    )
}

