import { fetcher } from "@/lib/utils"
import { SkillsList } from "./types";

const endpoint = "/skills-lists"

const findMany = async () => {
    return await fetcher<SkillsList[]>(endpoint);
}

const findById = async (id: number) => {
    return await fetcher<SkillsList>(`${endpoint}/${id}`);
}

const findBySection = async (sectionName: string) => {
    return await fetcher<SkillsList[]>(`${endpoint}/?filters[section][$eq]=${sectionName}`)
}


export default {
    findMany,
    findById,
    findBySection
}