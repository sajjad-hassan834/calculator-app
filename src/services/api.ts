import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080"

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || "An unexpected error occurred"
    return Promise.reject(new Error(message))
  },
)

export function extractData<T>(response: { data: { success: boolean; data: T; meta?: any } }): T {
  if (response.data.success) {
    return response.data.data
  }
  throw new Error("API returned unsuccessful response")
}

export function extractMeta(response: { data: { success: boolean; meta?: any } }): any {
  return response.data.meta
}
