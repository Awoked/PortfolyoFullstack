import { SectionDataType } from "@/app/api/sections/route";
import { Service } from "./Service";

class SectionService extends Service {
    private _fullReqURL: string = this.getFullReq("/sections");

 
    
    async getAll() {
        const response = await fetch(this._fullReqURL, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async getByID(_id: number | string) {
        const response = await fetch(this._fullReqURL + `?id=${_id}`, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async getBySection(_section: string) {
        const response = await fetch(this._fullReqURL + `?section=${_section}`, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async createSection(body: SectionDataType) {
        const { SectionData, GalleryData } = body;
        const response = await fetch(this._fullReqURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionData: {
                    ...SectionData
                },
                GalleryData: GalleryData
            })
        })

        return await response.json();
    }

    async updateSection(body: SectionDataType) {
        const { GalleryData, SectionData } = body;
        const response = await fetch(this._fullReqURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionData: {
                    ...SectionData,
                },
                GalleryData: GalleryData
            })
        })

        return await response.json();

    }

    async deleteSectionById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`, {
            method: "DELETE"
        });
        return await response.json();
    }
}


export default SectionService 