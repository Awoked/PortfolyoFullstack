function env(processENV: string | undefined, defaultValue: string) {
    return processENV ? processENV : defaultValue
}
const config = {
    strapiURL: process.env.NEXT_PUBLIC_STRAPI_BASE_URL,
    imageURL: env(process.env.NEXT_PUBLIC_IMAGE_URL, "http://localhost:3001"),
    revalidate: 10
}

export default config