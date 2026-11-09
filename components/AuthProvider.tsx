"use client";

// FRONT-END-ONLY auth stand-in. Accounts live in this browser's localStorage so
// every page and flow can be built and reviewed before a real backend exists.
// Passwords are never stored. Replace the bodies of signIn/signUp/signOut/
// updateUser with real API calls when the backend is chosen.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { TierId } from "@/lib/membership";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string; // YYYY-MM-DD
  tier: TierId;
  points: number;
  rewardsRedeemed: number; // count of 5% rewards already used
  rewardApplied: boolean; // a 5% reward is queued for the next checkout
  dealsOptIn: boolean;
};

export type SignUpInput = Pick<User, "firstName" | "lastName" | "email" | "phone" | "dob" | "tier" | "dealsOptIn">;

type AuthContextValue = {
  user: User | null;
  ready: boolean;
  signIn: (email: string) => void;
  signUp: (input: SignUpInput) => void;
  signOut: () => void;
  updateUser: (patch: Partial<User>) => void;
};

const USERS_KEY = "primo-users";
const SESSION_KEY = "primo-session";

const AuthContext = createContext<AuthContextValue | null>(null);

function readUsers(): Record<string, User> {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "{}");
  } catch {
    return {};
  }
}
function writeUsers(users: Record<string, User>) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {}
}
function setSession(email: string | null) {
  try {
    if (email) localStorage.setItem(SESSION_KEY, email);
    else localStorage.removeItem(SESSION_KEY);
  } catch {}
}

export function isAtLeast21(dob: string, now = new Date()) {
  const d = new Date(`${dob}T00:00:00`);
  if (Number.isNaN(d.getTime())) return false;
  const cutoff = new Date(now.getFullYear() - 21, now.getMonth(), now.getDate());
  return d <= cutoff;
}

/** Demo account used when someone signs in with an email that has no account yet. */
function demoUser(email: string): User {
  const handle = email.split("@")[0].replace(/[^a-z]/gi, "") || "friend";
  return {
    firstName: handle.charAt(0).toUpperCase() + handle.slice(1).toLowerCase(),
    lastName: "",
    email,
    phone: "",
    dob: "",
    tier: "regular",
    points: 140,
    rewardsRedeemed: 0,
    rewardApplied: false,
    dealsOptIn: true,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const email = localStorage.getItem(SESSION_KEY);
      if (email) setUser(readUsers()[email] ?? null);
    } catch {}
    setReady(true);
  }, []);

  const save = useCallback((u: User) => {
    const users = readUsers();
    users[u.email] = u;
    writeUsers(users);
    setSession(u.email);
    setUser(u);
  }, []);

  const signIn = useCallback(
    (raw: string) => {
      const email = raw.trim().toLowerCase();
      save(readUsers()[email] ?? demoUser(email));
    },
    [save],
  );

  const signUp = useCallback(
    (input: SignUpInput) => {
      save({ ...input, email: input.email.trim().toLowerCase(), points: 0, rewardsRedeemed: 0, rewardApplied: false });
    },
    [save],
  );

  const signOut = useCallback(() => {
    setSession(null);
    setUser(null);
  }, []);

  const updateUser = useCallback(
    (patch: Partial<User>) => {
      setUser((u) => {
        if (!u) return u;
        const next = { ...u, ...patch, email: u.email };
        const users = readUsers();
        users[next.email] = next;
        writeUsers(users);
        return next;
      });
    },
    [],
  );

  const value = useMemo(
    () => ({ user, ready, signIn, signUp, signOut, updateUser }),
    [user, ready, signIn, signUp, signOut, updateUser],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
