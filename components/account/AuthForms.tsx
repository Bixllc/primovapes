"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { isAtLeast21, useAuth } from "../AuthProvider";
import { tierOrder, tiers, type TierId } from "@/lib/membership";

export type AuthView = "login" | "signup";

export function AuthLayout({ view, onSwitch }: { view: AuthView; onSwitch: (v: AuthView) => void }) {
  return (
    <div className="auth-grid">
      <div className="auth-card">
        <div className="seg" role="tablist" aria-label="Account">
          <button type="button" role="tab" aria-selected={view === "login"} onClick={() => onSwitch("login")}>
            Sign in
          </button>
          <button type="button" role="tab" aria-selected={view === "signup"} onClick={() => onSwitch("signup")}>
            Create account
          </button>
        </div>
        {view === "login" ? <SignInForm /> : <SignUpForm />}
      </div>

      <div className="auth-hero">
        <Image src="/assets/hero-night.png" alt="" fill sizes="(max-width: 900px) 100vw, 680px" />
        <div className="auth-hero-shade" />
        <div className="auth-hero-copy">
          <h2 className="h2">
            Members get <span className="glow-pink">more.</span>
          </h2>
          <ol className="auth-perks">
            {["Faster checkout", "Order tracking", "Member deals"].map((p) => (
              <li key={p}>
                <span className="step-bar" />
                <span className="step-label">{p}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function SocialButtons() {
  const [note, setNote] = useState("");
  return (
    <>
      <div className="or-divider">
        <span>or</span>
      </div>
      <div className="social-row">
        {["Google", "Apple"].map((p) => (
          <button
            key={p}
            type="button"
            className="pill pill-outline social-btn"
            onClick={() => setNote(`${p} sign-in turns on when member accounts go live.`)}
          >
            Continue with {p}
          </button>
        ))}
      </div>
      {note && (
        <p className="form-note" role="status">
          {note}
        </p>
      )}
    </>
  );
}

function SignInForm() {
  const { signIn } = useAuth();
  const [note, setNote] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") || "");
    signIn(email);
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="eyebrow">Welcome back</div>
      <h1 className="auth-title">Sign in</h1>
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <label className="field">
        <span className="field-row">
          Password
          <button type="button" className="text-link" onClick={() => setNote("Password reset turns on when member accounts go live.")}>
            Forgot password?
          </button>
        </span>
        <input type="password" name="password" autoComplete="current-password" required />
      </label>
      {note && (
        <p className="form-note" role="status">
          {note}
        </p>
      )}
      <label className="check">
        <input type="checkbox" name="remember" defaultChecked /> Keep me signed in
      </label>
      <button type="submit" className="pill pill-pink form-submit">
        Sign in →
      </button>
      <SocialButtons />
    </form>
  );
}

function SignUpForm() {
  const { signUp } = useAuth();
  const [tier, setTier] = useState<TierId>("basic");
  const [error, setError] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const dob = String(f.get("dob") || "");
    if (!isAtLeast21(dob)) {
      setError("You must be 21 or older to create an account.");
      return;
    }
    setError("");
    signUp({
      firstName: String(f.get("firstName") || "").trim(),
      lastName: String(f.get("lastName") || "").trim(),
      email: String(f.get("email") || ""),
      phone: String(f.get("phone") || "").trim(),
      dob,
      tier,
      dealsOptIn: f.get("deals") === "on",
    });
  };

  return (
    <form className="auth-form" onSubmit={submit}>
      <div className="eyebrow">Join Primo</div>
      <h1 className="auth-title">Create account</h1>
      <div className="field-pair">
        <label className="field">
          <span>First name</span>
          <input name="firstName" autoComplete="given-name" required />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="lastName" autoComplete="family-name" required />
        </label>
      </div>
      <label className="field">
        <span>Email</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <div className="field-pair">
        <label className="field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
        <label className="field">
          <span>Date of birth</span>
          <input type="date" name="dob" autoComplete="bday" required />
        </label>
      </div>
      <label className="field">
        <span>Password</span>
        <input type="password" name="password" autoComplete="new-password" minLength={8} required />
      </label>

      <fieldset className="tier-picker">
        <legend>
          <span className="field-label">Membership</span>
          <span className="muted">Everyone starts on Basic. Upgrade now or later.</span>
        </legend>
        <div className="tier-options">
          {tierOrder.map((id) => {
            const t = tiers[id];
            return (
              <label key={id} className="tier-option" data-selected={tier === id}>
                <input
                  type="radio"
                  name="tier"
                  value={id}
                  checked={tier === id}
                  onChange={() => setTier(id)}
                  className="sr-only"
                />
                <span className="radio-dot" aria-hidden />
                <span className="tier-option-text">
                  <span className="tier-option-name">
                    {t.name} <span className="muted">{id === "basic" ? "Free" : `Level ${t.level}`}</span>
                  </span>
                  <span className="muted">{t.pickerNote}</span>
                </span>
              </label>
            );
          })}
        </div>
        <p className="tier-summary" aria-live="polite">
          Registering as <strong>{tiers[tier].name}</strong> · {tiers[tier].summaryNote}
        </p>
      </fieldset>

      <label className="check">
        <input type="checkbox" name="terms" required /> I&apos;m 21 or older and agree to the{" "}
        <Link href="#">Terms</Link>
      </label>
      <label className="check">
        <input type="checkbox" name="deals" /> Send me deals and new drops
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="pill pill-pink form-submit">
        {tier === "basic" ? "Create account →" : "Create account & upgrade →"}
      </button>
      <SocialButtons />
    </form>
  );
}
