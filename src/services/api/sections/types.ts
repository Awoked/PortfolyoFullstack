import { Media } from "../types";


export interface Section {
  id: number;
  attributes: {
    createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
    description?: string;
    subtitle?: string;
    linkhref?: string;
    section: string;
    content?: any;
    cover?: { data: Media };
  };
}
export interface Section_Plain {
  createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
  description?: string;
  subtitle?: string;
  linkhref?: string;
  section: string;
  content?: any;
  cover?: { data: Media };
}