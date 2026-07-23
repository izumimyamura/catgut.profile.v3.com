export type SkillNames =
  | "ae"
  | "davinci"
  | "motion"
  | "premiere"
  | "capcut"
  | "js"
  | "react"
  | "figma"
  | "node";

export interface Skill {
  name: SkillNames;
  label: string;
  shortDescription: string;
  color?: string;
}

export const SKILLS: Record<string, Skill> = {
  ae: {
    name: "ae",
    label: "Adobe After Effects",
    shortDescription: "Industry-standard motion graphics, visual effects, and typography.",
  },
  davinci: {
    name: "davinci",
    label: "DaVinci Resolve",
    shortDescription: "High-end color grading nodes, audio mixing, and precision editing.",
  },
  motion: {
    name: "motion",
    label: "Apple Motion",
    shortDescription: "Mac-only motion graphics application built for Final Cut Pro templates.",
  },
  premiere: {
    name: "premiere",
    label: "Adobe Premiere Pro",
    shortDescription: "Professional timeline video editing software for film and social content.",
  },
  capcut: {
    name: "capcut",
    label: "CapCut",
    shortDescription: "Accessible editor packed with AI tools for rapid social edits.",
  },
  js: { name: "js", label: "JavaScript", shortDescription: "Interactive web logic and animations." },
  react: { name: "react", label: "React", shortDescription: "UI Component framework." },
  figma: { name: "figma", label: "Figma", shortDescription: "UI/UX & graphic design." },
  node: { name: "node", label: "Node.js", shortDescription: "Backend JavaScript runtime." },
};