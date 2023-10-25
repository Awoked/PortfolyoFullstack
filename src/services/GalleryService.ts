import { IServiceOptions } from ".";
import { Service } from "./Service";

class GalleryService extends Service {
    private _fullReqURL: string = this.getFullReq("/gallery");

 
    async deleteById(id: string | number) {
        const response = await fetch(this._fullReqURL + `?id=${id}`, {
            method: "DELETE"
        });
        if (response.status !== 200) throw new Error("error")
        return await response.json();
    }
}

export default GalleryService