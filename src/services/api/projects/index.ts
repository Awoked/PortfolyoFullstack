import { fetcher } from "@/lib/utils"
import { Project } from "./types";
import { ApiService } from "../core";



class ProjectService extends ApiService<Project>{ }

const service = new ProjectService({
    singular: "/project",
    plural: "/projects"
})

export default service;