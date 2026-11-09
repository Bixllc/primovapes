// Primo rewards membership program — shared by the homepage, signup and
// account dashboard.

export type TierId = "basic" | "regular" | "insider" | "boss";

export type Tier = {
  id: TierId;
  name: string;
  level: number; // 0 = Basic (free default)
  tag: string; // small label on the card visual / picker
  pickerNote: string; // one-liner in the signup picker
  summaryNote: string; // "Registering as X · <note>"
  perks: string[];
};

export const tiers: Record<TierId, Tier> = {
  basic: {
    id: "basic",
    name: "Basic",
    level: 0,
    tag: "Free",
    pickerNote: "Shopping & order history",
    summaryNote: "Free · upgrade anytime",
    perks: ["Shopping & order history"],
  },
  regular: {
    id: "regular",
    name: "Regular",
    level: 1,
    tag: "Level 1",
    pickerNote: "Earn points · 5% off every 100",
    summaryNote: "Level 1 · start earning points",
    perks: [
      "Earn in-store points with phone/email at checkout",
      "5% off after every 100 points",
      "Birthday freebie & member-only drops",
    ],
  },
  insider: {
    id: "insider",
    name: "Insider",
    level: 2,
    tag: "The ones we like",
    pickerNote: "Exclusive products & early drops",
    summaryNote: "Level 2 · upgrade selected",
    perks: [
      "Everything in Regular",
      "Access to special & exclusive products",
      "Early drops on exotic snacks & vapes",
      "Double-point flash sale days",
    ],
  },
  boss: {
    id: "boss",
    name: "Boss Card",
    level: 3,
    tag: "VIP",
    pickerNote: "Referral code & VIP treatment",
    summaryNote: "Level 3 · upgrade selected",
    perks: [
      "Everything in Insider",
      "Personal referral code (earn points per referral)",
      "Referred clients get 5% off their first order",
      "Referrals match YOUR tier level",
      "Priority delivery & VIP treatment",
    ],
  },
};

export const tierOrder: TierId[] = ["basic", "regular", "insider", "boss"];
export const paidTiers: TierId[] = ["regular", "insider", "boss"];

export const POINTS_PER_REWARD = 100;

export const memberNotes = [
  {
    title: "Boss Card referrals",
    color: "pink" as const,
    body: "Level 3 members share a personal code. New referrals get 5% off their first order, then automatically match the referrer's tier.",
  },
  {
    title: "How you level up",
    color: "teal" as const,
    body: "Everyone starts at Level 1. The owner reviews accounts monthly based on buying behavior and bumps up loyal ones.",
  },
];

export const finePrint = "Points and rewards are subject to program rules. Eligible purchases only.";
