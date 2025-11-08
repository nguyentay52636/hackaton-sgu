import Link from "next/link"
import { Button } from "@/shared/ui/button"
import { ArrowLeft, Video } from "lucide-react"

export default function LiveStreamHeader() {
    return (
        <header className="border-b border-gray-200 z-10 bg-primary/10">
            <div className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Button asChild variant="ghost" size="icon" className="hover:bg-primary/10">
                            <Link href="/dashboard">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="p-2 bg-primary rounded-lg">
                                <Video className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <h1 className="text-lg font-bold">
                                Livestream
                            </h1>
                        </div>
                    </div>
                    <div className="">
                        <Button size="sm" className="bg-primary cursor-pointer  hover:bg-primary/90">
                            <Video className="h-4 w-4 mr-2" />
                            Bắt đầu phát
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}

