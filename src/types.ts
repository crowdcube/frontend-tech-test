export type Currency = [number, string];

export interface MinimalOpportunityModel {
  id: string;
  name: string;
  description: string;
  investment: {
    current: Currency;
    target: Currency;
    percentage: number;
  };
  equity: string;
  images: {
    id: string;
    type: 'coverImage' | 'logo';
    src: string;
  }[];
  updated_at: string;
  expires_at: string;
  most_recent_investment: string;
}

export interface OpportunityBlock {
  title: string;
  content: string;
}

export interface FullOpportunityModel extends MinimalOpportunityModel {
  blocks:OpportunityBlock[];
}