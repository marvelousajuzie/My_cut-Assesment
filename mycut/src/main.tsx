import { useState } from "react";

/* ─── Icons ─────────────────────────────────────────────────────────── */
const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="9" fill="#2D6A4F" />
    <path d="M5 9l3 3 5-5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PendingCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="9" cy="9" r="8.5" stroke="#D1D5DB" strokeWidth="1" fill="white" />
  </svg>
);

const LocationIcon = () => (
  <svg width="11" height="14" viewBox="0 0 12 14" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S5.17 3.5 6 3.5s1.5.67 1.5 1.5S6.83 6.5 6 6.5z" fill="rgba(255,255,255,0.85)" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="#9CA3AF" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ─── Data ───────────────────────────────────────────────────────────── */
const participants = [
  { name: "Drew Okonkwo (You)", status: "Confirmed" as const },
  { name: "Emeka Tech Ltd", status: "Confirmed" as const },
  { name: "Adaeze Kalu", status: "Pending" as const },
];

const splitBreakdown = [
  { initials: "DO", bg: "#1C3A2C", name: "Drew Okonkwo", role: "Creator · Organizer", pct: "62.5%", amount: "₦15,000,000" },
  { initials: "ET", bg: "#1E4D35", name: "Emeka Tech Ltd", role: "Contributor · Co-investor", pct: "25.5%", amount: "₦6,120,000" },
  { initials: "AK", bg: "#5B3E72", name: "Adaeze Kalu", role: "Agent · Commission", pct: "10%", amount: "₦2,400,000" },
  { initials: "MC", bg: "#1A2035", name: "MyCut Platform", role: "Platform fee · Fixed", pct: "", amount: "₦225,000" },
];

const lifecycleSteps = [
  { label: "Draft Created", detail: "Feb 14, 2026 · 9:12 AM", done: true, active: false },
  { label: "Roles Locked", detail: "Feb 15 · All 3 participants filled", done: true, active: false },
  { label: "Deal Locked", detail: "Feb 16 · Terms v1.1 agreed", done: true, active: false },
  { label: "Fully Funded", detail: "Feb 17 · ₦24M in escrow", done: true, active: false },
  { label: "Confirmation Pending", detail: "2 of 3 confirmed · In progress", done: true, active: true },
  { label: "Executed", detail: "Awaiting final confirmation", done: false, active: false },
];

const thumbnails = [
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=60&fit=crop",
];

/* ─── Global CSS ─────────────────────────────────────────────────────── */
const css = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .mc-root {
    min-height: 100vh;
    background: #F3F4F6;
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    color: #1F2937;
  }

  /* NAV */
  .mc-nav {
    background: #1B2B20;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 24px;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .mc-nav-logo { display: flex; align-items: center; gap: 8px; }
  .mc-nav-badge {
    width: 30px; height: 30px; border-radius: 50%;
    background: #E8F5E9;
    display: flex; align-items: center; justify-content: center;
  }
  .mc-nav-name { color: white; font-weight: 700; font-size: 15px; letter-spacing: 0.2px; }
  .mc-nav-user { display: flex; align-items: center; gap: 10px; }
  .mc-nav-username { color: #D1FAE5; font-size: 14px; }
  .mc-nav-avatar {
    width: 32px; height: 32px; border-radius: 50%;
    background: #374151;
    display: flex; align-items: center; justify-content: center;
    color: white; font-size: 13px; font-weight: 700;
    flex-shrink: 0;
  }

  /* PAGE GRID */
  .mc-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    max-width: 1180px;
    margin: 0 auto;
  }

  /* LEFT */
  .mc-left { min-width: 0; }

  .mc-back {
    display: inline-flex; align-items: center; gap: 4px;
    background: none; border: none; cursor: pointer;
    font-size: 13px; color: #374151; font-weight: 500;
    padding: 14px 24px 0;
    font-family: inherit;
  }
  .mc-back:hover { color: #111827; }

  /* HERO */
  .mc-hero {
    position: relative;
    margin: 12px 24px 0;
    border-radius: 12px;
    overflow: hidden;
    height: 290px;
  }
  .mc-hero img {
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
  .mc-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.76) 42%, rgba(0,0,0,0.08) 100%);
  }
  .mc-hero-breadcrumb {
    position: absolute; bottom: 68px; left: 20px;
    display: flex; align-items: center; gap: 6px;
    color: rgba(255,255,255,0.65); font-size: 12px;
  }
  .mc-hero-body {
    position: absolute; bottom: 16px; left: 20px; right: 20px;
  }
  .mc-hero-title {
    color: white;
    font-size: 21px; font-weight: 800;
    margin: 0 0 10px;
    line-height: 1.32;
    letter-spacing: -0.2px;
  }
  .mc-hero-badges { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .mc-badge-dark {
    background: rgba(55,65,81,0.9);
    color: #D1FAE5;
    font-size: 10.5px; font-weight: 700;
    padding: 3px 9px; border-radius: 4px;
    letter-spacing: 0.5px;
  }
  .mc-badge-pending {
    background: rgba(251,191,36,0.16);
    border: 1px solid rgba(251,191,36,0.45);
    color: #FCD34D;
    font-size: 10.5px; font-weight: 700;
    padding: 3px 9px; border-radius: 4px;
    letter-spacing: 0.5px;
    display: flex; align-items: center; gap: 5px;
  }
  .mc-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #FCD34D; flex-shrink: 0; }
  .mc-badge-loc { display: flex; align-items: center; gap: 4px; color: rgba(255,255,255,0.8); font-size: 12px; }

  /* THUMBS */
  .mc-thumbs { display: flex; gap: 8px; padding: 10px 24px 0; }
  .mc-thumb {
    width: 70px; height: 52px;
    border-radius: 7px; overflow: hidden;
    cursor: pointer;
    border: 2px solid transparent;
    opacity: 0.72;
    transition: all 0.15s;
    flex-shrink: 0;
  }
  .mc-thumb.active { border-color: #2D6A4F; opacity: 1; }
  .mc-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }

  /* STATS */
  .mc-stats {
    margin: 14px 24px 0;
    background: white;
    border-radius: 10px;
    padding: 18px 22px;
    display: flex;
    border: 1px solid #E5E7EB;
  }
  .mc-stat { flex: 1; min-width: 0; }
  .mc-stat-div { width: 1px; background: #F3F4F6; margin: 0 20px; flex-shrink: 0; }
  .mc-stat-lbl { font-size: 10.5px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px; }
  .mc-stat-val { font-size: 20px; font-weight: 800; color: #111827; line-height: 1.2; }
  .mc-stat-val.amber { color: #D97706; }
  .mc-stat-sub { font-size: 11.5px; color: #6B7280; margin-top: 3px; }

  /* BOTTOM GRID */
  .mc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin: 14px 24px 28px; }
  .mc-card { background: white; border-radius: 10px; padding: 18px; border: 1px solid #E5E7EB; }
  .mc-card-lbl { font-size: 10.5px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.7px; text-transform: uppercase; margin-bottom: 14px; }

  /* SPLIT */
  .split-list { display: flex; flex-direction: column; gap: 12px; }
  .split-row { display: flex; align-items: center; gap: 10px; }
  .split-av { width: 36px; height: 36px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: 700; flex-shrink: 0; }
  .split-info { flex: 1; min-width: 0; }
  .split-nm { font-size: 13px; font-weight: 600; color: #111827; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .split-rl { font-size: 11px; color: #9CA3AF; margin-top: 1px; }
  .split-rt { text-align: right; flex-shrink: 0; }
  .split-pct { font-size: 13px; font-weight: 700; color: #111827; }
  .split-amt { font-size: 11px; color: #6B7280; margin-top: 1px; }

  /* LIFECYCLE */
  .lc-list { display: flex; flex-direction: column; gap: 13px; }
  .lc-row { display: flex; align-items: flex-start; gap: 10px; }
  .lc-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; margin-top: 3px; }
  .lc-dot.done { background: #2D6A4F; }
  .lc-dot.grey { background: #E5E7EB; }
  .lc-lbl { font-size: 13px; font-weight: 500; color: #111827; }
  .lc-lbl.bold { font-weight: 700; }
  .lc-lbl.muted { color: #9CA3AF; }
  .lc-dtl { font-size: 11px; color: #9CA3AF; margin-top: 2px; }
  .lc-dtl.green { color: #2D6A4F; font-weight: 500; }

  /* RIGHT SIDEBAR */
  .mc-right { padding: 14px 16px 28px; display: flex; flex-direction: column; gap: 16px; }
  .mc-scard { background: white; border-radius: 10px; border: 1px solid #E5E7EB; overflow: hidden; }
  .mc-stitle { font-size: 16px; font-weight: 700; color: #111827; padding: 16px 16px 0; margin-bottom: 14px; }

  /* CONF BOX */
  .mc-confbox { background: #F9FAFB; border-radius: 8px; padding: 14px; margin: 0 16px 14px; }
  .mc-confbox-lbl { font-size: 10.5px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.7px; text-transform: uppercase; margin-bottom: 8px; }
  .mc-confbox-count { display: flex; align-items: baseline; gap: 4px; margin-bottom: 2px; }
  .mc-confbox-num { font-size: 30px; font-weight: 800; color: #111827; line-height: 1; }
  .mc-confbox-of { font-size: 17px; color: #6B7280; font-weight: 500; }
  .mc-confbox-sub { font-size: 12px; color: #6B7280; margin-bottom: 10px; }
  .mc-prog { height: 6px; background: #E5E7EB; border-radius: 3px; margin-bottom: 13px; overflow: hidden; }
  .mc-prog-fill { width: 66.66%; height: 100%; background: linear-gradient(90deg, #2D6A4F, #40916C); border-radius: 3px; }
  .mc-parts { display: flex; flex-direction: column; gap: 8px; }
  .mc-part-row { display: flex; align-items: center; gap: 8px; }
  .mc-part-name { font-size: 13px; color: #111827; font-weight: 500; }
  .mc-part-name.pending { color: #9CA3AF; font-weight: 400; }

  /* AWAITING */
  .mc-awaiting {
    display: block;
    width: calc(100% - 32px);
    margin: 0 16px 0;
    padding: 12px;
    background: #1C2B22;
    color: white; border: none; border-radius: 8px;
    font-size: 13px; font-weight: 600; cursor: default;
    text-align: center; font-family: inherit;
    letter-spacing: 0.1px;
  }

  /* ACTIONS */
  .mc-actions-lbl { font-size: 10.5px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.7px; text-transform: uppercase; padding: 14px 16px 0; margin-bottom: 10px; display: block; }
  .mc-actions { padding: 0 16px 0; display: flex; flex-direction: column; gap: 8px; }
  .mc-btn-confirmed { width: 100%; padding: 11px; background: #2D6A4F; color: white; border: none; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: default; font-family: inherit; }
  .mc-btn-dispute { width: 100%; padding: 11px; background: white; color: #DC2626; border: 1px solid #FECACA; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: background 0.15s; }
  .mc-btn-dispute:hover { background: #FEF2F2; }
  .mc-btn-reminder { width: 100%; padding: 11px; background: white; color: #374151; border: 1px solid #E5E7EB; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.2s; }
  .mc-btn-reminder:hover { background: #F9FAFB; }
  .mc-btn-reminder.sent { color: #2D6A4F; border-color: #A7F3D0; background: #F0FDF4; }

  /* NOTE */
  .mc-note { background: #FFFBEB; border: 1px solid #FDE68A; border-radius: 7px; padding: 10px 12px; margin: 12px 16px 16px; font-size: 12px; color: #92400E; line-height: 1.55; }
  .mc-note strong { font-weight: 700; }

  /* WORKSPACE */
  .mc-ws-lbl { font-size: 10.5px; font-weight: 700; color: #9CA3AF; letter-spacing: 0.7px; text-transform: uppercase; padding: 14px 16px 6px; display: block; }
  .mc-ws-div { height: 1px; background: #F3F4F6; margin: 0 16px; }
  .mc-ws-row {
    width: 100%; display: flex; align-items: center; justify-content: space-between;
    padding: 13px 16px; background: none; border: none;
    cursor: pointer; transition: background 0.15s; font-family: inherit;
  }
  .mc-ws-row:hover { background: #F9FAFB; }
  .mc-ws-rowlbl { font-size: 13px; font-weight: 500; color: #374151; }
  .mc-ws-right { display: flex; align-items: center; gap: 6px; }
  .mc-ws-tag { font-size: 11px; color: #6B7280; font-weight: 500; }

  /* ═══ RESPONSIVE ═══ */
  @media (max-width: 960px) {
    .mc-layout { grid-template-columns: 1fr; }
    .mc-right { padding: 0 20px 28px; }
  }

  @media (max-width: 640px) {
    .mc-nav { padding: 0 16px; }
    .mc-nav-username { display: none; }
    .mc-back { padding: 12px 16px 0; }
    .mc-hero { margin: 10px 16px 0; height: 210px; border-radius: 10px; }
    .mc-hero-title { font-size: 15px; margin-bottom: 7px; }
    .mc-hero-breadcrumb { bottom: 58px; left: 14px; }
    .mc-hero-body { left: 14px; right: 14px; bottom: 12px; }
    .mc-thumbs { padding: 8px 16px 0; gap: 6px; }
    .mc-thumb { width: 60px; height: 46px; }
    .mc-stats { margin: 12px 16px 0; padding: 14px 16px; flex-direction: column; gap: 14px; }
    .mc-stat-div { width: 100%; height: 1px; margin: 0; }
    .mc-grid { grid-template-columns: 1fr; margin: 12px 16px 20px; gap: 12px; }
    .mc-right { padding: 0 16px 24px; }
  }

  @media (max-width: 400px) {
    .mc-hero { height: 185px; }
    .mc-hero-title { font-size: 13.5px; }
    .mc-stat-val { font-size: 18px; }
  }
`;

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function MyCutDeal() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [reminderSent, setReminderSent] = useState(false);

  return (
    <>
      <style>{css}</style>
      <div className="mc-root">

        {/* NAV */}
        <nav className="mc-nav">
          <div className="mc-nav-logo">
            <div className="mc-nav-badge">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6 2 3 5.5 3 10s3 8 7 8 7-3.5 7-8-3-8-7-8z" fill="#2D6A4F" />
                <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="mc-nav-name">MyCut</span>
          </div>
          <div className="mc-nav-user">
            <span className="mc-nav-username">Drew Okonkwo</span>
            <div className="mc-nav-avatar">D</div>
          </div>
        </nav>

        {/* LAYOUT */}
        <div className="mc-layout">

          {/* ── LEFT ── */}
          <div className="mc-left">
            <button className="mc-back"><BackIcon />&nbsp;Back to Contracts</button>

            {/* HERO */}
            <div className="mc-hero">
              <img src="images/hero_section.jpg" alt="Warehouse interior" />
              <div className="mc-hero-overlay" />
              <div className="mc-hero-breadcrumb">
                <span>Contracts</span>
                <span style={{ opacity: 0.5 }}>›</span>
                <span>Deal #12345</span>
              </div>
              <div className="mc-hero-body">
                <h1 className="mc-hero-title">Samsung &amp; LG Appliances — Bulk Import Q1 2025</h1>
                <div className="mc-hero-badges">
                  <span className="mc-badge-dark">ELECTRONICS IMPORT</span>
                  <span className="mc-badge-pending">
                    <span className="mc-badge-dot" />
                    CONFIRMATION PENDING
                  </span>
                  <span className="mc-badge-loc">
                    <LocationIcon />
                    Lekki Free Zone, Lagos
                  </span>
                </div>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="mc-thumbs">
              {thumbnails.map((src, i) => (
                <div
                  key={i}
                  className={`mc-thumb${activeThumb === i ? " active" : ""}`}
                  onClick={() => setActiveThumb(i)}
                >
                  <img src={src} alt={`Deal photo ${i + 1}`} />
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="mc-stats">
              <div className="mc-stat">
                <div className="mc-stat-lbl">Total Deal Value</div>
                <div className="mc-stat-val">₦24,000,000</div>
              </div>
              <div className="mc-stat-div" />
              <div className="mc-stat">
                <div className="mc-stat-lbl">Your Cut</div>
                <div className="mc-stat-val amber">₦15,000,000</div>
                <div className="mc-stat-sub">62.5% share</div>
              </div>
              <div className="mc-stat-div" />
              <div className="mc-stat">
                <div className="mc-stat-lbl">Platform Fee</div>
                <div className="mc-stat-val">₦225,000</div>
                <div className="mc-stat-sub">1.5% · Deducted on exec.</div>
              </div>
            </div>

            {/* SPLIT + LIFECYCLE */}
            <div className="mc-grid">
              {/* Split Breakdown */}
              <div className="mc-card">
                <div className="mc-card-lbl">Split Breakdown</div>
                <div className="split-list">
                  {splitBreakdown.map((p) => (
                    <div key={p.name} className="split-row">
                      <div className="split-av" style={{ background: p.bg }}>{p.initials}</div>
                      <div className="split-info">
                        <div className="split-nm">{p.name}</div>
                        <div className="split-rl">{p.role}</div>
                      </div>
                      <div className="split-rt">
                        {p.pct && <div className="split-pct">{p.pct}</div>}
                        <div className="split-amt">{p.amount}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deal Lifecycle */}
              <div className="mc-card">
                <div className="mc-card-lbl">Deal Lifecycle</div>
                <div className="lc-list">
                  {lifecycleSteps.map((s, i) => (
                    <div key={i} className="lc-row">
                      <div className={`lc-dot ${s.done ? "done" : "grey"}`} />
                      <div>
                        <div className={`lc-lbl${s.active ? " bold" : s.done ? "" : " muted"}`}>{s.label}</div>
                        <div className={`lc-dtl${s.active ? " green" : ""}`}>{s.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="mc-right">

            {/* Confirmation card */}
            <div className="mc-scard">
              <div className="mc-stitle">Confirmation &amp; Execution</div>

              <div className="mc-confbox">
                <div className="mc-confbox-lbl">Confirmations Received</div>
                <div className="mc-confbox-count">
                  <span className="mc-confbox-num">2</span>
                  <span className="mc-confbox-of">of 3</span>
                </div>
                <div className="mc-confbox-sub">1 confirmation needed for distribution</div>
                <div className="mc-prog"><div className="mc-prog-fill" /></div>
                <div className="mc-parts">
                  {participants.map((p) => (
                    <div key={p.name} className="mc-part-row">
                      {p.status === "Confirmed" ? <CheckCircleIcon /> : <PendingCircleIcon />}
                      <span className={`mc-part-name${p.status === "Pending" ? " pending" : ""}`}>
                        {p.name} — {p.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <button className="mc-awaiting">Awaiting Adaeze's Confirmation</button>

              <span className="mc-actions-lbl">Deal Actions</span>
              <div className="mc-actions">
                <button className="mc-btn-confirmed">You Already Confirmed ✓</button>
                <button className="mc-btn-dispute">Raise a Dispute</button>
                <button
                  className={`mc-btn-reminder${reminderSent ? " sent" : ""}`}
                  onClick={() => { setReminderSent(true); setTimeout(() => setReminderSent(false), 3000); }}
                >
                  {reminderSent ? "Reminder Sent ✓" : "Send Reminder to Adaeze"}
                </button>
              </div>

              <div className="mc-note">
                <strong>Note:</strong> Once all 3 confirmations are received, funds will distribute automatically to all parties. This action is irreversible.
              </div>
            </div>

            {/* Workspace card */}
            <div className="mc-scard">
              <span className="mc-ws-lbl">Deal Workspace</span>
              {[
                { label: "View Inbox Thread", tag: null },
                { label: "Version History", tag: null },
                { label: "Deal Wallet", tag: "₦24M held" },
              ].map((item, i, arr) => (
                <div key={item.label}>
                  <button className="mc-ws-row">
                    <span className="mc-ws-rowlbl">{item.label}</span>
                    <div className="mc-ws-right">
                      {item.tag && <span className="mc-ws-tag">{item.tag}</span>}
                      <ArrowRightIcon />
                    </div>
                  </button>
                  {i < arr.length - 1 && <div className="mc-ws-div" />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}