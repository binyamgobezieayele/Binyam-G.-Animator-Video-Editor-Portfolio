import React from 'react';

export interface Skill {
  name: string;
  icon: React.ReactNode;
}

export interface CaseStudy {
  problem: string;
  solution: string;
  result: string;
  keyMetrics?: { label: string; value: string; }[];
}

export interface PlaylistItem {
  id: number | string;
  title: string;
  description: string;
  type: 'standard' | 'before-after';
  tools: string[];
  thumbnailUrl?: string;
  videoUrl?: string;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  caseStudy?: CaseStudy;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  thumbnailUrl: string;
  tools: string[];
  playlist: PlaylistItem[];
}

export interface InProgressProject {
  id: number;
  title: string;
  description: string;
  previewUrl: string;
  tools: string[];
}

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  company: string;
}

export interface QuoteBreakdownItem {
  item: string;
  cost: string;
}

export interface Quote {
  estimatedCostRange: string;
  breakdown: QuoteBreakdownItem[];
  timelineEstimate: string;
  assumptions: string;
}