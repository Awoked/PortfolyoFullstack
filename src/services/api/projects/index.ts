import { fetcher } from "@/lib/utils"
import { Project } from "./types";

const endpoint = "/projects"

const findMany = async () => {
    return await fetcher<Project[]>(`${endpoint}?populate=*`);
}

const findById = async (id: number) => {
    return await fetcher<Project>(`${endpoint}/${id}`);
}

const findBySection = async (sectionName: string) => {
    return await fetcher<Project[]>(`${endpoint}/?filters[section][$eq]=${sectionName}`)
}


export default {
    findMany,
    findById,
    findBySection
}