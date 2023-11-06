
export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}



export interface Media {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    createdAt: Date;
    updatedAt: Date;
  }
}



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