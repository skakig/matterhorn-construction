import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { submitInquiry } from "@/lib/contact-delivery.mjs";
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

    if (submitting) return;
    setSubmitting(true);
    setDone(false);
    try {
      await submitInquiry(data);
      setDone(true);
      form.reset();
      toast.success("Thank you. Your brief has been submitted to Matterhorn.");
    } catch {
      toast.error("Your brief could not be sent. Please try again, or call 970-903-0122. Your message is still here.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form name="project-inquiry" method="POST" action="/__forms.html" onSubmit={onSubmit} className="grid gap-4">
      <input type="hidden" name="form-name" value="project-inquiry" />
      <label hidden>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
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
        Your brief goes to Jody Ellis. You can also <a className="underline" href={`mailto:${site.email}`}>email Jody</a> or <a className="underline" href={site.phoneHref}>call {site.phoneLabel}</a>.
      </p>
    </form>
  );
}
