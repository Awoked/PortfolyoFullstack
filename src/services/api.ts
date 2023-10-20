import { SectionData } from "@prisma/client"

type OptionTypes = {
    id?: number | string;
    section?: string;
    client?: boolean;
} | undefined | null

type MethodTypes = {
    GET: (params?: OptionTypes) => Promise<any>
    POST: (params?: OptionTypes, data?: SectionData) => Promise<any>
    PUT: (params?: OptionTypes, data?: SectionData) => Promise<any>
    DELETE: (params?: OptionTypes) => Promise<any>
}

const Sections: MethodTypes = {
    async GET(params) {
        try {
            const response = await fetch(`${!params?.client ? process.env.API_BASE_URL : '/api'}/sections${params?.section ? `?section=${params.section}` : ''}`, {
                next: {
                    revalidate: 0
                }
            });
            console.log('response.status', response.status)
            const data: SectionData[] | SectionData = await response.json();
            console.log('data', data)
            return data;
        } catch (_e: any) {
            let e: Error = _e;
            console.log('e', e)
            return null
        }
    },
    async POST(params, _data) {
        try {
            const response = await fetch(`${!params?.client ? process.env.API_BASE_URL : '/api'}/sections`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    SectionData: {
                        ..._data,
                        id: undefined
                    }
                })
            });

            const data = await response.json();
            return data;
        } catch (_e: any) {
            let e: Error = _e;
            console.log('e', e)
            return null
        }
    },
    async PUT(params, _data) {
        try {
            const response = await fetch(`${!params?.client ? process.env.API_BASE_URL : '/api'}/sections`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ SectionData: _data })
            });

            console.log('response', response)
            const data = await response.json();
            return data;
        } catch (_e: any) {
            let e: Error = _e;
            console.log('e', e)
            return null
        }
    },
    async DELETE(params) {
        try {
            const response = await fetch(`${!params?.client ? process.env.API_BASE_URL : '/api'}/sections${params?.id ? `?id=${params.id}` : '/'}`, {
                method: "DELETE"
            });

            const data = await response.json();
            return data;
        } catch (_e: any) {
            let e: Error = _e;
            console.log('e', e)
            return null
        }

    }
}


export {
    Sections
}