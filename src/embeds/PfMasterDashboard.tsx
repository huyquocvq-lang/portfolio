import { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const C = {
  bg: "#0B0F19", card: "#131825", border: "#1E2535", hover: "#1A2030",
  teal: "#2DD4BF", purple: "#A78BFA", pink: "#F472B6", amber: "#FBBF24",
  red: "#F87171", green: "#34D399", blue: "#60A5FA", orange: "#FB923C",
  text: "#E2E8F0", muted: "#64748B", subtle: "#94A3B8",
};

const days = Array.from({ length: 17 }, (_, i) => {
  const d = i + 1;
  return `Apr ${d}`;
});

const offers = [
  { id: "o1", name: "HighYield CD 12M", color: C.teal },
  { id: "o2", name: "Premium Checking", color: C.purple },
  { id: "o3", name: "Savings Plus", color: C.amber },
  { id: "o4", name: "Brokerage Account", color: C.pink },
  { id: "o5", name: "Cash Reserve", color: C.blue },
];

const pubs = [
  { id: "p1", name: "Network Alpha" },
  { id: "p2", name: "Publisher Omega" },
  { id: "p3", name: "DSP Platform Y" },
  { id: "p4", name: "Premium Pub Q" },
  { id: "p5", name: "Search Engine G" },
  { id: "p6", name: "Ad Network Delta" },
  { id: "p7", name: "Finance Wire M" },
];

const placements = [
  "In-Content-300x600", "Below-Article", "Marketplace-CAU", "HP-CAU-Rev-Share",
  "Mobile-Partner-Bin", "ROS-300x250", "Text-Ad", "Banner-970x250",
  "Splash-Page", "Traffic-Driver",
];

function rnd(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function seed(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return Math.abs(h); }

const dodData = useMemoGen();
function useMemoGen() {
  const d = {};
  offers.forEach(o => {
    d[o.id] = {};
    pubs.forEach(p => {
      const s = seed(o.id + p.id);
      d[o.id][p.id] = days.map((_, i) => {
        const base = (s % 500) * 50 + 10000;
        const imp = Math.round(base * (0.7 + Math.sin(i * 0.5 + s) * 0.3));
        const clicks = Math.round(imp * (0.00003 + (s % 10) * 0.000008));
        const conv = Math.round(clicks * (0.01 + (s % 5) * 0.005));
        const rev = conv * (300 + (s % 8) * 40);
        return { day: days[i], imp, clicks, conv, rev, ctr: (clicks / imp * 100), c2c: clicks > 0 ? (conv / clicks * 100) : 0 };
      });
    });
  });
  return d;
}

const qaData = [];
offers.forEach(o => {
  pubs.forEach(p => {
    placements.slice(0, 3 + seed(o.id + p.id) % 5).forEach(pl => {
      const s = seed(o.id + p.id + pl);
      const p1 = s % 500;
      const variance = (s % 20) - 10;
      const p3 = Math.max(0, Math.round(p1 * (1 + variance / 100)));
      const diff = p1 > 0 ? Math.abs((p3 - p1) / p1 * 100) : 0;
      let status = "OK";
      if (p1 === 0 && p3 === 0) status = "IGNORE";
      else if (diff > 15) status = `HIGH VARIANCE (${variance > 0 ? "+" : ""}${variance}%)`;
      qaData.push({ offer: o.name, pub: p.name, placement: `${p.name.split(" ")[0]}_${pl}`, p1Clicks: p1, p3Clicks: p3, status, diff: Math.round(diff) });
    });
  });
});

const aggData = {
  revenue: 5798304, cost: 4827328, gpm: 16.7, impressions: 676015951,
  clicks1p: 557038, clicks3p: 534754, conversions: 14198,
  ctc: 10547, vtc: 2211, ecpa: 408, publishers: 34, funded: 558,
};

const fmt = (n) => {
  if (n >= 1e6) return "$" + (n / 1e6).toFixed(2) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
};
const fmtN = (n) => {
  if (n >= 1e9) return (n / 1e9).toFixed(2) + "B";
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 11, fontFamily: "inherit" }}>
      <div style={{ color: C.amber, fontWeight: 500, marginBottom: 3 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: C.text, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color || p.stroke }} />
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: 16, ...style }}>{children}</div>;
}
function Label({ children }) {
  return <div style={{ fontSize: 13, fontWeight: 500, color: C.text, marginBottom: 10 }}>{children}</div>;
}
function Badge({ val, type }) {
  const colors = { OK: C.green, IGNORE: C.muted, VARIANCE: C.red };
  const bg = { OK: "rgba(52,211,153,.1)", IGNORE: "rgba(100,116,139,.1)", VARIANCE: "rgba(248,113,113,.12)" };
  const t = type === "OK" ? "OK" : type === "IGNORE" ? "IGNORE" : "VARIANCE";
  return <span style={{ fontSize: 10, fontWeight: 600, color: colors[t], background: bg[t], padding: "2px 8px", borderRadius: 8, whiteSpace: "nowrap" }}>{val}</span>;
}
function Metric({ label, value, sub, accent = C.teal }) {
  return (
    <div style={{ background: "rgba(255,255,255,.02)", borderRadius: 8, padding: "12px 14px", borderLeft: `3px solid ${accent}`, borderRadius: 0 }}>
      <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 600, color: C.text, fontFamily: "Georgia, serif" }}>{value}</div>
      {sub && <div style={{ fontSize: 10, color: accent, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function Banner() {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 60); return () => clearInterval(t); }, []);

  return (
    <div style={{ position: "relative", height: 180, overflow: "hidden", borderRadius: 12, background: `linear-gradient(135deg, #0B0F19 0%, #150d25 50%, #0d1520 100%)`, marginBottom: 16 }}>
      <svg width="100%" height="180" viewBox="0 0 800 180" style={{ position: "absolute", inset: 0 }}>
        <g opacity=".04" stroke="#fff" strokeWidth="0.5">
          {[45, 90, 135].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} />)}
          {[160, 320, 480, 640].map(x => <line key={x} x1={x} y1="0" x2={x} y2="180" />)}
        </g>
        {[
          { pts: "0,120 50,100 100,110 150,85 200,95 250,70 300,80 350,65 400,75 450,55 500,68 550,50 600,62 650,45 700,58 750,42 800,55", c: C.teal },
          { pts: "0,140 50,130 100,135 150,118 200,125 250,108 300,120 350,105 400,115 450,98 500,110 550,92 600,105 650,88 700,100 750,85 800,95", c: C.purple },
        ].map((l, i) => <polyline key={i} points={l.pts} fill="none" stroke={l.c} strokeWidth="1.2" opacity=".3" />)}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = (tick * 0.6 + i * 55) % 820;
          const y = 30 + Math.sin(tick * 0.015 + i * 0.8) * 50;
          return <circle key={i} cx={x} cy={y} r={1.5 + Math.sin(i) * 0.5} fill={[C.teal, C.purple, C.pink, C.amber][i % 4]} opacity={0.15 + Math.sin(tick * 0.02 + i) * 0.08} />;
        })}
      </svg>
      <div style={{ position: "relative", zIndex: 1, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, boxShadow: `0 0 6px ${C.green}` }} />
            <span style={{ fontSize: 10, color: C.green, letterSpacing: 2.5, fontWeight: 500 }}>1ST PARTY · 3RD PARTY · QA FLAGGING</span>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, margin: "0 0 3px", fontFamily: "Georgia, serif" }}>Master analysis dashboard — April 2026</h1>
          <p style={{ fontSize: 11, color: C.muted, margin: 0 }}>Aggregate, offer→placement & placement→offer DOD performance with data reconciliation</p>
        </div>
        <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
          {[
            { label: "REVENUE", val: "$5.80M", c: C.teal },
            { label: "GPM", val: "16.7%", c: C.amber },
            { label: "CONV", val: "14.2K", c: C.purple },
            { label: "eCPA", val: "$408", c: C.pink },
          ].map((k, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 17, fontWeight: 600, color: k.c, fontFamily: "Georgia, serif" }}>{k.val}</div>
              <div style={{ fontSize: 8, color: C.muted, letterSpacing: 1 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: "relative", zIndex: 1, padding: "0 24px", display: "flex", gap: 6 }}>
        {["1P vs 3P QA flagging", "Offer → placement DOD", "Placement → offer DOD", "34 publishers"].map((t, i) => (
          <span key={i} style={{ fontSize: 10, padding: "2px 10px", borderRadius: 10, background: [C.green, C.teal, C.purple, C.amber][i] + "15", color: [C.green, C.teal, C.purple, C.amber][i], border: `1px solid ${[C.green, C.teal, C.purple, C.amber][i]}30` }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("aggregate");
  const [selOffer, setSelOffer] = useState("o1");
  const [selPub, setSelPub] = useState("p1");
  const [qaFilter, setQaFilter] = useState("ALL");

  const views = [
    { id: "aggregate", label: "Aggregate" },
    { id: "offer-dod", label: "Offer → placement DOD" },
    { id: "pub-dod", label: "Placement → offer DOD" },
    { id: "qa", label: "1P / 3P QA" },
  ];

  const curDod = dodData[selOffer]?.[selPub] || [];
  const filteredQa = qaFilter === "ALL" ? qaData.slice(0, 60) :
    qaFilter === "VARIANCE" ? qaData.filter(q => q.status.includes("VARIANCE")).slice(0, 40) :
    qaData.filter(q => q.status === qaFilter).slice(0, 40);

  const offerAgg = offers.map(o => {
    let totalImp = 0, totalClk = 0, totalConv = 0, totalRev = 0;
    pubs.forEach(p => { (dodData[o.id]?.[p.id] || []).forEach(d => { totalImp += d.imp; totalClk += d.clicks; totalConv += d.conv; totalRev += d.rev; }); });
    return { name: o.name, imp: totalImp, clicks: totalClk, conv: totalConv, rev: totalRev, ctr: (totalClk / totalImp * 100), c2c: totalClk > 0 ? (totalConv / totalClk * 100) : 0 };
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 20px 60px" }}>
        <Banner />

        <div style={{ display: "flex", gap: 0, marginBottom: 14, background: C.card, borderRadius: 8, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {views.map(v => (
            <button key={v.id} onClick={() => setView(v.id)} style={{
              flex: 1, padding: "10px 6px", fontSize: 11, fontWeight: view === v.id ? 600 : 400, fontFamily: "inherit",
              color: view === v.id ? C.teal : C.muted, background: view === v.id ? "rgba(45,212,191,.07)" : "transparent",
              border: "none", cursor: "pointer", borderBottom: view === v.id ? `2px solid ${C.teal}` : "2px solid transparent",
            }}>{v.label}</button>
          ))}
        </div>

        {view === "aggregate" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8, marginBottom: 14 }}>
              <Metric label="REVENUE" value="$5.80M" accent={C.teal} />
              <Metric label="COST" value="$4.83M" accent={C.red} />
              <Metric label="GPM" value="16.7%" sub="Target: 20%" accent={C.amber} />
              <Metric label="1P CLICKS" value="557K" accent={C.purple} />
              <Metric label="3P CLICKS" value="535K" sub="Δ 4% variance" accent={C.blue} />
              <Metric label="CONVERSIONS" value="14.2K" sub="CTC: 10.5K · VTC: 2.2K" accent={C.green} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card>
                <Label>1st party vs. 3rd party clicks — all offers</Label>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={offers.map(o => {
                    const s = seed(o.id);
                    const p1 = 50000 + s % 120000;
                    const p3 = Math.round(p1 * (0.92 + (s % 10) * 0.01));
                    return { name: o.name.split(" ").slice(0, 2).join(" "), "1P": p1, "3P": p3 };
                  })}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="name" stroke={C.muted} tick={{ fontSize: 10 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => fmtN(v)} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="1P" fill={C.teal} radius={[3, 3, 0, 0]} barSize={14} name="1st party" />
                    <Bar dataKey="3P" fill={C.purple} radius={[3, 3, 0, 0]} barSize={14} name="3rd party" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <Label>Offer performance — revenue & conversions</Label>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={offerAgg} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                    <XAxis type="number" stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => "$" + fmtN(v)} />
                    <YAxis dataKey="name" type="category" stroke={C.muted} tick={{ fontSize: 10 }} width={95} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="rev" fill={C.amber} radius={[0, 3, 3, 0]} barSize={12} name="Revenue" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <Label>Daily impressions trend — all offers</Label>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={days.map((d, i) => {
                  const o = { day: d };
                  offers.forEach(of => {
                    let total = 0;
                    pubs.forEach(p => { total += dodData[of.id]?.[p.id]?.[i]?.imp || 0; });
                    o[of.name] = Math.round(total / 1000);
                  });
                  return o;
                })}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 10 }} />
                  <Tooltip content={<Tip />} />
                  {offers.map(o => <Line key={o.id} type="monotone" dataKey={o.name} stroke={o.color} strokeWidth={1.8} dot={false} />)}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {view === "offer-dod" && (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {offers.map(o => (
                <button key={o.id} onClick={() => setSelOffer(o.id)} style={{
                  padding: "5px 12px", fontSize: 11, fontFamily: "inherit", borderRadius: 16, cursor: "pointer",
                  background: selOffer === o.id ? o.color : "transparent", color: selOffer === o.id ? C.bg : C.muted,
                  border: `1px solid ${selOffer === o.id ? o.color : C.border}`, fontWeight: selOffer === o.id ? 600 : 400,
                }}>{o.name}</button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Select publisher to view DOD:</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {pubs.map(p => (
                <button key={p.id} onClick={() => setSelPub(p.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontFamily: "inherit", borderRadius: 12, cursor: "pointer",
                  background: selPub === p.id ? C.purple + "30" : "transparent", color: selPub === p.id ? C.purple : C.muted,
                  border: `1px solid ${selPub === p.id ? C.purple : C.border}`,
                }}>{p.name}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card>
                <Label>Impressions DOD</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={curDod}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => fmtN(v)} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="imp" stroke={C.teal} fill={C.teal + "18"} strokeWidth={2} name="Impressions" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <Label>Clicks & conversions DOD</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={curDod}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 10 }} />
                    <Tooltip content={<Tip />} />
                    <Line type="monotone" dataKey="clicks" stroke={C.purple} strokeWidth={2} dot={{ r: 2 }} name="Clicks" />
                    <Line type="monotone" dataKey="conv" stroke={C.green} strokeWidth={2} dot={{ r: 2 }} name="Conversions" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <Label>CTR & C2C DOD</Label>
              <ResponsiveContainer width="100%" height={180}>
                <LineChart data={curDod}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => v.toFixed(2) + "%"} />
                  <Tooltip content={<Tip />} />
                  <Line type="monotone" dataKey="ctr" stroke={C.amber} strokeWidth={2} dot={{ r: 2 }} name="CTR %" />
                  <Line type="monotone" dataKey="c2c" stroke={C.pink} strokeWidth={2} dot={{ r: 2 }} name="C2C %" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {view === "pub-dod" && (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
              {pubs.map(p => (
                <button key={p.id} onClick={() => setSelPub(p.id)} style={{
                  padding: "5px 12px", fontSize: 11, fontFamily: "inherit", borderRadius: 16, cursor: "pointer",
                  background: selPub === p.id ? C.purple : "transparent", color: selPub === p.id ? C.bg : C.muted,
                  border: `1px solid ${selPub === p.id ? C.purple : C.border}`, fontWeight: selPub === p.id ? 600 : 400,
                }}>{p.name}</button>
              ))}
            </div>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Select offer to view DOD:</div>
            <div style={{ display: "flex", gap: 6, marginBottom: 14, flexWrap: "wrap" }}>
              {offers.map(o => (
                <button key={o.id} onClick={() => setSelOffer(o.id)} style={{
                  padding: "4px 10px", fontSize: 10, fontFamily: "inherit", borderRadius: 12, cursor: "pointer",
                  background: selOffer === o.id ? o.color + "30" : "transparent", color: selOffer === o.id ? o.color : C.muted,
                  border: `1px solid ${selOffer === o.id ? o.color : C.border}`,
                }}>{o.name}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
              <Card>
                <Label>Revenue DOD</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={curDod}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => "$" + fmtN(v)} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="rev" radius={[3, 3, 0, 0]} name="Revenue">
                      {curDod.map((d, i) => <Cell key={i} fill={d.rev > (curDod[i - 1]?.rev || d.rev) ? C.green : C.red} opacity={0.7} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <Label>Impressions & clicks DOD</Label>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={curDod}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => fmtN(v)} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="imp" stroke={C.blue} fill={C.blue + "15"} strokeWidth={1.5} name="Impressions" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <Label>All offers on {pubs.find(p => p.id === selPub)?.name} — daily conversions</Label>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={days.map((d, i) => {
                  const o = { day: d };
                  offers.forEach(of => { o[of.name] = dodData[of.id]?.[selPub]?.[i]?.conv || 0; });
                  return o;
                })}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 9 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 10 }} />
                  <Tooltip content={<Tip />} />
                  {offers.map(o => <Line key={o.id} type="monotone" dataKey={o.name} stroke={o.color} strokeWidth={1.5} dot={false} />)}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {view === "qa" && (
          <>
            <Card style={{ marginBottom: 14 }}>
              <Label>1st party vs. 3rd party data reconciliation</Label>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
                Compares 1P (internal) click tracking against 3P (advertiser) reported clicks. Flags placements with {">"}15% variance for investigation. Mismatches indicate tracking discrepancies, pixel firing issues, or bot traffic.
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                {["ALL", "OK", "VARIANCE", "IGNORE"].map(f => (
                  <button key={f} onClick={() => setQaFilter(f)} style={{
                    padding: "4px 12px", fontSize: 10, fontFamily: "inherit", borderRadius: 10, cursor: "pointer",
                    background: qaFilter === f ? (f === "VARIANCE" ? C.red : f === "OK" ? C.green : f === "IGNORE" ? C.muted : C.teal) + "20" : "transparent",
                    color: qaFilter === f ? (f === "VARIANCE" ? C.red : f === "OK" ? C.green : f === "IGNORE" ? C.muted : C.teal) : C.muted,
                    border: `1px solid ${C.border}`, fontWeight: qaFilter === f ? 600 : 400,
                  }}>{f} {f !== "ALL" && `(${qaData.filter(q => f === "VARIANCE" ? q.status.includes("VARIANCE") : q.status === f).length})`}</button>
                ))}
              </div>
              <div style={{ maxHeight: 400, overflowY: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Offer", "Placement", "1P clicks", "3P clicks", "Δ%", "Status"].map(h => (
                        <th key={h} style={{ padding: "6px 8px", textAlign: "left", color: C.muted, fontWeight: 500, position: "sticky", top: 0, background: C.card }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredQa.map((q, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}08` }}>
                        <td style={{ padding: "5px 8px", color: C.subtle, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{q.offer}</td>
                        <td style={{ padding: "5px 8px", fontWeight: 500, fontSize: 10 }}>{q.placement}</td>
                        <td style={{ padding: "5px 8px", color: C.teal }}>{q.p1Clicks}</td>
                        <td style={{ padding: "5px 8px", color: C.purple }}>{q.p3Clicks}</td>
                        <td style={{ padding: "5px 8px", color: q.diff > 15 ? C.red : C.subtle }}>{q.diff}%</td>
                        <td style={{ padding: "5px 8px" }}><Badge val={q.status} type={q.status === "OK" ? "OK" : q.status === "IGNORE" ? "IGNORE" : "VARIANCE"} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            <div style={{ padding: "10px 14px", background: `${C.amber}08`, borderRadius: 8, border: `1px solid ${C.amber}20`, fontSize: 11, color: C.subtle }}>
              <span style={{ color: C.amber, fontWeight: 600 }}>Why this matters:</span> 1P/3P click variance above 15% typically signals pixel misfires, bot inflation, or redirect chain drops. This QA layer catches revenue leakage and tracking integrity issues before month-end reconciliation — saving an estimated 4–6 hours of manual investigation per reporting cycle.
            </div>
          </>
        )}
      </div>
    </div>
  );
}