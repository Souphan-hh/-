export type Language = 'en' | 'zh';

export enum Difficulty {
  EASY = "EASY",
  MODERATE = "MODERATE",
  CHALLENGING = "CHALLENGING"
}

export enum RouteStyle {
  CLASSIC = "CLASSIC",
  HIDDEN_GEM = "HIDDEN_GEM" // VIP Feature
}

export interface Preferences {
  childAge: number;
  difficulty: Difficulty;
  durationHours: number;
  language: Language;
  routeStyle: RouteStyle;
}

export interface SearchSource {
  title: string;
  uri: string;
}

export interface PlanResult {
  markdownContent: string;
  sources: SearchSource[];
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  sources?: SearchSource[];
}

export interface GearItem {
  id: string;
  name: string;
  price: string;
  image: string;
  link: string;
}