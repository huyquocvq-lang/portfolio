import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area, PieChart, Pie, Legend } from "recharts";

const COLORS = {
  bg: "#0B0F1A",
  card: "#111827",
  cardHover: "#1a2235",
  border: "#1E293B",
  accent: "#22D3EE",
  accentDim: "rgba(34,211,238,0.15)",
  green: "#10B981",
  greenDim: "rgba(16,185,129,0.15)",
  red: "#F43F5E",
  redDim: "rgba(244,63,94,0.15)",
  amber: "#F59E0B",
  amberDim: "rgba(245,158,11,0.15)",
  purple: "#A78BFA",
  purpleDim: "rgba(167,139,250,0.15)",
  text: "#F1F5F9",
  textMuted: "#94A3B8",
  textDim: "#64748B",
};

const fmt = (n) => {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(0)}K`;
  return `$${n}`;
};
const fmtN = (n) => {
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`;
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`;
  return n.toString();
};
const pct = (n) => `${(n * 100).toFixed(1)}%`;

const dailyData = [
  { d: "Day 1", rev: 9120, cost: 5890, conv: 49 },
  { d: "Day 2", rev: 8940, cost: 5530, conv: 55 },
  { d: "Day 3", rev: 234400, cost: 219800, conv: 636 },
  { d: "Day 4", rev: 202740, cost: 169000, conv: 512 },
  { d: "Day 5", rev: 204970, cost: 151240, conv: 464 },
  { d: "Day 6", rev: 311650, cost: 189090, conv: 721 },
  { d: "Day 7", rev: 203420, cost: 175110, conv: 582 },
  { d: "Day 8", rev: 232900, cost: 187260, conv: 660 },
  { d: "Day 9", rev: 214500, cost: 160220, conv: 563 },
  { d: "Day 10", rev: 232710, cost: 153840, conv: 601 },
  { d: "Day 11", rev: 216220, cost: 171290, conv: 520 },
  { d: "Day 12", rev: 232290, cost: 173160, conv: 509 },
  { d: "Day 13", rev: 274500, cost: 218010, conv: 672 },
  { d: "Day 14", rev: 261720, cost: 213300, conv: 661 },
  { d: "Day 15", rev: 224580, cost: 199780, conv: 612 },
  { d: "Day 16", rev: 217830, cost: 204440, conv: 607 },
  { d: "Day 17", rev: 246980, cost: 207840, conv: 658 },
  { d: "Day 18", rev: 236530, cost: 193790, conv: 541 },
  { d: "Day 19", rev: 265170, cost: 208180, conv: 558 },
  { d: "Day 20", rev: 321200, cost: 263380, conv: 786 },
  { d: "Day 21", rev: 321030, cost: 287730, conv: 787 },
  { d: "Day 22", rev: 330030, cost: 275180, conv: 833 },
  { d: "Day 23", rev: 315310, cost: 257520, conv: 800 },
  { d: "Day 24", rev: 344720, cost: 285930, conv: 829 },
  { d: "Day 25", rev: 291120, cost: 253840, conv: 661 },
  { d: "Day 26", rev: 263360, cost: 216750, conv: 564 },
  { d: "Day 27", rev: 307030, cost: 240270, conv: 769 },
  { d: "Day 28", rev: 242240, cost: 223550, conv: 643 },
  { d: "Day 29", rev: 241820, cost: 235870, conv: 614 },
  { d: "Day 30", rev: 185940, cost: 194370, conv: 494 },
].map((r) => ({ ...r, profit: r.rev - r.cost, gpm: r.rev > 0 ? ((r.rev - r.cost) / r.rev) : 0 }));

const publishers = [
  { name: "Channel Alpha - SEM", rev: 2685594, cost: 2667434, conv: 6845, gpm: 0.0068, ecpa: 389.7, clicks: 56404 },
  { name: "Channel Beta - Social", rev: 785040, cost: 848578, conv: 2078, gpm: -0.0809, ecpa: 408.28, clicks: 27065 },
  { name: "Channel Gamma - Search", rev: 617412, cost: 587982, conv: 1656, gpm: 0.0477, ecpa: 355.06, clicks: 11839 },
  { name: "Partner Network A", rev: 579149, cost: 342836, conv: 1296, gpm: 0.408, ecpa: 264.53, clicks: 54486 },
  { name: "DSP Platform X", rev: 531736, cost: 314221, conv: 1921, gpm: 0.4091, ecpa: 163.55, clicks: 47915 },
  { name: "Channel Alpha - Direct", rev: 373410, cost: 251880, conv: 779, gpm: 0.3255, ecpa: 323.42, clicks: 25091 },
  { name: "Publisher Hub Z", rev: 344952, cost: 0, conv: 125, gpm: 1.0, ecpa: 0, clicks: 91280 },
  { name: "App Network M", rev: 250505, cost: 175182, conv: 804, gpm: 0.3007, ecpa: 217.89, clicks: 10591 },
  { name: "Channel Delta - Feed", rev: 215190, cost: 192617, conv: 553, gpm: 0.1049, ecpa: 348.19, clicks: 9205 },
  { name: "Channel Beta - Display", rev: 125359, cost: 118981, conv: 185, gpm: 0.0509, ecpa: 643.84, clicks: 15245 },
  { name: "DSP Platform Y", rev: 119441, cost: 50305, conv: 404, gpm: 0.5788, ecpa: 124.39, clicks: 10961 },
  { name: "Premium Pub Q", rev: 110882, cost: 77713, conv: 103, gpm: 0.2991, ecpa: 753.03, clicks: 21169 },
];

const offers = [
  { name: "Product A - Premium Card", rev: 1651260, cost: 405832, conv: 4024 },
  { name: "Product B - Balance Transfer", rev: 704676, cost: 352342, conv: 1758 },
  { name: "Product C - Savings Account", rev: 571970, cost: 236674, conv: 2365 },
  { name: "Product D - Cashback Card", rev: 502710, cost: 376750, conv: 1547 },
  { name: "Product E - Rewards Card", rev: 486780, cost: 351612, conv: 1388 },
  { name: "Product F - Travel Card", rev: 356160, cost: 249961, conv: 548 },
  { name: "Product G - Cash Rewards", rev: 297420, cost: 244594, conv: 740 },
  { name: "Product H - Checking Acct", rev: 261995, cost: 139066, conv: 1411 },
  { name: "Product I - Everyday Acct", rev: 253080, cost: 193048, conv: 844 },
  { name: "Product J - Term Deposit", rev: 252648, cost: 140743, conv: 276 },
];

const CHART_COLORS = ["#22D3EE", "#A78BFA", "#10B981", "#F59E0B", "#F43F5E", "#818CF8", "#34D399", "#FB923C", "#E879F9", "#38BDF8"];

const totals = {
  rev: 6957965,
  cost: 5792794,
  profit: 1165171,
  gpm: 0.167,
  conv: 17038,
  ecpa: 408,
  funded: 670,
  fundAmt: 1539802,
  apps: 27011,
  approved: 12847,
};

function KpiCard({ label, value, sub, color }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16,
      padding: "22px 24px", display: "flex", flexDirection: "column", gap: 6,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${color}, transparent)`,
      }} />
      <span style={{ fontSize: 12, color: COLORS.textDim, letterSpacing: 1.2, textTransform: "uppercase", fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 28, fontWeight: 700, color: COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
      {sub && <span style={{ fontSize: 12, color: COLORS.textMuted }}>{sub}</span>}
    </div>
  );
}

function CustomTooltip({ active, payload, label, formatter }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "#1E293B", border: `1px solid ${COLORS.border}`, borderRadius: 10,
      padding: "12px 16px", boxShadow: "0 8px 32px rgba(0,0,0,.5)",
    }}>
      <p style={{ color: COLORS.textMuted, fontSize: 11, margin: 0, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, margin: "3px 0", fontWeight: 600 }}>
          {p.name}: {formatter ? formatter(p.value) : p.value}
        </p>
      ))}
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: COLORS.text, letterSpacing: -0.3 }}>{title}</h2>
      {subtitle && <p style={{ margin: "4px 0 0", fontSize: 12, color: COLORS.textDim }}>{subtitle}</p>}
    </div>
  );
}

const tabs = ["Overview", "Publishers", "Offers"];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [pubSort, setPubSort] = useState("rev");

  const sortedPubs = useMemo(() => {
    const s = [...publishers];
    if (pubSort === "rev") s.sort((a, b) => b.rev - a.rev);
    else if (pubSort === "gpm") s.sort((a, b) => b.gpm - a.gpm);
    else if (pubSort === "conv") s.sort((a, b) => b.conv - a.conv);
    else if (pubSort === "ecpa") s.sort((a, b) => a.ecpa - b.ecpa);
    return s;
  }, [pubSort]);

  const pieData = offers.slice(0, 6).map((o, i) => ({ name: o.name, value: o.rev, fill: CHART_COLORS[i] }));

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", color: COLORS.text,
      fontFamily: "'Inter', -apple-system, sans-serif", padding: "0",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0B0F1A 0%, #1a1040 50%, #0B0F1A 100%)",
        borderBottom: `1px solid ${COLORS.border}`, padding: "28px 32px 20px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{
                width: 10, height: 10, borderRadius: "50%", background: COLORS.green,
                boxShadow: `0 0 8px ${COLORS.green}`,
              }} />
              <span style={{ fontSize: 11, color: COLORS.green, fontWeight: 600, letterSpacing: 1.5, textTransform: "uppercase" }}>Sample Data — Demo Month</span>
            </div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: -0.8, background: "linear-gradient(135deg, #F1F5F9, #22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Performance Marketing Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", color: COLORS.textDim, fontSize: 13 }}>Monthly Analysis — Day 1–30 • All names & figures anonymized</p>
          </div>
          <div style={{ display: "flex", gap: 6, background: COLORS.card, borderRadius: 10, padding: 4, border: `1px solid ${COLORS.border}` }}>
            {tabs.map((t) => (
              <button key={t} onClick={() => setActiveTab(t)} style={{
                background: activeTab === t ? "linear-gradient(135deg, #22D3EE22, #A78BFA22)" : "transparent",
                border: activeTab === t ? `1px solid ${COLORS.accent}44` : "1px solid transparent",
                borderRadius: 8, padding: "8px 18px", color: activeTab === t ? COLORS.accent : COLORS.textDim,
                fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .2s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "24px 32px", maxWidth: 1400, margin: "0 auto" }}>
        {/* KPI Row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14, marginBottom: 28 }}>
          <KpiCard label="Total Revenue" value={fmt(totals.rev)} sub={`Avg ${fmt(Math.round(totals.rev / 30))} / day`} color={COLORS.accent} />
          <KpiCard label="Total Cost" value={fmt(totals.cost)} sub={`${((totals.cost / totals.rev) * 100).toFixed(1)}% of revenue`} color={COLORS.red} />
          <KpiCard label="Gross Profit" value={fmt(totals.profit)} sub={`GPM ${pct(totals.gpm)}`} color={COLORS.green} />
          <KpiCard label="Conversions" value={fmtN(totals.conv)} sub={`eCPA $${totals.ecpa}`} color={COLORS.purple} />
          <KpiCard label="Accounts Funded" value={fmtN(totals.funded)} sub={`${fmt(totals.fundAmt)} funded`} color={COLORS.amber} />
          <KpiCard label="Applications" value={fmtN(totals.apps)} sub={`${fmtN(totals.approved)} approved (${((totals.approved / totals.apps) * 100).toFixed(1)}%)`} color="#818CF8" />
        </div>

        {activeTab === "Overview" && (
          <>
            {/* Revenue vs Cost Area Chart */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionHeader title="Daily Revenue vs. Cost" subtitle="Revenue outpaces cost most days, with a strong ramp in the second half" />
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.accent} stopOpacity={0.35} />
                      <stop offset="100%" stopColor={COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gCost" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={COLORS.red} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={COLORS.red} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="d" tick={{ fill: COLORS.textDim, fontSize: 10 }} interval={2} axisLine={{ stroke: COLORS.border }} />
                  <YAxis tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} axisLine={{ stroke: COLORS.border }} />
                  <Tooltip content={<CustomTooltip formatter={(v) => fmt(v)} />} />
                  <Area type="monotone" dataKey="rev" name="Revenue" stroke={COLORS.accent} fill="url(#gRev)" strokeWidth={2} />
                  <Area type="monotone" dataKey="cost" name="Cost" stroke={COLORS.red} fill="url(#gCost)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Two-col: Daily Profit + Conversions */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
                <SectionHeader title="Daily Gross Profit" subtitle="Green = positive, red = negative margin days" />
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dailyData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="d" tick={{ fill: COLORS.textDim, fontSize: 9 }} interval={3} axisLine={{ stroke: COLORS.border }} />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 9 }} tickFormatter={(v) => `$${(v/1000).toFixed(0)}K`} axisLine={{ stroke: COLORS.border }} />
                    <Tooltip content={<CustomTooltip formatter={(v) => fmt(v)} />} />
                    <Bar dataKey="profit" name="Profit" radius={[3, 3, 0, 0]}>
                      {dailyData.map((d, i) => (
                        <Cell key={i} fill={d.profit >= 0 ? COLORS.green : COLORS.red} opacity={0.85} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
                <SectionHeader title="Daily Conversions" subtitle="Adjusted conversions trend across the month" />
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={dailyData} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                    <XAxis dataKey="d" tick={{ fill: COLORS.textDim, fontSize: 9 }} interval={3} axisLine={{ stroke: COLORS.border }} />
                    <YAxis tick={{ fill: COLORS.textDim, fontSize: 9 }} axisLine={{ stroke: COLORS.border }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="conv" name="Conversions" stroke={COLORS.purple} strokeWidth={2.5} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Revenue by Offer Pie */}
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
              <SectionHeader title="Revenue Split — Top 6 Products" subtitle="Product A dominates at ~24% of total revenue" />
              <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={65} outerRadius={120} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name.split(' - ')[0]} ${(percent * 100).toFixed(0)}%`} labelLine={{ stroke: COLORS.textDim }} style={{ fontSize: 10, fill: COLORS.textMuted }}>
                      {pieData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v) => fmt(v)} contentStyle={{ background: "#1E293B", border: `1px solid ${COLORS.border}`, borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === "Publishers" && (
          <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <SectionHeader title="Channel Performance" subtitle="Top 12 channels ranked by selected metric" />
              <div style={{ display: "flex", gap: 6 }}>
                {[["rev", "Revenue"], ["gpm", "GPM"], ["conv", "Conversions"], ["ecpa", "eCPA ↓"]].map(([k, l]) => (
                  <button key={k} onClick={() => setPubSort(k)} style={{
                    background: pubSort === k ? COLORS.accentDim : "transparent",
                    border: `1px solid ${pubSort === k ? COLORS.accent : COLORS.border}`,
                    borderRadius: 6, padding: "6px 14px", color: pubSort === k ? COLORS.accent : COLORS.textDim,
                    fontSize: 12, fontWeight: 600, cursor: "pointer",
                  }}>{l}</button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={360}>
              <BarChart data={sortedPubs} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={(v) => pubSort === "gpm" ? pct(v) : pubSort === "ecpa" ? `$${v}` : pubSort === "conv" ? fmtN(v) : fmt(v)} axisLine={{ stroke: COLORS.border }} />
                <YAxis type="category" dataKey="name" width={160} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                <Tooltip content={<CustomTooltip formatter={(v) => pubSort === "gpm" ? pct(v) : pubSort === "ecpa" ? `$${v.toFixed(0)}` : pubSort === "conv" ? fmtN(v) : fmt(v)} />} />
                <Bar dataKey={pubSort} name={pubSort === "rev" ? "Revenue" : pubSort === "gpm" ? "GPM" : pubSort === "conv" ? "Conversions" : "eCPA"} radius={[0, 6, 6, 0]}>
                  {sortedPubs.map((p, i) => (
                    <Cell key={i} fill={pubSort === "gpm" ? (p.gpm >= 0 ? COLORS.green : COLORS.red) : CHART_COLORS[i % CHART_COLORS.length]} opacity={0.85} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

            <div style={{ marginTop: 24, overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                    {["Channel", "Revenue", "Cost", "Profit", "GPM", "Conversions", "eCPA", "Clicks"].map((h) => (
                      <th key={h} style={{ textAlign: h === "Channel" ? "left" : "right", padding: "10px 12px", color: COLORS.textDim, fontWeight: 600, fontSize: 10, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedPubs.map((p, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${COLORS.border}22` }}>
                      <td style={{ padding: "10px 12px", fontWeight: 600, color: COLORS.text }}>{p.name}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: COLORS.accent }}>{fmt(p.rev)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>{fmt(p.cost)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: p.rev - p.cost >= 0 ? COLORS.green : COLORS.red }}>{fmt(p.rev - p.cost)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right" }}>
                        <span style={{
                          background: p.gpm >= 0.2 ? COLORS.greenDim : p.gpm >= 0 ? COLORS.amberDim : COLORS.redDim,
                          color: p.gpm >= 0.2 ? COLORS.green : p.gpm >= 0 ? COLORS.amber : COLORS.red,
                          padding: "3px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11,
                          fontFamily: "'JetBrains Mono', monospace",
                        }}>{pct(p.gpm)}</span>
                      </td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: COLORS.text }}>{fmtN(p.conv)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>${p.ecpa.toFixed(0)}</td>
                      <td style={{ padding: "10px 12px", textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: COLORS.textMuted }}>{fmtN(p.clicks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "Offers" && (
          <>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <SectionHeader title="Top 10 Products — Revenue vs. Cost" subtitle="Side-by-side comparison of revenue (cyan) and cost (rose) per product" />
              <ResponsiveContainer width="100%" height={380}>
                <BarChart data={offers} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} horizontal={false} />
                  <XAxis type="number" tick={{ fill: COLORS.textDim, fontSize: 10 }} tickFormatter={(v) => fmt(v)} axisLine={{ stroke: COLORS.border }} />
                  <YAxis type="category" dataKey="name" width={190} tick={{ fill: COLORS.textMuted, fontSize: 11 }} axisLine={{ stroke: COLORS.border }} />
                  <Tooltip content={<CustomTooltip formatter={(v) => fmt(v)} />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: COLORS.textMuted }} />
                  <Bar dataKey="rev" name="Revenue" fill={COLORS.accent} opacity={0.8} radius={[0, 4, 4, 0]} />
                  <Bar dataKey="cost" name="Cost" fill={COLORS.red} opacity={0.5} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
              {offers.map((o, i) => {
                const profit = o.rev - o.cost;
                const gpm = o.rev > 0 ? profit / o.rev : 0;
                return (
                  <div key={i} style={{
                    background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14,
                    padding: 20, position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: CHART_COLORS[i] }} />
                    <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 12 }}>{o.name}</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      <div>
                        <p style={{ margin: 0, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: .8 }}>Revenue</p>
                        <p style={{ margin: "2px 0 0", fontSize: 16, fontWeight: 700, color: COLORS.accent, fontFamily: "'JetBrains Mono', monospace" }}>{fmt(o.rev)}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: .8 }}>GPM</p>
                        <p style={{
                          margin: "2px 0 0", fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace",
                          color: gpm >= 0.2 ? COLORS.green : gpm >= 0 ? COLORS.amber : COLORS.red,
                        }}>{pct(gpm)}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: .8 }}>Conversions</p>
                        <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 600, color: COLORS.text }}>{fmtN(o.conv)}</p>
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: 10, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: .8 }}>eCPA</p>
                        <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 600, color: COLORS.textMuted }}>{o.conv > 0 ? `$${(o.cost / o.conv).toFixed(0)}` : "—"}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        <p style={{ textAlign: "center", color: COLORS.textDim, fontSize: 11, marginTop: 32, paddingBottom: 20 }}>
          Performance Marketing Dashboard • Anonymized Demo Data • All names and figures are fictional
        </p>
      </div>
    </div>
  );
}
