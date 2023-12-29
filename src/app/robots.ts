import site from "@/config/site";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/*'],
        },
        sitemap: `${site.url}/sitemap.xml`,
    }
}