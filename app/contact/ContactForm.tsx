"use client";

import { useState, type FormEvent } from "react";

const TOPICS = ["General", "Order help", "Delivery", "Product question", "Wholesale"];

export default function ContactForm() {
  const [topic, setTopic] = useState("General");
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setState("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.get("name"),
          phone: f.get("phone"),
          email: f.get("email"),
          topic,
          message: f.get("message"),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please call the shop.");
      }
      form.reset();
      setTopic("General");
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("idle");
    }
  };

  if (state === "sent") {
    return (
      <div className="contact-card sent-state" role="status">
        <div className="eyebrow">Message sent</div>
        <h2 className="h2">
          We got <span className="pink">you.</span>
        </h2>
        <p className="muted">Thanks for reaching out. We&apos;ll get back to you soon.</p>
        <button type="button" className="pill pill-outline" onClick={() => setState("idle")}>
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="contact-card" onSubmit={submit}>
      <div className="eyebrow">Send a message</div>
      <h2 className="h2 contact-h2">How can we help?</h2>
      <div className="field-pair">
        <label className="field">
          <span>Name*</span>
          <input name="name" autoComplete="name" required />
        </label>
        <label className="field">
          <span>Phone</span>
          <input type="tel" name="phone" autoComplete="tel" />
        </label>
      </div>
      <label className="field">
        <span>Email*</span>
        <input type="email" name="email" autoComplete="email" required />
      </label>
      <fieldset className="chips">
        <legend className="field-label">Topic</legend>
        {TOPICS.map((t) => (
          <label key={t} className="chip" data-selected={topic === t}>
            <input type="radio" name="topic" value={t} checked={topic === t} onChange={() => setTopic(t)} className="sr-only" />
            {t}
          </label>
        ))}
      </fieldset>
      <label className="field">
        <span>Message*</span>
        <textarea name="message" rows={5} required />
      </label>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="pill pill-pink form-submit" disabled={state === "sending"}>
        {state === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
