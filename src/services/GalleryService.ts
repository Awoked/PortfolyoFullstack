import { IServiceOptions } from ".";

class GalleryService {
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

        this._apiURL = this.serviceOptions.isServer ? process.env.API_BASE_URL as string : "/api";
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

    async deleteSectionById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`);
        return await response.json();
    }
}

export default GalleryService