import { fetcher } from "@/lib/utils";
import { Endpoint } from "./types";
import QueryString from "qs";

export class ApiService<T> {
    public endpoint: Endpoint;


    constructor(endpoint: Endpoint) {
        this.endpoint = endpoint;
    }

    public async findMany(customQS?: string) {
        const qs = QueryString.stringify({
            populate: "*"
        })
        return await fetcher<T[]>(`${this.endpoint.plural}?${customQS || qs}`);
    }
    public async findById(id: number | string) {
        const qs = QueryString.stringify({
            populate: "*"
        });
        return await fetcher<T>(`${this.endpoint.singular}/${id}?${qs}`)
    }
}