import { Gallery } from "@prisma/client";
import { UploadFileResponse } from "uploadthing/client";

export type GalleryType = Gallery;


export type galleryPostType = {
    files: UploadFileResponse[] | undefined
    sectionId: number
    filterKey: FilterKeyType
}

export type galleryPutType = Gallery


export type FilterKeyType = "primaryKey" | "secondaryKey";