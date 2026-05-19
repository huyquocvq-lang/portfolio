import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

const COLORS = {
  navy: "#0B1D3A",
  teal: "#0E7C7B",
  gold: "#D4A843",
  coral: "#E85D4A",
  ice: "#C9E8F2",
  frost: "#E8F4F8",
  snow: "#F7FBFC",
  slate: "#3A4F6F",
  mint: "#56C5B0",
  warmGray: "#7A7D82",
  linkedin: "#0077B5",
  facebook: "#1877F2",
  youtube: "#FF0000",
  instagram: "#E4405F",
  twitter: "#1DA1F2",
};

const bookingsData = [
  { year: "2021", bookings: 7795, revenue: 24.3 },
  { year: "2022", bookings: 7920, revenue: 24.7 },
  { year: "2023", bookings: 8277, revenue: 25.8 },
  { year: "2024", bookings: 8631, revenue: 26.9 },
];

const channelBookings = [
  { year: "2021", paidSearch: 2792, socialMedia: 1797, email: 1797, displayAds: 1210 },
  { year: "2022", paidSearch: 2650, socialMedia: 2200, email: 1850, displayAds: 1220 },
  { year: "2023", paidSearch: 2700, socialMedia: 2550, email: 1800, displayAds: 1227 },
  { year: "2024", paidSearch: 2808, socialMedia: 2808, email: 1860, displayAds: 1256 },
];

const channelValue2024 = [
  { name: "Social Media", value: 3461, fill: COLORS.teal },
  { name: "Paid Search", value: 3299, fill: COLORS.gold },
  { name: "Email", value: 3298, fill: COLORS.slate },
  { name: "Display Ads", value: 3298, fill: COLORS.warmGray },
];

const spendData = [
  { name: "Social Media", spend: 924, conversion: 3.3 },
  { name: "Paid Search", spend: 1536, conversion: 2.6 },
  { name: "Display Ads", spend: 540, conversion: 2.2 },
  { name: "Email", spend: 600, conversion: 1.2 },
];

const subchannelData = [
  { name: "LinkedIn", value: 4174, volume: 174, conversion: 3.9, color: COLORS.linkedin },
  { name: "Facebook", value: 3430, volume: 999, conversion: 3.5, color: COLORS.facebook },
  { name: "YouTube", value: 3495, volume: 796, conversion: 3.2, color: COLORS.youtube },
  { name: "Instagram", value: 3294, volume: 518, conversion: 2.7, color: COLORS.instagram },
  { name: "Twitter", value: 3163, volume: 220, conversion: 2.4, color: COLORS.twitter },
];

const segmentData = [
  { name: "Teen Family", avgValue: 4269, familySize: 4, days: 5.5, room: "Deluxe", linkedinPct: 37 },
  { name: "Young Family", avgValue: 3317, familySize: 3.5, days: 3.5, room: "Standard", linkedinPct: 21 },
  { name: "Couple Retreat", avgValue: 2497, familySize: 2, days: 4, room: "Studio", linkedinPct: 29 },
];

const sensitivityData = [
  { shifted: "$100K", r208: 847667, r203: 160643, r198: -526382, r193: -1213406, r188: -1900431 },
  { shifted: "$150K", r208: 1271501, r203: 592856, r198: -85788, r193: -764433, r188: -1443077 },
  { shifted: "$200K", r208: 1695334, r203: 1025070, r198: 354805, r193: -315459, r188: -985724 },
  { shifted: "$250K", r208: 2119168, r203: 1457283, r198: 795399, r193: 133514, r188: -528370 },
  { shifted: "$300K", r208: 2543001, r203: 1889497, r198: 1235992, r193: 582488, r188: -71016 },
];

const scenarioComparison = [
  { name: "Social Media\nShift", revenue: 1.1, label: "$1.1MM" },
  { name: "Channel\nShift", revenue: 0.9, label: "$900K" },
  { name: "Hybrid\nShift ★", revenue: 1.6, label: "$1.6MM" },
];

const formatCurrency = (val) => `$${val.toLocaleString()}`;
const formatM = (val) => `$${val}M`;

function MountainSVG() {
  return (
    <svg viewBox="0 0 1200 200" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", opacity: 0.12 }}>
      <polygon points="0,200 100,80 200,140 350,40 500,120 600,20 750,90 850,50 1000,110 1100,30 1200,100 1200,200" fill="white" />
      <polygon points="0,200 150,100 300,160 450,70 600,130 750,60 900,120 1050,80 1200,140 1200,200" fill="white" opacity="0.5" />
    </svg>
  );
}

function SnowflakeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="5.64" y1="5.64" x2="18.36" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
      <line x1="12" y1="2" x2="9" y2="5" /><line x1="12" y1="2" x2="15" y2="5" />
      <line x1="12" y1="22" x2="9" y2="19" /><line x1="12" y1="22" x2="15" y2="19" />
      <line x1="2" y1="12" x2="5" y2="9" /><line x1="2" y1="12" x2="5" y2="15" />
      <line x1="22" y1="12" x2="19" y2="9" /><line x1="22" y1="12" x2="19" y2="15" />
    </svg>
  );
}

function KPICard({ label, value, sub, accent = COLORS.teal }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.06)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 16,
      padding: "22px 24px",
      flex: 1,
      minWidth: 180,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: accent, borderRadius: "16px 0 0 16px" }} />
      <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>{value}</div>
      {sub && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: accent, marginTop: 6, fontWeight: 500 }}>{sub}</div>}
    </div>
  );
}

function SectionTitle({ children, icon }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, marginTop: 40 }}>
      {icon && <span style={{ color: COLORS.gold }}>{icon}</span>}
      <h2 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 22,
        fontWeight: 700,
        color: "#fff",
        margin: 0,
        letterSpacing: -0.3,
      }}>{children}</h2>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(212,168,67,0.4), transparent)", marginLeft: 12 }} />
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(11,29,58,0.95)",
      border: "1px solid rgba(212,168,67,0.3)",
      borderRadius: 10,
      padding: "10px 14px",
      fontFamily: "'DM Sans', sans-serif",
      fontSize: 12,
    }}>
      <div style={{ color: COLORS.gold, fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: "#fff", display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: p.color || p.fill, display: "inline-block" }} />
          {p.name}: <strong>{typeof p.value === "number" && p.value > 1000 ? p.value.toLocaleString() : p.value}</strong>
        </div>
      ))}
    </div>
  );
};

export default function WinterplaceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "channels", label: "Channels" },
    { id: "social", label: "Social Deep-Dive" },
    { id: "recommendation", label: "Recommendation" },
  ];

  return (
    <div style={{
      background: `linear-gradient(165deg, ${COLORS.navy} 0%, #0F2847 40%, #0B1D3A 100%)`,
      minHeight: "100vh",
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      {/* Ambient glow effects */}
      <div style={{ position: "fixed", top: -200, right: -200, width: 600, height: 600, background: `radial-gradient(circle, ${COLORS.teal}15, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ position: "fixed", bottom: -200, left: -100, width: 500, height: 500, background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)`, pointerEvents: "none" }} />

      {/* BANNER */}
      <div style={{
        position: "relative",
        background: `linear-gradient(135deg, ${COLORS.navy}, #14355E 50%, ${COLORS.teal}40)`,
        padding: "48px 40px 40px",
        borderBottom: `1px solid rgba(212,168,67,0.2)`,
        overflow: "hidden",
      }}>
        <MountainSVG />
        <div style={{ position: "absolute", top: 16, right: 24, color: "rgba(255,255,255,0.08)", display: "flex", gap: 8 }}>
          {[...Array(5)].map((_, i) => <SnowflakeIcon key={i} size={24 + i * 8} />)}
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: `linear-gradient(135deg, ${COLORS.coral}, ${COLORS.gold})`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 20, color: "#fff",
            }}>W</div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: 3 }}>Winterplace Ski Resort</span>
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 38,
            fontWeight: 900,
            margin: "12px 0 6px",
            background: "linear-gradient(135deg, #fff 30%, #C9E8F2 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: -0.8,
            lineHeight: 1.15,
          }}>Marketing Analysis Dashboard</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "rgba(255,255,255,0.5)", margin: 0, maxWidth: 520 }}>
            Data-driven storytelling - channel performance, customer segments & budget optimization insights for 2021–2024
          </p>

          {/* KPI Row */}
          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <KPICard label="Total Bookings '24" value="8,631" sub="▲ 3.5% YoY" accent={COLORS.teal} />
            <KPICard label="Total Revenue '24" value="$26.9M" sub="▲ 3.5% YoY" accent={COLORS.gold} />
            <KPICard label="Top Channel" value="Social Media" sub="3.3% conversion rate" accent={COLORS.mint} />
            <KPICard label="Recommended Shift" value="$1.6MM" sub="Hybrid strategy uplift" accent={COLORS.coral} />
          </div>
        </div>
      </div>

      {/* TAB NAV */}
      <div style={{
        display: "flex", gap: 0,
        background: "rgba(0,0,0,0.2)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "0 40px",
        position: "sticky", top: 0, zIndex: 10,
        backdropFilter: "blur(16px)",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: activeTab === t.id ? 600 : 400,
            color: activeTab === t.id ? COLORS.gold : "rgba(255,255,255,0.45)",
            background: "none", border: "none", cursor: "pointer",
            padding: "16px 24px",
            borderBottom: activeTab === t.id ? `2px solid ${COLORS.gold}` : "2px solid transparent",
            transition: "all 0.25s ease",
            letterSpacing: 0.5,
          }}>{t.label}</button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ padding: "10px 40px 60px", maxWidth: 1100, margin: "0 auto" }}>

        {activeTab === "overview" && (
          <>
            <SectionTitle icon={<SnowflakeIcon size={18} />}>Bookings & Revenue Trend (2021–2024)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12, fontWeight: 500 }}>Number of Bookings</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} domain={[7000, 9000]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="bookings" radius={[6, 6, 0, 0]} fill={COLORS.teal} name="Bookings">
                      {bookingsData.map((_, i) => (
                        <Cell key={i} fill={i === 3 ? COLORS.teal : `${COLORS.teal}80`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12, fontWeight: 500 }}>Total Revenue ($M)</div>
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={bookingsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                    <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                    <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} domain={[23, 28]} tickFormatter={v => `$${v}M`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="revenue" radius={[6, 6, 0, 0]} fill={COLORS.gold} name="Revenue ($M)">
                      {bookingsData.map((_, i) => (
                        <Cell key={i} fill={i === 3 ? COLORS.gold : `${COLORS.gold}80`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionTitle icon="👥">Customer Segments</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
              {segmentData.map((seg, i) => {
                const accents = [COLORS.teal, COLORS.gold, COLORS.coral];
                return (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: 16,
                    padding: 24,
                    border: `1px solid ${accents[i]}30`,
                    position: "relative",
                    overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${accents[i]}15, transparent)` }} />
                    {i === 0 && (
                      <div style={{
                        position: "absolute", top: 12, right: 12,
                        background: COLORS.teal, color: "#fff",
                        fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                        textTransform: "uppercase", letterSpacing: 1,
                      }}>Best</div>
                    )}
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: accents[i], marginBottom: 4 }}>{seg.name}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#fff", marginBottom: 14 }}>{formatCurrency(seg.avgValue)}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.9 }}>
                      <div>Family size: <strong style={{ color: "#fff" }}>{seg.familySize}</strong></div>
                      <div>Avg. stay: <strong style={{ color: "#fff" }}>{seg.days} days</strong></div>
                      <div>Room type: <strong style={{ color: "#fff" }}>{seg.room}</strong></div>
                      <div>LinkedIn share: <strong style={{ color: COLORS.linkedin }}>{seg.linkedinPct}%</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "channels" && (
          <>
            <SectionTitle icon="📊">Bookings by Channel Over Time</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={channelBookings}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.3)" />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }} />
                  <Line type="monotone" dataKey="paidSearch" stroke={COLORS.gold} strokeWidth={2.5} dot={{ r: 4 }} name="Paid Search" />
                  <Line type="monotone" dataKey="socialMedia" stroke={COLORS.teal} strokeWidth={2.5} dot={{ r: 4 }} name="Social Media" />
                  <Line type="monotone" dataKey="email" stroke={COLORS.coral} strokeWidth={2.5} dot={{ r: 4 }} name="Email" />
                  <Line type="monotone" dataKey="displayAds" stroke={COLORS.warmGray} strokeWidth={2.5} dot={{ r: 4 }} name="Display Ads" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginTop: 24 }}>
              <div>
                <SectionTitle>2024 Booking Value by Channel</SectionTitle>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                  {channelValue2024.map((ch, i) => (
                    <div key={i} style={{ marginBottom: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
                        <span>{ch.name}</span><span style={{ color: "#fff", fontWeight: 600 }}>${ch.value.toLocaleString()}</span>
                      </div>
                      <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                        <div style={{ width: `${(ch.value / 3500) * 100}%`, height: "100%", background: ch.fill, borderRadius: 4, transition: "width 0.8s ease" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle>Marketing Spend vs Conversion</SectionTitle>
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                  {spendData.map((ch, i) => {
                    const cols = [COLORS.teal, COLORS.gold, COLORS.warmGray, COLORS.coral];
                    return (
                      <div key={i} style={{ display: "flex", alignItems: "center", marginBottom: 16, gap: 12 }}>
                        <div style={{ width: 90, fontSize: 12, color: "rgba(255,255,255,0.6)", flexShrink: 0 }}>{ch.name}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ height: 6, borderRadius: 3, background: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <div style={{ width: `${(ch.spend / 1600) * 100}%`, height: "100%", background: cols[i], borderRadius: 3 }} />
                          </div>
                        </div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", width: 55, textAlign: "right" }}>${ch.spend}K</div>
                        <div style={{
                          background: `${cols[i]}25`, color: cols[i],
                          fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 10,
                          minWidth: 40, textAlign: "center",
                        }}>{ch.conversion}%</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "social" && (
          <>
            <SectionTitle icon="🔍">Social Media Subchannel Performance (2024)</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, fontWeight: 500 }}>Booking Value by Platform</div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={subchannelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} />
                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} name="Booking Value">
                      {subchannelData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16, fontWeight: 500 }}>Conversion Rate by Platform</div>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={subchannelData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                    <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} domain={[0, 5]} tickFormatter={v => `${v}%`} />
                    <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} width={80} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="conversion" radius={[0, 6, 6, 0]} name="Conversion %">
                      {subchannelData.map((d, i) => <Cell key={i} fill={d.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <SectionTitle>LinkedIn Segment Attraction</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>% of bookings from LinkedIn that are Teen Family (highest-value segment)</div>
              <div style={{ display: "flex", gap: 32, alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
                {[
                  { platform: "LinkedIn", pct: 37, color: COLORS.linkedin },
                  { platform: "YouTube", pct: 27, color: COLORS.youtube },
                  { platform: "Facebook", pct: 23, color: COLORS.facebook },
                ].map((p, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ position: "relative", width: 100, height: 100, margin: "0 auto 8px" }}>
                      <svg width="100" height="100" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke={p.color} strokeWidth="8"
                          strokeDasharray={`${(p.pct / 100) * 264} 264`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                          style={{ transition: "stroke-dasharray 1s ease" }}
                        />
                      </svg>
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#fff" }}>{p.pct}%</div>
                    </div>
                    <div style={{ fontSize: 13, color: p.color, fontWeight: 600 }}>{p.platform}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 18, padding: "12px 18px", background: `${COLORS.linkedin}15`, borderRadius: 10, border: `1px solid ${COLORS.linkedin}25`, fontSize: 13, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                LinkedIn drives <strong style={{ color: COLORS.linkedin }}>37%</strong> Teen Family bookings - the highest-value segment at <strong style={{ color: COLORS.gold }}>$4,269</strong> avg. booking value
              </div>
            </div>
          </>
        )}

        {activeTab === "recommendation" && (
          <>
            <SectionTitle icon="🎯">Budget Shift Scenarios - Incremental Revenue</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)" }}>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={scenarioComparison} barSize={60}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12, fill: "rgba(255,255,255,0.6)" }} interval={0} />
                  <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}M`} domain={[0, 2]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]} name="Incremental Revenue ($M)">
                    <Cell fill={`${COLORS.teal}90`} />
                    <Cell fill={`${COLORS.gold}90`} />
                    <Cell fill={COLORS.coral} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 12, flexWrap: "wrap" }}>
                {[
                  { label: "Social Media Shift", color: COLORS.teal, val: "$1.1MM", desc: "From other social → LinkedIn" },
                  { label: "Channel Shift", color: COLORS.gold, val: "$900K", desc: "From other channels → LinkedIn" },
                  { label: "Hybrid Shift ★", color: COLORS.coral, val: "$1.6MM", desc: "Both combined - Recommended" },
                ].map((s, i) => (
                  <div key={i} style={{
                    background: i === 2 ? `${COLORS.coral}12` : "rgba(255,255,255,0.03)",
                    border: `1px solid ${i === 2 ? `${COLORS.coral}40` : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 12, padding: "14px 20px", textAlign: "center", minWidth: 180,
                  }}>
                    <div style={{ fontSize: 11, color: s.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>{s.label}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#fff", margin: "4px 0" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <SectionTitle>Sensitivity Analysis</SectionTitle>
            <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, padding: 24, border: "1px solid rgba(255,255,255,0.06)", overflowX: "auto" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>
                Incremental revenue by $ shifted to LinkedIn × weighted avg. conversion rate change
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "8px 12px", textAlign: "left", color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>$ Shifted</th>
                    {["2.08%", "2.03%", "1.98%", "1.93%", "1.88%"].map(h => (
                      <th key={h} style={{ padding: "8px 12px", textAlign: "right", color: "rgba(255,255,255,0.5)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sensitivityData.map((row, ri) => (
                    <tr key={ri}>
                      <td style={{ padding: "8px 12px", fontWeight: 600, color: COLORS.gold, borderBottom: "1px solid rgba(255,255,255,0.04)" }}>{row.shifted}</td>
                      {[row.r208, row.r203, row.r198, row.r193, row.r188].map((val, ci) => {
                        const isPositive = val > 0;
                        const intensity = Math.min(Math.abs(val) / 2000000, 1);
                        const bg = isPositive
                          ? `rgba(14,124,123,${0.1 + intensity * 0.35})`
                          : `rgba(232,93,74,${0.1 + intensity * 0.35})`;
                        return (
                          <td key={ci} style={{
                            padding: "8px 12px", textAlign: "right",
                            background: bg,
                            color: isPositive ? "#8FE0D6" : "#F5A89E",
                            fontWeight: 500,
                            borderBottom: "1px solid rgba(255,255,255,0.04)",
                            fontVariantNumeric: "tabular-nums",
                          }}>
                            {isPositive ? "" : "("}${Math.abs(val).toLocaleString()}{isPositive ? "" : ")"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{
                marginTop: 18, padding: "12px 18px",
                background: `${COLORS.gold}12`, borderRadius: 10, border: `1px solid ${COLORS.gold}25`,
                fontSize: 13, color: "rgba(255,255,255,0.7)",
              }}>
                ⚠️ High sensitivity to conversion rate - continuous monitoring recommended during execution
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}