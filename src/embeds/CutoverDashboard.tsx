import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, ScatterChart, Scatter, ZAxis, ReferenceLine } from "recharts";

const C = {
  bg: "#0A0C10", card: "#12151E", border: "#1E2433", accent: "#6EE7B7",
  accentDim: "rgba(110,231,183,0.1)", blue: "#60A5FA", blueDim: "rgba(96,165,250,0.1)",
  red: "#FB7185", redDim: "rgba(251,113,133,0.1)", amber: "#FBBF24",
  amberDim: "rgba(251,191,36,0.1)", purple: "#C084FC", purpleDim: "rgba(192,132,252,0.1)",
  teal: "#2DD4BF", pink: "#F472B6", text: "#E8ECF4", muted: "#8892A4", dim: "#525C6E",
  row1: "rgba(255,255,255,0.015)", row2: "transparent",
};
const GP = ["#6EE7B7","#60A5FA","#C084FC","#FBBF24","#FB7185","#2DD4BF","#F472B6","#38BDF8"];
const fmt = n => n >= 1e6 ? "$"+(n/1e6).toFixed(2)+"M" : n >= 1e3 ? "$"+(n/1e3).toFixed(0)+"K" : "$"+Math.round(n);
const fmtS = n => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(1)+"K" : ""+n;
const pct = n => (n*100).toFixed(1)+"%";

const publishers = [
  { name: "Network Alpha", hist_rev: 555438, hist_cost: 298396, planned: 124563, optimized: 119048, proj_rev: 259508, gpm: 0.4628, conv: 1432 },
  { name: "Publisher Omega", hist_rev: 301755, hist_cost: 0, planned: 60958, optimized: 88243, proj_rev: 126996, gpm: 1.0, conv: 120 },
  { name: "DSP Platform Y", hist_rev: 282591, hist_cost: 150149, planned: 59214, optimized: 48079, proj_rev: 123362, gpm: 0.4687, conv: 1028 },
  { name: "Premium Pub Q", hist_rev: 130655, hist_cost: 91468, planned: 44586, optimized: 0, proj_rev: 92887, gpm: 0.2999, conv: 100 },
  { name: "DSP Platform Z", hist_rev: 110552, hist_cost: 38087, planned: 10323, optimized: 14358, proj_rev: 21506, gpm: 0.6555, conv: 428 },
  { name: "Ad Network Delta", hist_rev: 71528, hist_cost: 30826, planned: 4967, optimized: 3790, proj_rev: 10349, gpm: 0.569, conv: 213 },
  { name: "Search Engine G", hist_rev: 71286, hist_cost: 28644, planned: 16219, optimized: 22710, proj_rev: 33791, gpm: 0.5982, conv: 193 },
  { name: "Finance Wire M", hist_rev: 17722, hist_cost: 13290, planned: 120, optimized: 0, proj_rev: 250, gpm: 0.25, conv: 68 },
  { name: "Social Channel F", hist_rev: 14699, hist_cost: 121, planned: 0, optimized: 0, proj_rev: 0, gpm: 0.9918, conv: 18 },
  { name: "News Outlet U", hist_rev: 13092, hist_cost: 9165, planned: 0, optimized: 0, proj_rev: 0, gpm: 0.2999, conv: 18 },
];
const offers = [
  { name: "Product A - Savings Acct", hist_rev: 478251, hist_cost: 164233, budget: 132250, planned: 104342, optimized: 103477, proj_rev: 217379, gpm: 0.6566, conv: 2008 },
  { name: "Product B - Premium Svgs", hist_rev: 269554, hist_cost: 142530, budget: 46000, planned: 31962, optimized: 31334, proj_rev: 66586, gpm: 0.4712, conv: 219 },
  { name: "Product C - Checking", hist_rev: 236821, hist_cost: 106479, budget: 69000, planned: 50181, optimized: 50246, proj_rev: 104544, gpm: 0.5504, conv: 1171 },
  { name: "Product D - 12M Term", hist_rev: 207359, hist_cost: 101009, budget: 69000, planned: 44730, optimized: 42679, proj_rev: 93189, gpm: 0.5129, conv: 183 },
  { name: "Product E - Family Acct", hist_rev: 159349, hist_cost: 17701, budget: 63250, planned: 31646, optimized: 31596, proj_rev: 65927, gpm: 0.8889, conv: 0 },
  { name: "Product F - Brokerage", hist_rev: 81924, hist_cost: 58733, budget: 17250, planned: 6557, optimized: 8423, proj_rev: 13661, gpm: 0.2831, conv: 69 },
  { name: "Product G - Diversified", hist_rev: 78866, hist_cost: 38570, budget: 28750, planned: 16668, optimized: 8209, proj_rev: 34724, gpm: 0.5109, conv: 18 },
  { name: "Product H - Cash Rsv", hist_rev: 65756, hist_cost: 35148, budget: 46000, planned: 34866, optimized: 20266, proj_rev: 72637, gpm: 0.4655, conv: 16 },
];
const placements = {
  "Network Alpha": [
    { pl: "Alpha_ROS-Mobile-300x250", offer: "Product A", rev: 53351, cost: 17852, gpm: 0.6654, clicks: 4446, conv: 152, planned: 14754, optimized: 21752, delta: 6999 },
    { pl: "Alpha_Mail-Sent-Folder", offer: "Product A", rev: 48231, cost: 6404, gpm: 0.8672, clicks: 4019, conv: 98, planned: 13338, optimized: 19665, delta: 6327 },
    { pl: "Alpha_Mail-Login-CAU", offer: "Product A", rev: 26910, cost: 4907, gpm: 0.8176, clicks: 2243, conv: 75, planned: 7442, optimized: 10972, delta: 3530 },
    { pl: "Alpha_Portal-HP-970x250", offer: "Product A", rev: 25751, cost: 13158, gpm: 0.489, clicks: 2146, conv: 67, planned: 7121, optimized: 0, delta: -7121 },
    { pl: "Alpha_ROS-Mobile-300x250", offer: "Product E", rev: 22425, cost: 8378, gpm: 0.6264, clicks: 1869, conv: 0, planned: 0, optimized: 0, delta: 0 },
    { pl: "Alpha_News-970x250", offer: "Product D", rev: 21004, cost: 10650, gpm: 0.4929, clicks: 1750, conv: 9, planned: 6989, optimized: 0, delta: -6989 },
    { pl: "Alpha_Mail-Sent-Folder", offer: "Product E", rev: 20783, cost: 2814, gpm: 0.8646, clicks: 1732, conv: 0, planned: 0, optimized: 0, delta: 0 },
    { pl: "Alpha_Money-300x600", offer: "Product D", rev: 20548, cost: 8864, gpm: 0.5686, clicks: 1712, conv: 16, planned: 6838, optimized: 13216, delta: 6379 },
  ],
  "Publisher Omega": [
    { pl: "Omega_Content-Ratings", offer: "Product A", rev: 55723, cost: 0, gpm: 1.0, clicks: 4644, conv: 24, planned: 10050, optimized: 14818, delta: 4768 },
    { pl: "Omega_Text-Ad-CAU", offer: "Product E", rev: 26013, cost: 0, gpm: 1.0, clicks: 2168, conv: 0, planned: 8448, optimized: 8462, delta: 13 },
    { pl: "Omega_Ratings-Scale", offer: "Product E", rev: 24274, cost: 0, gpm: 1.0, clicks: 2023, conv: 0, planned: 7883, optimized: 7896, delta: 13 },
    { pl: "Omega_Content-Ratings", offer: "Product E", rev: 20079, cost: 0, gpm: 1.0, clicks: 1673, conv: 0, planned: 6521, optimized: 6531, delta: 10 },
    { pl: "Omega_Content-Ratings", offer: "Product D", rev: 16766, cost: 0, gpm: 1.0, clicks: 1397, conv: 7, planned: 930, optimized: 1797, delta: 867 },
    { pl: "Omega_Content-Ratings", offer: "Product C", rev: 15993, cost: 0, gpm: 1.0, clicks: 1333, conv: 8, planned: 776, optimized: 1095, delta: 319 },
    { pl: "Omega_Card-Module", offer: "Product E", rev: 10391, cost: 0, gpm: 1.0, clicks: 866, conv: 0, planned: 3375, optimized: 3380, delta: 6 },
    { pl: "Omega_ROS-Top-Mobile", offer: "Product A", rev: 9940, cost: 0, gpm: 1.0, clicks: 828, conv: 8, planned: 1793, optimized: 2643, delta: 851 },
  ],
  "DSP Platform Y": [
    { pl: "DSP-Y_Money-300x250", offer: "Product B", rev: 24357, cost: 15181, gpm: 0.3767, clicks: 2030, conv: 23, planned: 4156, optimized: 0, delta: -4156 },
    { pl: "DSP-Y_ROS-Mobile-300x250", offer: "Product A", rev: 17774, cost: 3261, gpm: 0.8165, clicks: 1481, conv: 31, planned: 4275, optimized: 6302, delta: 2028 },
    { pl: "DSP-Y_News-300x250", offer: "Product C", rev: 11978, cost: 2908, gpm: 0.7572, clicks: 998, conv: 17, planned: 3490, optimized: 4922, delta: 1432 },
    { pl: "DSP-Y_ROS-Mobile-300x250", offer: "Product C", rev: 11675, cost: 2645, gpm: 0.7734, clicks: 973, conv: 18, planned: 3402, optimized: 4797, delta: 1396 },
    { pl: "DSP-Y_News-300x250", offer: "Product A", rev: 11482, cost: 3085, gpm: 0.7313, clicks: 957, conv: 62, planned: 2761, optimized: 4071, delta: 1310 },
    { pl: "DSP-Y_Login-CAU", offer: "Product A", rev: 11150, cost: 2456, gpm: 0.7797, clicks: 929, conv: 30, planned: 2681, optimized: 3954, delta: 1272 },
    { pl: "DSP-Y_Money-300x250", offer: "Product A", rev: 9991, cost: 7243, gpm: 0.2751, clicks: 833, conv: 81, planned: 2402, optimized: 0, delta: -2402 },
    { pl: "DSP-Y_News-Wire-300x250", offer: "Product A", rev: 7010, cost: 6691, gpm: 0.0454, clicks: 584, conv: 51, planned: 1686, optimized: 0, delta: -1686 },
  ],
  "Premium Pub Q": [
    { pl: "PubQ_Article-Core-300x250", offer: "Product D", rev: 17291, cost: 12104, gpm: 0.3, clicks: 1441, conv: 0, planned: 3836, optimized: 0, delta: -3836 },
    { pl: "PubQ_Article-Core-300x250", offer: "Product G", rev: 16853, cost: 11797, gpm: 0.3, clicks: 1123, conv: 0, planned: 6143, optimized: 0, delta: -6143 },
    { pl: "PubQ_Article-Core-300x250", offer: "Product H", rev: 13610, cost: 9528, gpm: 0.3, clicks: 907, conv: 0, planned: 9521, optimized: 0, delta: -9521 },
    { pl: "PubQ_Mobile-Partner-Bin", offer: "Product G", rev: 10022, cost: 7016, gpm: 0.2999, clicks: 668, conv: 2, planned: 3654, optimized: 0, delta: -3654 },
    { pl: "PubQ_Mobile-Partner-Bin", offer: "Product D", rev: 9481, cost: 6637, gpm: 0.3, clicks: 790, conv: 1, planned: 2103, optimized: 0, delta: -2103 },
    { pl: "PubQ_Below-Article-HP", offer: "Product D", rev: 6403, cost: 4482, gpm: 0.2999, clicks: 534, conv: 51, planned: 1420, optimized: 0, delta: -1420 },
    { pl: "PubQ_Markets-CAU", offer: "Product D", rev: 5396, cost: 3777, gpm: 0.3001, clicks: 450, conv: 2, planned: 1197, optimized: 0, delta: -1197 },
    { pl: "PubQ_Mobile-Partner-Bin", offer: "Product H", rev: 4692, cost: 3284, gpm: 0.3, clicks: 313, conv: 1, planned: 3282, optimized: 0, delta: -3282 },
  ],
  "DSP Platform Z": [
    { pl: "DSP-Z_Portal-HP-970x250", offer: "Product A", rev: 10847, cost: 1110, gpm: 0.8977, clicks: 904, conv: 43, planned: 652, optimized: 961, delta: 309 },
    { pl: "DSP-Z_Portal-HP-970x250", offer: "Product B", rev: 7507, cost: 1532, gpm: 0.796, clicks: 626, conv: 7, planned: 641, optimized: 1327, delta: 687 },
    { pl: "DSP-Z_Portal-HP-300x600", offer: "Product B", rev: 5506, cost: 688, gpm: 0.8751, clicks: 459, conv: 7, planned: 470, optimized: 973, delta: 504 },
    { pl: "DSP-Z_Portal-HP-300x600", offer: "Product A", rev: 5341, cost: 961, gpm: 0.82, clicks: 445, conv: 43, planned: 321, optimized: 474, delta: 152 },
    { pl: "DSP-Z_Portal-HP-970x250", offer: "Product C", rev: 4789, cost: 256, gpm: 0.9464, clicks: 399, conv: 10, planned: 582, optimized: 820, delta: 238 },
    { pl: "DSP-Z_Portal-HP-300x600", offer: "Product C", rev: 4678, cost: 1041, gpm: 0.7775, clicks: 390, conv: 33, planned: 568, optimized: 800, delta: 233 },
    { pl: "DSP-Z_Finance-300x250", offer: "Product A", rev: 4016, cost: 1320, gpm: 0.6712, clicks: 335, conv: 10, planned: 242, optimized: 357, delta: 115 },
    { pl: "DSP-Z_Portal-HP-300x250", offer: "Product B", rev: 3754, cost: 1899, gpm: 0.4942, clicks: 313, conv: 2, planned: 321, optimized: 0, delta: -321 },
  ],
  "Ad Network Delta": [
    { pl: "Delta_News-300x250", offer: "Product A", rev: 17347, cost: 9678, gpm: 0.4421, clicks: 1446, conv: 41, planned: 876, optimized: 0, delta: -876 },
    { pl: "Delta_Display-300x250", offer: "Product D", rev: 15387, cost: 3297, gpm: 0.7857, clicks: 1282, conv: 7, planned: 1280, optimized: 2474, delta: 1194 },
    { pl: "Delta_News-300x250", offer: "Product C", rev: 10171, cost: 5424, gpm: 0.4666, clicks: 847, conv: 40, planned: 988, optimized: 0, delta: -988 },
    { pl: "Delta_Display-300x250", offer: "Product B", rev: 8584, cost: 4246, gpm: 0.5054, clicks: 715, conv: 21, planned: 733, optimized: 0, delta: -733 },
    { pl: "Delta_News-300x250", offer: "Product B", rev: 4816, cost: 1680, gpm: 0.6511, clicks: 401, conv: 0, planned: 411, optimized: 851, delta: 441 },
    { pl: "Delta_News-300x250", offer: "Product F", rev: 3979, cost: 1680, gpm: 0.5777, clicks: 398, conv: 1, planned: 0, optimized: 0, delta: 0 },
    { pl: "Delta_Display-300x600", offer: "Product D", rev: 2829, cost: 1396, gpm: 0.5065, clicks: 236, conv: 6, planned: 236, optimized: 0, delta: -236 },
    { pl: "Delta_Display-300x600", offer: "Product B", rev: 1711, cost: 1396, gpm: 0.1841, clicks: 143, conv: 1, planned: 146, optimized: 0, delta: -146 },
  ],
  "Search Engine G": [
    { pl: "SEM-G_Checking-Exact", offer: "Product C", rev: 70559, cost: 26583, gpm: 0.6232, clicks: 5880, conv: 192, planned: 16103, optimized: 22710, delta: 6607 },
    { pl: "SEM-G_Homepage-Broad", offer: "Product E", rev: 179, cost: 384, gpm: -1.141, clicks: 15, conv: 0, planned: 71, optimized: 0, delta: -71 },
    { pl: "SEM-G_Homepage-Broad", offer: "Product A", rev: 166, cost: 416, gpm: -1.514, clicks: 14, conv: 1, planned: 0, optimized: 0, delta: 0 },
    { pl: "SEM-G_PF-Advertorial", offer: "Product G", rev: 109, cost: 94, gpm: 0.137, clicks: 7, conv: 0, planned: 0, optimized: 0, delta: 0 },
  ],
};

function Kpi({ label, value, sub, color }) {
  return (<div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: "14px 16px", position: "relative", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, "+color+", transparent)" }} />
    <div style={{ fontSize: 9, color: C.dim, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 800, marginBottom: 5 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 800, color: C.text, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{sub}</div>}
  </div>);
}
function Tip({ active, payload, label, fn }) {
  if (!active || !payload?.length) return null;
  return (<div style={{ background: "#1A1E2A", border: "1px solid "+C.border, borderRadius: 8, padding: "10px 14px", boxShadow: "0 8px 24px rgba(0,0,0,.6)" }}>
    <div style={{ color: C.muted, fontSize: 10, marginBottom: 5, fontWeight: 600 }}>{label}</div>
    {payload.map((p, i) => (<div key={i} style={{ color: p.color || p.fill || C.text, fontSize: 12, fontWeight: 600, margin: "2px 0" }}>{p.name}: {fn ? fn(p.value) : p.value}</div>))}
  </div>);
}
function Flag({ gpm }) {
  const pass = gpm >= 0.52, warn = gpm >= 0.40 && gpm < 0.52;
  const bg = pass ? C.accentDim : warn ? C.amberDim : C.redDim;
  const fg = pass ? C.accent : warn ? C.amber : C.red;
  return (<span style={{ background: bg, color: fg, padding: "2px 7px", borderRadius: 4, fontWeight: 800, fontSize: 9, fontFamily: "'JetBrains Mono'", whiteSpace: "nowrap" }}>
    {pass ? "✓" : warn ? "▼" : "✕"} {pct(gpm)}
  </span>);
}

function PlacementPanel({ pubName, color }) {
  const [open, setOpen] = useState(false);
  const rows = placements[pubName] || [];
  if (!rows.length) return null;
  const pub = publishers.find(p => p.name === pubName);
  const barData = rows.map(r => ({ name: r.pl.length > 24 ? r.pl.slice(0,23)+"…" : r.pl, planned: r.planned, optimized: r.optimized, hist_cost: r.cost }));
  return (<div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
    <button onClick={() => setOpen(!open)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 4, height: 28, borderRadius: 2, background: color }} />
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: C.text }}>{pubName}</div>
          <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{rows.length} placements • Rev {fmt(pub?.hist_rev||0)} • <Flag gpm={pub?.gpm||0} /></div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 10, color: C.dim, fontWeight: 700 }}>Planned → Optimized</div>
          <div style={{ fontSize: 13, fontWeight: 700, fontFamily: "'JetBrains Mono'", color: C.text }}>{fmt(pub?.planned||0)} → <span style={{ color: C.accent }}>{fmt(pub?.optimized||0)}</span></div>
        </div>
        <span style={{ fontSize: 18, color: C.dim, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
      </div>
    </button>
    {open && (<div style={{ padding: "0 20px 20px" }}>
      <div style={{ marginBottom: 16 }}>
        <ResponsiveContainer width="100%" height={Math.max(160, rows.length * 36)}>
          <BarChart data={barData} layout="vertical" margin={{ top: 0, right: 10, left: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
            <XAxis type="number" tick={{ fill: C.dim, fontSize: 9 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
            <YAxis type="category" dataKey="name" width={165} tick={{ fill: C.muted, fontSize: 9 }} axisLine={{ stroke: C.border }} />
            <Tooltip content={<Tip fn={fmt} />} />
            <Legend wrapperStyle={{ fontSize: 9 }} />
            <Bar dataKey="hist_cost" name="Historical Cost" fill={C.red} opacity={0.4} radius={[0,3,3,0]} barSize={10} />
            <Bar dataKey="planned" name="Planned $" fill={C.purple} opacity={0.65} radius={[0,3,3,0]} barSize={10} />
            <Bar dataKey="optimized" name="Optimized $" fill={C.accent} opacity={0.85} radius={[0,3,3,0]} barSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 10 }}>
          <thead><tr style={{ borderBottom: "2px solid "+C.border }}>
            {["Placement","Offer","Hist Rev","Hist Cost","GPM","Clicks","Conv","Planned $","Optimized $","Delta"].map(h => (
              <th key={h} style={{ textAlign: h==="Placement"||h==="Offer"||h==="GPM" ? "left" : "right", padding: "8px 8px", color: C.dim, fontWeight: 800, fontSize: 8, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>{rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: "1px solid "+C.border+"12", background: i%2===0 ? C.row1 : C.row2 }}>
              <td style={{ padding: "8px", fontWeight: 600, color: C.text, maxWidth: 170, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.pl}</td>
              <td style={{ padding: "8px", color: C.muted, maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.offer}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.blue }}>{fmt(r.rev)}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>{fmt(r.cost)}</td>
              <td style={{ padding: "8px" }}><Flag gpm={r.gpm} /></td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>{fmtS(r.clicks)}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.text }}>{r.conv}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.purple }}>{r.planned > 0 ? fmt(r.planned) : "—"}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: r.optimized > 0 ? C.accent : C.dim }}>{r.optimized > 0 ? fmt(r.optimized) : "—"}</td>
              <td style={{ padding: "8px", textAlign: "right", fontFamily: "'JetBrains Mono'", fontWeight: 700, color: r.delta > 0 ? C.accent : r.delta < 0 ? C.red : C.dim }}>
                {r.delta > 0 ? "+"+fmt(r.delta) : r.delta < 0 ? "-"+fmt(Math.abs(r.delta)) : "—"}
              </td>
            </tr>
          ))}</tbody>
        </table>
      </div>
    </div>)}
  </div>);
}

const scatterData = publishers.filter(p => p.hist_rev > 5000).map(p => ({ name: p.name, x: p.gpm, y: p.hist_rev, z: p.planned+p.optimized, flag: p.gpm>=0.52?"pass":p.gpm>=0.4?"warn":"fail" }));
const tabs = ["Overview", "Publishers", "Placements", "Offers"];

export default function App() {
  const [tab, setTab] = useState("Overview");
  const pubBarData = publishers.filter(p => p.planned > 0 || p.hist_rev > 20000).map(p => ({ name: p.name.length > 16 ? p.name.slice(0,15)+"…" : p.name, planned: p.planned, optimized: p.optimized }));
  const offerBarData = offers.map(o => ({ name: o.name.length > 22 ? o.name.slice(0,21)+"…" : o.name, hist_rev: o.hist_rev, hist_cost: o.hist_cost, planned: o.planned, optimized: o.optimized, proj_rev: o.proj_rev }));

  return (<div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Inter', -apple-system, sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500;700&display=swap" rel="stylesheet" />
    <div style={{ borderBottom: "1px solid "+C.border, padding: "22px 28px 16px", background: "linear-gradient(135deg, #12151E 0%, #0A0C10 100%)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.accent, boxShadow: "0 0 6px "+C.accent }} />
            <span style={{ fontSize: 9, color: C.accent, fontWeight: 800, letterSpacing: 2.5, textTransform: "uppercase" }}>Media Yield Optimization • CPC Offers</span>
          </div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900, letterSpacing: -0.6 }}>Placement Allocation Dashboard</h1>
          <p style={{ margin: "3px 0 0", color: C.dim, fontSize: 11 }}>Historical vs. Planned vs. Optimized • Target GPM: 52% • Anonymized</p>
        </div>
        <div style={{ display: "flex", gap: 3, background: C.card, borderRadius: 8, padding: 3, border: "1px solid "+C.border }}>
          {tabs.map(t => (<button key={t} onClick={() => setTab(t)} style={{ background: tab===t ? C.accentDim : "transparent", border: tab===t ? "1px solid "+C.accent+"44" : "1px solid transparent", borderRadius: 6, padding: "6px 14px", color: tab===t ? C.accent : C.dim, fontWeight: 700, fontSize: 11, cursor: "pointer" }}>{t}</button>))}
        </div>
      </div>
    </div>
    <div style={{ padding: "20px 28px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10, marginBottom: 18 }}>
        <Kpi label="CPC Budget" value="$2.31M" sub="Total pool" color={C.blue} />
        <Kpi label="Historical Rev" value="$1.58M" sub="Recent period" color={C.accent} />
        <Kpi label="Planned Cost" value="$321K" sub="Proportional" color={C.purple} />
        <Kpi label="Optimized Cost" value="$296K" sub="GPM-weighted" color={C.teal} />
        <Kpi label="Proj. Revenue" value="$669K" sub="Based on mix" color={C.blue} />
        <Kpi label="Avg GPM" value="57.9%" sub="Target: 52% ✓" color={C.accent} />
        <Kpi label="Eligible" value="220/684" sub="32% ≥ target" color={C.amber} />
      </div>
      <div style={{ background: "linear-gradient(135deg, rgba(110,231,183,0.06), rgba(96,165,250,0.06))", border: "1px solid "+C.accent+"33", borderRadius: 10, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 16 }}>⚡</span>
        <span style={{ color: C.muted, fontSize: 11 }}><strong style={{ color: C.accent }}>Optimization saves $25K</strong> — budget shifted from low-GPM publishers to high-GPM. <strong style={{ color: C.accent }}>Placements tab</strong> shows the per-placement breakdown with expandable drilldowns.</span>
      </div>

      {tab === "Overview" && (<>
        <div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 22, marginBottom: 18 }}>
          <h3 style={{ margin: "0 0 3px", fontSize: 15, fontWeight: 800 }}>Publisher Allocation: Planned vs. Optimized</h3>
          <p style={{ margin: "0 0 16px", fontSize: 11, color: C.dim }}>Purple = proportional, teal = GPM-optimized. Missing = zeroed out.</p>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={pubBarData} layout="vertical" margin={{ top: 0, right: 20, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
              <YAxis type="category" dataKey="name" width={130} tick={{ fill: C.muted, fontSize: 10 }} axisLine={{ stroke: C.border }} />
              <Tooltip content={<Tip fn={fmt} />} /><Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="planned" name="Planned $" fill={C.purple} opacity={0.7} radius={[0,4,4,0]} />
              <Bar dataKey="optimized" name="Optimized $" fill={C.teal} opacity={0.85} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 22 }}>
            <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 800 }}>GPM vs. Revenue</h3>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Red line = 52% target</p>
            <ResponsiveContainer width="100%" height={260}>
              <ScatterChart margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
                <XAxis dataKey="x" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={pct} domain={[0,1.05]} axisLine={{ stroke: C.border }} />
                <YAxis dataKey="y" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
                <ZAxis dataKey="z" range={[60,400]} />
                <ReferenceLine x={0.52} stroke={C.red} strokeDasharray="5 5" strokeWidth={2} />
                <Tooltip content={({active,payload}) => { if(!active||!payload?.length) return null; const d=payload[0]?.payload; return (<div style={{background:"#1A1E2A",border:"1px solid "+C.border,borderRadius:8,padding:"10px 14px"}}><div style={{fontWeight:700,color:C.text,fontSize:12}}>{d?.name}</div><div style={{color:C.muted,fontSize:11}}>GPM: {pct(d?.x)} | Rev: {fmt(d?.y)}</div></div>);}} />
                <Scatter data={scatterData}>{scatterData.map((d,i) => <Cell key={i} fill={d.flag==="pass"?C.accent:d.flag==="warn"?C.amber:C.red} />)}</Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
          <div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 22 }}>
            <h3 style={{ margin: "0 0 3px", fontSize: 14, fontWeight: 800 }}>Offer: Hist Cost vs. Optimized</h3>
            <p style={{ margin: "0 0 14px", fontSize: 11, color: C.dim }}>Budget shift per product</p>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={offerBarData} layout="vertical" margin={{ top: 0, right: 10, left: 5, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
                <XAxis type="number" tick={{ fill: C.dim, fontSize: 9 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
                <YAxis type="category" dataKey="name" width={140} tick={{ fill: C.muted, fontSize: 9 }} axisLine={{ stroke: C.border }} />
                <Tooltip content={<Tip fn={fmt} />} /><Legend wrapperStyle={{ fontSize: 9 }} />
                <Bar dataKey="hist_cost" name="Hist Cost" fill={C.red} opacity={0.5} radius={[0,3,3,0]} />
                <Bar dataKey="optimized" name="Optimized $" fill={C.accent} opacity={0.8} radius={[0,3,3,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </>)}

      {tab === "Publishers" && (<div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 22 }}>
        <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800 }}>Publisher Detail</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11 }}>
            <thead><tr style={{ borderBottom: "2px solid "+C.border }}>
              {["Publisher","Hist Rev","Hist Cost","GPM","Planned","Optimized","Delta","Proj Rev","Conv"].map(h => (
                <th key={h} style={{ textAlign: h==="Publisher"||h==="GPM"?"left":"right", padding: "10px", color: C.dim, fontWeight: 800, fontSize: 9, textTransform: "uppercase", letterSpacing: 1 }}>{h}</th>
              ))}
            </tr></thead>
            <tbody>{publishers.map((p, i) => { const d=p.optimized-p.planned; return (
              <tr key={i} style={{ borderBottom: "1px solid "+C.border+"18", background: i%2===0?C.row1:C.row2 }}>
                <td style={{ padding: "10px", fontWeight: 700, color: C.text }}>{p.name}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.blue }}>{fmt(p.hist_rev)}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>{fmt(p.hist_cost)}</td>
                <td style={{ padding: "10px" }}><Flag gpm={p.gpm} /></td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.purple }}>{fmt(p.planned)}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: p.optimized>0?C.accent:C.dim }}>{p.optimized>0?fmt(p.optimized):"—"}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", fontWeight: 700, color: d>0?C.accent:d<0?C.red:C.dim }}>{d>0?"+"+fmt(d):d<0?"-"+fmt(Math.abs(d)):"—"}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.text }}>{p.proj_rev>0?fmt(p.proj_rev):"—"}</td>
                <td style={{ padding: "10px", textAlign: "right", fontFamily: "'JetBrains Mono'", color: C.muted }}>{fmtS(p.conv)}</td>
              </tr>);})}</tbody>
          </table>
        </div>
        <div style={{ marginTop: 22 }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={publishers.filter(p => p.hist_rev>10000)} margin={{ top: 5, right: 10, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} />
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 9, angle: -25, textAnchor: "end" }} height={60} axisLine={{ stroke: C.border }} />
              <YAxis tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
              <Tooltip content={<Tip fn={fmt} />} /><Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="hist_rev" name="Hist Rev" fill={C.blue} opacity={0.7} radius={[4,4,0,0]} />
              <Bar dataKey="hist_cost" name="Hist Cost" fill={C.red} opacity={0.5} radius={[4,4,0,0]} />
              <Bar dataKey="proj_rev" name="Proj Rev" fill={C.accent} opacity={0.8} radius={[4,4,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>)}

      {tab === "Placements" && (<div>
        <div style={{ marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 3px", fontSize: 16, fontWeight: 800 }}>Placement-Level Drill Down</h3>
          <p style={{ margin: 0, fontSize: 11, color: C.dim }}>Click any publisher to expand individual placements. Each row shows historical vs. planned vs. optimized with GPM flags. Green delta = gained budget, red = lost.</p>
        </div>
        {Object.keys(placements).map((pub, i) => (<PlacementPanel key={pub} pubName={pub} color={GP[i%GP.length]} />))}
      </div>)}

      {tab === "Offers" && (<>
        <div style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 22, marginBottom: 18 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 800 }}>Offer: Historical vs. Projected</h3>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={offerBarData} layout="vertical" margin={{ top: 0, right: 20, left: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} horizontal={false} />
              <XAxis type="number" tick={{ fill: C.dim, fontSize: 10 }} tickFormatter={fmt} axisLine={{ stroke: C.border }} />
              <YAxis type="category" dataKey="name" width={165} tick={{ fill: C.muted, fontSize: 10 }} axisLine={{ stroke: C.border }} />
              <Tooltip content={<Tip fn={fmt} />} /><Legend wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="hist_rev" name="Hist Rev" fill={C.blue} opacity={0.7} radius={[0,4,4,0]} />
              <Bar dataKey="hist_cost" name="Hist Cost" fill={C.red} opacity={0.45} radius={[0,4,4,0]} />
              <Bar dataKey="proj_rev" name="Proj Rev" fill={C.accent} opacity={0.8} radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
          {offers.map((o, i) => (<div key={i} style={{ background: C.card, border: "1px solid "+C.border, borderRadius: 12, padding: 18, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: GP[i] }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: C.text, maxWidth: "65%" }}>{o.name}</div>
              <Flag gpm={o.gpm} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6 }}>
              {[["Hist Rev",fmt(o.hist_rev),C.blue],["Hist Cost",fmt(o.hist_cost),C.muted],["Budget",fmt(o.budget),C.purple],["Planned",fmt(o.planned),C.purple],["Optimized",fmt(o.optimized),C.accent],["Proj Rev",fmt(o.proj_rev),C.teal]].map(([l,v,c]) => (
                <div key={l}><div style={{ fontSize: 8, color: C.dim, textTransform: "uppercase", letterSpacing: .8, fontWeight: 800 }}>{l}</div><div style={{ fontSize: 12, fontWeight: 700, color: c, fontFamily: "'JetBrains Mono'", marginTop: 1 }}>{v}</div></div>
              ))}
            </div>
          </div>))}
        </div>
      </>)}

      <p style={{ textAlign: "center", color: C.dim, fontSize: 9, marginTop: 28, paddingBottom: 16 }}>Placement Allocation Dashboard • All names anonymized • Demo data</p>
    </div>
  </div>);
}
