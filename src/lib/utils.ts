import config from "@/config";
import { Meta } from "@/services/api/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// interface fetcherResponse<T> {
//   data: T;
//   metadata:
// }

export interface Payload<T> {
  data: T;
  meta: Meta
  error: boolean;
}

export async function fetcher<T>(url: string, params?: RequestInit) {
  try {
    const response = await fetch(`${config.strapiURL + url}`, {
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 0 : 0,
      },
    });

    const resData = await response.json();
    const data = resData.data;
    const meta = resData.meta

    return {
      data,
      meta,
      error: resData.error ? true : false
    } as Payload<T>;
  } catch (error) {
    console.log('error', error)
    throw new Error("Sunucu hatası")
  }
}

