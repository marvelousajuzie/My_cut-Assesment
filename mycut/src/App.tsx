import { useState, useRef, useEffect, useCallback } from "react";
import {
  deal,
  formatNaira,
  getPendingParticipant,
  getConfirmedCount,
  getTotalConfirmable,
} from "./dealData.ts";

import { IconCheck, IconPending, IconChevronLeft, IconPin, IconArrow } from "./icons.tsx";

import "./styles/MyCutDeal.css";



const CSS = "";















export default function MyCutDeal() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [visibleIdx, setVisibleIdx] = useState(0);   
  const [transitioning, setTransitioning] = useState(false);
  const [reminderSent, setReminderSent] = useState(false);
  const transTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pendingParticipant = getPendingParticipant(deal);
  const confirmedCount     = getConfirmedCount(deal);
  const totalConfirmable   = getTotalConfirmable(deal);
  const progressPct        = (confirmedCount / totalConfirmable) * 100;







  const handleThumbClick = useCallback((idx: number) => {
    if (idx === activeIdx || transitioning) return;
    if (transTimer.current) clearTimeout(transTimer.current);
    setActiveIdx(idx);
    setTransitioning(true);
    transTimer.current = setTimeout(() => {
      setVisibleIdx(idx);
      setTransitioning(false);
    }, 480);
  }, [activeIdx, transitioning]);

  useEffect(() => () => { if (transTimer.current) clearTimeout(transTimer.current); }, []);








  return (
    <>
      <style>{CSS}</style>
      <div className="mc">

        {}
        <nav className="mc-nav">
          <div className="mc-nav-left">
            <div className="mc-nav-logo">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C6 2 3 5.5 3 10s3 8 7 8 7-3.5 7-8-3-8-7-8z" fill="#2D6A4F" />
                <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="mc-nav-brand">MyCut</span>
          </div>
          <div className="mc-nav-right">
            <span className="mc-nav-name">Drew Okonkwo</span>
            <div className="mc-nav-av">D</div>
          </div>
        </nav>

        {/* ── LAYOUT ── */}
        <div className="mc-layout">

          {/* ════════ LEFT ════════ */}
          <div className="mc-left">
            <button className="mc-back"><IconChevronLeft />&nbsp;Back to Contracts</button>

            {/* ══ ZONE A: HERO CAROUSEL ══ */}
            <div className="hero-wrap">
              {/* Crossfade layers — one per media item */}
              {deal.media.map((item, i) => {
                const isTarget  = i === activeIdx;
                const isCurrent = i === visibleIdx;
                // visible = either the new target (fading in) or the old one (fading out)
                const show = isTarget || isCurrent;
                if (!show) return null;
                const opacity = isTarget ? 1 : 0;
                return (
                  <div
                    key={item.id}
                    className="hero-media-layer"
                    style={{ opacity, transition: "opacity 0.5s ease", zIndex: isTarget ? 1 : 0 }}
                  >
                    {item.type === "video" ? (
                      <video
                        src={item.src}
                        controls
                        playsInline
                        style={{ width: "100%", height: "100%", objectFit: "cover", background: "#000" }}
                        aria-label={item.alt}
                      />
                    ) : (
                      <img src={item.src} alt={item.alt} />
                    )}
                  </div>
                );
              })}

              {/* Gradient overlay */}
              <div className="hero-overlay" />

              {/* Overlay text */}
              <div className="hero-text">
                <div className="hero-breadcrumb">
                  <span>Contracts</span>
                  <span style={{ opacity: 0.45 }}>›</span>
                  <span>Deal {deal.dealId}</span>
                </div>
                <h1 className="hero-title">{deal.title}</h1>
                <div className="hero-badges">
                  <span className="badge-dark">{deal.category}</span>
                  <span className="badge-status">
                    <span className="badge-status-dot" />
                    {deal.statusBadge}
                  </span>
                  <span className="badge-loc">
                    <IconPin />
                    {deal.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="thumbs">
              {deal.media.map((item, i) => (
                <div
                  key={item.id}
                  className={`thumb${activeIdx === i ? " active" : ""}`}
                  onClick={() => handleThumbClick(i)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View media ${i + 1}: ${item.alt}`}
                  onKeyDown={(e) => e.key === "Enter" && handleThumbClick(i)}
                >
                  <img src={item.thumb} alt={item.alt} />
                  {item.type === "video" && (
                    <span className="thumb-video-badge">▶ VID</span>
                  )}
                </div>
              ))}
            </div>

            {/* ══ ZONE B: FINANCIAL SUMMARY ══ */}
            <div className="fin-bar">
              <div className="fin-tile">
                <div className="fin-lbl">Total Deal Value</div>
                <div className="fin-val">{formatNaira(deal.totalDealValue)}</div>
              </div>
              <div className="fin-div" />
              {(() => {
                const loggedIn = deal.participants.find((p) => p.isLoggedIn)!;
                return (
                  <div className="fin-tile">
                    <div className="fin-lbl">Your Cut</div>
                    <div className="fin-val amber">{formatNaira(loggedIn.amount)}</div>
                    <div className="fin-sub">{loggedIn.percentage}% share</div>
                  </div>
                );
              })()}
              <div className="fin-div" />
              {(() => {
                const platform = deal.participants.find((p) => p.isPlatform)!;
                return (
                  <div className="fin-tile">
                    <div className="fin-lbl">Platform Fee</div>
                    <div className="fin-val">{formatNaira(platform.amount)}</div>
                    <div className="fin-sub">1.5% · Deducted on exec.</div>
                  </div>
                );
              })()}
            </div>

            {/* ══ ZONE C: SPLIT + LIFECYCLE ══ */}
            <div className="zone-c">

              {/* Split Breakdown */}
              <div className="card">
                <div className="card-lbl">Split Breakdown</div>
                <div className="split-list">
                  {deal.participants.map((p) => (
                    <div key={p.id} className="split-row">
                      <div
                        className={`split-av${p.isPlatform ? " platform" : ""}`}
                        style={{ background: p.avatarColor }}
                      >
                        {p.initials}
                      </div>
                      <div className="split-info">
                        <div className={`split-name${p.isPlatform ? " platform" : ""}`}>{p.name}</div>
                        <div className={`split-role${p.isPlatform ? " platform" : ""}`}>{p.role}</div>
                      </div>
                      <div className="split-right">
                        {p.percentage !== null && (
                          <div className="split-pct">{p.percentage}%</div>
                        )}
                        <div className={`split-amt${p.isPlatform ? " platform" : ""}`}>
                          {formatNaira(p.amount)}
                          {p.isPlatform && <span style={{ marginLeft: 2, fontSize: 10 }}>· 1.5% of total</span>}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deal Lifecycle */}
              <div className="card">
                <div className="card-lbl">Deal Lifecycle</div>
                <div className="lc-list">
                  {deal.lifecycle.map((step) => (
                    <div key={step.id} className="lc-item">
                      <div className="lc-dot-col">
                        <div className={`lc-dot ${step.status}`} />
                      </div>
                      <div className="lc-body">
                        <div className={`lc-label ${step.status}`}>{step.label}</div>
                        <div className={`lc-date ${step.status}`}>{step.date}</div>
                        <div className={`lc-date ${step.status}`} style={{ marginTop: 1 }}>{step.subtitle}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>{/* end mc-left */}

          {/* ════════ ZONE D: SIDEBAR ════════ */}
          <div className="mc-right">

            {/* Confirmation & Execution */}
            <div className="scard">
              <div className="scard-title">Confirmation &amp; Execution</div>

              <div className="conf-box">
                <div className="conf-lbl">Confirmations Received</div>
                <div className="conf-count">
                  <span className="conf-num">{confirmedCount}</span>
                  <span className="conf-of">of {totalConfirmable}</span>
                </div>
                <div className="conf-sub">
                  {totalConfirmable - confirmedCount} confirmation{totalConfirmable - confirmedCount !== 1 ? "s" : ""} needed for distribution
                </div>

                {/* Progress bar — not a range input */}
                <div className="prog-track">
                  <div className="prog-fill" style={{ width: `${progressPct}%` }} />
                </div>

                {/* Participant list */}
                <div className="part-list">
                  {deal.participants
                    .filter((p) => !p.isPlatform)
                    .map((p) => (
                      <div key={p.id} className="part-row">
                        {p.confirmationStatus === "confirmed"
                          ? <IconCheck />
                          : <IconPending />
                        }
                        <span className={`part-name${p.confirmationStatus === "pending" ? " pending-name" : ""}`}>
                          {p.displayName} — {p.confirmationStatus === "confirmed" ? "Confirmed" : "Pending"}
                        </span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Dynamic awaiting button */}
              <button className="awaiting-btn">
                Awaiting {pendingParticipant?.name ?? "Confirmation"}'s Confirmation
              </button>

              {/* Deal Actions */}
              <span className="actions-lbl">Deal Actions</span>
              <div className="actions-list">
                <button className="btn-base btn-confirmed" disabled>
                  You Already Confirmed ✓
                </button>
                <button className="btn-base btn-dispute">
                  Raise a Dispute
                </button>
                <button
                  className={`btn-base btn-reminder${reminderSent ? " sent" : ""}`}
                  onClick={() => {
                    setReminderSent(true);
                    setTimeout(() => setReminderSent(false), 3000);
                  }}
                >
                  {reminderSent
                    ? "Reminder Sent ✓"
                    : `Send Reminder to ${pendingParticipant?.name ?? "Participant"}`
                  }
                </button>
              </div>

              {/* Auto-distribution notice */}
              <div className="note-box">
                <strong>Note: </strong>{deal.autoDistributionNote}
              </div>
            </div>

            {/* Deal Workspace */}
            <div className="scard">
              <span className="ws-lbl">Deal Workspace</span>
              {deal.workspaceLinks.map((link, i, arr) => (
                <div key={link.id}>
                  <button className="ws-row">
                    <span className="ws-row-label">{link.label}</span>
                    <div className="ws-row-right">
                      {link.tag && <span className="ws-tag">{link.tag}</span>}
                      <IconArrow />
                    </div>
                  </button>
                  {i < arr.length - 1 && <div className="ws-div" />}
                </div>
              ))}
            </div>

          </div>{/* end mc-right */}
        </div>{/* end mc-layout */}
      </div>
    </>
  );
}