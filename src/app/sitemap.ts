import site from "@/config/site";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: `${site.url}`,
            lastModified: new Date()
        },
        {
            url: `${site.url}/cizimlerim`,
            lastModified: new Date()
        }
    ]
}