import { Media } from "../types";

export interface Drawing {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    cover?: { data: Media };
    alt?: string;
  };
}
export interface Drawing_Plain {
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  cover?: Media;
  alt?: string;
}
