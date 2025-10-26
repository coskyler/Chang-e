"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function AnalysisPanel() {
  const { symbol } = useParams();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [text, setText] = useState("");
  const [sources, setSources] = useState([]);

  useEffect(() => {
    let aborted = false;

    async function run() {
      setLoading(true);
      setErr("");
      try {
        const url = `${process.env.NEXT_PUBLIC_API_DOMAIN}/stock/risk?company=${encodeURIComponent(
          String(symbol || "")
        )}`;
        const res = await fetch(url, { credentials: "include" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!aborted) {
          setText(data.text || "");
          setSources(Array.isArray(data.sources) ? data.sources.slice(0, 5) : []);
        }
      } catch (e) {
        if (!aborted) setErr("Failed to load analysis.");
      } finally {
        if (!aborted) setLoading(false);
      }
    }

    if (symbol) run();
    return () => {
      aborted = true;
    };
  }, [symbol]);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <h2 className="text-xl font-semibold text-blue-400 mb-2">Analysis</h2>

      {loading && (
        <p className="text-neutral-400 text-sm">Loading AI analysis…</p>
      )}

      {!loading && err && <p className="text-red-400 text-sm">{err}</p>}

      {!loading && !err && (
        <>
          <p className="text-neutral-200 text-sm whitespace-pre-wrap">
            {text || "No analysis available."}
          </p>

          {/* Citations */}
          {sources.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {sources.map((s, i) => (
                <a
                  key={`${s.url || i}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-neutral-800 hover:bg-neutral-700 text-blue-300 border border-neutral-700 rounded px-2 py-1 truncate max-w-[14rem]"
                  title={s.title}
                >
                  {s.title}
                </a>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
