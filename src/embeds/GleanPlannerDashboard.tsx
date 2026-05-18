import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#0C0F16", card: "#14181F", border: "#1C2230", hover: "#1A1F2A",
  lime: "#84CC16", teal: "#2DD4BF", purple: "#A78BFA", amber: "#FBBF24",
  red: "#F87171", green: "#34D399", blue: "#60A5FA", pink: "#F472B6",
  orange: "#FB923C", text: "#E2E8F0", muted: "#64748B", subtle: "#94A3B8",
  slack: "#4A154B", jira: "#0052CC", airtable: "#18BFFF", confluence: "#1868DB",
  email: "#EA4335", glean: "#F59E0B",
};

const platforms = [
  { name: "Slack", icon: "💬", color: C.slack, messages: 12 },
  { name: "Jira", icon: "🎫", color: C.jira, messages: 8 },
  { name: "Email", icon: "📧", color: C.email, messages: 15 },
  { name: "Airtable", icon: "📊", color: C.airtable, messages: 6 },
  { name: "Confluence", icon: "📝", color: C.confluence, messages: 4 },
  { name: "Calendar", icon: "📅", color: C.teal, messages: 3 },
];

const workflowSteps = [
  { label: "Trigger", desc: "Agent runs on schedule — scanning last 24 hours", icon: "⚡", dur: 1200 },
  { label: "Company search", desc: "Searching Slack, Jira, Email, Airtable, Confluence, Calendar...", icon: "🔍", dur: 2800 },
  { label: "Read documents", desc: "Reading all search results and extracting action items...", icon: "📄", dur: 2000 },
  { label: "AI prioritization", desc: "Scoring by revenue impact, urgency, blockers, deadlines...", icon: "🧠", dur: 2200 },
  { label: "Slack delivery", desc: "Sending prioritized summary to Slack DM...", icon: "📨", dur: 1000 },
];

const scanMessages = [
  { platform: "Slack", text: "#media-ops: \"CPC offer 2044 pacing 140% of daily cap\"", type: "urgent" },
  { platform: "Email", text: "Publisher Omega invoice missing — finance flagged", type: "urgent" },
  { platform: "Jira", text: "MEDIA-347: Update DV360 line items for Q2 flight", type: "blocked" },
  { platform: "Slack", text: "#revenue: \"Client X changed KPI target from 52% to 58% GPM\"", type: "urgent" },
  { platform: "Airtable", text: "Placement allocation tracker — 3 rows need cost update", type: "followup" },
  { platform: "Confluence", text: "Monthly analysis template due Friday", type: "low" },
  { platform: "Jira", text: "MEDIA-352: Tableau dashboard data delayed 2 days", type: "blocked" },
  { platform: "Email", text: "Network Alpha requesting new creative specs by EOD", type: "followup" },
  { platform: "Calendar", text: "Publisher QBR prep meeting tomorrow 10am", type: "followup" },
  { platform: "Slack", text: "#alerts: \"Finance Wire M traffic dropped 60% overnight\"", type: "urgent" },
  { platform: "Airtable", text: "Cap VTC lag matrix needs week 3 data entry", type: "low" },
  { platform: "Email", text: "Team standup notes from yesterday — action items pending", type: "low" },
];

const prioritizedTasks = [
  { priority: "P0", title: "CPC offer 2044 overpacing at 140%", why: "Revenue risk — will exceed daily budget by $8K if uncapped", next: "Pause or reduce bid on DSP Platform Y line items", owner: "You", blocker: null, source: "Slack #media-ops", color: C.red },
  { priority: "P0", title: "Finance Wire M traffic dropped 60%", why: "Revenue-impacting — $12K daily run rate at risk", next: "Check publisher status page, contact rep, review Tableau", owner: "You + Publisher team", blocker: "Need publisher confirmation", source: "Slack #alerts", color: C.red },
  { priority: "P0", title: "Client X GPM target changed to 58%", why: "Affects all active placement allocations this month", next: "Re-run optimization model with new 58% target, flag impacted offers", owner: "You", blocker: null, source: "Slack #revenue", color: C.orange },
  { priority: "P1", title: "Publisher Omega invoice missing", why: "Finance escalation — blocks month-end close", next: "Email Publisher Omega rep, CC finance, attach PO reference", owner: "You + Finance", blocker: "Waiting on publisher", source: "Email", color: C.amber },
  { priority: "P1", title: "DV360 line items need Q2 update", why: "Flight starts May 1 — 3 days to launch", next: "Update targeting, budgets, and creatives in DV360 console", owner: "You", blocker: "Blocked by creative approval (MEDIA-350)", source: "Jira MEDIA-347", color: C.amber },
  { priority: "P2", title: "Network Alpha creative specs due EOD", why: "Publisher relationship — delayed specs delay launch", next: "Pull specs from Confluence template, send to rep", owner: "You", blocker: null, source: "Email", color: C.blue },
  { priority: "P2", title: "QBR prep meeting tomorrow", why: "Stakeholder visibility — need performance deck ready", next: "Pull MTD numbers from Tableau, update slides 4-8", owner: "You", blocker: "Tableau data delayed (MEDIA-352)", source: "Calendar", color: C.blue },
  { priority: "P3", title: "Placement tracker — update 3 cost rows", why: "Data hygiene — non-urgent but affects weekly report accuracy", next: "Update Airtable rows with DV360 cost data", owner: "You", blocker: null, source: "Airtable", color: C.muted },
  { priority: "P3", title: "Monthly analysis template due Friday", why: "Documentation — low urgency, 3 days runway", next: "Clone last month's template, update header dates", owner: "You", blocker: null, source: "Confluence", color: C.muted },
];

function Banner({ onRun }) {
  const [tick, setTick] = useState(0);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 50); return () => clearInterval(t); }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden", borderRadius: 14, background: `linear-gradient(140deg, #0C0F16 0%, #16102a 45%, #0d1822 100%)`, marginBottom: 16, padding: "24px 26px 20px" }}>
      <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {Array.from({ length: 12 }).map((_, i) => {
          const x = (tick * 0.4 + i * 48) % 620 - 30;
          const y = 20 + Math.sin(tick * 0.012 + i * 0.9) * 40;
          return <circle key={i} cx={x} cy={y} r={1.5} fill={[C.lime, C.purple, C.amber, C.teal, C.pink, C.blue][i % 6]} opacity={0.12 + Math.sin(tick * 0.02 + i) * 0.06} />;
        })}
        {[0, 1, 2, 3, 4].map(i => {
          const y1 = 30 + i * 22;
          const prog = ((tick * 0.3 + i * 80) % 600) - 60;
          return <rect key={i} x={prog} y={y1} width={40} height={1} rx={0.5} fill={[C.lime, C.teal, C.purple, C.amber, C.pink][i]} opacity={0.1} />;
        })}
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
              <span style={{ fontSize: 16 }}>🤖</span>
              <span style={{ fontSize: 10, color: C.lime, letterSpacing: 2.5, fontWeight: 600 }}>AI WORKFLOW AUTOMATION</span>
            </div>
            <h1 style={{ fontSize: 20, fontWeight: 600, color: C.text, margin: "0 0 4px", fontFamily: "Georgia, serif" }}>Daily action planner</h1>
            <p style={{ fontSize: 11, color: C.muted, margin: 0, maxWidth: 380 }}>AI agent that searches across Slack, Jira, Email, Airtable & Confluence to deliver a prioritized task list every morning</p>
          </div>
          <button onClick={onRun} style={{
            padding: "10px 20px", fontSize: 12, fontWeight: 600, fontFamily: "inherit", cursor: "pointer",
            background: `linear-gradient(135deg, ${C.lime}, #65A30D)`, color: "#0C0F16", border: "none",
            borderRadius: 10, display: "flex", alignItems: "center", gap: 6, boxShadow: `0 4px 20px ${C.lime}30`,
          }}>
            <span>▶</span> Run agent
          </button>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 14 }}>
          {platforms.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.subtle, background: "rgba(255,255,255,.03)", padding: "3px 8px", borderRadius: 6 }}>
              <span style={{ fontSize: 12 }}>{p.icon}</span>{p.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [phase, setPhase] = useState("idle");
  const [step, setStep] = useState(-1);
  const [scannedItems, setScannedItems] = useState([]);
  const [showTasks, setShowTasks] = useState(false);
  const [scanIdx, setScanIdx] = useState(0);
  const feedRef = useRef(null);

  const runAgent = () => {
    setPhase("running");
    setStep(0);
    setScannedItems([]);
    setShowTasks(false);
    setScanIdx(0);
  };

  useEffect(() => {
    if (phase !== "running" || step < 0) return;
    if (step >= workflowSteps.length) {
      setPhase("done");
      setTimeout(() => setShowTasks(true), 600);
      return;
    }
    const timer = setTimeout(() => {
      if (step === 1) {
        let idx = 0;
        const scanTimer = setInterval(() => {
          if (idx < scanMessages.length) {
            setScannedItems(prev => [...prev, scanMessages[idx]]);
            setScanIdx(idx + 1);
            idx++;
          } else {
            clearInterval(scanTimer);
            setStep(s => s + 1);
          }
        }, 200);
        return;
      }
      setStep(s => s + 1);
    }, workflowSteps[step].dur);
    return () => clearTimeout(timer);
  }, [phase, step]);

  useEffect(() => {
    if (feedRef.current) feedRef.current.scrollTop = feedRef.current.scrollHeight;
  }, [scannedItems]);

  const priorityColors = { P0: C.red, P1: C.amber, P2: C.blue, P3: C.muted };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter', -apple-system, sans-serif", color: C.text }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px 20px 60px" }}>
        <Banner onRun={runAgent} />

        {phase !== "idle" && (
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚙️</span> Workflow execution
              {phase === "done" && <span style={{ fontSize: 10, color: C.green, background: `${C.green}15`, padding: "2px 8px", borderRadius: 8, fontWeight: 600, marginLeft: "auto" }}>✓ Complete</span>}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {workflowSteps.map((ws, i) => {
                const active = step === i;
                const done = step > i || phase === "done";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, opacity: done ? 1 : active ? 1 : 0.3, transition: "all .4s" }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0,
                      background: done ? `${C.green}15` : active ? `${C.lime}15` : "rgba(255,255,255,.03)",
                      border: `1px solid ${done ? C.green + "40" : active ? C.lime + "40" : C.border}`,
                    }}>{done ? "✓" : ws.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: done ? C.green : active ? C.lime : C.muted }}>{ws.label}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{ws.desc}</div>
                    </div>
                    {active && !done && (
                      <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${C.lime}`, borderTopColor: "transparent", animation: "spin .8s linear infinite" }} />
                    )}
                    {done && <span style={{ fontSize: 10, color: C.green }}>Done</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {scannedItems.length > 0 && (
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.border}`, padding: 18, marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 500, color: C.text, marginBottom: 10, display: "flex", justifyContent: "space-between" }}>
              <span>🔍 Scanned items ({scannedItems.length})</span>
              <span style={{ fontSize: 10, color: C.muted }}>
                {scannedItems.filter(s => s.type === "urgent").length} urgent · {scannedItems.filter(s => s.type === "blocked").length} blocked · {scannedItems.filter(s => s.type === "followup").length} follow-ups
              </span>
            </div>
            <div ref={feedRef} style={{ maxHeight: 180, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
              {scannedItems.map((s, i) => {
                const typeColor = { urgent: C.red, blocked: C.amber, followup: C.blue, low: C.muted };
                const platIcon = platforms.find(p => p.name === s.platform)?.icon || "📌";
                return (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "6px 10px", background: "rgba(255,255,255,.02)", borderRadius: 6, animation: "fadeIn .3s ease", borderLeft: `2px solid ${typeColor[s.type]}` }}>
                    <span style={{ fontSize: 12, flexShrink: 0 }}>{platIcon}</span>
                    <div style={{ flex: 1, fontSize: 11, color: C.subtle, lineHeight: 1.4 }}>{s.text}</div>
                    <span style={{ fontSize: 9, color: typeColor[s.type], background: typeColor[s.type] + "15", padding: "1px 6px", borderRadius: 6, fontWeight: 600, flexShrink: 0 }}>{s.type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {showTasks && (
          <div style={{ background: C.card, borderRadius: 12, border: `1px solid ${C.lime}25`, padding: 18, animation: "fadeIn .5s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${C.slack}, #7C3AED)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>💬</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Daily action planner — April 28, 2026</div>
                <div style={{ fontSize: 10, color: C.muted }}>via Glean AI Agent → Slack DM</div>
              </div>
              <div style={{ marginLeft: "auto", fontSize: 10, color: C.lime, background: `${C.lime}12`, padding: "3px 10px", borderRadius: 8, fontWeight: 600 }}>9 tasks prioritized</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {prioritizedTasks.map((task, i) => (
                <TaskCard key={i} task={task} index={i} />
              ))}
            </div>

            <div style={{ marginTop: 14, padding: "10px 14px", background: `${C.lime}08`, borderRadius: 8, border: `1px solid ${C.lime}20`, fontSize: 11, color: C.subtle, lineHeight: 1.6 }}>
              <span style={{ color: C.lime, fontWeight: 600 }}>Summary:</span> 3 revenue-impacting items need immediate attention (offer overpacing, traffic drop, GPM target change). 2 items blocked by external dependencies. Estimated 4-6 hours saved vs. manually checking all 6 platforms.
            </div>
          </div>
        )}

        {phase === "idle" && (
          <div style={{ textAlign: "center", padding: "40px 20px", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤖</div>
            <div style={{ fontSize: 14, marginBottom: 4 }}>Click <strong style={{ color: C.lime }}>Run agent</strong> to see the workflow in action</div>
            <div style={{ fontSize: 12 }}>The AI agent will search across 6 platforms and deliver a prioritized task list</div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  );
}

function TaskCard({ task, index }) {
  const [expanded, setExpanded] = useState(false);
  const priorityColors = { P0: "#F87171", P1: "#FBBF24", P2: "#60A5FA", P3: "#64748B" };

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      style={{
        background: "rgba(255,255,255,.02)", borderRadius: 8, padding: "10px 14px", cursor: "pointer",
        borderLeft: `3px solid ${task.color}`, transition: "all .2s",
        animation: `fadeIn .4s ease ${index * 0.08}s both`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: priorityColors[task.priority],
          background: priorityColors[task.priority] + "18", padding: "2px 8px", borderRadius: 6, flexShrink: 0,
        }}>{task.priority}</span>
        <span style={{ fontSize: 12, fontWeight: 500, color: "#E2E8F0", flex: 1 }}>{task.title}</span>
        <span style={{ fontSize: 10, color: "#64748B" }}>{task.source}</span>
        <span style={{ fontSize: 10, color: "#64748B", transform: expanded ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}>▾</span>
      </div>
      {expanded && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid rgba(255,255,255,.05)", fontSize: 11, color: "#94A3B8", lineHeight: 1.7 }}>
          <div><strong style={{ color: "#FBBF24" }}>Why:</strong> {task.why}</div>
          <div><strong style={{ color: "#2DD4BF" }}>Next step:</strong> {task.next}</div>
          <div><strong style={{ color: "#A78BFA" }}>Owner:</strong> {task.owner}</div>
          {task.blocker && <div><strong style={{ color: "#F87171" }}>Blocker:</strong> {task.blocker}</div>}
        </div>
      )}
    </div>
  );
}