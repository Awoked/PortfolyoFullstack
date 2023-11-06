
export interface Section {
  id: number;
  attributes: {
    createdAt: Date;    updatedAt: Date;    publishedAt?: Date;    title?: string;
    description?: string;
    subtitle?: string;
    linkhref?: string;
    content?: any;
    section: string;
  };
}
export interface Section_Plain {
  createdAt: Date;  updatedAt: Date;  publishedAt?: Date;  title?: string;
  description?: string;
  subtitle?: string;
  linkhref?: string;
  content?: any;
  section: string;
}