import { SectionType } from "@/app/api/sections/types";
import { Service } from "./Service";

class SectionService extends Service {
    private _fullReqURL: string = this.getFullReq("/sections");



    async getAll() {
        const response = await fetch(this._fullReqURL, {
            next: {
                revalidate: 10
            }
        });
        if (response.status !== 200) return null;

        return await response.json() as SectionType[];
    }

    async getByID(_id: number | string) {
        const response = await fetch(this._fullReqURL + `?id=${_id}`, {
            next: {
                revalidate: 10
            }
        });
        if (response.status !== 200) return null;

        return await response.json() as SectionType;
    }

    async getBySection(_section: string) {
        const response = await fetch(this._fullReqURL + `?section=${_section}`, {
            next: {
                revalidate: 10
            }
        });
        if (response.status !== 200) return null;

        return await response.json() as SectionType;
    }

    async createSection(body: SectionType ) {
        const response = await fetch(this._fullReqURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        if (response.status !== 201) return null;

        return await response.json() as SectionType;
    }

    async updateSection(body: SectionType) {
        console.log('body', body)
        const response = await fetch(this._fullReqURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        if (response.status !== 200) return null;

        return await response.json() as SectionType;
    }

    async deleteSectionById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`, {
            method: "DELETE"
        });
        if (response.status !== 200) return null;

        return await response.json();
    }
}


export default SectionService 