"use client";

import { useEffect, useRef, useState } from "react";
import { registerFace, loginFace } from "@/apis/faceApi";

export default function FaceWebcam() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<"register" | "login">("register");

    useEffect(() => {
        async function initCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) videoRef.current.srcObject = stream;
            } catch (err) {
                console.error("Không thể mở camera:", err);
                setMessage("❌ Không thể truy cập camera!");
            }
        }
        initCamera();
        return () => {
            const tracks = (videoRef.current?.srcObject as MediaStream)?.getTracks();
            tracks?.forEach((t) => t.stop());
        };
    }, []);

    const captureImage = () => {
        if (!videoRef.current || !canvasRef.current) return null;
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg");
    };

    const handleAction = async () => {
        const imageBase64 = captureImage();
        if (!imageBase64) {
            setMessage("Không thể chụp ảnh!");
            return;
        }

        try {
            setIsLoading(true);
            let res;
            if (mode === "register") {
                if (!email) {
                    setMessage("Vui lòng nhập email để đăng ký khuôn mặt!");
                    setIsLoading(false);
                    return;
                }
                res = await registerFace(email, imageBase64);
            } else {
                res = await loginFace(imageBase64);
            }

            if (res.accessToken) {
                localStorage.setItem("token", res.accessToken);
            }

            setMessage(res.message || "Thành công!");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Lỗi xử lý khuôn mặt!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-xl shadow-md">
            <h2 className="text-lg font-semibold text-center">
                {mode === "register" ? "Đăng ký khuôn mặt" : "Đăng nhập bằng khuôn mặt"} 👤
            </h2>

            {mode === "register" && (
                <input
                    type="email"
                    placeholder="Nhập email tài khoản..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 rounded-md w-full"
                />
            )}

            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded-lg border shadow-sm w-[320px] h-[240px] bg-black"
            />
            <canvas ref={canvasRef} className="hidden" />

            <button
                onClick={handleAction}
                disabled={isLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
                {isLoading
                    ? "Đang xử lý..."
                    : mode === "register"
                        ? "Đăng ký khuôn mặt"
                        : "Đăng nhập ngay"}
            </button>

            <button
                onClick={() => setMode(mode === "register" ? "login" : "register")}
                className="text-sm text-blue-500 underline"
            >
                {mode === "register"
                    ? "Chuyển sang đăng nhập"
                    : "Chuyển sang đăng ký khuôn mặt"}
            </button>

            <p className="text-center text-gray-700">{message}</p>
        </div>
    );
}
