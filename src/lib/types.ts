export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type AssetType = 'Application' | 'Infrastructure' | 'Cloud' | 'Endpoint' | 'Database' | 'Third-Party';
export type ControlStatus = 'Implemented' | 'Partial' | 'Planned' | 'Under Review';

export interface Asset {
  id: string;
  name: string;
  type: AssetType;
  criticality: Severity;
  criticalityScore: number; // 1 to 5
  usersCount?: string;
  financialValuation: number; // in Rupees
  currentRiskScore: number; // 0 to 100
  eal: number; // Expected Annual Loss in Rupees
  owner: string;
  department: string;
  location: string;
  description: string;
  associatedThreatCount: number;
  vulnerabilityCount: number;
}

export interface Threat {
  id: string;
  name: string;
  category: string;
  severity: Severity;
  probability: number; // 0 to 1 (e.g. 0.18 = 18%)
  potentialFinancialImpact: number; // in Rupees
  affectedAssetIds: string[];
  mitreTactic: string;
  mitreTechnique: string;
  recommendedAction: string;
  activeCampaignCount: number;
}

export interface Vulnerability {
  id: string; // e.g. CVE-2024-21413
  title: string;
  assetId: string;
  assetName: string;
  severity: Severity;
  cvssScore: number; // 0.0 to 10.0
  exploitability: 'Active Exploit' | 'PoC Available' | 'Theoretical';
  financialExposure: number; // in Rupees
  recommendedControlId: string;
  status: 'Open' | 'In Progress' | 'Remediated';
  discoveredDate: string;
  cwe: string;
}

export interface SecurityControl {
  id: string;
  name: string;
  category: string;
  currentMaturity: number; // 1 to 5 (CMMI level)
  targetMaturity: number; // 1 to 5
  currentInvestment: number; // in Rupees
  recommendedInvestment: number; // in Rupees
  maxRiskReductionPct: number; // e.g. 40 means max 40% reduction at saturation
  saturationBudget: number; // ₹ at which diminishing returns flattens significantly
  diminishingCoeff: number; // k in 1 - exp(-k * x)
  coveragePercentage: number; // 0 to 100
  effectivenessScore: number; // 0 to 100
  associatedAssetIds: string[];
  description: string;
  nistRef: string;
  isoRef: string;
  rbiRef: string;
}

export interface CyberRisk {
  id: string;
  title: string;
  assetId: string;
  assetName: string;
  threatId: string;
  threatName: string;
  vulnerabilityId?: string;
  likelihood: number; // 1 to 5
  impact: number; // 1 to 5
  assetCriticality: number; // 1 to 5
  riskScore: number; // 0 to 100 (normalized)
  severity: Severity;
  probabilityOfLoss: number; // 0 to 1
  financialImpact: number; // Potential worst-case loss in ₹
  expectedAnnualLoss: number; // EAL = probabilityOfLoss * financialImpact
  existingControls: string[];
  recommendedControlId: string;
  recommendedControlName: string;
  residualRiskScore: number;
}

export interface OptimizationResult {
  budget: number;
  totalAllocated: number;
  remainingBudget: number;
  baselineRiskScore: number;
  optimizedRiskScore: number;
  riskReductionPct: number;
  baselineEAL: number;
  projectedEAL: number;
  expectedLossAvoided: number;
  rosi: number; // Return on Security Investment (e.g. 2.6x)
  allocations: Record<string, number>; // controlId -> allocated ₹
  reasonings: OptimizationReasoning[];
}

export interface OptimizationReasoning {
  controlId: string;
  controlName: string;
  previousAllocation: number;
  recommendedAllocation: number;
  delta: number;
  marginalRiskReductionPct: number;
  expectedLossAvoided: number;
  reason: string[];
  curvePoints: { investment: number; reductionPct: number }[];
}

export interface Scenario {
  id: string;
  name: string;
  description: string;
  badge: string;
  budget: number;
  controlAllocations: Record<string, number>;
  threatMultiplier: number;
  criticalityWeight: number;
  projectedRiskScore: number;
  projectedEAL: number;
  riskReductionPct: number;
  lossAvoided: number;
  rosi: number;
}

export interface ComplianceControl {
  id: string;
  controlName: string;
  category: string;
  nistId: string;
  nistStatus: 'Implemented' | 'Partial' | 'Planned';
  isoId: string;
  isoStatus: 'Implemented' | 'Partial' | 'Planned';
  rbiId: string;
  rbiStatus: 'Implemented' | 'Partial' | 'Planned';
  associatedControlId: string;
  gapSummary: string;
  riskLevel: Severity;
}

export interface RiskSnapshot {
  date: string;
  riskScore: number;
  eal: number; // in Lakhs
  activeVulnerabilities: number;
  criticalThreatCount: number;
}
