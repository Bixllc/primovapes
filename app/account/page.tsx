import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import AccountView from "./AccountView";

export const metadata: Metadata = { title: "Account — Primo Vapes & Exotics" };

export default function AccountPage() {
  return (
    <main>
      <Header />
      <section className="container section account-section">
        <Suspense fallback={<div className="account-loading" />}>
          <AccountView />
        </Suspense>
      </section>
    </main>
  );
}
