//  src/features/landing/constants/testimonial.data.ts
import { OperatorFeedback } from "../types/testimonial.types";

export const TESTIMONIALS_ROW_1: OperatorFeedback[] = [
  {
    id: "node-01",
    name: "Alpha_Operator",
    initials: "AO",
    country: "Germany",
    flag: "🇩🇪",
    nodeStatus: "SHARD_ALLOC_OK",
    latency: "0.4ms",
    timestamp: "2s ago",
    feedback:
      "Nexus Core optimized our multi-chain liquidity routes. Sub-millisecond execution is a reality now. Zero slippage recorded over 48 hours.",
    rating: 5,
  },
  {
    id: "node-02",
    name: "Quant_Kernel",
    initials: "QK",
    country: "Singapore",
    flag: "🇸🇬",
    nodeStatus: "MEV_SHIELD_ACTIVE",
    latency: "1.2ms",
    timestamp: "14s ago",
    feedback:
      "The atomic bundle protection framework completely mitigated sandwich attacks on our liquidity pools. Exceptional infrastructure build.",
    rating: 5,
  },
  {
    id: "node-03",
    name: "Byte_Validator",
    initials: "BV",
    country: "United States",
    flag: "🇺🇸",
    nodeStatus: "SYNC_COMPLETED",
    latency: "0.8ms",
    timestamp: "1m ago",
    feedback:
      "Recharts analytics layer hooked directly into our local RPC. Real-time data streams are flawless. Replaced our entire legacy monitor.",
    rating: 5,
  },
];

export const TESTIMONIALS_ROW_2: OperatorFeedback[] = [
  {
    id: "node-04",
    name: "Cyber_Staker",
    initials: "CS",
    country: "Japan",
    flag: "🇯🇵",
    nodeStatus: "LEDGER_OK",
    latency: "1.5ms",
    timestamp: "45s ago",
    feedback:
      "Unbelievable performance. The 3D UI preview is rendering exact cryptographic states without blocking the main JS thread. Phenomenal.",
    rating: 5,
  },
  {
    id: "node-05",
    name: "ZeroKnowledge_Op",
    initials: "ZK",
    country: "Switzerland",
    flag: "🇨🇭",
    nodeStatus: "PROVER_ONLINE",
    latency: "2.1ms",
    timestamp: "3m ago",
    feedback:
      "Cryptographic state verification scaled instantly when we initiated the annual billing tier. Institutional grade terminal.",
    rating: 5,
  },
  {
    id: "node-06",
    name: "Hex_Validator",
    initials: "HV",
    country: "United Kingdom",
    flag: "🇬🇧",
    nodeStatus: "CLUSTER_OK",
    latency: "0.9ms",
    timestamp: "5m ago",
    feedback:
      "The operational level system architecture allows our quantitative engineering team to deploy sandboxed nodes in seconds. 10/10.",
    rating: 5,
  },
];
