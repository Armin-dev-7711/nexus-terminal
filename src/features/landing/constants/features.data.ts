// مسیر: src/features/landing/constants/features.data.ts
import {
  BrainCircuit,
  PieChart,
  ActivitySquare,
  ShieldCheck,
} from "lucide-react";

export const platformFeatures = [
  {
    id: "ai-analytics",
    title: "AI Analytics",
    description:
      "Predict market movements with quantum-level machine learning and sentiment analysis.",
    icon: BrainCircuit,
    color: "from-emerald-400 to-primary",
    visualType: "graph",
    actionText: "Open Analytics →",
  },
  {
    id: "portfolio-tracking",
    title: "Portfolio Tracking",
    description:
      "Monitor your multi-chain assets in real-time with hyper-accurate ledger indexing.",
    icon: PieChart,
    color: "from-blue-400 to-indigo-500",
    visualType: "counter",
    actionText: "View Portfolio →",
  },
  {
    id: "real-time-market",
    title: "Real-Time Market",
    description:
      "Execute trades with zero latency. Directly connected to top-tier liquidity pools.",
    icon: ActivitySquare,
    color: "from-amber-400 to-orange-500",
    visualType: "live-dot",
    actionText: "Live Demo →",
  },
  {
    id: "enterprise-security",
    title: "Enterprise Security",
    description:
      "Military-grade encryption and multi-sig vault protocols to protect your capital.",
    icon: ShieldCheck,
    color: "from-rose-400 to-red-500",
    visualType: "pulse-shield",
    actionText: "Learn more →",
  },
];
