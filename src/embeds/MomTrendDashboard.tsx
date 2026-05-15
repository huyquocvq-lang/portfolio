import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, Legend } from "recharts";

const C = {
  bg: "#06080D", card: "#0D1117", border: "#1B2332", accent: "#58A6FF",
  accentDim: "rgba(88,166,255,0.12)", green: "#3FB950", greenDim: "rgba(63,185,80,0.12)",
  red: "#F85149", redDim: "rgba(248,81,73,0.12)", amber: "#D29922",
  amberDim: "rgba(210,153,34,0.12)", purple: "#BC8CFF", purpleDim: "rgba(188,140,255,0.12)",
  teal: "#39D2C0", pink: "#F778BA", text: "#E6EDF3", muted: "#8B949E", dim: "#484F58",
};

const P = ["#58A6FF", "#BC8CFF", "#3FB950", "#D29922", "#F85149", "#39D2C0", "#F778BA", "#79C0FF"];

const fmt = (n) => n >= 1e6 ? `$${(n/1e6).toFixed(2)}M` : n >= 1e3 ? `$${(n/1e3).toFixed(0)}K` : `$${n}`;
const fmtS = (n) => n >= 1e6 ? `${(n/1e6).toFixed(1)}M` : n >= 1e3 ? `${(n/1e3).toFixed(1)}K` : `${n}`;
const pct = (n) => `${(n*100).toFixed(1)}%`;

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

const monthlyTrend = [
  { m: "Jan", rev: 8379839, cost: 5702633, conv: 28399, funded: 1048, gpm: 0.3195 },
  { m: "Feb", rev: 7632745, cost: 5041506, conv: 23558, funded: 832, gpm: 0.3395 },
  { m: "Mar", rev: 7513406, cost: 6068723, conv: 21976, funded: 1446, gpm: 0.1923 },
  { m: "Apr", rev: 7148014, cost: 4394801, conv: 19597, funded: 1301, gpm: 0.3852 },
  { m: "May", rev: 6122909, cost: 4169640, conv: 15864, funded: 1116, gpm: 0.3190 },
  { m: "Jun", rev: 4112756, cost: 3222261, conv: 10631, funded: 539, gpm: 0.2165 },
].map(r => ({ ...r, profit: r.rev - r.cost }));

const topProducts = [
  { name: "Product Alpha - Premium", rev: 5734320, cost: 2848106, conv: 16267 },
  { name: "Product Beta - Savings", rev: 4015035, cost: 1396908, conv: 19208 },
  { name: "Product Gamma - Rewards", rev: 3100440, cost: 1898897, conv: 8856 },
  { name: "Product Delta - Balance", rev: 2917746, cost: 1743224, conv: 10166 },
  { name: "Product Epsilon - Travel", rev: 2464860, cost: 1749424, conv: 4872 },
  { name: "Product Zeta - Cashback", rev: 2445444, cost: 1518827, conv: 7788 },
  { name: "Product Eta - Checking", rev: 2151174, cost: 986264, conv: 9367 },
  { name: "Product Theta - Cash Bk", rev: 1787422, cost: 1895810, conv: 4770 },
];

const topChannels = [
  { name: "Channel Prime - SEM", rev: 12775996, cost: 11658106, conv: 35327 },
  { name: "Channel Nexus - Search", rev: 6981391, cost: 5730166, conv: 20036 },
  { name: "Channel Atlas - Network", rev: 5891530, cost: 3246006, conv: 20928 },
  { name: "Channel Orbit - Content", rev: 4662340, cost: 85, conv: 9850 },
  { name: "Channel Vertex - Direct", rev: 2663550, cost: 1818769, conv: 6426 },
  { name: "Channel Nova - Premium", rev: 1134947, cost: 794570, conv: 4963 },
  { name: "Channel Prism - Social", rev: 655662, cost: 630684, conv: 1926 },
  { name: "Channel Relay - Display", rev: 636702, cost: 540373, conv: 1829 },
];

// Monthly revenue by product (for sparklines)
const prodMonthly = [
  { name: "Product Alpha - Premium", data: [1176000,1714260,1369140,793800,441000,240120] },
  { name: "Product Beta - Savings", data: [870998,844099,961184,737827,362477,238450] },
  { name: "Product Gamma - Rewards", data: [399420,386400,498960,906360,514920,394380] },
  { name: "Product Delta - Balance", data: [396210,420396,424200,565200,605640,506100] },
  { name: "Product Epsilon - Travel", data: [939840,426360,359940,231660,238140,268920] },
  { name: "Product Zeta - Cashback", data: [468600,319614,334440,496080,488670,338040] },
  { name: "Product Eta - Checking", data: [502705,453080,430790,318443,271355,174801] },
  { name: "Product Theta - Cash Bk", data: [278543,308879,372000,291600,287550,248850] },
];

const chanMonthly = [
  { name: "Channel Prime - SEM", data: [2819364,2822952,1981955,2011930,1675566,1465230] },
  { name: "Channel Nexus - Search", data: [1461301,1213061,1379891,1283604,1031430,612504] },
  { name: "Channel Atlas - Network", data: [1412804,1197080,1289660,1012280,603950,378754] },
  { name: "Channel Orbit - Content", data: [746018,728744,1017882,885718,813930,471410] },
  { name: "Channel Vertex - Direct", data: [418300,350208,324940,547646,687628,334878] },
  { name: "Channel Nova - Premium", data: [269342,194838,207342,133130,179204,151290] },
  { name: "Channel Prism - Social", data: [127662,120150,90000,129120,115290,73440] },
  { name: "Channel Relay - Display", data: [135042,71280,102720,135090,128940,63630] },
];

// Build multi-line data
const prodLineData = months.map((m, i) => {
  const obj = { month: m };
  prodMonthly.forEach(p => { obj[p.name] = p.data[i]; });
  return obj;
});
const chanLineData = months.map((m, i) => {
  const obj = { month: m };
  chanMonthly.forEach(c => { obj[c.name] = c.data[i]; });
  return obj;
});

function Kpi({ label, value, sub, color }) {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "18px 20px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <div style={{ fontSize: 10, color: C.dim, letterSpacing: 1.4, textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 26, fontWeight: 800, color: C.text, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function Tip({ active, payload, label, fn }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#161B22", border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.6)" }}>
      <div style={{ color: C.muted, fontSize: 10, marginBottom: 5 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || p.stroke, fontSize: 12, fontWeight: 600, margin: "2px 0" }}>
          {p.name}: {fn ? fn(p.value) : p.value}
        </div>
      ))}
    </div>
  );
}

const tabs = ["Trends", "Products", "Channels"];

export default function App() {
  const [tab, setTab] = useState("Trends");
  const [prodSort, setProdSort] = useState("rev");
  const [chanSort, setChanSort] = useState("rev");

  const sortedProds = useMemo(() => {
    const s = [...topProducts];
    const gpm = p => p.rev > 0 ? (p.rev - p.cost) / p.rev : 0;
    if (prodSort === "rev") s.sort((a, b) => b.rev - a.rev);
    else if (prodSort === "gpm") s.sort((a, b) => gpm(b) - gpm(a));
    else if (prodSort === "conv") s.sort((a, b) => b.conv - a.conv);
    return s;
  }, [prodSort]);

  const sortedChans = useMemo(() => {
    const s = [...topChannels];
    const gpm = p => p.rev > 0 ? (p.rev - p.cost) / p.rev : 0;
    if (chanSort === "rev") s.sort((a, b) => b.rev - a.rev);
    else if (chanSort === "gpm") s.sort((a, b) => gpm(b) - gpm(a));
    else if (chanSort === "conv") s.sort((a, b) => b.conv - a.conv);
    return s;
  }, [chanSort]);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "24px 28px 18px", background: "linear-gradient(180deg, #0D1117 0%, #06080D 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><rect x="1" y="10" width="4" height="7" rx="1" fill={C.accent}/><rect x="7" y="6" width="4" height="11" rx="1" fill={C.purple}/><rect x="13" y="2" width="4" height="15" rx="1" fill={C.green}/></svg>
              <span style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>Month-over-Month Analysis</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900, letterSpacing: -0.8, color: C.text }}>
              Offer Trends Dashboard
            </h1>
            <p style={{ margin: "3px 0 0", color: C.dim, fontSize: 12 }}>Jan–Jun 2025 • All names & figures anonymized</p>
          </div>
          <div style={{ display: "flex", gap: 4, background: C.card, borderRadius: 8, padding: 3, border: `1px solid ${C.border}` }}>
            {tabs.map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: tab === t ? C.accentDim : "transparent",
                border: tab === t ? `1px solid ${C.accent}44` : "1px solid transparent",
                borderRadius: 6, padding: "7px 16px", color: tab === t ? C.accent : C.dim,
                fontWeight: 700, fontSize: 12, cursor: "pointer", transition: "all .15s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 28px", maxWidth: 1360, margin: "0 auto" }}>
        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 12, marginBottom: 24 }}>
          <Kpi label="Total Revenue" value="$40.9M" sub="6-month cumulative" color={C.accent} />
          <Kpi label="Total Cost" value="$28.6M" sub="69.9% of revenue" color={C.red} />
          <Kpi label="Gross Profit" value="$12.3M" sub="GPM 30.3%" color={C.green} />
          <Kpi label="Conversions" value="120K" sub="eCPA $342" color={C.purple} />
          <Kpi label="Accounts Funded" value="6,282" sub="$35.9M funded" color={C.amber} />
          <Kpi label="Approvals" value="54.8K" sub="50.4% approval rate" color={C.teal} />
        </div>

        {tab === "Trends" && (
          <>
            {/* Revenue vs Cost */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700, color: C.text }}>Monthly Revenue vs. Cost</h3>
              <p style={{ margin: "0 0 16px", fontSize: 11, color: C.dim }}>Revenue declining through H1 — cost tracking proportionally but GPM fluctuates</p>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyTrend} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.accent} stopOpacity={0.3}/><stop offset="100%" stopColor={C.accent} stopOpacity={0}/></linearGradient>
                    <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.red} stopOpacity={0.15}/><stop offset="100%" stopColor={C.red} stopOpacity={0}/></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="m" tick={{ fill: C.dim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={fmt} />} />
                  <Area type="monotone" dataKey="rev" name="Revenue" stroke={C.accent} fill="url(#gr)" strokeWidth={2.5} />
                  <Area type="monotone" dataKey="cost" name="Cost" stroke={C.red} fill="url(#gc)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* GPM + Conversions side by side */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Gross Profit Margin</h3>
                <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Monthly GPM trend — April peaked at 38.5%</p>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={monthlyTrend} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="m" tick={{ fill: C.dim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                    <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => pct(v)} domain={[0, 0.45]} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<Tip fn={pct} />} />
                    <Bar dataKey="gpm" name="GPM" radius={[4, 4, 0, 0]}>
                      {monthlyTrend.map((d, i) => <Cell key={i} fill={d.gpm >= 0.3 ? C.green : d.gpm >= 0.2 ? C.amber : C.red} opacity={0.8} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
                <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Conversions & Funded</h3>
                <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Both metrics trending down through H1</p>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={monthlyTrend} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                    <XAxis dataKey="m" tick={{ fill: C.dim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                    <YAxis yAxisId="l" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => fmtS(v)} axisLine={{ stroke: C.border }} />
                    <YAxis yAxisId="r" orientation="right" tick={{ fill: C.dim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                    <Tooltip content={<Tip fn={fmtS} />} />
                    <Line yAxisId="l" type="monotone" dataKey="conv" name="Conversions" stroke={C.purple} strokeWidth={2.5} dot={{ r: 3 }} />
                    <Line yAxisId="r" type="monotone" dataKey="funded" name="Funded" stroke={C.teal} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Monthly profit */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700 }}>Monthly Gross Profit</h3>
              <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Absolute profit dollars per month</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyTrend} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="m" tick={{ fill: C.dim, fontSize: 10 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => fmt(v)} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={fmt} />} />
                  <Bar dataKey="profit" name="Profit" radius={[4, 4, 0, 0]}>
                    {monthlyTrend.map((d, i) => <Cell key={i} fill={d.profit >= 0 ? C.green : C.red} opacity={0.75} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}

        {tab === "Products" && (
          <>
            {/* Sort controls */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[["rev","Revenue"],["gpm","GPM"],["conv","Conversions"]].map(([k,l]) => (
                <button key={k} onClick={() => setProdSort(k)} style={{
                  background: prodSort === k ? C.accentDim : "transparent",
                  border: `1px solid ${prodSort === k ? C.accent : C.border}`,
                  borderRadius: 6, padding: "6px 14px", color: prodSort === k ? C.accent : C.dim,
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>{l}</button>
              ))}
            </div>

            {/* Bar chart */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>Top Products — 6-Month Totals</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={sortedProds} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                  <XAxis type="number" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => prodSort === "gpm" ? pct(v > 0 ? (v) : 0) : prodSort === "conv" ? fmtS(v) : fmt(v)} axisLine={{ stroke: C.border }} />
                  <YAxis type="category" dataKey="name" width={185} tick={{ fill: C.muted, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={v => prodSort === "gpm" ? pct(v) : prodSort === "conv" ? fmtS(v) : fmt(v)} />} />
                  <Bar dataKey={prodSort === "gpm" ? "rev" : prodSort} name={prodSort === "rev" ? "Revenue" : prodSort === "conv" ? "Conversions" : "GPM"} radius={[0,6,6,0]}>
                    {sortedProds.map((p, i) => {
                      const g = p.rev > 0 ? (p.rev - p.cost) / p.rev : 0;
                      return <Cell key={i} fill={prodSort === "gpm" ? (g >= 0.3 ? C.green : g >= 0 ? C.amber : C.red) : P[i % P.length]} opacity={0.8} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly trend lines */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Product Revenue — Month over Month</h3>
              <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Revenue trajectory for each product across 6 months</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={prodLineData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.dim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => fmt(v)} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={fmt} />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: C.muted }} />
                  {prodMonthly.map((p, i) => (
                    <Line key={i} type="monotone" dataKey={p.name} stroke={P[i]} strokeWidth={2} dot={{ r: 2.5 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Product cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {topProducts.map((p, i) => {
                const gpm = p.rev > 0 ? (p.rev - p.cost) / p.rev : 0;
                const ecpa = p.conv > 0 ? p.cost / p.conv : 0;
                return (
                  <div key={i} style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 18, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: P[i] }} />
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 10 }}>{p.name}</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {[["Revenue", fmt(p.rev), C.accent], ["GPM", pct(gpm), gpm >= 0.3 ? C.green : gpm >= 0 ? C.amber : C.red], ["Conversions", fmtS(p.conv), C.text], ["eCPA", `$${ecpa.toFixed(0)}`, C.muted]].map(([l,v,c]) => (
                        <div key={l}>
                          <div style={{ fontSize: 9, color: C.dim, textTransform: "uppercase", letterSpacing: .8, fontWeight: 700 }}>{l}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: c, fontFamily: "'JetBrains Mono', monospace", marginTop: 2 }}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {tab === "Channels" && (
          <>
            <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
              {[["rev","Revenue"],["gpm","GPM"],["conv","Conversions"]].map(([k,l]) => (
                <button key={k} onClick={() => setChanSort(k)} style={{
                  background: chanSort === k ? C.accentDim : "transparent",
                  border: `1px solid ${chanSort === k ? C.accent : C.border}`,
                  borderRadius: 6, padding: "6px 14px", color: chanSort === k ? C.accent : C.dim,
                  fontSize: 11, fontWeight: 700, cursor: "pointer",
                }}>{l}</button>
              ))}
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 14px", fontSize: 16, fontWeight: 700 }}>Top Channels — 6-Month Totals</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={sortedChans} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                  <XAxis type="number" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => chanSort === "conv" ? fmtS(v) : fmt(v)} axisLine={{ stroke: C.border }} />
                  <YAxis type="category" dataKey="name" width={175} tick={{ fill: C.muted, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={v => chanSort === "conv" ? fmtS(v) : fmt(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="rev" name="Revenue" fill={C.accent} opacity={0.8} radius={[0,4,4,0]} />
                  <Bar dataKey="cost" name="Cost" fill={C.red} opacity={0.4} radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, marginBottom: 20 }}>
              <h3 style={{ margin: "0 0 4px", fontSize: 16, fontWeight: 700 }}>Channel Revenue — Month over Month</h3>
              <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>How each channel's contribution evolved over time</p>
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={chanLineData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                  <XAxis dataKey="month" tick={{ fill: C.dim, fontSize: 11 }} axisLine={{ stroke: C.border }} />
                  <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={v => fmt(v)} axisLine={{ stroke: C.border }} />
                  <Tooltip content={<Tip fn={fmt} />} />
                  <Legend wrapperStyle={{ fontSize: 10, color: C.muted }} />
                  {chanMonthly.map((c, i) => (
                    <Line key={i} type="monotone" dataKey={c.name} stroke={P[i]} strokeWidth={2} dot={{ r: 2.5 }} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Channel table */}
            <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: 22, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                    {["Channel","Revenue","Cost","Profit","GPM","Conversions","eCPA"].map(h => (
                      <th key={h} style={{ textAlign: h === "Channel" ? "left" : "right", padding: "10px 12px", color: C.dim, fontWeight: 700, fontSize: 9, textTransform: "uppercase", letterSpacing: 1.2 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedChans.map((c, i) => {
                    const profit = c.rev - c.cost;
                    const gpm = c.rev > 0 ? profit / c.rev : 0;
                    const ecpa = c.conv > 0 ? c.cost / c.conv : 0;
                    return (
                      <tr key={i} style={{ borderBottom: `1px solid ${C.border}15` }}>
                        <td style={{ padding: "10px 12px", fontWeight: 600, color: C.text }}>{c.name}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.accent }}>{fmt(c.rev)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>{fmt(c.cost)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: profit >= 0 ? C.green : C.red }}>{fmt(profit)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right" }}>
                          <span style={{
                            background: gpm >= 0.3 ? C.greenDim : gpm >= 0 ? C.amberDim : C.redDim,
                            color: gpm >= 0.3 ? C.green : gpm >= 0 ? C.amber : C.red,
                            padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11, fontFamily: "'JetBrains Mono'",
                          }}>{pct(gpm)}</span>
                        </td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.text }}>{fmtS(c.conv)}</td>
                        <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>${ecpa.toFixed(0)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}

        <p style={{ textAlign: "center", color: C.dim, fontSize: 10, marginTop: 28, paddingBottom: 16 }}>
          MoM Offer Trends Dashboard • All names and figures are anonymized • Demo Only
        </p>
      </div>
    </div>
  );
}
