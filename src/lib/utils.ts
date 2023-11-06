import config from "@/config";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface fetcherResponse<T> {
  data: T;
  error: boolean;
}
export async function fetcher<T>(url: string, params?: RequestInit) {
  try {
    const response = await fetch(`${config.strapiURL + url}`, {
      next: {
        revalidate: config.revalidate
      },
      ...params,
    });

    const resData = await response.json();
    const data = resData.data;
    const metadata = resData.meta
    
    return {
      data,
      metadata,
      error: resData.error ? true : false
    } as fetcherResponse<T>;
  } catch (error) {
    throw new Error("Sunucu hatası")
  }
}
