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

  