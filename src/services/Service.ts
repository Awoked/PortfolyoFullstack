export class Service {
    public _apiURL: string = process.env.NEXT_PUBLIC_API_BASE_URL as string;

    /**
     * getFullReq
     * @param _endpoint Endpoint ver
     */
    public getFullReq(_endpoint: string) {
        return this._apiURL + _endpoint
    }
}