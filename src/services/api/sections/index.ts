import { fetcher } from "@/lib/utils"
import { Section } from "./types";
import { ApiService } from "../core";

class SectionService extends ApiService<Section>{
    async findBySection(sectionName: string) {
        return await fetcher<Section[]>(`${this.endpoint.plural}/?filters[section][$eq]=${sectionName}&populate=*`)
    }

    filterSections(sections: string[], sectionData: Section[]) {
        const sectionsObject: {
            [key: string]: Section
        } = {};

        sections.forEach((section, _) => {
            const newSection = sectionData.find(x => x.attributes.section === section)
            if (newSection) {
                sectionsObject[section] = newSection;
            }
        })
        return sectionsObject
    }
}

const service = new SectionService({
    plural: "/sections",
    singular: "/section"
})

export default service;