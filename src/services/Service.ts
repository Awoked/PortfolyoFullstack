export class Service {
    public _apiURL: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

    public getFullReq(_endpoint: string) {
        return this._apiURL + _endpoint
    }
}