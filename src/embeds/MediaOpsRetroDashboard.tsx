import { useState, useEffect, useRef } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const C = {
  bg: "#0C0F16", card: "#14181F", border: "#1E2535",
  lime: "#84CC16", teal: "#2DD4BF", purple: "#A78BFA", amber: "#FBBF24",
  red: "#F87171", green: "#34D399", blue: "#60A5FA", pink: "#F472B6",
  orange: "#FB923C", text: "#E2E8F0", muted: "#64748B", subtle: "#94A3B8",
};

const months = ["May'25","Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan'26","Feb","Mar","Apr'26"];
const targetIdx = 11;

const publishers = [
  { name: "CNNMoney", data: [310,295,340,325,280,315,337,290,305,260,320,352], gpm: [48,42,55,50,38,47,52,44,49,35,51,100], ecpa: [380,410,360,375,420,390,355,400,385,430,365,340], funding: [1.2,1.0,1.5,1.3,0.9,1.1,1.6,1.0,1.2,0.8,1.4,1.8], bankCPM: [45,52,38,42,58,48,36,50,44,62,40,32], color: C.teal },
  { name: "GoBankingRates", data: [180,195,210,175,220,205,190,230,215,200,225,245], gpm: [55,52,58,48,60,54,50,62,56,51,59,64], ecpa: [340,355,330,370,320,345,360,310,335,350,315,305], funding: [0.8,0.9,1.1,0.7,1.2,1.0,0.85,1.3,1.05,0.9,1.15,1.35], bankCPM: [38,42,35,46,32,40,44,30,37,43,33,28], color: C.purple },
  { name: "Facebook Media", data: [120,95,145,110,85,130,105,140,125,70,115,135], gpm: [22,(-37),35,18,(-12),28,15,32,24,(-8),20,5], ecpa: [520,680,440,560,720,480,590,450,510,750,540,500], funding: [0.4,0.2,0.6,0.35,0.15,0.5,0.3,0.55,0.42,0.1,0.38,0.48], bankCPM: [82,110,65,88,125,72,95,68,80,130,85,75], color: C.blue },
  { name: "MarketWatch", data: [250,270,260,285,240,275,290,255,265,295,280,305], gpm: [45,50,47,53,42,49,55,44,48,57,46,52], ecpa: [365,345,355,335,380,350,330,370,358,325,362,338], funding: [1.0,1.15,1.05,1.25,0.95,1.1,1.3,1.0,1.08,1.35,1.02,1.28], bankCPM: [42,38,40,36,45,39,34,43,41,33,42,35], color: C.amber },
  { name: "Google SEM", data: [420,405,450,430,380,440,460,395,415,470,435,485], gpm: [62,58,65,60,52,63,68,55,61,70,59,72], ecpa: [290,310,275,295,330,285,270,315,298,265,300,255], funding: [2.1,1.9,2.4,2.2,1.7,2.3,2.5,1.85,2.05,2.6,2.15,2.8], bankCPM: [28,32,25,29,35,27,23,33,30,22,28,20], color: C.green },
  { name: "Dianomi", data: [85,92,78,95,72,88,100,68,82,65,90,111], gpm: [40,44,36,46,32,42,48,30,38,28,43,50], ecpa: [410,395,430,385,445,405,375,455,415,465,400,370], funding: [0.3,0.35,0.25,0.38,0.2,0.32,0.4,0.18,0.28,0.15,0.34,0.45], bankCPM: [55,50,60,48,65,52,45,68,56,72,51,42], color: C.orange },
  { name: "Business Insider", data: [155,170,148,175,135,165,180,142,158,125,168,145], gpm: [38,43,34,45,30,40,47,32,37,26,42,35], ecpa: [440,420,460,410,475,435,405,465,445,490,425,455], funding: [0.6,0.7,0.55,0.75,0.5,0.65,0.8,0.52,0.62,0.45,0.68,0.58], bankCPM: [58,52,62,50,68,55,48,65,57,72,53,60], color: C.pink },
  { name: "NAF Digital", data: [45,52,38,55,30,48,58,35,42,25,50,18], gpm: [25,30,20,32,15,28,35,18,24,12,29,(-5)], ecpa: [580,550,610,540,640,565,520,625,585,660,555,700], funding: [0.12,0.15,0.1,0.18,0.08,0.14,0.2,0.09,0.11,0.06,0.16,0.04], bankCPM: [95,85,105,80,115,90,75,110,92,120,88,140], color: C.red },
  { name: "Earnin", data: [15,22,12,25,8,20,28,10,18,6,24,14], gpm: [60,65,55,68,50,63,70,48,58,45,66,52], ecpa: [320,300,340,290,360,310,280,365,325,375,295,335], funding: [0.05,0.08,0.04,0.09,0.03,0.07,0.1,0.035,0.06,0.02,0.085,0.05], bankCPM: [30,25,35,22,40,28,20,38,32,42,24,30], color: "#9CA3AF" },
  { name: "SmartNews", data: [8,12,6,14,5,10,16,4,9,3,13,7], gpm: [15,22,10,25,5,18,28,2,14,(-3),20,8], ecpa: [650,600,700,580,730,630,560,740,645,760,610,690], funding: [0.02,0.04,0.015,0.05,0.01,0.03,0.06,0.008,0.025,0.005,0.04,0.018], bankCPM: [130,115,145,110,155,125,100,160,135,170,120,148], color: "#6B7280" },
];

const offerCallouts = [
  { pub: "Google SEM", offer: "Premium Checking-5", metric: "eCPA $255 (best YTD)", type: "win" },
  { pub: "Google SEM", offer: "HighYield Savings", metric: "Bank CPM $20, funding $1.4M", type: "win" },
  { pub: "CNNMoney", offer: "CD Product 12M", metric: "Revenue $142K, GPM 100%", type: "win" },
  { pub: "GoBankingRates", offer: "Cash Reserve", metric: "eCPA $305, lowest across all pubs", type: "win" },
  { pub: "Facebook Media", offer: "Premium Checking", metric: "eCPA $500, GPM only 5%", type: "miss" },
  { pub: "NAF Digital", offer: "Brokerage Acct", metric: "Revenue $4K, bank CPM $140", type: "miss" },
  { pub: "MarketWatch", offer: "Savings Plus", metric: "Funding $820K, bank CPM $35", type: "win" },
  { pub: "Dianomi", offer: "CD Product 12M", metric: "Revenue $111K = 3rd highest YTD", type: "win" },
];

function genRetro(pub) {
  const cur = pub.data[targetIdx];
  const prev = pub.data[targetIdx - 1];
  const sorted = [...pub.data.slice(0, targetIdx + 1)].sort((a, b) => b - a);
  const rank = sorted.indexOf(cur) + 1;
  const lowest = [...pub.data.slice(0, targetIdx + 1)].sort((a, b) => a - b);
  const lowRank = lowest.indexOf(cur) + 1;
  const gpmCur = pub.gpm[targetIdx];
  const gpmPrev = pub.gpm[targetIdx - 1];
  const avgGpm = Math.round(pub.gpm.slice(0, targetIdx).reduce((a, b) => a + b, 0) / targetIdx);

  let wins = [], misses = [], actions = [];

  if (rank <= 3) wins.push(`Revenue $${cur}K \u2014 ${rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd"}-highest YTD`);
  if (gpmCur > avgGpm + 10) wins.push(`GPM ${gpmCur}% (avg ${avgGpm}%), +${gpmCur - avgGpm}pp above YTD avg`);
  if (pub.ecpa[targetIdx] < Math.min(...pub.ecpa.slice(0, targetIdx))) wins.push(`eCPA $${pub.ecpa[targetIdx]}, best efficiency YTD`);
  if (pub.funding[targetIdx] > pub.funding[targetIdx - 1] * 1.2) wins.push(`Funding up ${Math.round((pub.funding[targetIdx] / pub.funding[targetIdx - 1] - 1) * 100)}% MoM to $${pub.funding[targetIdx]}M`);
  if (pub.bankCPM[targetIdx] < Math.min(...pub.bankCPM.slice(Math.max(0, targetIdx - 5), targetIdx))) wins.push(`Bank CPM $${pub.bankCPM[targetIdx]}, lowest in 6 months`);

  if (lowRank <= 2 && rank > 3) misses.push(`Revenue $${cur}K \u2014 ${lowRank === 1 ? "lowest" : "2nd-lowest"} month on record`);
  if (gpmCur < avgGpm - 10) misses.push(`GPM ${gpmCur}%, ${avgGpm - gpmCur}pp below YTD avg of ${avgGpm}%`);
  if (gpmCur < 0) misses.push(`GPM negative at ${gpmCur}%`);
  if (pub.ecpa[targetIdx] > Math.max(...pub.ecpa.slice(Math.max(0, targetIdx - 5), targetIdx))) misses.push(`eCPA $${pub.ecpa[targetIdx]}, worst in 6 months`);
  if (pub.bankCPM[targetIdx] > pub.bankCPM[targetIdx - 1] * 1.15) misses.push(`Bank CPM $${pub.bankCPM[targetIdx]}, up ${Math.round((pub.bankCPM[targetIdx] / pub.bankCPM[targetIdx - 1] - 1) * 100)}% MoM`);
  if (cur < 20) misses.push(`Under $20K flag \u2014 sub-scale`);

  if (pub.bankCPM[targetIdx] > 100) actions.push("Clean up low-value placements to reduce bank CPM");
  if (pub.ecpa[targetIdx] > 500) actions.push("Test new creative/targeting to improve eCPA");
  if (gpmCur < 0) actions.push("Review cost structure; consider pausing until margins stabilize");
  if (cur < 20) actions.push("Deprioritize unless strategic reason to keep testing");
  if (pub.funding[targetIdx] > pub.funding[targetIdx - 1] * 1.2 && gpmCur > avgGpm) actions.push("Scale \u2014 strong efficiency + funding trajectory");
  if (wins.length > 0 && actions.length === 0) actions.push("Continue current mix; monitor for sustainability");

  return { wins, misses, actions };
}

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11 }}>
      <div style={{ color: C.amber, fontWeight: 500, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: C.text, display: "flex", gap: 5, alignItems: "center" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color || p.stroke }} />
          {p.name}: <strong>{typeof p.value === "number" ? (Math.abs(p.value) >= 1000 ? `$${(p.value / 1).toLocaleString()}K` : p.value) : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState("retro");
  const [selPub, setSelPub] = useState(0);
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(-1);
  const [showRetro, setShowRetro] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 50); return () => clearInterval(t); }, []);

  const runAgent = () => {
    setRunning(true); setStep(0); setShowRetro(false);
  };

  const agentSteps = [
    { label: "Loading publisher history", desc: "Reading 12-month publisher file...", dur: 1200 },
    { label: "Loading offer data", desc: "Reading April offer-by-publisher file...", dur: 1000 },
    { label: "Computing YTD rankings", desc: "Ranking revenue, GPM, eCPA across months...", dur: 1500 },
    { label: "Generating retro", desc: "Writing wins, misses, action plans...", dur: 2000 },
    { label: "Flagging sub-$20K", desc: "Identifying under-$20K publishers...", dur: 800 },
  ];

  useEffect(() => {
    if (!running || step < 0) return;
    if (step >= agentSteps.length) { setRunning(false); setShowRetro(true); return; }
    const t = setTimeout(() => setStep(s => s + 1), agentSteps[step].dur);
    return () => clearTimeout(t);
  }, [running, step]);

  const tabs = [
    { id: "retro", label: "Retro output" },
    { id: "trends", label: "Publisher trends" },
    { id: "compare", label: "MoM compare" },
  ];

  const trendData = months.map((m, i) => {
    const o = { month: m };
    publishers.forEach(p => { o[p.name] = p.data[i]; });
    return o;
  });

  const compareData = publishers.map(p => ({
    name: p.name.length > 12 ? p.name.slice(0, 12) + ".." : p.name,
    full: p.name,
    curRev: p.data[targetIdx],
    prevRev: p.data[targetIdx - 1],
    curGPM: p.gpm[targetIdx],
    prevGPM: p.gpm[targetIdx - 1],
    delta: Math.round((p.data[targetIdx] / p.data[targetIdx - 1] - 1) * 100),
    gpmDelta: p.gpm[targetIdx] - p.gpm[targetIdx - 1],
    color: p.color,
  }));

  const under20k = publishers.filter(p => p.data[targetIdx] < 20);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter',-apple-system,sans-serif", color: C.text }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}} @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "16px 20px 60px" }}>

        {/* BANNER */}
        <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, background: "linear-gradient(140deg,#0C0F16,#1a0f28 45%,#0d1822)", marginBottom: 16, padding: "22px 24px 18px" }}>
          <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx={(tick * 0.3 + i * 52) % 920 - 10} cy={12 + Math.sin(tick * 0.012 + i) * 30} r={1.5}
                fill={[C.teal, C.purple, C.amber, C.green, C.pink, C.blue][i % 6]} opacity={0.1} />
            ))}
          </svg>
          <div style={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 16 }}>{"\uD83D\uDCCA"}</span>
                <span style={{ fontSize: 10, color: C.amber, letterSpacing: 2.5, fontWeight: 600 }}>MONTHLY RETRO ANALYST AGENT</span>
              </div>
              <h1 style={{ fontSize: 19, fontWeight: 600, color: C.text, margin: "0 0 3px", fontFamily: "Georgia,serif" }}>Publisher cutover retro — April 2026</h1>
              <p style={{ fontSize: 11, color: C.muted, margin: 0, maxWidth: 460 }}>AI agent analyzes 12 months of publisher history, ranks YTD performance, and auto-generates a retro with wins, misses, action plans & offer-level callouts</p>
            </div>
            <button onClick={runAgent} style={{
              padding: "10px 20px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
              background: `linear-gradient(135deg,${C.amber},#D97706)`, color: C.bg, border: "none",
              borderRadius: 10, display: "flex", alignItems: "center", gap: 6, boxShadow: `0 4px 16px ${C.amber}30`, flexShrink: 0,
            }}>{"\u25B6"} Run retro agent</button>
          </div>
          <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, marginTop: 14 }}>
            {[{ l: "PUBLISHERS", v: "10" }, { l: "MONTHS", v: "12" }, { l: "TARGET", v: "Apr'26" }, { l: "UNDER $20K", v: under20k.length.toString() }].map((k, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 600, color: [C.teal, C.purple, C.amber, C.red][i], fontFamily: "Georgia,serif" }}>{k.v}</div>
                <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1 }}>{k.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* AGENT STEPS */}
        {running && (
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14, animation: "fadeIn .3s ease" }}>
            {agentSteps.map((s, i) => {
              const done = step > i; const act = step === i;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 0", opacity: done ? 1 : act ? 1 : 0.3 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, flexShrink: 0,
                    background: done ? C.green + "15" : act ? C.amber + "15" : "rgba(255,255,255,.03)",
                    border: `1px solid ${done ? C.green + "40" : act ? C.amber + "40" : C.border}` }}>
                    {done ? <span style={{ color: C.green }}>{"\u2713"}</span> : act ? <div style={{ width: 10, height: 10, borderRadius: "50%", border: `2px solid ${C.amber}`, borderTopColor: "transparent", animation: "spin .8s linear infinite" }} /> : <span style={{ opacity: 0.3 }}>{i + 1}</span>}
                  </div>
                  <div><div style={{ fontSize: 12, fontWeight: 500, color: done ? C.green : act ? C.amber : C.muted }}>{s.label}</div><div style={{ fontSize: 10, color: C.muted }}>{s.desc}</div></div>
                </div>
              );
            })}
          </div>
        )}

        {/* TABS */}
        {showRetro && (
          <>
            <div style={{ display: "flex", gap: 0, marginBottom: 14, background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
              {tabs.map(t => (
                <button key={t.id} onClick={() => setTab(t.id)} style={{
                  flex: 1, padding: "10px 6px", fontSize: 11, fontWeight: tab === t.id ? 600 : 400, fontFamily: "inherit",
                  color: tab === t.id ? C.amber : C.muted, background: tab === t.id ? C.amber + "0A" : "transparent",
                  border: "none", cursor: "pointer", borderBottom: tab === t.id ? `2px solid ${C.amber}` : "2px solid transparent",
                }}>{t.label}</button>
              ))}
            </div>

            {tab === "retro" && (
              <div style={{ animation: "fadeIn .4s ease" }}>
                {/* RETRO TABLE */}
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14, overflowX: "auto" }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>{"\uD83D\uDCCB"} Publisher retro — April 2026</div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Publisher", "Win", "Miss", "Action Plan"].map(h => (
                        <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.muted, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {publishers.map((pub, i) => {
                        const r = genRetro(pub);
                        return (
                          <tr key={i} style={{ borderBottom: `1px solid ${C.border}08`, animation: `fadeIn .3s ease ${i * 0.05}s both` }}>
                            <td style={{ padding: "8px 10px", fontWeight: 600, whiteSpace: "nowrap", color: pub.color, verticalAlign: "top" }}>{pub.name}</td>
                            <td style={{ padding: "8px 10px", color: C.green, verticalAlign: "top", lineHeight: 1.6 }}>
                              {r.wins.map((w, j) => <div key={j}>{"\u2022"} {w}</div>)}
                            </td>
                            <td style={{ padding: "8px 10px", color: C.red, verticalAlign: "top", lineHeight: 1.6 }}>
                              {r.misses.map((m, j) => <div key={j}>{"\u2022"} {m}</div>)}
                            </td>
                            <td style={{ padding: "8px 10px", color: C.subtle, verticalAlign: "top", lineHeight: 1.6 }}>
                              {r.actions.map((a, j) => <div key={j}>{"\u2022"} {a}</div>)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* UNDER $20K FLAGS */}
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.red}25`, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10, color: C.red }}>{"\u26A0\uFE0F"} Under $20K flags</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {under20k.map((p, i) => (
                      <div key={i} style={{ padding: "6px 14px", background: C.red + "10", borderRadius: 8, border: `1px solid ${C.red}20`, fontSize: 11 }}>
                        <strong style={{ color: C.red }}>{p.name}</strong>
                        <span style={{ color: C.muted, marginLeft: 8 }}>${p.data[targetIdx]}K</span>
                        <span style={{ color: C.muted, marginLeft: 4 }}>({p.gpm[targetIdx]}% GPM)</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* OFFER CALLOUTS */}
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 10 }}>{"\uD83C\uDFAF"} Notable offer-level callouts</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {offerCallouts.map((o, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", background: "rgba(255,255,255,.02)", borderRadius: 6, borderLeft: `2px solid ${o.type === "win" ? C.green : C.red}` }}>
                        <span style={{ fontSize: 10, color: o.type === "win" ? C.green : C.red, background: (o.type === "win" ? C.green : C.red) + "15", padding: "1px 6px", borderRadius: 6, fontWeight: 600 }}>{o.type}</span>
                        <span style={{ fontSize: 11, color: C.subtle }}><strong style={{ color: C.text }}>{o.pub}</strong> {"\u00B7"} {o.offer} {"\u2014"} {o.metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {tab === "trends" && (
              <div style={{ animation: "fadeIn .4s ease" }}>
                <div style={{ display: "flex", gap: 6, marginBottom: 12, flexWrap: "wrap" }}>
                  {publishers.map((p, i) => (
                    <button key={i} onClick={() => setSelPub(i)} style={{
                      padding: "4px 10px", fontSize: 10, fontFamily: "inherit", borderRadius: 10, cursor: "pointer",
                      background: selPub === i ? p.color + "20" : "transparent", color: selPub === i ? p.color : C.muted,
                      border: `1px solid ${selPub === i ? p.color + "40" : C.border}`, fontWeight: selPub === i ? 600 : 400,
                    }}>{p.name}</button>
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16 }}>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>Revenue ($K) — 12 months</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={months.map((m, i) => ({ month: m, rev: publishers[selPub].data[i] }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                        <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 9 }} />
                        <YAxis stroke={C.muted} tick={{ fontSize: 9 }} />
                        <Tooltip content={<Tip />} />
                        <Bar dataKey="rev" radius={[3, 3, 0, 0]} name="Revenue $K">
                          {months.map((_, i) => <Cell key={i} fill={i === targetIdx ? publishers[selPub].color : publishers[selPub].color + "40"} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16 }}>
                    <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>GPM % — 12 months</div>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={months.map((m, i) => ({ month: m, gpm: publishers[selPub].gpm[i] }))}>
                        <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                        <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 9 }} />
                        <YAxis stroke={C.muted} tick={{ fontSize: 9 }} />
                        <Tooltip content={<Tip />} />
                        <Line type="monotone" dataKey="gpm" stroke={publishers[selPub].color} strokeWidth={2} dot={{ r: 3 }} name="GPM %" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16 }}>
                  <div style={{ fontSize: 12, color: C.muted, marginBottom: 10 }}>All publishers — revenue trend ($K)</div>
                  <ResponsiveContainer width="100%" height={240}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                      <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 9 }} />
                      <YAxis stroke={C.muted} tick={{ fontSize: 9 }} />
                      <Tooltip content={<Tip />} />
                      {publishers.slice(0, 6).map(p => <Line key={p.name} type="monotone" dataKey={p.name} stroke={p.color} strokeWidth={1.5} dot={false} />)}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {tab === "compare" && (
              <div style={{ animation: "fadeIn .4s ease" }}>
                <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 16, marginBottom: 14 }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>March {"\u2192"} April comparison</div>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                    <thead><tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Publisher", "Mar Rev", "Apr Rev", "\u0394 Rev", "Mar GPM", "Apr GPM", "\u0394 GPM"].map(h => (
                        <th key={h} style={{ padding: "6px 8px", textAlign: "right", color: C.muted, fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {compareData.map((r, i) => (
                        <tr key={i} style={{ borderBottom: `1px solid ${C.border}08` }}>
                          <td style={{ padding: "6px 8px", textAlign: "left", fontWeight: 600, color: r.color }}>{r.full}</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: C.subtle }}>${r.prevRev}K</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: C.text, fontWeight: 500 }}>${r.curRev}K</td>
                          <td style={{ padding: "6px 8px", textAlign: "right" }}>
                            <span style={{ color: r.delta >= 0 ? C.green : C.red, background: (r.delta >= 0 ? C.green : C.red) + "15", padding: "1px 6px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>
                              {r.delta >= 0 ? "+" : ""}{r.delta}%
                            </span>
                          </td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: C.subtle }}>{r.prevGPM}%</td>
                          <td style={{ padding: "6px 8px", textAlign: "right", color: C.text, fontWeight: 500 }}>{r.curGPM}%</td>
                          <td style={{ padding: "6px 8px", textAlign: "right" }}>
                            <span style={{ color: r.gpmDelta >= 0 ? C.green : C.red, background: (r.gpmDelta >= 0 ? C.green : C.red) + "15", padding: "1px 6px", borderRadius: 6, fontSize: 10, fontWeight: 600 }}>
                              {r.gpmDelta >= 0 ? "+" : ""}{r.gpmDelta}pp
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ padding: "10px 14px", background: C.amber + "08", borderRadius: 8, border: `1px solid ${C.amber}20`, fontSize: 11, color: C.subtle, lineHeight: 1.6 }}>
                  <span style={{ color: C.amber, fontWeight: 600 }}>Highlight:</span> Facebook Media GPM swung from <span style={{ color: C.red, fontWeight: 600 }}>-8%</span> in Feb to <span style={{ color: C.green, fontWeight: 600 }}>+5%</span> in April — a 13pp improvement but still the weakest margin in the portfolio. Google SEM hit <span style={{ color: C.green, fontWeight: 600 }}>72% GPM</span> on $485K revenue, its best month on record.
                </div>
              </div>
            )}
          </>
        )}

        {!showRetro && !running && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>{"\uD83D\uDCCA"}</div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Click <strong style={{ color: C.amber }}>Run retro agent</strong> to generate the April cutover retro</div>
            <div style={{ fontSize: 12 }}>The agent will analyze 12 months of publisher data and produce wins, misses & action plans</div>
          </div>
        )}
      </div>
    </div>
  );
}