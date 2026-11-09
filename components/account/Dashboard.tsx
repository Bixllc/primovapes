"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { useAuth, type User } from "../AuthProvider";
import { useCart } from "../CartProvider";
import ProductCard from "../ProductCard";
import { MemberNotes, TierPanel } from "../Membership";
import { money, productById, products } from "@/lib/data";
import { paidTiers, POINTS_PER_REWARD, tiers } from "@/lib/membership";

// SAMPLE order history until the orders backend exists.
type Order = {
  id: string;
  date: string;
  method: "Pickup" | "Delivery";
  status: "Ready for pickup" | "Delivered" | "Picked up";
  items: { id: string; qty: number }[];
};
const sampleOrders: Order[] = [
  { id: "PV-10482", date: "Nov 8, 2026", method: "Pickup", status: "Ready for pickup", items: [{ id: "black-mild-cream", qty: 1 }, { id: "backwoods-singles", qty: 2 }, { id: "grabba-leaf", qty: 1 }] },
  { id: "PV-10377", date: "Oct 30, 2026", method: "Delivery", status: "Delivered", items: [{ id: "fume-extra-mint-ice", qty: 2 }] },
  { id: "PV-10291", date: "Oct 18, 2026", method: "Pickup", status: "Picked up", items: [{ id: "dutch-masters-palma", qty: 1 }] },
];
const orderTotal = (o: Order) => o.items.reduce((a, i) => a + (productById.get(i.id)?.price ?? 0) * i.qty, 0);
const itemCount = (o: Order) => o.items.reduce((a, i) => a + i.qty, 0);

const TABS = ["Rewards", "Orders", "Saved", "Addresses", "Profile"] as const;
type Tab = (typeof TABS)[number];

export default function Dashboard({ user }: { user: User }) {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>("Rewards");
  const ready = sampleOrders.find((o) => o.status === "Ready for pickup");
  const isBasic = user.tier === "basic";
  const progress = user.points % POINTS_PER_REWARD;

  return (
    <div className="dash">
      <div className="dash-head">
        <div>
          <div className="eyebrow">My account</div>
          <h1 className="auth-title dash-title">
            Hey, <span className="pink">{user.firstName || "there"}</span>
          </h1>
        </div>
        <button type="button" className="pill pill-outline dash-signout" onClick={signOut}>
          Sign out
        </button>
      </div>

      <div className="status-grid">
        <button type="button" className="status-card rewards-card" onClick={() => setTab("Rewards")}>
          <span className="status-top">
            <span className="status-label">Primo rewards</span>
            <span className={`tier-badge tier-badge--${user.tier}`}>{tiers[user.tier].name}</span>
          </span>
          <span className="status-value">{user.points} points</span>
          <span className="progress" aria-hidden>
            <span style={{ width: `${isBasic ? 0 : progress}%` }} />
          </span>
          <span className="muted status-note">
            {isBasic ? "Upgrade to start earning" : `${POINTS_PER_REWARD - progress} pts to your next 5% reward`}
          </span>
        </button>
        {ready && (
          <div className="status-card">
            <span className="status-label">Ready for pickup</span>
            <span className="status-value">#{ready.id}</span>
            <span className="pulse-row">
              <span className="pulse-dot" aria-hidden /> Bagged at the counter
            </span>
          </div>
        )}
        <div className="status-card">
          <span className="status-label">ID verification</span>
          <span className="status-value">Verified 21+</span>
          <span className="muted status-note">Bring your ID at pickup.</span>
        </div>
      </div>

      <div className="dash-body">
        <nav className="dash-tabs" aria-label="Account sections">
          {TABS.map((t) => (
            <button key={t} type="button" aria-current={tab === t ? "page" : undefined} onClick={() => setTab(t)}>
              {t}
            </button>
          ))}
        </nav>
        <div className="dash-panel">
          {tab === "Rewards" && <RewardsTab user={user} />}
          {tab === "Orders" && <OrdersTab />}
          {tab === "Saved" && <SavedTab />}
          {tab === "Addresses" && <AddressesTab user={user} />}
          {tab === "Profile" && <ProfileTab user={user} />}
        </div>
      </div>
    </div>
  );
}

function PanelHead({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="panel-head">
      <h2 className="panel-title">{title}</h2>
      {right && <span className="muted">{right}</span>}
    </div>
  );
}

function RewardsTab({ user }: { user: User }) {
  const { updateUser } = useAuth();
  const isBasic = user.tier === "basic";
  const available = Math.floor(user.points / POINTS_PER_REWARD) - user.rewardsRedeemed;

  return (
    <div className="panel-stack">
      <PanelHead title="Primo rewards" right={`${user.points} pts · ${tiers[user.tier].name}`} />
      {isBasic && (
        <div className="basic-banner">
          <div>
            <strong>You&apos;re on Basic.</strong>{" "}
            <span className="muted">Upgrade anytime to start earning points and unlock member perks.</span>
          </div>
          <button type="button" className="pill pill-pink" onClick={() => updateUser({ tier: "regular" })}>
            Upgrade to Regular
          </button>
        </div>
      )}
      {!isBasic && (available > 0 || user.rewardApplied) && (
        <div className="reward-bar">
          <span>
            Available reward: <strong>5% off your next order</strong>
          </span>
          {user.rewardApplied ? (
            <span className="pink applied">Applied at checkout ✓</span>
          ) : (
            <button
              type="button"
              className="pill pill-pink"
              onClick={() => updateUser({ rewardApplied: true, rewardsRedeemed: user.rewardsRedeemed + 1 })}
            >
              Redeem 5%
            </button>
          )}
        </div>
      )}
      <div className="tier-stack">
        {paidTiers.map((t) => (
          <TierPanel key={t} tier={t} current={user.tier === t} cta={false} />
        ))}
      </div>
      <MemberNotes />
    </div>
  );
}

function OrdersTab() {
  const { add, open } = useCart();
  const reorder = (o: Order) => {
    o.items.forEach((i) => add(i.id, i.qty));
    open();
  };
  return (
    <div className="panel-stack">
      <PanelHead title="Orders" />
      <ul className="order-list">
        {sampleOrders.map((o) => {
          const first = productById.get(o.items[0].id);
          return (
            <li key={o.id} className="order-row">
              <div className="order-thumb">{first && <Image src={first.image} alt="" fill sizes="64px" />}</div>
              <div className="order-info">
                <div className="order-id">
                  #{o.id} · {itemCount(o)} item{itemCount(o) === 1 ? "" : "s"}
                </div>
                <div className="muted">
                  {o.date} · {o.method} · {money(orderTotal(o))}
                </div>
              </div>
              <span className={`status-pill${o.status === "Ready for pickup" ? " status-pill--hot" : ""}`}>
                {o.status}
              </span>
              <button type="button" className="pill pill-outline order-btn" onClick={() => reorder(o)}>
                Reorder
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function SavedTab() {
  const { liked } = useCart();
  const saved = products.filter((p) => liked[p.id]);
  return (
    <div className="panel-stack">
      <PanelHead title="Saved" right={`${saved.length} item${saved.length === 1 ? "" : "s"}`} />
      {saved.length ? (
        <div className="product-grid">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">Tap ♡ on any product to save it here.</div>
      )}
    </div>
  );
}

function AddressesTab({ user }: { user: User }) {
  return (
    <div className="panel-stack">
      <PanelHead title="Addresses" />
      <div className="address-grid">
        <div className="address-card">
          <span className="tier-badge tier-badge--boss">Default</span>
          <strong>
            {user.firstName} {user.lastName}
          </strong>
          {/* SAMPLE address until saved addresses exist in the backend. */}
          <span className="muted">
            1200 E Las Olas Blvd
            <br />
            Fort Lauderdale, FL 33301
          </span>
          {user.phone && <span className="muted">{user.phone}</span>}
        </div>
        <button type="button" className="address-add">
          + Add address
        </button>
      </div>
    </div>
  );
}

function ProfileTab({ user }: { user: User }) {
  const { updateUser } = useAuth();
  const [saved, setSaved] = useState(false);
  const [note, setNote] = useState("");

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    updateUser({
      firstName: String(f.get("firstName") || "").trim(),
      lastName: String(f.get("lastName") || "").trim(),
      phone: String(f.get("phone") || "").trim(),
      dob: String(f.get("dob") || ""),
      dealsOptIn: f.get("deals") === "on",
    });
    setSaved(true);
  };

  return (
    <form className="panel-stack" onSubmit={submit} onChange={() => setSaved(false)}>
      <PanelHead title="Profile" />
      <div className="field-pair">
        <label className="field">
          <span>First name</span>
          <input name="firstName" defaultValue={user.firstName} required />
        </label>
        <label className="field">
          <span>Last name</span>
          <input name="lastName" defaultValue={user.lastName} />
        </label>
      </div>
      <div className="field-pair">
        <label className="field">
          <span>Email</span>
          <input type="email" value={user.email} readOnly />
        </label>
        <label className="field">
          <span>Phone</span>
          <input type="tel" name="phone" defaultValue={user.phone} />
        </label>
      </div>
      <label className="field" style={{ maxWidth: 320 }}>
        <span>Date of birth</span>
        <input type="date" name="dob" defaultValue={user.dob} />
      </label>
      <label className="toggle">
        <input type="checkbox" name="deals" defaultChecked={user.dealsOptIn} />
        <span className="toggle-track" aria-hidden />
        Email me deals and new drops
      </label>
      <div className="visit-actions">
        <button type="submit" className="pill pill-pink">
          {saved ? "Saved ✓" : "Save changes"}
        </button>
        <button
          type="button"
          className="pill pill-outline"
          onClick={() => setNote("Password changes turn on when member accounts go live.")}
        >
          Change password
        </button>
      </div>
      {note && (
        <p className="form-note" role="status">
          {note}
        </p>
      )}
    </form>
  );
}
