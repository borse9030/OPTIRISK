import { CyberRisk, SecurityControl } from './types';

/**
 * Format numeric currency values into clean Indian Rupee notation (₹ Lakhs, ₹ Crores, ₹ K)
 */
export function formatINR(amount: number, compact: boolean = true): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';

  if (!compact) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  const abs = Math.abs(amount);
  if (abs >= 10000000) {
    // 1 Crore = 10,000,000
    const cr = amount / 10000000;
    return `₹${cr.toFixed(cr >= 10 ? 1 : 2)}Cr`;
  }
  if (abs >= 100000) {
    // 1 Lakh = 100,000
    const lk = amount / 100000;
    return `₹${lk.toFixed(lk >= 10 ? 1 : 1)}L`;
  }
  if (abs >= 1000) {
    const k = amount / 1000;
    return `₹${k.toFixed(k >= 10 ? 0 : 1)}K`;
  }
  return `₹${Math.round(amount)}`;
}

/**
 * Calculate transparent Normalized Cyber Risk Score (0 - 100)
 * Score = (Likelihood * Impact * Asset Criticality) / MaxPossible (125) * 100
 */
export function calculateNormalizedRiskScore(
  likelihood: number,
  impact: number,
  criticality: number
): number {
  const clampedL = Math.min(5, Math.max(1, likelihood));
  const clampedI = Math.min(5, Math.max(1, impact));
  const clampedC = Math.min(5, Math.max(1, criticality));

  const raw = clampedL * clampedI * clampedC;
  return Math.round((raw / 125) * 100);
}

/**
 * Calculate Expected Annual Loss (EAL / ALE)
 * EAL = Probability of Loss Event * Potential Financial Impact
 */
export function calculateEAL(probability: number, financialImpact: number): number {
  const p = Math.min(1, Math.max(0, probability));
  const impact = Math.max(0, financialImpact);
  return Math.round(p * impact);
}

/**
 * Diminishing returns curve for security control investment:
 * R(x) = MaxReductionPct * (1 - exp(-k * x))
 * @param investmentRupees Amount invested in Rupees
 * @param maxReductionPct Maximum percentage risk reduction (e.g. 38 for 38%)
 * @param diminishingCoeff Coefficient k
 */
export function calculateControlRiskReductionPct(
  investmentRupees: number,
  maxReductionPct: number,
  diminishingCoeff: number
): number {
  if (investmentRupees <= 0) return 0;
  // Investment in Lakhs for normalized scaling
  const invLakhs = investmentRupees / 100000;
  const reduction = maxReductionPct * (1 - Math.exp(-diminishingCoeff * invLakhs));
  return Math.min(maxReductionPct, Math.round(reduction * 10) / 10);
}

/**
 * Generate curve points for visualizing diminishing returns
 */
export function generateDiminishingReturnsCurve(
  control: SecurityControl,
  maxSpendRupees: number = 1000000,
  steps: number = 10
): { investment: number; investmentLabel: string; reductionPct: number; marginalYield: number }[] {
  const points = [];
  const stepSize = maxSpendRupees / steps;

  let prevReduction = 0;
  for (let i = 0; i <= steps; i++) {
    const spend = i * stepSize;
    const reductionPct = calculateControlRiskReductionPct(
      spend,
      control.maxRiskReductionPct,
      control.diminishingCoeff
    );
    const marginalYield = i === 0 ? 0 : Math.max(0, Math.round((reductionPct - prevReduction) * 10) / 10);
    prevReduction = reductionPct;

    points.push({
      investment: spend,
      investmentLabel: spend === 0 ? '₹0' : formatINR(spend),
      reductionPct,
      marginalYield,
    });
  }
  return points;
}

/**
 * Calculate Return on Security Investment (ROSI)
 * ROSI = (Estimated Loss Avoided - Security Investment) / Security Investment
 * Also returns the multiplier form (Loss Avoided / Investment)
 */
export function calculateROSI(lossAvoided: number, investmentCost: number): {
  ratio: number;
  multiplierText: string;
  netBenefit: number;
} {
  if (investmentCost <= 0) {
    return { ratio: 0, multiplierText: '0.0×', netBenefit: 0 };
  }
  const netBenefit = lossAvoided - investmentCost;
  const multiplier = Math.round((lossAvoided / investmentCost) * 10) / 10;
  const rosiRatio = (lossAvoided - investmentCost) / investmentCost;

  return {
    ratio: Math.round(rosiRatio * 100) / 100,
    multiplierText: `${multiplier.toFixed(1)}×`,
    netBenefit,
  };
}

/**
 * Calculate portfolio aggregate risk score and EAL under a set of control investments
 */
export function evaluatePortfolioMetrics(
  risks: CyberRisk[],
  controls: SecurityControl[],
  allocations: Record<string, number>,
  threatMultiplier: number = 1.0,
  criticalityWeight: number = 1.0
): {
  overallRiskScore: number;
  totalEAL: number;
  totalFinancialExposure: number;
  totalLossAvoided: number;
  riskReductionPct: number;
} {
  let baselineTotalEAL = 0;
  let totalResidualEAL = 0;
  let totalRiskScoreSum = 0;
  let totalFinancialExposure = 0;

  // Build map of control risk reduction percentage based on allocated funds
  const controlReductionMap = new Map<string, number>();
  controls.forEach((ctrl) => {
    const allocated = allocations[ctrl.id] || 0;
    const redPct = calculateControlRiskReductionPct(
      allocated,
      ctrl.maxRiskReductionPct,
      ctrl.diminishingCoeff
    );
    controlReductionMap.set(ctrl.id, redPct);
  });

  risks.forEach((risk) => {
    // Adjusted probability based on threat multiplier
    const adjustedProb = Math.min(1, risk.probabilityOfLoss * threatMultiplier);
    const baselineEAL = adjustedProb * risk.financialImpact;
    baselineTotalEAL += baselineEAL;
    totalFinancialExposure += risk.financialImpact;

    // Find applicable control reduction
    const ctrlReduction = controlReductionMap.get(risk.recommendedControlId) || 0;
    // Applied reduction fraction
    const redFraction = ctrlReduction / 100;
    const residualEAL = baselineEAL * (1 - redFraction);
    totalResidualEAL += residualEAL;

    // Calculate adjusted risk score
    const adjustedCrit = Math.min(5, risk.assetCriticality * criticalityWeight);
    const baseScore = calculateNormalizedRiskScore(risk.likelihood, risk.impact, adjustedCrit);
    const residualScore = Math.max(10, Math.round(baseScore * (1 - redFraction * 0.85)));
    totalRiskScoreSum += residualScore;
  });

  const overallRiskScore = risks.length > 0 ? Math.round(totalRiskScoreSum / risks.length) : 0;
  const totalLossAvoided = Math.max(0, baselineTotalEAL - totalResidualEAL);
  const riskReductionPct = baselineTotalEAL > 0
    ? Math.round((totalLossAvoided / baselineTotalEAL) * 1000) / 10
    : 0;

  return {
    overallRiskScore,
    totalEAL: Math.round(totalResidualEAL),
    totalFinancialExposure,
    totalLossAvoided: Math.round(totalLossAvoided),
    riskReductionPct,
  };
}
