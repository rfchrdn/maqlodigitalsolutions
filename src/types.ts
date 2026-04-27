export interface ProjectMedia {
  url: string;
  type: 'image' | 'video';
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  media: ProjectMedia[];
  techStack: string[];
  imageUrl?: string; // Kept for backward compatibility if needed, but media is preferred
  link?: string;
  github?: string;
  createdAt?: any;
}

export interface User {
  uid: string;
  email: string;
  role: 'admin';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
