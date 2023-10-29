import { galleryPostType } from "@/app/api/gallery/route";
import { Service } from "./Service";

class GalleryService extends Service {
    private _fullReqURL: string = this.getFullReq("/gallery");

    async createGallery({ sectionId, files, filterKey }: galleryPostType) {
        const response = await fetch(this._fullReqURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ sectionId, filterKey, files })
        })
        return response.json();
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