import { SectionDataType } from "@/app/api/sections/route";
import { Gallery, SectionData } from "@prisma/client"



export interface IServiceOptions {
    isServer: boolean
}


class SectionService {
    public isServer: boolean = true;
    private apiURL = this.isServer ? process.env.API_BASE_URL : "";
    private endpoint = '/sections';

    private fullReqURL = this.apiURL + this.endpoint;

    constructor(serviceOptions?: IServiceOptions) {
        if (serviceOptions) {
            this.isServer = serviceOptions?.isServer;
        }
    }

    async getAll() {
        const response = await fetch(this.fullReqURL, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async getByID(_id: number | string) {
        const response = await fetch(this.fullReqURL + `?id=${_id}`, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async getBySection(_section: string) {
        const response = await fetch(this.fullReqURL + `?section=${_section}`, {
            next: {
                revalidate: 10
            }
        });
        return await response.json();
    }

    async createSection(body: SectionDataType) {
        const { SectionData, GalleryData } = body;
        const response = await fetch(this.fullReqURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionData: {
                    ...SectionData,
                    id: undefined
                },
                GalleryData: GalleryData
            })
        })
        return await response.json();
    }

    async updateSection(body: SectionDataType) {
        const { GalleryData, SectionData } = body;
        const response = await fetch(this.fullReqURL, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                SectionData: {
                    ...SectionData,
                    id: undefined
                },
                GalleryData: GalleryData
            })
        })
        return await response.json();
    }

    async deleteSectionById(id: string | number) {
        const response = await fetch(this.fullReqURL + `?id=${id}`);
        return await response.json();
    }
}

export {
    SectionService
}