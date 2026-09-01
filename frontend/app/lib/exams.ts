// frontend/src/lib/exams.ts

export interface ExamCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
}

export const EXAM_CATEGORIES: ExamCategory[] = [
  {
    id: 'ssc',
    name: 'SSC',
    slug: 'ssc',
    icon: '🎯',
    description: 'SSC CGL, CHSL, MTS, GD Exams',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 'banking',
    name: 'Banking',
    slug: 'banking',
    icon: '🏦',
    description: 'SBI, IBPS, RBI Exams',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
  },
  {
    id: 'railway',
    name: 'Railway',
    slug: 'railway',
    icon: '🚂',
    description: 'RRB NTPC, Group D, ALP',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    id: 'upsc',
    name: 'UPSC',
    slug: 'upsc',
    icon: '🏛️',
    description: 'UPSC CSE, IAS, IPS, IFS',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    id: 'cet',
    name: 'CET',
    slug: 'cet',
    icon: '📝',
    description: 'Common Eligibility Test',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
  },
  {
    id: 'rpsc',
    name: 'RPSC',
    slug: 'rpsc',
    icon: '📍',
    description: 'Rajasthan PSC Exams',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 'rssb',
    name: 'RSSB',
    slug: 'rssb',
    icon: '🏢',
    description: 'Rajasthan Staff Selection Board',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
  },
  {
    id: 'police',
    name: 'Police',
    slug: 'police',
    icon: '👮',
    description: 'Police Constable, SI Exams',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
  },
  {
    id: 'teaching',
    name: 'Teaching',
    slug: 'teaching',
    icon: '👨‍🏫',
    description: 'CTET, UPTET, REET, STET',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 'defence',
    name: 'Defence',
    slug: 'defence',
    icon: '🪖',
    description: 'NDA, CDS, AFCAT, CAPF',
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
  },
];
