import { fetcher } from "@/lib/utils"
import { Drawing } from "./types";

const endpoint = "/drawings"

const findMany = async () => {
    return await fetcher<Drawing[]>(`${endpoint}?populate=*`);
}

const findById = async (id: number) => {
    return await fetcher<Drawing>(`${endpoint}/${id}`);
}

const findByPagination = async (page: number) => {
    return await fetcher<Drawing[]>(`${endpoint}?pagination[page]=${page}&pagination[pageSize]=8&populate=*`)
}

export default {
    findMany,
    findById,
    findByPagination
}