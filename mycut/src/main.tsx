import { useState } from "react";












const CheckCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#2D6A4F" />
    <path d="M5 9l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PendingCircleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="8.5" stroke="#D1D5DB" strokeWidth="1" fill="white" />
  </svg>
);

const LocationIcon = () => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
    <path d="M6 0C3.24 0 1 2.24 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5zm0 6.5c-.83 0-1.5-.67-1.5-1.5S5.17 3.5 6 3.5s1.5.67 1.5 1.5S6.83 6.5 6 6.5z" fill="white" fillOpacity="0.85" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M8 4l3 3-3 3" stroke="#6B7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BackIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8l5 5" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const participants = [
  { initials: "DO", color: "#1C3D2E", name: "Drew Okonkwo (You)", status: "Confirmed" as const },
  { initials: "ET", color: "#2D5A3D", name: "Emeka Tech Ltd", status: "Confirmed" as const },
  { initials: "AK", color: "#6B4C7A", name: "Adaeze Kalu", status: "Pending" as const },
];

const splitBreakdown = [
  { initials: "DO", color: "#1C3D2E", name: "Drew Okonkwo", role: "Creator · Organizer", pct: "62.5%", amount: "₦15,000,000" },
  { initials: "ET", color: "#2D5A3D", name: "Emeka Tech Ltd", role: "Contributor · Co-investor", pct: "25.5%", amount: "₦6,120,000" },
  { initials: "AK", color: "#6B4C7A", name: "Adaeze Kalu", role: "Agent · Commission", pct: "10%", amount: "₦2,400,000" },
  { initials: "MC", color: "#1A1A2E", name: "MyCut Platform", role: "Platform fee · Fixed", pct: "", amount: "₦225,000" },
];

const lifecycleSteps = [
  { label: "Draft Created", detail: "Feb 14, 2026 · 9:12 AM", done: true },
  { label: "Roles Locked", detail: "Feb 15 · All 3 participants filled", done: true },
  { label: "Deal Locked", detail: "Feb 16 · Terms v1.1 agreed", done: true },
  { label: "Fully Funded", detail: "Feb 17 · ₦24M in escrow", done: true },
  { label: "Confirmation Pending", detail: "2 of 3 confirmed · In progress", done: true, active: true },
  { label: "Executed", detail: "Awaiting final confirmation", done: false },
];

const thumbnails = [
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=60&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=60&fit=crop",
];

export default function MyCutDeal() {
  const [selectedThumb, setSelectedThumb] = useState(0);
  const [reminderSent, setReminderSent] = useState(false);

  const handleReminder = () => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F3F4F6", minHeight: "100vh", color: "#1F2937" }}>
      {/* Top Nav */}
      <nav style={{ background: "#1C2B22", padding: "0 24px", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6 2 3 5.5 3 10s3 8 7 8 7-3.5 7-8-3-8-7-8z" fill="#2D6A4F" />
              <path d="M7 10l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span style={{ color: "white", fontWeight: 600, fontSize: "15px", letterSpacing: "0.2px" }}>MyCut</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#D1FAE5", fontSize: "14px" }}>Drew Okonkwo</span>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#374151", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: "13px", fontWeight: 600 }}>D</div>
        </div>
      </nav>

      {/* Main Layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "0", maxWidth: "1200px", margin: "0 auto" }}>
        {/* LEFT COLUMN */}
        <div>
          {/* Back Link */}
          <div style={{ padding: "14px 24px 0" }}>
            <button style={{ display: "flex", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#374151", fontWeight: 500 }}>
              <BackIcon /> Back to Contracts
            </button>
          </div>

          {/* Hero Image */}
          <div style={{ position: "relative", margin: "12px 24px 0", borderRadius: "12px", overflow: "hidden", height: "260px" }}>
            <img
              src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=900&h=400&fit=crop"
              alt="Warehouse"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.72) 40%, rgba(0,0,0,0.1) 100%)" }} />
            {/* Breadcrumb */}
            <div style={{ position: "absolute", bottom: "60px", left: "20px", display: "flex", alignItems: "center", gap: "6px", color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
              <span>Contracts</span>
              <span>›</span>
              <span>Deal #12345</span>
            </div>
            {/* Title */}
            <div style={{ position: "absolute", bottom: "16px", left: "20px", right: "20px" }}>
              <h1 style={{ color: "white", fontSize: "22px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.3 }}>
                Samsung &amp; LG Appliances — Bulk Import Q1 2025
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ background: "#374151", color: "#D1FAE5", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", letterSpacing: "0.5px" }}>
                  ELECTRONICS IMPORT
                </span>
                <span style={{ background: "rgba(251,191,36,0.18)", border: "1px solid rgba(251,191,36,0.4)", color: "#FCD34D", fontSize: "11px", fontWeight: 600, padding: "3px 8px", borderRadius: "4px", letterSpacing: "0.5px", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#FCD34D", display: "inline-block" }} />
                  CONFIRMATION PENDING
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "4px", color: "rgba(255,255,255,0.8)", fontSize: "12px" }}>
                  <LocationIcon /> Lekki Free Zone, Lagos
                </span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div style={{ display: "flex", gap: "8px", padding: "10px 24px 0" }}>
            {thumbnails.map((src, i) => (
              <div
                key={i}
                onClick={() => setSelectedThumb(i)}
                style={{
                  width: "72px", height: "52px", borderRadius: "6px", overflow: "hidden", cursor: "pointer",
                  border: selectedThumb === i ? "2px solid #2D6A4F" : "2px solid transparent",
                  opacity: selectedThumb === i ? 1 : 0.75,
                  transition: "all 0.15s"
                }}
              >
                <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
