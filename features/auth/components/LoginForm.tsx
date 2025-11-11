"use client";

import * as React from "react";
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/shared/ui/toast";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/shared/ui/field";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { loginThunk, selectAuth, clearError, setCredentials } from "@/redux/Slice/authSlice";
import { loginFace } from "@/apis/faceApi";
import { UserRole } from "@/apis/authApi";

export function LoginForm() {
  type ToastVariant = "default" | "destructive" | "success";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isFaceLoading, setIsFaceLoading] = React.useState(false);
  const [isWebcamOpen, setIsWebcamOpen] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const streamRef = React.useRef<MediaStream | null>(null);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, isAuthenticated, user } = useSelector(selectAuth);

  const [toastData, setToastData] = React.useState<{
    title: string;
    description: string;
    variant?: ToastVariant;
  } | null>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user, isLoading]);

  // Helper show toast
  const showToast = (
    title: string,
    description: string,
    variant: ToastVariant = "default"
  ) => {
    setToastData({ title, description, variant });
    setIsOpen(true);
  };

  // Clear error when email/password changes
  React.useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  // Handle successful login
  React.useEffect(() => {
    if (isAuthenticated && !isLoading) {
      showToast("Thành công", "Đăng nhập thành công!", "success");
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isLoading]);

  // Handle login errors
  React.useEffect(() => {
    if (error && !isLoading) {
      showToast("Thất bại", error, "destructive");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsWebcamOpen(true);
    } catch (e) {
      showToast("Lỗi", "Không thể truy cập camera", "destructive");
    }
  };

  const stopWebcam = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setIsWebcamOpen(false);
  };

  const captureBase64 = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    try {
      await dispatch(loginThunk({ email, password })).unwrap();
    } catch (err: any) {
      // Error is handled by useEffect above
      console.log("Login error:", err);
    }
  };

  const persistCredentials = (payload: any) => {
    // Expected shape similar to normal login: { success, data: { accessToken, _id, name, email, avatar } }
    if (!payload || !payload.success || !payload.data) return false;
    const responseData = payload.data;
    const token = responseData.accessToken;
    const userData = {
      _id: responseData._id,
      name: responseData.name,
      email: responseData.email,
      avatar: responseData.avatar,
      role: "student" as UserRole,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (token && userData) {
      try {
        if (typeof window !== "undefined") {
          localStorage.setItem("currentUser", JSON.stringify({ ...userData, id: userData._id }));
          localStorage.setItem("token", token);
          localStorage.setItem("isAuthenticated", "true");
        }
      } catch (e) {
        console.error("Persist credentials error:", e);
      }
      return { token, user: userData };
    }
    return false;
  };

  const handleFaceLogin = async () => {
    const imageBase64 = captureBase64();
    if (!imageBase64) {
      showToast("Lỗi", "Không thể chụp ảnh", "destructive");
      return;
    }
    setIsFaceLoading(true);
    try {
      const res = await loginFace(imageBase64);
      const persisted = persistCredentials(res);
      if (persisted) {
        dispatch(setCredentials({ user: persisted.user, token: persisted.token }));
        showToast("Thành công", "Đăng nhập bằng khuôn mặt thành công!", "success");
        router.push("/");
      } else {
        showToast("Thất bại", res?.message || "Không thể xác thực khuôn mặt", "destructive");
      }
    } catch (err: any) {
      console.error("Face login error:", err);
      showToast("Thất bại", err?.message || "Đăng nhập khuôn mặt thất bại", "destructive");
    } finally {
      setIsFaceLoading(false);
      stopWebcam();
    }
  };

  return (
    <ToastProvider>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-md mx-auto mt-10"
      >
        <FieldGroup className="p-6 border rounded-lg shadow-sm">
          <div className="flex flex-col items-center gap-3 text-center mb-6">
            <h1 className="text-2xl font-bold">Đăng nhập tài khoản</h1>
            <p className="text-muted-foreground text-base">
              Nhập email và mật khẩu để tiếp tục
            </p>
          </div>

          <Field className="mb-4">
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@vidu.com"
              required
            />
          </Field>

          <Field className="mb-6">
            <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </Field>

          <Button
            type="submit"
            className="w-full h-12 text-lg font-semibold cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="mt-4">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 text-lg font-semibold cursor-pointer"
              onClick={startWebcam}
              disabled={isFaceLoading}
            >
              {isFaceLoading ? "Đang xác thực khuôn mặt..." : "Đăng nhập bằng khuôn mặt"}
            </Button>
          </div>
          {isWebcamOpen && (
            <div className="mt-4 border rounded-lg p-3 flex flex-col items-center gap-3">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="rounded bg-black w-[320px] h-[240px]"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={stopWebcam}>
                  Hủy
                </Button>
                <Button type="button" onClick={handleFaceLogin} disabled={isFaceLoading}>
                  {isFaceLoading ? "Đang xác thực..." : "Chụp và đăng nhập"}
                </Button>
              </div>
            </div>
          )}
        </FieldGroup>
      </form>

      {toastData && (
        <Toast
          open={isOpen}
          onOpenChange={setIsOpen}
          variant={toastData.variant}
        >
          <ToastTitle>{toastData.title}</ToastTitle>
          <ToastDescription>{toastData.description}</ToastDescription>
        </Toast>
      )}

      <ToastViewport />
    </ToastProvider>
  );
}
