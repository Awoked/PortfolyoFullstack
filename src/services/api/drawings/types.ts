import { Media } from "../types";

export interface Drawing {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    cover?: { data: Media };
  };
}
export interface Drawing_Plain {
  id: number;
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  cover?: Media;
}