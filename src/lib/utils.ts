import { FilterKeyType, GalleryType } from "@/app/api/gallery/types";
import { SectionType } from "@/app/api/sections/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findSection(sectionName: string, sectionData: SectionType[]) {
  return sectionData.find(x => x.section === sectionName);
}

export function findGalleryKey(key: FilterKeyType, galleryData: GalleryType[]) {
  const galleryItem = galleryData.find(x => x.filterKey === key);
  if (!galleryItem) {
    return null
  } 

  return galleryItem
}