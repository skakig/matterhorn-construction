import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { projectTypes, site, startTimelines } from "@/lib/site";
import { cn } from "@/lib/utils";

const field =
  "h-12 w-full border border-border bg-elevated px-4 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faint focus:border-sage focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-sage)_28%,transparent)]";

export function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<
      string,
      string
    >;
    if (!data.name || !data.email || !data.phone || !data.message) {
      toast.error("Name, phone, email, and a short note are required.");
      return;
    }

    setSubmitting(true);
    const payload = { ...data, at: new Date().toISOString() };
    const prev = JSON.parse(
      localStorage.getItem("matterhorn-inquiries") || "[]",
    ) as unknown[];
    localStorage.setItem(
      "matterhorn-inquiries",
      JSON.stringify([payload, ...prev].slice(0, 20)),
    );

    const body = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      type: data.type || "",
      timeline: data.timeline || "",
      message: data.message,
      _subject: `Matterhorn brief — ${data.name}`,
      _template: "table",
      _captcha: "false",
    };

    let sent = false;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });
      sent = res.ok;
    } catch {
      sent = false;
    }

    setSubmitting(false);
    if (sent) {
      setDone(true);
      form.reset();
      toast.success("Received. We’ll be in touch from Pagosa.");
      return;
    }

    const lines = [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone || "—"}`,
      `Type: ${data.type || "—"}`,
      `Timeline: ${data.timeline || "—"}`,
      "",
      data.message,
    ];
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
      `Matterhorn brief — ${data.name}`,
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setDone(true);
    toast.message("Opening email so the brief still goes out.");
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
          Name
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
          Email
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
          Phone
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={field}
            placeholder="We’ll call this number"
          />
        </label>
        <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
          Project type
          <select name="type" className={cn(field, "appearance-none")} defaultValue="Custom home">
            {projectTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
        When do you want to start
        <select
          name="timeline"
          className={cn(field, "appearance-none")}
          defaultValue="This season"
        >
          {startTimelines.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-2 text-[0.7rem] font-medium tracking-[0.16em] text-muted uppercase">
        What are you building?
        <textarea
          name="message"
          required
          rows={5}
          className="w-full resize-y border border-border bg-elevated px-4 py-3 text-sm text-fg outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-faint focus:border-sage focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-sage)_28%,transparent)]"
          placeholder="What you’re building, and the view you want from the kitchen…"
        />
      </label>
      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-12 items-center justify-center bg-fg px-6 text-[0.75rem] font-medium tracking-[0.16em] text-bg uppercase transition-transform duration-150 enabled:active:scale-[0.96] disabled:opacity-60"
      >
        {submitting ? "Sending…" : done ? "Sent — start another" : "Send the brief"}
      </button>
      <p className="text-[0.7rem] leading-relaxed text-faint">
        Briefs go to {site.email}. First send asks that inbox to confirm — one
        click, then every brief lands.
      </p>
    </form>
  );
}
