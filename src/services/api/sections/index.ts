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

const filterSections = (sectinos: string[], sectionData: Section[]) => {
    const sectionsObject: {
        [key: string]: Section
    } = {};

    sectinos.forEach((section, _) => {
        const newSection = sectionData.find(x => x.attributes.section === section)
        if (newSection) {
            sectionsObject[section] = newSection;
        }
    })
    return sectionsObject
}

export default {
    findMany,
    findById,
    findBySection,
    filterSections
}