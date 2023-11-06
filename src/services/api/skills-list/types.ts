export interface SkillsList {
  id: number;
  attributes: {
    createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
    level?: number;
    description?: string;
  };
}
export interface SkillsList_Plain {
  createdAt: Date; updatedAt: Date; publishedAt?: Date; title?: string;
  level?: number;
  description?: string;
}
