"use client"

import { useState, useRef, useCallback } from "react"

export interface AudioRecorderState {
    isRecording: boolean
    isPaused: boolean
    recordingTime: number
    audioBlob: Blob | null
    error: string | null
}

export function useAudioRecorder() {
    const [state, setState] = useState<AudioRecorderState>({
        isRecording: false,
        isPaused: false,
        recordingTime: 0,
        audioBlob: null,
        error: null,
    })

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)
    const streamRef = useRef<MediaStream | null>(null)

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 16000,
                },
            })

            streamRef.current = stream

            const mediaRecorder = new MediaRecorder(stream, {
                mimeType: "audio/webm;codecs=opus",
            })

            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: "audio/webm" })
                setState((prev) => ({ ...prev, audioBlob: blob, isRecording: false }))

                // Stop all tracks
                if (streamRef.current) {
                    streamRef.current.getTracks().forEach((track) => track.stop())
                    streamRef.current = null
                }
            }

            mediaRecorder.start(100) // Collect data every 100ms

            // Start timer
            timerRef.current = setInterval(() => {
                setState((prev) => ({ ...prev, recordingTime: prev.recordingTime + 1 }))
            }, 1000)

            setState((prev) => ({
                ...prev,
                isRecording: true,
                isPaused: false,
                recordingTime: 0,
                error: null,
            }))
        } catch (error) {
            console.error("Error starting recording:", error)
            setState((prev) => ({
                ...prev,
                error: "Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.",
            }))
        }
    }, [])

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isRecording) {
            mediaRecorderRef.current.stop()

            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }, [state.isRecording])

    const pauseRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isRecording && !state.isPaused) {
            mediaRecorderRef.current.pause()
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
            setState((prev) => ({ ...prev, isPaused: true }))
        }
    }, [state.isRecording, state.isPaused])

    const resumeRecording = useCallback(() => {
        if (mediaRecorderRef.current && state.isRecording && state.isPaused) {
            mediaRecorderRef.current.resume()
            timerRef.current = setInterval(() => {
                setState((prev) => ({ ...prev, recordingTime: prev.recordingTime + 1 }))
            }, 1000)
            setState((prev) => ({ ...prev, isPaused: false }))
        }
    }, [state.isRecording, state.isPaused])

    const clearRecording = useCallback(() => {
        setState({
            isRecording: false,
            isPaused: false,
            recordingTime: 0,
            audioBlob: null,
            error: null,
        })
        chunksRef.current = []
    }, [])

    return {
        ...state,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        clearRecording,
    }
}
