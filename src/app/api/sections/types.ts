import { Gallery, SectionData } from "@prisma/client";
import { FilterKeyType } from "../gallery/types";


export type SectionType = (SectionData & {
    Gallery?: (Omit<Gallery, "filterKey"> & { filterKey: FilterKeyType })[]
})
