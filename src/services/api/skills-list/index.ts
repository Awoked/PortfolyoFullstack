import { fetcher } from "@/lib/utils"
import { SkillsList } from "./types";
import { ApiService } from "../core";

const endpoint = "/skills-lists"


class SkillsListService extends ApiService<SkillsList>{ }


const service = new SkillsListService({
    plural: "/skills-lists",
    singular: "/skills-list"
})


export default service