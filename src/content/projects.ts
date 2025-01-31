export type Project = {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  link?: string;
  github?: string;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned';
  startDate: string;
  endDate?: string;
};

export const projects: Project[] = [
  {
    title: "sundli.ai",
    description: "My personal website and blog built with Next.js, TypeScript, and Tailwind CSS. Features a modern design, dark mode, and a command palette for navigation.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React"],
    github: "https://github.com/ks93/sundli.ai",
    featured: true,
    status: "completed",
    startDate: "2024-01",
  },
  {
    title: "Project Explorer",
    description: "A visual tool for exploring and understanding complex project dependencies and relationships. Built with D3.js and React.",
    tags: ["React", "D3.js", "TypeScript"],
    featured: true,
    status: "in-progress",
    startDate: "2024-03",
  },
  {
    title: "AI Code Assistant",
    description: "An intelligent code review and suggestion tool that helps developers write better code. Uses OpenAI's GPT-4 API for analysis.",
    tags: ["Python", "Machine Learning", "OpenAI", "FastAPI"],
    featured: false,
    status: "planned",
    startDate: "2024-04",
  }
];

export const getAllProjects = () => projects;
export const getFeaturedProjects = () => projects.filter(project => project.featured);
export const getProjectsByStatus = (status: Project['status']) => 
  projects.filter(project => project.status === status);
export const getProjectsByTag = (tag: string) =>
  projects.filter(project => project.tags.includes(tag));
export const getAllTags = () => 
  Array.from(new Set(projects.flatMap(project => project.tags))).sort(); 