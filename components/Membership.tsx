import Link from "next/link";
import { finePrint, memberNotes, paidTiers, tiers, type TierId } from "@/lib/membership";

/** Credit-card-style visual for a paid tier. */
export function MemberCardVisual({ tier }: { tier: TierId }) {
  const t = tiers[tier];
  return (
    <div className={`member-card member-card--${tier}`} aria-hidden>
      <div className="member-card-top">
        <span className="member-card-brand">PRIMO</span>
        <span className="member-card-tag">{t.tag}</span>
      </div>
      <div className="member-card-bottom">
        <span className="member-card-name">{t.name}</span>
        <span className="member-card-level">{t.level}</span>
      </div>
    </div>
  );
}

/** Card visual + perks list, with either a join CTA or a "You're here" badge. */
export function TierPanel({ tier, current, cta = true }: { tier: TierId; current?: boolean; cta?: boolean }) {
  const t = tiers[tier];
  return (
    <div className={`tier-panel${tier === "boss" ? " tier-panel--boss" : ""}`}>
      <div className="tier-visual-wrap">
        <MemberCardVisual tier={tier} />
        {current && <span className="here-badge">You&apos;re here</span>}
      </div>
      <h3 className="sr-only">
        {t.name} — Level {t.level}
      </h3>
      <ul className="tier-perks">
        {t.perks.map((p) => (
          <li key={p}>
            <span className="plus" aria-hidden>
              +
            </span>
            {p}
          </li>
        ))}
      </ul>
      {cta && (
        <Link
          href="/account?view=signup"
          className={`pill tier-cta ${tier === "boss" ? "pill-pink" : "pill-outline"}`}
        >
          Join the club →
        </Link>
      )}
    </div>
  );
}

export function MemberNotes() {
  return (
    <>
      <div className="member-notes">
        {memberNotes.map((n) => (
          <div key={n.title} className="member-note">
            <span className={`note-bar note-bar--${n.color}`} />
            <div className="note-title">{n.title}</div>
            <p className="muted">{n.body}</p>
          </div>
        ))}
      </div>
      <p className="fine-print">{finePrint}</p>
    </>
  );
}

/** Homepage "Become a member" section. */
export function MembersSection() {
  return (
    <section id="members" className="container section" aria-labelledby="members-title">
      <div className="members-head">
        <div className="eyebrow">Primo rewards</div>
        <h2 id="members-title" className="h2">
          Become a <span className="pink">member</span>
        </h2>
        <p className="muted members-sub">Earn points on eligible purchases and level up from Regular to Boss Card.</p>
      </div>
      <div className="tier-grid">
        {paidTiers.map((t) => (
          <TierPanel key={t} tier={t} />
        ))}
      </div>
      <MemberNotes />
    </section>
  );
}
