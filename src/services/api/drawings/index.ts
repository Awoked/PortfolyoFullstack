import { fetcher } from "@/lib/utils"
import { Drawing } from "./types";

const endpoint = "/drawings"

const findMany = async () => {
    return await fetcher<Drawing[]>(`${endpoint}?populate=*`);
}

const findById = async (id: number) => {
    return await fetcher<Drawing>(`${endpoint}/${id}`);
}



export default {
    findMany,
    findById,
}