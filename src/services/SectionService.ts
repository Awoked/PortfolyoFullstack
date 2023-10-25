import { SectionDataType } from "@/app/api/sections/route";
import { IServiceOptions } from ".";




class SectionService {
    public serviceOptions: IServiceOptions = {
        isServer: true,
    }
    private _apiURL: string;
    private _endpoint = '/sections';
    private _fullReqURL: string;

    constructor(_serviceOptions?: IServiceOptions) {
        if (_serviceOptions) {
            this.serviceOptions = { ...this.serviceOptions, ..._serviceOptions };
        }
        try {
            if (window) {
                this._apiURL = "/api";
            } else {
                this._apiURL = process.env.API_BASE_URL as string;
            }
        } catch (err) {
            this._apiURL = process.env.API_BASE_URL as string;
        }

        // this._apiURL = this.serviceOptions.isServer ? process.env.API_BASE_URL as string : "/api";
        this._fullReqURL = this._apiURL + this._endpoint;
    }

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
        const response = await fetch(this._fullReqURL + `?id=${id}`);
        return await response.json();
    }
}

const sectionService = new SectionService();

export default sectionService 