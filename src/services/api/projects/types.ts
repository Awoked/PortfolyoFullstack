import { Media } from "../types";



export interface Project {
  id: number;
  attributes: {
    createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
    githubLink?: string;
    liveLink?: string;
    details?: string;
    cover?: { data: Media };
  };
}
export interface Project_Plain {
  createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
  githubLink?: string;
  liveLink?: string;
  details?: string;
  cover?: Media;
}