"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";
import { AuthLayout, type AuthView } from "@/components/account/AuthForms";
import Dashboard from "@/components/account/Dashboard";

export default function AccountView() {
  const { user, ready } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  if (!ready) return <div className="account-loading" />;
  if (user) return <Dashboard user={user} />;

  const view: AuthView = params.get("view") === "signup" ? "signup" : "login";
  return <AuthLayout view={view} onSwitch={(v) => router.replace(`${pathname}?view=${v}`, { scroll: false })} />;
}
