import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0C0F16", card: "#14181F", border: "#1E2535",
  lime: "#84CC16", teal: "#2DD4BF", purple: "#A78BFA", amber: "#FBBF24",
  red: "#F87171", green: "#34D399", blue: "#60A5FA", pink: "#F472B6",
  text: "#E2E8F0", muted: "#64748B", subtle: "#94A3B8",
};

const samples = [
  { id: "media", label: "Media ops update",
    rough: "so this week we had a bunch of stuff happen. the CPC offer for etrade CD paced way over budget on tuesday, like 140% of daily cap. we had to pause DSP platform Y line items. also publisher omega's invoice is still missing and finance is getting upset about it. the DV360 Q2 flight needs creative updates but we're blocked on approval. oh and the client changed their GPM target from 52% to 58% which affects basically everything. tableau data was delayed 2 days which made reporting harder. on the positive side, google checking-5 conversions are up 18% MoM and we launched 3 new placements on network alpha that look promising early. also need to update the monthly analysis template by friday." },
  { id: "perf", label: "Performance review",
    rough: "quick update on april numbers. overall revenue came in at 5.8M against 4.83M cost so GPM landed at 16.7% which is below our 20% target. total conversions were 14,198 with click-through at 10,547 and view-through at 2,211. ecpa was $408. we had 557K first party clicks vs 535K third party clicks which is about 4% variance, within acceptable range. 558 accounts funded with $1.28M in funding. 34 publishers active. biggest winners were google checking-5 and earnin marketplace. biggest underperformers were finance wire M (traffic dropped 60%) and DV360 MSN placements (high cost, low conversion)." },
];

const steps = [
  { label: "Trigger", icon: "\u26A1" },
  { label: "Branch", icon: "\uD83D\uDD00" },
  { label: "Think", icon: "\uD83E\uDDE0" },
  { label: "Refine", icon: "\u2728" },
  { label: "Output", icon: "\uD83D\uDCDD" },
];

const sysExec = "You are an AI content rephrasing agent. Rewrite the rough draft as a polished executive summary. Use formal, strategic, outcome-focused tone. Use bold markdown headers like **Critical Items:** and **Recommendations:**. Include specific numbers from the original. Write flowing paragraphs (no bullets). Under 250 words. No preamble, no code blocks.";
const sysAM = "You are an AI content rephrasing agent. Rewrite the rough draft as a conversational account manager update. Start with 'Hi team'. Use direct, collaborative tone. Use bold markdown headers like **Needs your attention:** and **Action items:**. Include numbers and 'I will' ownership statements. End with 'Let me know if you need anything reprioritized.' Flowing paragraphs (no bullets). Under 250 words. No preamble, no code blocks.";

async function callAI(draft, aud) {
  try {
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000,
        system: aud === "executive" ? sysExec : sysAM,
        messages: [{ role: "user", content: "Rewrite this rough draft:\n\n" + draft }] }),
    });
    const d = await r.json();
    return (d.content || []).filter(b => b.type === "text").map(b => b.text).join("").replace(/```[\s\S]*?```/g, "").trim() || null;
  } catch { return null; }
}

function Typing({ text, speed = 8, onDone }) {
  const [d, setD] = useState("");
  const i = useRef(0);
  useEffect(() => {
    setD(""); i.current = 0;
    const t = setInterval(() => {
      if (i.current < text.length) { i.current += 4; setD(text.slice(0, i.current)); }
      else { setD(text); clearInterval(t); onDone?.(); }
    }, speed);
    return () => clearInterval(t);
  }, [text]);
  return (
    <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
      {d.split(/(\*\*[^*]+\*\*)/).map((p, j) =>
        p.startsWith("**") && p.endsWith("**")
          ? <strong key={j} style={{ color: C.text }}>{p.slice(2, -2)}</strong>
          : <span key={j}>{p}</span>
      )}
      {i.current < text.length && <span style={{ borderRight: `2px solid ${C.lime}`, animation: "blink 1s step-end infinite" }}> </span>}
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("input");
  const [aud, setAud] = useState(null);
  const [draft, setDraft] = useState("");
  const [step, setStep] = useState(-1);
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const [cache, setCache] = useState({});
  const [err, setErr] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 50); return () => clearInterval(t); }, []);

  const load = (s) => { setDraft(s.rough); setPhase("input"); setAud(null); setStep(-1); setOutput(""); setDone(false); setErr(null); };

  const run = async () => {
    if (!aud || !draft.trim() || draft.length < 30) return;
    setPhase("running"); setStep(0); setDone(false); setOutput(""); setErr(null);
    const key = draft.slice(0, 80) + "|" + aud;
    if (cache[key]) { setOutput(cache[key]); return; }
    const result = await callAI(draft, aud);
    if (result) { setOutput(result); setCache(p => ({ ...p, [key]: result })); }
    else { setErr("AI unavailable — showing structured fallback"); setOutput(fallback(draft, aud)); }
  };

  const switchAud = async () => {
    const na = aud === "executive" ? "account_manager" : "executive";
    setAud(na); setPhase("running"); setStep(0); setDone(false); setOutput("");
    const key = draft.slice(0, 80) + "|" + na;
    if (cache[key]) { setOutput(cache[key]); return; }
    const result = await callAI(draft, na);
    if (result) { setOutput(result); setCache(p => ({ ...p, [key]: result })); }
    else { setOutput(fallback(draft, na)); }
  };

  function fallback(txt, a) {
    const s = txt.split(/[.!?]+/).filter(s => s.trim().length > 10).map(s => s.trim());
    const urg = s.filter(x => /urgent|critical|issue|drop|pause|block|miss|risk|exceed|over|budget|delay/i.test(x));
    const pos = s.filter(x => /up|increase|growth|win|launch|promising|positive|good|strong/i.test(x));
    const rest = s.filter(x => !urg.includes(x) && !pos.includes(x));
    if (a === "executive") return `**Executive Summary**\n\n**Critical Items:**\n${urg.join(". ") || "No critical items identified."}\n\n**Progress & Wins:**\n${pos.join(". ") || "Steady progress across initiatives."}\n\n**Additional Updates:**\n${rest.slice(0, 3).join(". ") || "No additional items."}\n\n**Recommendation:**\nPrioritize critical items above and reassess resource allocation.`;
    return `Hi team \u2014 quick recap:\n\n**Needs your attention:** ${urg.join(". ") || "Nothing urgent."}\n\n**Good news:** ${pos.join(". ") || "Steady state."}\n\n**Other updates:** ${rest.slice(0, 3).join(". ") || "Nothing else to flag."}\n\n**Action items:** I'll follow up on the above. Let me know if you need anything reprioritized.`;
  }

  useEffect(() => {
    if (phase !== "running" || step < 0) return;
    if (step >= steps.length) { if (output) setPhase("output"); return; }
    const d = [700, 1000, 2000, 1600, 900];
    const t = setTimeout(() => setStep(s => s + 1), d[step]);
    return () => clearTimeout(t);
  }, [phase, step]);

  useEffect(() => { if (step >= steps.length && output) setPhase("output"); }, [output, step]);

  const reset = () => { setPhase("input"); setAud(null); setStep(-1); setDraft(""); setOutput(""); setDone(false); setErr(null); };
  const wc = (s) => s.split(/\s+/).filter(Boolean).length;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter',-apple-system,sans-serif", color: C.text }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes blink{0%,100%{opacity:1}50%{opacity:0}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "16px 20px 60px" }}>

        {/* BANNER */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, background: "linear-gradient(140deg,#0C0F16,#1a0f28 45%,#0d1822)", marginBottom: 16, padding: "22px 24px 18px" }}>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <circle key={i} cx={(tick * 0.35 + i * 56) % 640 - 40} cy={15 + Math.sin(tick * 0.01 + i * 1.1) * 35} r={1.5}
                fill={[C.purple, C.lime, C.amber, C.teal, C.pink][i % 5]} opacity={0.1 + Math.sin(tick * 0.02 + i) * 0.05} />
            ))}
          </svg>
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16 }}>{"\u270D\uFE0F"}</span>
                <span style={{ fontSize: 10, color: C.purple, letterSpacing: 2.5, fontWeight: 600 }}>AI CONTENT REPHRASING</span>
              </div>
              <h1 style={{ fontSize: 19, fontWeight: 600, color: C.text, margin: "0 0 3px", fontFamily: "Georgia,serif" }}>Audience-aware update writer</h1>
              <p style={{ fontSize: 11, color: C.muted, margin: 0, maxWidth: 400 }}>Load a sample or type anything — choose audience — get AI-rewritten output live</p>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <div style={{ textAlign: "center", padding: "6px 12px", background: C.purple + "14", borderRadius: 8, border: `1px solid ${C.purple}20` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.purple }}>{"\uD83D\uDC54"} Exec</div>
              </div>
              <div style={{ fontSize: 14, color: C.muted, alignSelf: "center" }}>{"\u21C4"}</div>
              <div style={{ textAlign: "center", padding: "6px 12px", background: C.teal + "14", borderRadius: 8, border: `1px solid ${C.teal}20` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: C.teal }}>{"\uD83E\uDD1D"} AM</div>
              </div>
            </div>
          </div>
        </div>

        {/* STEP 1 */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18, marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 500 }}><span style={{ color: C.lime, marginRight: 6 }}>1</span>Load a sample or type your draft</div>
            {phase !== "input" && <button onClick={reset} style={{ fontSize: 10, color: C.muted, background: "rgba(255,255,255,.05)", border: `1px solid ${C.border}`, padding: "4px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit" }}>{"\u21BA"} Reset</button>}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            {samples.map(s => (
              <button key={s.id} onClick={() => load(s)} style={{
                padding: "6px 14px", fontSize: 11, fontFamily: "inherit", borderRadius: 8, cursor: phase === "input" ? "pointer" : "default",
                background: draft === s.rough ? C.purple + "20" : "rgba(255,255,255,.03)",
                color: draft === s.rough ? C.purple : C.muted,
                border: `1px solid ${draft === s.rough ? C.purple + "40" : C.border}`,
              }}>{"\uD83D\uDCC4"} {s.label}</button>
            ))}
            <button onClick={() => { setDraft(""); setPhase("input"); setAud(null); setStep(-1); setOutput(""); setDone(false); }} style={{
              padding: "6px 14px", fontSize: 11, fontFamily: "inherit", borderRadius: 8, cursor: "pointer",
              background: draft && !samples.find(s => s.rough === draft) ? C.lime + "20" : "rgba(255,255,255,.03)",
              color: draft && !samples.find(s => s.rough === draft) ? C.lime : C.muted,
              border: `1px solid ${draft && !samples.find(s => s.rough === draft) ? C.lime + "40" : C.border}`,
            }}>{"\u270F\uFE0F"} Type your own</button>
          </div>
          <textarea value={draft} onChange={e => setDraft(e.target.value)} disabled={phase !== "input"}
            placeholder="Type or paste any rough draft here — meeting notes, status updates, project recaps, anything. The AI will restructure it for your chosen audience..."
            style={{ width: "100%", height: 140, background: "rgba(255,255,255,.02)", border: `1px solid ${C.border}`, borderRadius: 8, padding: 12, fontSize: 12, color: C.text, fontFamily: "inherit", resize: "vertical", lineHeight: 1.6, outline: "none", boxSizing: "border-box" }} />
          {draft && <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: C.muted }}>
            <span>{wc(draft)} words</span>
            <span style={{ color: draft.length > 50 ? C.green : C.amber }}>{draft.length > 50 ? "\u2713 Ready" : "Keep typing..."}</span>
          </div>}
        </div>

        {/* STEP 2 */}
        <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18, marginBottom: 14 }}>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}><span style={{ color: C.lime, marginRight: 6 }}>2</span>Choose audience</div>
          <div style={{ display: "flex", gap: 10 }}>
            {[{ id: "executive", label: "Executive", desc: "Strategic, formal, outcome-focused with bold recommendations", icon: "\uD83D\uDC54", color: C.purple },
              { id: "account_manager", label: "Account Manager", desc: "Conversational, actionable, collaborative with clear next steps", icon: "\uD83E\uDD1D", color: C.teal }
            ].map(a => (
              <div key={a.id} onClick={() => phase === "input" && setAud(a.id)} style={{
                flex: 1, padding: 14, borderRadius: 10, cursor: phase === "input" ? "pointer" : "default",
                background: aud === a.id ? a.color + "10" : "rgba(255,255,255,.02)",
                border: `1.5px solid ${aud === a.id ? a.color + "60" : C.border}`,
                transition: "all .2s", opacity: phase !== "input" && aud !== a.id ? 0.3 : 1,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 18 }}>{a.icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: aud === a.id ? a.color : C.text }}>{a.label}</span>
                  {aud === a.id && <span style={{ marginLeft: "auto", color: a.color }}>{"\u2713"}</span>}
                </div>
                <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>
          {phase === "input" && (
            <button onClick={run} disabled={!aud || !draft.trim() || draft.length < 30} style={{
              marginTop: 12, width: "100%", padding: "11px", fontSize: 12, fontWeight: 600, fontFamily: "inherit",
              cursor: aud && draft.length >= 30 ? "pointer" : "not-allowed",
              background: aud && draft.length >= 30 ? `linear-gradient(135deg,${C.purple},#7C3AED)` : "rgba(255,255,255,.05)",
              color: aud && draft.length >= 30 ? "#fff" : C.muted, border: "none", borderRadius: 10,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              boxShadow: aud && draft.length >= 30 ? `0 4px 16px ${C.purple}25` : "none",
            }}>{"\uD83E\uDDE0"} Run content agent</button>
          )}
        </div>

        {/* WORKFLOW */}
        {phase === "running" && (
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18, marginBottom: 14, animation: "fadeIn .3s ease" }}>
            <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              {"\u2699\uFE0F"} Workflow
              {step >= steps.length && output
                ? <span style={{ fontSize: 10, color: C.green, background: C.green + "15", padding: "2px 8px", borderRadius: 8, fontWeight: 600, marginLeft: "auto" }}>{"\u2713"} Done</span>
                : <span style={{ fontSize: 10, color: C.amber, marginLeft: "auto" }}>Processing...</span>}
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
              {steps.map((ws, i) => {
                const d2 = step > i || step >= steps.length;
                const act = step === i;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, flexShrink: 0,
                      background: d2 ? C.green + "15" : act ? C.purple + "15" : "rgba(255,255,255,.03)",
                      border: `1px solid ${d2 ? C.green + "40" : act ? C.purple + "40" : C.border}`, transition: "all .3s" }}>
                      {d2 ? <span style={{ color: C.green, fontSize: 11 }}>{"\u2713"}</span> : act ? <div style={{ width: 12, height: 12, borderRadius: "50%", border: `2px solid ${C.purple}`, borderTopColor: "transparent", animation: "spin .8s linear infinite" }} /> : <span style={{ opacity: 0.3 }}>{ws.icon}</span>}
                    </div>
                    {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: d2 ? C.green + "40" : C.border }} />}
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              {steps.map((ws, i) => <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 8, color: step > i ? C.green : step === i ? C.purple : C.muted + "60" }}>{ws.label}</div>)}
            </div>
            {step === 1 && <div style={{ marginTop: 10, padding: "6px 12px", background: (aud === "executive" ? C.purple : C.teal) + "10", borderRadius: 6, fontSize: 11, color: aud === "executive" ? C.purple : C.teal, textAlign: "center" }}>
              Branch {"\u2192"} <strong>{aud === "executive" ? "Executive" : "Account Manager"}</strong> path
            </div>}
            {step >= 2 && !output && <div style={{ marginTop: 10, padding: "6px 12px", background: "rgba(255,255,255,.02)", borderRadius: 6, fontSize: 11, color: C.amber, textAlign: "center" }}>{"\uD83E\uDDE0"} AI is rewriting your {wc(draft)}-word draft...</div>}
          </div>
        )}

        {/* OUTPUT */}
        {phase === "output" && output && (
          <div style={{ animation: "fadeIn .5s ease" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              {[{ label: "INPUT", val: wc(draft), sub: "words \u00B7 rough", color: C.red },
                null,
                { label: "OUTPUT", val: wc(output), sub: "words \u00B7 structured", color: C.green },
                { label: "AUDIENCE", val: aud === "executive" ? "Exec" : "AM", sub: aud === "executive" ? "Strategic" : "Actionable", color: aud === "executive" ? C.purple : C.teal },
              ].map((m, i) => m ? (
                <div key={i} style={{ background: "rgba(255,255,255,.02)", borderRadius: 8, padding: "10px 14px", borderLeft: `3px solid ${m.color}`, flex: 1 }}>
                  <div style={{ fontSize: 9, color: C.muted, letterSpacing: 0.5, marginBottom: 2 }}>{m.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600, fontFamily: "Georgia,serif", color: typeof m.val === "string" ? m.color : C.text }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: m.color }}>{m.sub}</div>
                </div>
              ) : <div key={i} style={{ display: "flex", alignItems: "center", fontSize: 16, color: C.lime }}>{"\u2192"}</div>)}
            </div>
            {err && <div style={{ padding: "8px 12px", background: C.amber + "10", borderRadius: 8, border: `1px solid ${C.amber}20`, fontSize: 11, color: C.amber, marginBottom: 10 }}>{"\u26A0\uFE0F"} {err}</div>}
            <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${(aud === "executive" ? C.purple : C.teal)}25`, padding: 18 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${aud === "executive" ? C.purple : C.teal},${aud === "executive" ? "#7C3AED" : "#0D9488"})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{aud === "executive" ? "\uD83D\uDC54" : "\uD83E\uDD1D"}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>Final output — {aud === "executive" ? "Executive" : "Account Manager"}</div>
                  <div style={{ fontSize: 10, color: C.muted }}>AI-refined {"\u00B7"} audience-tailored</div>
                </div>
                <div style={{ marginLeft: "auto", fontSize: 10, color: C.green, background: C.green + "12", padding: "3px 10px", borderRadius: 8, fontWeight: 600 }}>{"\u2713"} Live AI</div>
              </div>
              <div style={{ fontSize: 12, color: C.subtle, padding: "14px 16px", background: "rgba(255,255,255,.02)", borderRadius: 8, border: `1px solid ${C.border}` }}>
                <Typing text={output} speed={8} onDone={() => setDone(true)} />
              </div>
              {done && (
                <div style={{ marginTop: 12, display: "flex", gap: 8, animation: "fadeIn .3s ease", flexWrap: "wrap" }}>
                  <button onClick={switchAud} style={{ padding: "8px 16px", fontSize: 11, fontFamily: "inherit", borderRadius: 8, cursor: "pointer", background: (aud === "executive" ? C.teal : C.purple) + "15", color: aud === "executive" ? C.teal : C.purple, border: `1px solid ${aud === "executive" ? C.teal : C.purple}30`, fontWeight: 500 }}>
                    {"\uD83D\uDD04"} Switch to {aud === "executive" ? "Account Manager" : "Executive"}
                  </button>
                  <button onClick={reset} style={{ padding: "8px 16px", fontSize: 11, fontFamily: "inherit", borderRadius: 8, cursor: "pointer", background: "rgba(255,255,255,.04)", color: C.muted, border: `1px solid ${C.border}` }}>
                    {"\u21BA"} New draft
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === "input" && !draft && (
          <div style={{ textAlign: "center", padding: "30px 20px", color: C.muted }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>{"\u270D\uFE0F"}</div>
            <div style={{ fontSize: 13, marginBottom: 4 }}>Load a sample or <strong style={{ color: C.lime }}>type any rough draft</strong></div>
            <div style={{ fontSize: 11 }}>The AI will rewrite it live for your chosen audience</div>
          </div>
        )}
      </div>
    </div>
  );
}