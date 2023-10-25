import { IServiceOptions } from ".";

class GalleryService {
    public serviceOptions: IServiceOptions = {
        isServer: true,
    }
    private _apiURL: string;
    private _endpoint = '/gallery';
    private _fullReqURL: string;

    constructor(_serviceOptions?: IServiceOptions) {
        if (_serviceOptions) {
            this.serviceOptions = { ...this.serviceOptions, ..._serviceOptions };
        }

        this._apiURL = this.serviceOptions.isServer ? process.env.API_BASE_URL as string : "/api";
        this._fullReqURL = this._apiURL + this._endpoint;
    }

    async deleteById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`,{
            method: "DELETE"
        });
        if (response.status !== 200) throw new Error("error")
        return await response.json();
    }
}

export default GalleryService