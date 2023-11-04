import { galleryPostType, galleryPutType } from "@/app/api/gallery/types";
import { Service } from "./Service";
import { GalleryType } from "@/app/api/gallery/types";

class GalleryService extends Service {
    private _fullReqURL: string = this.getFullReq("/gallery");

    async getSectionGallery(sectionId: string | number) {
        const response = await fetch(`${this._fullReqURL}?sectionId=${sectionId}`, {
            next: {
                revalidate: 5
            }
        })
        if (response.status !== 200) return null

        return await response.json() as GalleryType[];
    }


    async createGallery({ sectionId, files, filterKey }: galleryPostType) {
        const response = await fetch(this._fullReqURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sectionId, filterKey, files })
        })
        return await response.json();
    }

    async updateGallery(gallery: galleryPutType[]) {
        const response = await fetch(this._fullReqURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(gallery)
        })
        if (response.status !== 200) return null;
        return await response.json();
    }


    async deleteById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`, {
            method: "DELETE"
        });
        if (response.status !== 200) throw new Error("error")
        return await response.json();
    }
}

export default GalleryService