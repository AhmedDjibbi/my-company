export interface LeadCriteria {
  budgetProvided: boolean;
  locationProvided: boolean;
  propertyTypeProvided: boolean;
  bedroomsProvided: boolean;
  clearIntent: boolean;
  urgencyHigh: boolean;
  phoneProvided: boolean;
  emailProvided: boolean;
  requestedViewing: boolean;
}

export function calculateLeadScore(criteria: LeadCriteria): number {
  let score = 0;
  if (criteria.budgetProvided) score += 15;
  if (criteria.locationProvided) score += 10;
  if (criteria.propertyTypeProvided) score += 10;
  if (criteria.bedroomsProvided) score += 5;
  if (criteria.clearIntent) score += 15;
  if (criteria.urgencyHigh) score += 15;
  if (criteria.phoneProvided) score += 15;
  if (criteria.emailProvided) score += 5;
  if (criteria.requestedViewing) score += 20;
  return Math.min(score, 100);
}

export function getScoreCategory(score: number): string {
  if (score >= 80) return 'VERY_HOT';
  if (score >= 60) return 'HOT';
  if (score >= 30) return 'WARM';
  return 'COLD';
}
