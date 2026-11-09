import { NextResponse } from "next/server";

const TOPICS = ["General", "Order help", "Delivery", "Product question", "Wholesale"] as const;

type ContactBody = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const phone = str(body.phone, 40);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);
  const topic = (TOPICS as readonly string[]).includes(str(body.topic, 40)) ? str(body.topic, 40) : "General";

  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Name, a valid email and a message are required." }, { status: 400 });
  }

  // TODO(backend): deliver this to the shop — e.g. send with Resend/Postmark
  // or store it in the database. Until then it's only logged on the server.
  console.log("[contact]", { name, phone, email, topic, message });

  return NextResponse.json({ ok: true });
}
