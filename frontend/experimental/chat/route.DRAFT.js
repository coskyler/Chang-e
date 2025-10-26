// DRAFT ONLY — to enable locally, copy this file to: src/app/api/chat/route.js
export const runtime = "edge";

function toGeminiContents(messages = [], ticker) {
  const sysText =
    "You are a friendly investing helper. Be brief, explain terms simply, and never give direct buy/sell advice." +
    (ticker ? ` The user is currently looking at ticker ${ticker}.` : "");
  const systemTurn = { role: "user", parts: [{ text: sysText }] };
  const turns = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content ?? "" }],
  }));
  return [systemTurn, ...turns];
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function POST(req) {
  try {
    const { messages = [], ticker } = await req.json();
    const key   = process.env.GEMINI_API_KEY;
    const base  = process.env.GEMINI_BASE || "https://generativelanguage.googleapis.com/v1beta";
    const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";
    if (!key) return new Response("Missing GEMINI_API_KEY", { status: 500 });

    const url = `${base}/models/${model}:streamGenerateContent?key=${encodeURIComponent(key)}`;
    const body = { contents: toGeminiContents(messages, ticker), generationConfig: { temperature: 0.4 } };

    let resp;
    for (let attempt = 0; attempt < 2; attempt++) {
      resp = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (resp.ok) break;
      if (resp.status === 429) await sleep(600); else break;
    }
    if (!resp.ok) return new Response(await resp.text(), { status: resp.status });

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = resp.body.getReader();
        let buffer = "";
        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += new TextDecoder().decode(value, { stream: true });
            for (const line of buffer.split("\n")) {
              if (!line.trim()) continue;
              try {
                const obj = JSON.parse(line);
                const parts = obj?.candidates?.[0]?.content?.parts || [];
                for (const p of parts) if (typeof p.text === "string") controller.enqueue(encoder.encode(p.text));
              } catch {}
            }
            const i = buffer.lastIndexOf("\n");
            if (i >= 0) buffer = buffer.slice(i + 1);
          }
        } catch (e) {
          controller.enqueue(encoder.encode(`\n[stream error] ${e}\n`));
        } finally { controller.close(); }
      },
    });

    return new Response(stream, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (e) {
    return new Response(String(e), { status: 500 });
  }
}
