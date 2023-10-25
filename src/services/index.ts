import SectionService from "./SectionService"
import GalleryService from "./GalleryService";

export interface IServiceOptions {
    isServer: boolean
}

const galleryService = new GalleryService();
const sectionService = new SectionService();

export {
    sectionService,
    galleryService
}


