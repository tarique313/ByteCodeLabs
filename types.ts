
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'Security' | 'Development';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export enum SectionId {
  HERO = 'hero',
  SERVICES = 'services',
  ABOUT = 'about',
  CONTACT = 'contact',
  CHAT = 'chat'
}
