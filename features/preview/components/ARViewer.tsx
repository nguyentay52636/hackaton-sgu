"use client"

import { useMemo } from "react"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Alert, AlertDescription } from "@/shared/ui/alert"
import { Slider } from "@/shared/ui/slider"
import { Eye, Maximize2, RotateCw, ZoomIn, ZoomOut } from "lucide-react"

interface ARViewerProps {
    title: string
    description: string
    imageSrc: string
    isFullscreen: boolean
    rotation: number[]
    zoom: number[]
    onToggleFullscreen: () => void
    onRotate: (value: number) => void
    onZoomIn: () => void
    onZoomOut: () => void
    onChangeRotation: (val: number[]) => void
    onChangeZoom: (val: number[]) => void
    alertText: string
}

export default function ARViewer({
    title,
    description,
    imageSrc,
    isFullscreen,
    rotation,
    zoom,
    onToggleFullscreen,
    onRotate,
    onZoomIn,
    onZoomOut,
    onChangeRotation,
    onChangeZoom,
    alertText,
}: ARViewerProps) {
    const containerAspect = useMemo(() => (isFullscreen ? "aspect-square" : "aspect-video"), [isFullscreen])

    return (
        <Card className="border-2 shadow-xl">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>{title}</CardTitle>
                    <Button variant="outline" size="icon" onClick={onToggleFullscreen}>
                        <Maximize2 className="h-4 w-4" />
                    </Button>
                </div>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className={`relative bg-gradient-to-br from-primary/5 to-secondary/5 rounded-lg border-2 overflow-hidden ${containerAspect}`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div
                            className="relative w-64 h-64 transition-transform duration-300"
                            style={{ transform: `rotate(${rotation[0]}deg) scale(${zoom[0] / 100})` }}
                        >
                            <img src={imageSrc || "/placeholder.svg"} alt={title} className="w-full h-full object-contain drop-shadow-2xl" />
                        </div>
                    </div>

                    <div className="absolute top-4 left-4 flex gap-2">
                        <Badge variant="secondary" className="backdrop-blur-sm bg-background/80">
                            <Eye className="h-3 w-3 mr-1" />
                            AR Mode
                        </Badge>
                    </div>

                    <div className="absolute bottom-4 right-4 flex gap-2">
                        <Button variant="secondary" size="icon" className="backdrop-blur-sm bg-background/80" onClick={() => onRotate(rotation[0] - 45)}>
                            <RotateCw className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="backdrop-blur-sm bg-background/80" onClick={onZoomOut}>
                            <ZoomOut className="h-4 w-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="backdrop-blur-sm bg-background/80" onClick={onZoomIn}>
                            <ZoomIn className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <RotateCw className="h-4 w-4" />
                                Xoay: {rotation[0]}°
                            </label>
                        </div>
                        <Slider value={rotation} onValueChange={onChangeRotation} max={360} step={1} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <ZoomIn className="h-4 w-4" />
                                Phóng to: {zoom[0]}%
                            </label>
                        </div>
                        <Slider value={zoom} onValueChange={onChangeZoom} min={50} max={200} step={10} />
                    </div>
                </div>

                <Alert className="mt-4">
                    <AlertDescription>{alertText}</AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}


