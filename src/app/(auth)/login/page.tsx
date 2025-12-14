import { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthLayout } from "@/components/layout/AuthLayout";

export const metadata: Metadata = {
  title: "로그인 - 한국진로적성센터",
  description: "한국진로적성센터 통합 플랫폼에 로그인하세요",
};

export default function LoginPage() {
  return (
    <AuthLayout
      title="로그인"
      description="진로 적성 검사 서비스를 이용하시려면 로그인해주세요"
    >
      <LoginForm />
    </AuthLayout>
  );
}
