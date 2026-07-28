# 🌌 NEXUS Protocol | Enterprise Full-Stack Web3 Digital Asset Terminal

<div align="center">

![NEXUS Cover Banner](https://img.shields.io/badge/NEXUS_OS-v2.2.6_Production_Ready-84cc16?style=for-the-badge&logo=target&logoColor=black)

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-nexus--terminal--7711.vercel.app-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexus-terminal-7711.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-15/16_App_Router-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19_Stack-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x_ORM-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Neon Database](https://img.shields.io/badge/Neon-Serverless_PostgreSQL-00E599?style=for-the-badge&logo=postgresql&logoColor=black)](https://neon.tech/)
[![Upstash Redis](https://img.shields.io/badge/Upstash-Redis_Cache-00E699?style=for-the-badge&logo=redis&logoColor=white)](https://upstash.com/)
[![BetterAuth](https://img.shields.io/badge/BetterAuth-Authentication_Node-FF4500?style=for-the-badge&logo=shield&logoColor=white)](https://better-auth.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment_Gateway-6772E5?style=for-the-badge&logo=stripe&logoColor=white)](https://stripe.com/)

<p align="center">
  <b>A ultra-low latency, cyber-minimalist digital asset management platform & orchestration terminal built for Web3 power users, node operators, and financial analysts.</b>
</p>

[🌐 Visit Live Terminal](https://nexus-terminal-7711.vercel.app) • [⚡ Architecture](#-system-architecture) • [🚀 Key Features](#-key-features) • [💻 Local Setup](#-local-installation--environment-setup)

</div>

---

## 📖 Overview

**NEXUS Protocol** is an enterprise-grade, full-stack financial dashboard designed to aggregate, analyze, and manage multi-chain crypto portfolios in real-time. Built from the ground up with **Next.js App Router**, **React 19**, and a serverless backend stack (**Neon Serverless PostgreSQL**, **Prisma ORM**, **Upstash Redis**, **BetterAuth**, and **Stripe**), NEXUS delivers a desktop-class **60 FPS cyber-terminal UI** combined with production-ready security, caching, and database architecture.

---

## ⚡ System Architecture

```
                                  +--------------------------------------------------+
                                  |              OPERATOR INTERFACE                  |
                                  |    Next.js 15 App Router | React 19 Stack      |
                                  |    Tailwind CSS | Framer Motion | Recharts     |
                                  +------------------------+-------------------------+
                                                           |
                                            HTTPS / Server Actions / REST API
                                                           |
                                                           v
                                  +--------------------------------------------------+
                                  |               NEXUS BACKEND CORE                 |
                                  |  Next.js Server Actions & Route Handlers        |
                                  |  BetterAuth Auth Guard (OAuth 2.0 & Session)     |
                                  +----+-------------------+-------------------+-----+
                                       |                   |                   |
                     +-----------------+                   |                   +------------------+
                     |                                     |                                      |
                     v                                     v                                      v
    +----------------------------------+  +---------------------------------+  +----------------------------------+
    |        DATABASE & CACHE          |  |         EMAIL ENGINE            |  |         PAYMENTS GATEWAY         |
    |  Prisma ORM (Schema Verification)|  |  Resend API Service             |  |  Stripe Webhooks & Checkout      |
    |  Neon Serverless PostgreSQL      |  |  Custom HTML Cyber Templates    |  |  Subscription Status Node        |
    |  Upstash Redis (Cache Layer)     |  +---------------------------------+  +----------------------------------+
    +----------------------------------+
```

---

## 🚀 Key Features

### 🔐 1. Cryptographic Authentication & Security
- **Multi-Provider Auth**: Full support for Email/Password credential login alongside **Google** and **GitHub OAuth 2.0** via **BetterAuth**.
- **Security Key Resets & Verification**: Automated HTML email verification and emergency password reset workflows powered by **Resend**.
- **Secure Cookie Sessions**: Production-grade HttpOnly cookie session storage with strict CSRF, CORS, and XSS isolation.

### 📊 2. Real-Time Telemetry & Portfolio Analytics
- **Live Market Telemetry**: Dynamic valuation tickers formatting live token prices up to 2 decimal precision across networks (Bitcoin, Solana, Polygon, BSC).
- **Interactive Performance Analytics**: Micro-charts for tracking net capital valuation histories (1D, 1W, 1M, 1Y) built on hardware-accelerated **Recharts** engines.
- **Precision Ledger System**: Transaction history with status badges (Completed, Pending, Failed), network filters, and search capabilities.

### 🗄️ 3. Serverless Data Architecture & Caching
- **Serverless PostgreSQL (Neon)**: Auto-scaling relational database managing users, accounts, asset portfolios, transaction ledgers, and support tickets.
- **Prisma ORM Pipeline**: Type-safe schema definitions with relational constraints and automated migrations.
- **Upstash Redis Caching Layer**: Ultra-fast in-memory caching to eliminate redundant database queries during high-concurrency traffic.

### 💳 4. Enterprise Subscriptions & Billing Engine
- **Stripe Checkout & Billing Portal**: Smooth integration with Stripe for subscription tier management and billing portal access.
- **Webhook Handlers**: Asynchronous event processing to sync subscription states directly with Neon DB.

### 📩 5. Support Ticket Matrix & Operations
- **Interactive Ticket Portal**: Dedicated support workflow allowing users to submit, track, and manage technical support requests.
- **Real-Time Notifications Engine**: Dynamic notification center alerting operators of node transactions, security changes, and system updates.

### 🎨 6. Cyberpunk Desktop-Grade UI (60 FPS Performance)
- **60 FPS Mobile Optimization**: Micro-optimizations (`backdrop-blur` contextual toggling, bundle tree-shaking) ensuring 60 FPS performance on mobile browsers.
- **Developer Audio Shell (Easter Egg)**: Hidden calibration shell triggered via 5-click execution on the terminal logo with custom synthesized sound effects.

---

## 🛠️ Tech Stack & Ecosystem

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15/16 (App Router)** | Full-Stack React Framework with Server Components & Actions |
| **Frontend Library** | **React 19 Stack** | UI Rendering & Concurrent State Execution |
| **Authentication** | **BetterAuth** | OAuth 2.0, Credentials, Session Management & Security |
| **Database** | **Neon Serverless PostgreSQL** | Cloud-native Relational Database Platform |
| **ORM** | **Prisma 6.x** | Type-safe Database Access & Migration Engine |
| **Cache & Speed** | **Upstash Redis** | Serverless In-Memory Data Store & Caching |
| **Email Engine** | **Resend** | Transactional Email Delivery Service |
| **Payments** | **Stripe** | Subscription Billing, Portal & Webhook Processing |
| **Styling** | **Tailwind CSS 3.4** | Modern Utility-First Cyber Design System |
| **Animation** | **Motion (Framer Motion)** | Hardware-Accelerated Physics Animations |
| **Icons & Telemetry**| **Lucide React** | Cybernetic Minimalist Vector Iconography |
| **Deployment** | **Vercel Edge Platform** | Zero-Downtime Serverless CI/CD Deployment |

---

## 💻 Local Installation & Environment Setup

Follow these steps to run a full-stack local instance of NEXUS on your machine:

### 1. Clone the Repository
```bash
git clone https://github.com/Armin-dev-7711/nexus-terminal.git
cd nexus-terminal
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and populate it with your service keys:

```env
# Server Base URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
BETTER_AUTH_URL="http://localhost:3000"
BETTER_AUTH_SECRET="your-generated-secret-key-here"

# Neon PostgreSQL Database Connection
DATABASE_URL="postgresql://user:password@ep-cool-endpoint-123456.us-east-2.aws.neon.tech/nexus?sslmode=require"

# Upstash Redis
UPSTASH_REDIS_REST_URL="https://your-redis-instance.upstash.io"
UPSTASH_REDIS_REST_TOKEN="your-upstash-token"

# OAuth Credentials (GitHub & Google)
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Resend Email API
RESEND_API_KEY="re_123456789_your_resend_key"

# Stripe Payments Integration
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

### 4. Push Database Schema (Prisma)
Initialize your PostgreSQL database tables with Prisma:

```bash
npx prisma db push
```

### 5. Launch the Local Development Cluster
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the operational terminal node.

---

## 📡 Automated CI/CD Continuous Deployment

The repository is directly integrated with **Vercel Edge Gateways**.
Any code pushed to the `main` branch automatically triggers production build pipelines:

```bash
git add .
git commit -m "feat: complete full-stack backend integration"
git push origin main
```

---

## 🛡️ License & Attribution

Engineered with passion by **Armin-dev-7711**. Distributed under the **MIT License**.

```
⚡ NEXUS CORE ENGINE RUNNING. SYSTEM HEALTH: 100% OPERATIONAL.
```
