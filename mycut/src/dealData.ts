







export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;           
  thumb: string;         
  alt: string;
}

export type DealData = {
    dealId: string;
    title: string;
    category: string;
    statusBadge: string;
    location: string;

}



export interface Participant {
  id: string;
  initials: string;
  name: string;
  displayName: string;   
  role: string;
  avatarColor: string;
  percentage: number | null;   
  amount: number;
  isLoggedIn: boolean;
  isPlatform: boolean;
  confirmationStatus: "confirmed" | "pending" | null;  
}

export type LifecycleStatus = "completed" | "active" | "future";

export interface LifecycleStep {
  id: string;
  label: string;
  date: string;
  subtitle: string;
  status: LifecycleStatus;
}

export interface DealData {
  dealId: string;
  title: string;
  category: string;
  statusBadge: string;
  location: string;
  totalDealValue: number;
  platformFeeRate: number;   
  media: MediaItem[];
  participants: Participant[];
  lifecycle: LifecycleStep[];
  workspaceLinks: { id: string; label: string; tag: string | null }[];
  autoDistributionNote: string;
}

export const deal: DealData = {
  dealId: "#12345",
  title: "Samsung & LG Appliances — Bulk Import Q1 2025",
  category: "ELECTRONICS IMPORT",
  statusBadge: "CONFIRMATION PENDING",
  location: "Lekki Free Zone, Lagos",
  totalDealValue: 24_000_000,
  platformFeeRate: 0.015,

  media: [
    {
      id: "m1",
      type: "image",
      src: "images/hero_section.jpg",
      thumb: "images/hero_section.jpg",
      alt: "Warehouse with stacked boxes",
    },
    {
      id: "m2",
      type: "image",
      src: "images/first_image.png",
      thumb: "images/first_image.png",
      alt: "Logistics centre",
    },
    {
      id: "m3",
      type: "image",
      src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=500&fit=crop",
      thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=120&h=80&fit=crop",
      alt: "Electronics assembly",
    },
    {
      id: "m4",
      type: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=120&h=80&fit=crop",
      alt: "Product inspection video",
    },
  ],

  participants: [
    {
      id: "p1",
      initials: "DO",
      name: "Drew Okonkwo",
      displayName: "Drew Okonkwo (You)",
      role: "Creator · Organizer",
      avatarColor: "#1C3A2C",
      percentage: 62.5,
      amount: 15_000_000,
      isLoggedIn: true,
      isPlatform: false,
      confirmationStatus: "confirmed",
    },
    {
      id: "p2",
      initials: "ET",
      name: "Emeka Tech Ltd",
      displayName: "Emeka Tech Ltd",
      role: "Contributor · Co-investor",
      avatarColor: "#1E4D35",
      percentage: 25.5,
      amount: 6_120_000,
      isLoggedIn: false,
      isPlatform: false,
      confirmationStatus: "confirmed",
    },
    {
      id: "p3",
      initials: "AK",
      name: "Adaeze Kalu",
      displayName: "Adaeze Kalu",
      role: "Agent · Commission",
      avatarColor: "#5B3E72",
      percentage: 10,
      amount: 2_400_000,
      isLoggedIn: false,
      isPlatform: false,
      confirmationStatus: "pending",
    },
    {
      id: "p4",
      initials: "MC",
      name: "MyCut Platform",
      displayName: "MyCut Platform",
      role: "Platform fee · Fixed",
      avatarColor: "#1A2035",
      percentage: null,
      amount: 225_000,
      isLoggedIn: false,
      isPlatform: true,
      confirmationStatus: null,
    },
  ],

  lifecycle: [
    {
      id: "lc1",
      label: "Draft Created",
      date: "Feb 14, 2026 · 9:12 AM",
      subtitle: "Deal draft saved",
      status: "completed",
    },
    {
      id: "lc2",
      label: "Roles Locked",
      date: "Feb 15, 2026",
      subtitle: "All 3 participants filled",
      status: "completed",
    },
    {
      id: "lc3",
      label: "Deal Locked",
      date: "Feb 16, 2026",
      subtitle: "Terms v1.1 agreed",
      status: "completed",
    },
    {
      id: "lc4",
      label: "Fully Funded",
      date: "Feb 17, 2026",
      subtitle: "₦24M in escrow",
      status: "completed",
    },
    {
      id: "lc5",
      label: "Confirmation Pending",
      date: "Feb 18, 2026",
      subtitle: "2 of 3 confirmed · In progress",
      status: "active",
    },
    {
      id: "lc6",
      label: "Executed",
      date: "Pending",
      subtitle: "Awaiting final confirmation",
      status: "future",
    },
  ],

  workspaceLinks: [
    { id: "wl1", label: "View Inbox Thread", tag: null },
    { id: "wl2", label: "Version History", tag: null },
    { id: "wl3", label: "Deal Wallet", tag: "₦24M held" },
  ],

  autoDistributionNote:
    "Once all 3 confirmations are received, funds will distribute automatically to all parties. This action is irreversible.",
};


export function formatNaira(amount: number): string {
  return "₦" + amount.toLocaleString("en-NG");
}

export function getPendingParticipant(data: DealData): Participant | undefined {
  return data.participants.find(
    (p) => p.confirmationStatus === "pending"
  );
}

export function getConfirmedCount(data: DealData): number {
  return data.participants.filter((p) => p.confirmationStatus === "confirmed").length;
}

export function getTotalConfirmable(data: DealData): number {
  return data.participants.filter((p) => p.confirmationStatus !== null).length;
}