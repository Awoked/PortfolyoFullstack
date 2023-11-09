import { fetcher } from "@/lib/utils"
import { Project } from "./types";

const endpoint = "/projects"

const findMany = async () => {
    return await fetcher<Project[]>(`${endpoint}?populate=*`);
}

const findById = async (id: number) => {
    return await fetcher<Project>(`${endpoint}/${id}`);
}


export default {
    findMany,
    findById,
}