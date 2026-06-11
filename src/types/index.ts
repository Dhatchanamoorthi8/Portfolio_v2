export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: string[];
  features: string[];
  category: 'enterprise' | 'ai' | 'iot';
  demoUrl?: string;
  githubUrl?: string;
  architectureNodes?: ArchNode[];
  metrics?: Metric[];
  aiTools?: string[];
}

export interface ArchNode {
  label: string;
  icon?: string;
  description?: string;
}

export interface Metric {
  label: string;
  value: string;
}

export interface Skill {
  name: string;
  icon?: string;
  projects: string[];
  level: 'expert' | 'advanced' | 'intermediate';
}

export interface SkillGroup {
  category: string;
  icon: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company?: string;
  period: string;
  achievements: Achievement[];
  techStack: string[];
}

export interface Achievement {
  text: string;
  metric?: string;
}

export interface Service {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar?: string;
}

export interface ThemeConfig {
  accentHue: number;
  accentSaturation: number;
  fontSize: 'small' | 'medium' | 'large';
}

export interface AITool {
  name: string;
  description: string;
  icon: string;
  color: string;
}
