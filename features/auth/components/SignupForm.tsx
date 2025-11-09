"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import {
  ToastProvider,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastViewport,
} from "@/shared/ui/toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { registerThunk, selectAuth, clearError, resetRegistrationSuccess } from "@/redux/Slice/authSlice";
import { useRouter } from "next/navigation";
import { UserRole } from "@/apis/authApi";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  type ToastVariant = "default" | "destructive" | "success";
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [role, setRole] = React.useState<UserRole>("student");
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error, registrationSuccess, isAuthenticated, user } = useSelector(selectAuth);

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

  // Clear error when form fields change
  React.useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, password, confirmPassword, role]);

  // Handle successful registration
  React.useEffect(() => {
    if (registrationSuccess && !isLoading) {
      showToast("Thành công", "Đăng ký thành công!", "success");
      dispatch(resetRegistrationSuccess());

      // If auto-login happened, redirect to home
      if (isAuthenticated) {
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        // Otherwise, redirect to login page
        setTimeout(() => {
          router.push("/");
        }, 1500);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationSuccess, isLoading, isAuthenticated]);

  // Handle registration errors
  React.useEffect(() => {
    if (error && !isLoading) {
      showToast("Thất bại", error, "destructive");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    // Validate passwords match
    if (password !== confirmPassword) {
      showToast("Lỗi", "Mật khẩu xác nhận không khớp", "destructive");
      return;
    }

    // Validate password length
    if (password.length < 6) {
      showToast("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự", "destructive");
      return;
    }

    try {
      await dispatch(registerThunk({ name, email, password, role })).unwrap();
    } catch (err: any) {
      // Error is handled by useEffect above
      console.log("Register error:", err);
    }
  };

  return (
    <ToastProvider>
      <form className={cn("flex flex-col gap-3 w-full", className)} onSubmit={handleSubmit} {...props}>
        <FieldGroup className="px-6 py-4">
          <div className="flex flex-col items-center gap-3 text-center mb-8">
            <h1 className="text-3xl font-bold">Tạo tài khoản mới</h1>
            <p className="text-muted-foreground text-base text-balance">
              Điền thông tin dưới đây để tạo tài khoản của bạn
            </p>
          </div>

          <Field className="mb-4">
            <FieldLabel htmlFor="name" className="text-lg mb-2">Họ và tên</FieldLabel>
            <Input
              id="name"
              type="text"
              placeholder="Nguyễn Văn A"
              className="h-12 text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Field>

          <Field className="mb-4">
            <FieldLabel htmlFor="email" className="text-lg mb-2">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="email@vi-du.com"
              className="h-12 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>



          <Field className="mb-4">
            <FieldLabel htmlFor="password" className="text-lg mb-2">Mật khẩu</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="h-12 text-base"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <FieldDescription className="text-sm mt-1">
              Mật khẩu phải có ít nhất 6 ký tự
            </FieldDescription>
          </Field>

          <Field className="">
            <FieldLabel htmlFor="confirm-password" className="text-lg mb-2">Xác nhận mật khẩu</FieldLabel>
            <Input
              id="confirm-password"
              type="password"
              placeholder="••••••••"
              className="h-12 text-base"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </Field>
          <Field className="">
            <FieldLabel htmlFor="role" className="text-lg mb-2">Vai trò</FieldLabel>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger className="h-12 text-base w-full">
                <SelectValue placeholder="Chọn vai trò của bạn" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Vai trò</SelectLabel>
                  <SelectItem value="student">Học sinh</SelectItem>
                  <SelectItem value="teacher">Giáo viên</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field className="mb-6">
            <Button
              type="submit"
              className="w-full h-12 text-lg font-semibold cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
            </Button>
          </Field>

          <FieldSeparator className="text-base">Hoặc tiếp tục với</FieldSeparator>

          <Field>
            <Button variant="outline" type="button" className="w-full h-12 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 mr-2">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
              Đăng ký với GitHub
            </Button>
            <FieldDescription className="text-center text-base mt-4">
              Đã có tài khoản?{" "}
              <Link href="/auth/login" className="underline underline-offset-4 hover:text-primary transition-colors">
                Đăng nhập
              </Link>
            </FieldDescription>
          </Field>
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
  )
}
