/** Submit to the static form endpoint intercepted by Netlify Forms. */
export async function submitInquiry(data, send = fetch) {
  const body = new URLSearchParams({ ...data, "form-name": "project-inquiry" });
  const response = await send("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(20000),
  });
  if (!response.ok) throw new Error("Form submission failed");
}
