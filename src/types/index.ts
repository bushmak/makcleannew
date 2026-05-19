export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  imageSrc: string;
  slug: string;
  features: string[];
}

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  imageSrc: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageSrc: string;
  slug: string;
  readTime: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ServiceDetail {
  slug: string;
  icon: string;
  title: string;
  accroche: string;
  description: string[];
  prestations: string[];
  avantages: string[];
  processus?: ProcessStep[];
  frequence?: string;
  zone: string;
  imageSrc: string;
  ctaTitle?: string;
}