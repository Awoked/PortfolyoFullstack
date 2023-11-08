import { fetcher } from "@/lib/utils"
import { Section } from "./types";

const endpoint = "/sections"

const findMany = async () => {
    return await fetcher<Section[]>(`${endpoint}?populate=*`);
}

const findById = async (id: number) => {
    return await fetcher<Section>(`${endpoint}/${id}?populate=*`);
}

const findBySection = async (sectionName: string) => {
    return await fetcher<Section[]>(`${endpoint}/?filters[section][$eq]=${sectionName}&populate=*`)
}


export default {
    findMany,
    findById,
    findBySection
}