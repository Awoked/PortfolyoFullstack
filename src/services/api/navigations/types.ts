export interface Navigation {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title?: string;
    href?: string;
  };
}
export interface Navigation_Plain {
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title?: string;
  href?: string;
}