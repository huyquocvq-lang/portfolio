import { useState, useEffect } from "react";
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const C = {
  bg: "#0D1117", card: "#161B22", border: "#21262D",
  teal: "#2DD4BF", purple: "#A78BFA", pink: "#F472B6",
  amber: "#FBBF24", red: "#F87171", green: "#34D399",
  blue: "#60A5FA", text: "#E2E8F0", muted: "#64748B",
  subtle: "#94A3B8", dimBg: "rgba(255,255,255,.03)",
};

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const pubMoM = [
  { name: "Network Alpha", data: [159591, 136905, 141285, 130728, 138062, 159241, 89799], clicks: [30182, 31475, 31413, 21297, 45581, 39449, 25459] },
  { name: "Publisher Omega", data: [98420, 112350, 105680, 118920, 125400, 131200, 72300], clicks: [18200, 22100, 19800, 24500, 28300, 26100, 14800] },
  { name: "Premium Pub Q", data: [45200, 38900, 42100, 51300, 48700, 55200, 31400], clicks: [8400, 7200, 8800, 11200, 10500, 12800, 6900] },
  { name: "DSP Platform Y", data: [210500, 195300, 188400, 201600, 178900, 192300, 105200], clicks: [42100, 38200, 36500, 41800, 35200, 39800, 21600] },
  { name: "Search Engine G", data: [78300, 82100, 91200, 85600, 94300, 88700, 48200], clicks: [15600, 17800, 21400, 19200, 22100, 20500, 11300] },
  { name: "Ad Network Delta", data: [32100, 28700, 35200, 31800, 38400, 42100, 22800], clicks: [5800, 5200, 7100, 6400, 8200, 9100, 4600] },
];

const offerMoM = [
  { name: "Premium Savings A", data: [322416, 279204, 277345, 240647, 173201, 212678, 91273], clicks: [60484, 58567, 66750, 51239, 25173, 23576, 12616], conv: [1820, 1750, 2010, 1540, 755, 710, 378] },
  { name: "Checking Plus B", data: [185200, 172300, 168400, 155600, 142100, 158900, 82400], clicks: [35200, 33800, 32100, 29400, 27800, 31200, 16100], conv: [1050, 1010, 960, 880, 835, 935, 485] },
  { name: "Investment Fund C", data: [98400, 105200, 112800, 108300, 118900, 124500, 67200], clicks: [18700, 21000, 23500, 22100, 25200, 26800, 14200], conv: [560, 630, 705, 665, 755, 805, 425] },
  { name: "CD Product D", data: [142300, 138700, 145200, 152800, 148400, 161200, 88500], clicks: [27100, 26400, 28800, 31200, 30100, 33800, 18200], conv: [815, 790, 865, 935, 905, 1015, 545] },
];

const placementSOV = [
  { name: "In-Content-300x600", value: 28, fill: C.teal },
  { name: "Below-Article", value: 18, fill: C.purple },
  { name: "Marketplace-CAU", value: 15, fill: C.pink },
  { name: "HP-CAU-Rev-Share", value: 12, fill: C.amber },
  { name: "Mobile-Partner-Bin", value: 10, fill: C.blue },
  { name: "ROS-300x250", value: 8, fill: C.green },
  { name: "Traffic-Driver", value: 5, fill: C.red },
  { name: "Other", value: 4, fill: C.muted },
];

const pubSOV = [
  { name: "Network Alpha", planned: 108, optimized: 131, gpm: 62, placements: 145 },
  { name: "DSP Platform Y", planned: 82, optimized: 48, gpm: 38, placements: 210 },
  { name: "Publisher Omega", planned: 65, optimized: 85, gpm: 58, placements: 98 },
  { name: "Premium Pub Q", planned: 42, optimized: 55, gpm: 54, placements: 72 },
  { name: "Search Engine G", planned: 35, optimized: 44, gpm: 60, placements: 45 },
  { name: "Ad Network Delta", planned: 18, optimized: 22, gpm: 57, placements: 38 },
  { name: "Finance Wire M", planned: 12, optimized: 0, gpm: 28, placements: 22 },
  { name: "Content Hub X", planned: 8, optimized: 0, gpm: 31, placements: 15 },
];

const capVTC = {
  offers: ["Premium Savings A", "Checking Plus B", "Investment Fund C"],
  lagDays: Array.from({ length: 15 }, (_, i) => i),
  data: {
    "Premium Savings A": { vtc: [22, 18, 14, 11, 8, 6, 5, 4, 3, 2, 2, 1, 1, 1, 0], ctc: [45, 38, 28, 22, 15, 12, 9, 7, 5, 4, 3, 2, 2, 1, 1] },
    "Checking Plus B": { vtc: [15, 12, 10, 8, 6, 5, 4, 3, 2, 2, 1, 1, 1, 0, 0], ctc: [32, 25, 20, 16, 12, 9, 7, 5, 4, 3, 2, 2, 1, 1, 0] },
    "Investment Fund C": { vtc: [8, 7, 5, 4, 3, 3, 2, 2, 1, 1, 1, 0, 0, 0, 0], ctc: [18, 14, 11, 9, 7, 5, 4, 3, 2, 2, 1, 1, 1, 0, 0] },
  },
};

const pubChanges = pubMoM.map(p => {
  const cur = p.data[6], prev = p.data[5];
  const cCur = p.clicks[6], cPrev = p.clicks[5];
  return { name: p.name, impChg: ((cur - prev) / prev * 100), clickChg: ((cCur - cPrev) / cPrev * 100), curImp: cur, curClk: cCur, ctr: (cCur / cur * 100) };
});

const fmt = (n) => {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(0) + "K";
  return n.toString();
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 12, fontFamily: "inherit" }}>
      <div style={{ color: C.amber, fontWeight: 500, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: C.text, display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: p.color || p.stroke, display: "inline-block" }} />
          {p.name}: <strong>{typeof p.value === "number" ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

function AnimBanner() {
  const [frame, setFrame] = useState(0);
  useEffect(() => { const t = setInterval(() => setFrame(f => f + 1), 50); return () => clearInterval(t); }, []);

  const totalImp = pubMoM.reduce((s, p) => s + p.data[6], 0);
  const totalClk = pubMoM.reduce((s, p) => s + p.clicks[6], 0);

  return (
    <div style={{ position: "relative", height: 200, overflow: "hidden", borderRadius: 12, background: `linear-gradient(135deg, ${C.bg}, #1a1040 50%, ${C.bg})`, marginBottom: 20 }}>
      <svg width="100%" height="200" viewBox="0 0 680 200" style={{ position: "absolute", inset: 0 }}>
        {pubMoM.map((pub, pi) => {
          const pts = pub.data.map((v, i) => {
            const x = 40 + i * 95;
            const y = 180 - (v / 350000) * 150;
            return `${x},${y}`;
          }).join(" ");
          const colors = [C.teal, C.purple, C.pink, C.amber, C.blue, C.green];
          return <polyline key={pi} points={pts} fill="none" stroke={colors[pi]} strokeWidth="1.5" opacity={0.25 + (pi === 0 ? 0.4 : 0)} />;
        })}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = ((frame * 0.8 + i * 35) % 700);
          const y = 40 + Math.sin(frame * 0.02 + i) * 60;
          const r = 1.5 + Math.sin(i * 0.7) * 0.8;
          const colors = [C.teal, C.purple, C.pink, C.amber];
          return <circle key={i} cx={x} cy={y} r={r} fill={colors[i % 4]} opacity={0.15 + Math.sin(frame * 0.03 + i) * 0.1} />;
        })}
        <line x1="0" y1="180" x2="680" y2="180" stroke={C.border} strokeWidth="0.5" />
      </svg>
      <div style={{ position: "relative", zIndex: 1, padding: "24px 28px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.teal, animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 11, color: C.purple, letterSpacing: 2.5, fontWeight: 500 }}>MEDIA PERFORMANCE ANALYTICS</span>
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 600, color: C.text, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>MoM offer trends dashboard</h1>
          <p style={{ fontSize: 12, color: C.muted, margin: 0 }}>Publisher SOV, placement mix, offer trends & cap conversion forecasting</p>
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
          {[
            { label: "PUBLISHERS", val: "6", color: C.teal },
            { label: "OFFERS", val: "4", color: C.purple },
            { label: "JUL IMP", val: fmt(totalImp), color: C.amber },
            { label: "JUL CLK", val: fmt(totalClk), color: C.pink },
          ].map((k, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, color: k.color, fontFamily: "Georgia, serif" }}>{k.val}</div>
              <div style={{ fontSize: 9, color: C.muted, letterSpacing: 1 }}>{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChgBadge({ val }) {
  const up = val >= 0;
  return (
    <span style={{ fontSize: 11, fontWeight: 600, color: up ? C.green : C.red, background: up ? "rgba(52,211,153,.1)" : "rgba(248,113,113,.1)", padding: "2px 8px", borderRadius: 10 }}>
      {up ? "+" : ""}{val.toFixed(1)}%
    </span>
  );
}

function Card({ children, style }) {
  return <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20, ...style }}>{children}</div>;
}
function SectionLabel({ children }) {
  return <div style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 14 }}>{children}</div>;
}

export default function Dashboard() {
  const [tab, setTab] = useState("overview");
  const [selectedPub, setSelectedPub] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(0);
  const [capOffer, setCapOffer] = useState("Premium Savings A");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "mom-pub", label: "MoM publisher" },
    { id: "mom-offer", label: "MoM offer" },
    { id: "sov", label: "Placement SOV" },
    { id: "cap", label: "Cap VTC forecast" },
  ];

  const pubLineData = months.map((m, i) => {
    const o = { month: m };
    pubMoM.forEach(p => { o[p.name] = Math.round(p.data[i] / 1000); });
    return o;
  });

  const offerLineData = months.map((m, i) => {
    const o = { month: m };
    offerMoM.forEach(p => { o[p.name] = Math.round(p.data[i] / 1000); });
    return o;
  });

  const capChartData = capVTC.lagDays.map(d => ({
    day: `Day ${d}`,
    VTC: capVTC.data[capOffer].vtc[d],
    CTC: capVTC.data[capOffer].ctc[d],
    cumVTC: capVTC.data[capOffer].vtc.slice(0, d + 1).reduce((a, b) => a + b, 0),
    cumCTC: capVTC.data[capOffer].ctc.slice(0, d + 1).reduce((a, b) => a + b, 0),
  }));

  const lineColors = [C.teal, C.purple, C.pink, C.amber, C.blue, C.green];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <style>{`@keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}`}</style>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "20px 24px 60px" }}>
        <AnimBanner />

        <div style={{ display: "flex", gap: 0, marginBottom: 20, background: C.card, borderRadius: 10, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              flex: 1, padding: "12px 8px", fontSize: 12, fontWeight: tab === t.id ? 600 : 400, fontFamily: "inherit",
              color: tab === t.id ? C.teal : C.muted, background: tab === t.id ? "rgba(45,212,191,.08)" : "transparent",
              border: "none", cursor: "pointer", borderBottom: tab === t.id ? `2px solid ${C.teal}` : "2px solid transparent",
              transition: "all .2s",
            }}>{t.label}</button>
          ))}
        </div>

        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
              {pubChanges.sort((a, b) => b.impChg - a.impChg).slice(0, 4).map((p, i) => (
                <Card key={i} style={{ borderLeft: `3px solid ${lineColors[i]}`, borderRadius: 0 }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{p.name}</div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 18, fontWeight: 600, fontFamily: "Georgia, serif" }}>{fmt(p.curImp)}</span>
                    <ChgBadge val={p.impChg} />
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>CTR: {p.ctr.toFixed(2)}%</div>
                </Card>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 16 }}>
              <Card>
                <SectionLabel>Publisher impressions trend (K)</SectionLabel>
                <ResponsiveContainer width="100%" height={260}>
                  <LineChart data={pubLineData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    {pubMoM.map((p, i) => (
                      <Line key={p.name} type="monotone" dataKey={p.name} stroke={lineColors[i]} strokeWidth={2} dot={{ r: 3 }} />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <SectionLabel>Placement SOV</SectionLabel>
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie data={placementSOV} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={2} label={({ name, value }) => `${value}%`} style={{ fontSize: 11 }}>
                      {placementSOV.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {tab === "mom-pub" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {pubMoM.map((p, i) => (
                <button key={i} onClick={() => setSelectedPub(i)} style={{
                  padding: "6px 14px", fontSize: 12, fontFamily: "inherit", borderRadius: 20, cursor: "pointer",
                  background: selectedPub === i ? C.teal : "transparent", color: selectedPub === i ? C.bg : C.muted,
                  border: `1px solid ${selectedPub === i ? C.teal : C.border}`, fontWeight: selectedPub === i ? 600 : 400,
                }}>{p.name}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <SectionLabel>Impressions (K)</SectionLabel>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={months.map((m, i) => ({ month: m, imp: Math.round(pubMoM[selectedPub].data[i] / 1000) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="imp" name="Impressions K" radius={[4, 4, 0, 0]}>
                      {months.map((_, i) => <Cell key={i} fill={i === 6 ? C.teal : `${C.teal}50`} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <SectionLabel>Clicks</SectionLabel>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={months.map((m, i) => ({ month: m, clicks: pubMoM[selectedPub].clicks[i] }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="clicks" name="Clicks" radius={[4, 4, 0, 0]}>
                      {months.map((_, i) => <Cell key={i} fill={i === 6 ? C.purple : `${C.purple}50`} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <SectionLabel>MoM change %</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
                {months.slice(1).map((m, i) => {
                  const chg = ((pubMoM[selectedPub].data[i + 1] - pubMoM[selectedPub].data[i]) / pubMoM[selectedPub].data[i]) * 100;
                  const cChg = ((pubMoM[selectedPub].clicks[i + 1] - pubMoM[selectedPub].clicks[i]) / pubMoM[selectedPub].clicks[i]) * 100;
                  return (
                    <div key={i} style={{ background: C.dimBg, borderRadius: 8, padding: 12, textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>{months[i]} → {m}</div>
                      <div style={{ marginBottom: 4 }}><ChgBadge val={chg} /></div>
                      <div style={{ fontSize: 10, color: C.muted }}>Clicks: <ChgBadge val={cChg} /></div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </>
        )}

        {tab === "mom-offer" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              {offerMoM.map((o, i) => (
                <button key={i} onClick={() => setSelectedOffer(i)} style={{
                  padding: "6px 14px", fontSize: 12, fontFamily: "inherit", borderRadius: 20, cursor: "pointer",
                  background: selectedOffer === i ? C.amber : "transparent", color: selectedOffer === i ? C.bg : C.muted,
                  border: `1px solid ${selectedOffer === i ? C.amber : C.border}`, fontWeight: selectedOffer === i ? 600 : 400,
                }}>{o.name}</button>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <SectionLabel>Impressions (K)</SectionLabel>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={months.map((m, i) => ({ month: m, imp: Math.round(offerMoM[selectedOffer].data[i] / 1000) }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="imp" stroke={C.amber} fill={`${C.amber}20`} strokeWidth={2} name="Impressions K" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <SectionLabel>Conversions</SectionLabel>
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={months.map((m, i) => ({ month: m, conv: offerMoM[selectedOffer].conv[i] }))}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                    <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                    <Tooltip content={<Tip />} />
                    <Area type="monotone" dataKey="conv" stroke={C.green} fill={`${C.green}20`} strokeWidth={2} name="Conversions" />
                  </AreaChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <SectionLabel>All offers — impressions trend (K)</SectionLabel>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={offerLineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" stroke={C.muted} tick={{ fontSize: 11 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                  <Tooltip content={<Tip />} />
                  {offerMoM.map((o, i) => <Line key={o.name} type="monotone" dataKey={o.name} stroke={[C.amber, C.teal, C.pink, C.blue][i]} strokeWidth={2} dot={{ r: 3 }} />)}
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </>
        )}

        {tab === "sov" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card>
                <SectionLabel>Placement SOV breakdown</SectionLabel>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {placementSOV.map((p, i) => (
                    <div key={i}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.subtle, marginBottom: 3 }}>
                        <span>{p.name}</span><span style={{ color: C.text, fontWeight: 500 }}>{p.value}%</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: C.dimBg, overflow: "hidden" }}>
                        <div style={{ width: `${p.value}%`, height: "100%", background: p.fill, borderRadius: 4, transition: "width .6s" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <SectionLabel>Publisher — planned vs. optimized ($K)</SectionLabel>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={pubSOV} layout="vertical" barGap={2}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                    <XAxis type="number" stroke={C.muted} tick={{ fontSize: 10 }} tickFormatter={v => `$${v}K`} />
                    <YAxis dataKey="name" type="category" stroke={C.muted} tick={{ fontSize: 10 }} width={100} />
                    <Tooltip content={<Tip />} />
                    <Bar dataKey="planned" fill={C.purple} radius={[0, 4, 4, 0]} barSize={10} name="Planned $K" />
                    <Bar dataKey="optimized" fill={C.teal} radius={[0, 4, 4, 0]} barSize={10} name="Optimized $K" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
            <Card>
              <SectionLabel>Publisher detail</SectionLabel>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                      {["Publisher", "Placements", "Planned $K", "Optimized $K", "Delta", "Avg GPM"].map(h => (
                        <th key={h} style={{ padding: "8px 10px", textAlign: "left", color: C.muted, fontWeight: 500 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pubSOV.map((p, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}10` }}>
                        <td style={{ padding: "8px 10px", fontWeight: 500 }}>{p.name}</td>
                        <td style={{ padding: "8px 10px", color: C.subtle }}>{p.placements}</td>
                        <td style={{ padding: "8px 10px", color: C.purple }}>${p.planned}K</td>
                        <td style={{ padding: "8px 10px", color: C.teal }}>${p.optimized}K</td>
                        <td style={{ padding: "8px 10px" }}><ChgBadge val={p.planned > 0 ? ((p.optimized - p.planned) / p.planned * 100) : -100} /></td>
                        <td style={{ padding: "8px 10px", color: p.gpm >= 52 ? C.green : C.red }}>{p.gpm}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </>
        )}

        {tab === "cap" && (
          <>
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {capVTC.offers.map(o => (
                <button key={o} onClick={() => setCapOffer(o)} style={{
                  padding: "6px 14px", fontSize: 12, fontFamily: "inherit", borderRadius: 20, cursor: "pointer",
                  background: capOffer === o ? C.pink : "transparent", color: capOffer === o ? C.bg : C.muted,
                  border: `1px solid ${capOffer === o ? C.pink : C.border}`, fontWeight: capOffer === o ? 600 : 400,
                }}>{o}</button>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <Card style={{ borderTop: `3px solid ${C.pink}`, borderRadius: 0 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Total VTC (15-day)</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: C.pink, fontFamily: "Georgia, serif" }}>
                  {capVTC.data[capOffer].vtc.reduce((a, b) => a + b, 0)}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>View-through conversions</div>
              </Card>
              <Card style={{ borderTop: `3px solid ${C.teal}`, borderRadius: 0 }}>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Total CTC (15-day)</div>
                <div style={{ fontSize: 28, fontWeight: 600, color: C.teal, fontFamily: "Georgia, serif" }}>
                  {capVTC.data[capOffer].ctc.reduce((a, b) => a + b, 0)}
                </div>
                <div style={{ fontSize: 11, color: C.muted }}>Click-through conversions</div>
              </Card>
            </div>

            <Card style={{ marginBottom: 16 }}>
              <SectionLabel>Daily lag decay — VTC vs. CTC</SectionLabel>
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={capChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 10 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                  <Tooltip content={<Tip />} />
                  <Area type="monotone" dataKey="CTC" stroke={C.teal} fill={`${C.teal}20`} strokeWidth={2} name="Click-through" />
                  <Area type="monotone" dataKey="VTC" stroke={C.pink} fill={`${C.pink}20`} strokeWidth={2} name="View-through" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <SectionLabel>Cumulative conversions — optimization window</SectionLabel>
              <ResponsiveContainer width="100%" height={240}>
                <LineChart data={capChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="day" stroke={C.muted} tick={{ fontSize: 10 }} />
                  <YAxis stroke={C.muted} tick={{ fontSize: 11 }} />
                  <Tooltip content={<Tip />} />
                  <Line type="monotone" dataKey="cumCTC" stroke={C.teal} strokeWidth={2.5} dot={{ r: 3 }} name="Cumulative CTC" />
                  <Line type="monotone" dataKey="cumVTC" stroke={C.pink} strokeWidth={2.5} dot={{ r: 3 }} name="Cumulative VTC" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ marginTop: 12, padding: "10px 14px", background: `${C.amber}10`, borderRadius: 8, border: `1px solid ${C.amber}25`, fontSize: 12, color: C.subtle }}>
                <span style={{ color: C.amber, fontWeight: 600 }}>Insight:</span> ~80% of conversions occur within the first 5 days post-impression. Optimize cap frequency at day 5 to maximize ROI while minimizing wasted spend on diminishing returns.
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}