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
import API from "@/shared/lib/axios";

export function LoginForm() {
  type ToastVariant = "default" | "destructive" | "success";
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [toastData, setToastData] = React.useState<{
    title: string;
    description: string;
    variant?: ToastVariant;
  } | null>(null);

  const [isOpen, setIsOpen] = React.useState(false);

  // Helper show toast
  const showToast = (
    title: string,
    description: string,
    variant: ToastVariant = "default"
  ) => {
    setToastData({ title, description, variant });
    setIsOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", { email, password });

      if (!res.data.success) {
        throw new Error(res.data.message || "Đăng nhập thất bại");
      }

      // ✅ Thành công
      showToast("Thành công", "Đăng nhập thành công!", "success");

      // Lưu token
      localStorage.setItem("token", res.data.data.accessToken);
      console.log("Login success:", res.data);
    } catch (err: any) {
      console.log("Login error:", err);
      // ❌ Hiển thị toast lỗi
      showToast(
        "Thất bại",
        err.message || "Không thể đăng nhập",
        "destructive"
      );
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
          >
            Đăng nhập
          </Button>
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
