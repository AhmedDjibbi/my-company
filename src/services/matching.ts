import { prisma } from "@/lib/prisma"

export interface MatchCriteria {
  transactionType: string;
  budgetMax: number;
  location?: string;
  propertyType?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export interface PropertyMatch {
  property: any;
  matchScore: number;
  matchReasons: string[];
}

export async function matchProperties(criteria: MatchCriteria): Promise<PropertyMatch[]> {
  const properties = await prisma.property.findMany({
    where: {
      transactionType: criteria.transactionType,
      status: 'AVAILABLE',
    },
  });

  const matches: PropertyMatch[] = [];

  for (const prop of properties) {
    let score = 0;
    const reasons: string[] = [];

    if (prop.price <= criteria.budgetMax) {
      score += 40;
      reasons.push("Within budget");
    }

    if (criteria.location && prop.city === criteria.location) {
      score += 30;
      reasons.push(`Located in ${criteria.location}`);
    }

    if (criteria.propertyType && prop.propertyType === criteria.propertyType) {
      score += 15;
      reasons.push(`Matches property type ${criteria.propertyType}`);
    }

    if (criteria.bedrooms && prop.bedrooms && prop.bedrooms >= criteria.bedrooms) {
      score += 15;
      reasons.push(`Has at least ${criteria.bedrooms} bedrooms`);
    }

    if (score > 0) {
      matches.push({
        property: prop,
        matchScore: score,
        matchReasons: reasons,
      });
    }
  }

  return matches.sort((a, b) => b.matchScore - a.matchScore);
}
