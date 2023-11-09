import { fetcher } from "@/lib/utils"
import { Navigation } from "./types";

const endpoint = "/navigations"

const findMany = async () => {
    return await fetcher<Navigation[]>(`${endpoint}?sort[0]=createdAt:asc`);
}

const findById = async (id: number) => {
    return await fetcher<Navigation>(`${endpoint}/${id}?populate=*`);
}

export default {
    findMany,
    findById,
}