import { Gallery, SectionData } from "@prisma/client";


export type SectionType = (SectionData & {
    Gallery?: Gallery[]
})
