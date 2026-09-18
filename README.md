# OptiRisk — Continuous Cyber Risk Quantification & Investment Optimization Platform

**Team:** THE TITANS  
**SIH Problem Statement:** SIH26105  
**Target Organization:** Titan Financial Group (Tier-1 Enterprise Banking Environment)

---

## 1. Executive Summary

Enterprise CISOs and CFOs struggle to answer a fundamental financial question:
> *"Where should the organization invest its cybersecurity budget to reduce the maximum amount of financial cyber risk?"*

Traditional security tools produce qualitative "Red/Yellow/Green" heatmaps that fail to communicate balance-sheet exposure to the Board of Directors. **OptiRisk** bridges this gap by translating technical cyber risk (Assets, CVEs, Threat Actors, Controls) into **Expected Annual Loss (EAL)** in Indian Rupees (₹), and optimizes limited budgets using a **deterministic marginal-yield knapsack algorithm with diminishing returns**.

---

## 2. Core Mathematical Architecture (Deterministic & Explainable)

The platform is strictly **not** a black-box LLM. All risk scores, loss projections, and investment recommendations are powered by transparent mathematical models:

### A. Normalized Cyber Risk Score (0–100)
$$\text{Score} = \text{Round}\left(\frac{\text{Likelihood} \times \text{Impact} \times \text{Asset Criticality}}{125} \times 100\right)$$
- Likelihood $\in [1, 5]$
- Impact $\in [1, 5]$
- Asset Criticality $\in [1, 5]$
- Max raw product: $5 \times 5 \times 5 = 125$.

### B. Financial Risk Engine: Expected Annual Loss (EAL / ALE)
$$\text{EAL} = \text{Probability of Loss Event} \times \text{Potential Financial Impact}$$
*Benchmark Demonstration:*
- Probability: $12\%$ ($0.12$)
- Financial Exposure: $₹3.2\text{ Crore}$
- $\text{EAL} = 0.12 \times ₹3,20,00,000 = \mathbf{₹38.4\text{ Lakhs}}$

### C. Diminishing Returns on Security Controls
Security controls do not yield linear risk reduction:
$$R(x) = R_{\max} \cdot \left(1 - e^{-k \cdot x}\right)$$
*Example (API Security):*
- $₹0 \rightarrow 0\%$
- $₹1.0\text{L} \rightarrow 12.0\%$
- $₹2.0\text{L} \rightarrow 21.0\%$
- $₹3.0\text{L} \rightarrow 28.0\%$
- $₹5.0\text{L} \rightarrow 32.0\%$
- $₹10.0\text{L} \rightarrow 34.0\%$ (Saturation Plateau)

### D. Return on Security Investment (ROSI)
$$\text{ROSI} = \frac{\text{Estimated Loss Avoided} - \text{Security Investment}}{\text{Security Investment}}$$
- Baseline Budget: $₹10.0\text{L}$
- Annual Loss Avoided: $₹16.7\text{L/year}$
- Projected ROSI Multiplier: $\mathbf{2.6\times}$

---

## 3. Five-Minute SIH Demonstration Flow

1. **Step 1: Executive Dashboard**
   - Open `/dashboard`.
   - Highlight top KPIs: **Risk Score: 68 / 100**, **EAL: ₹38.4L**, **Budget: ₹10.0L**.
2. **Step 2: Risk Intelligence & 2D Heatmap**
   - Open `/risk-intelligence`.
   - Inspect top financial risks (API BOLA authorization vulnerability accounting for ₹8.4L EAL).
   - Test interactive EAL slider.
3. **Step 3: Investment Optimizer (HERO FEATURE)**
   - Open `/optimizer`.
   - View available ₹10.0L budget with preset selectors (₹5L to ₹1Cr).
   - Observe baseline budget allocations across 12 enterprise controls.
4. **Step 4: Execute Optimization Engine**
   - Click **"Optimize Allocation"**.
   - The greedy knapsack algorithm shifts +₹2.0L into API Security and IAM, while reallocating funds away from saturated EDR.
5. **Step 5: Before vs. After Benchmark Verification**
   - Before: Risk = **68**, EAL = **₹38.4L**
   - After: Risk = **41**, EAL = **₹21.7L**
   - Loss Avoided = **₹16.7L/year**, Risk Reduction = **42.8%**, ROSI = **2.6×**.
6. **Step 6: What-If Scenario Simulator**
   - Open `/simulator`.
   - Shift ₹1.5L from EDR to API Security and observe the real-time sandbox delta.
   - Adjust threat probability to test a 20% surge in ransomware.
7. **Step 7: Titan Analyst AI Assistant**
   - Open `/analyst`.
   - Query: *"Why is API security currently our biggest financial risk?"*
   - Observe grounded, context-aware analysis citing exact Rupee figures and CVE-2024-50013.
8. **Step 8: Board-Ready Executive Report**
   - Open `/reports`.
   - Generate board briefing dossier and click "Print / Export PDF".

---

## 4. Technology Stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS (Near-black `#080B11` charcoal dark theme, electric blue `#38BDF8` accents)
- **Charts:** Recharts (Dual-axis trend lines, Area saturation curves, Pie distribution)
- **Icons & Micro-animations:** Lucide React, Framer Motion
- **Backend & Storage:** Firebase Client SDK (Auth & Firestore) with seamless zero-config local simulation mode
- **AI Integration:** Grounded Titan Analyst server-side endpoint (`/api/analyst`) with Gemini 1.5 Flash support and deterministic fallback.

---

## 5. Getting Started & Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

### Zero-Configuration Demo Mode
The application runs out of the box with zero external configuration. If Firebase or Gemini API keys are omitted, the platform activates high-fidelity local state emulation with 16 assets, 26 risks, 16 threats, 30 CVEs, and 12 controls.

---
*Developed by THE TITANS for Smart India Hackathon 2026 (SIH26105).*
