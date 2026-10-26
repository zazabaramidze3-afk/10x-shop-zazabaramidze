import type { Product, ProductsResponse } from '../types/product'
import { ApiError } from './ApiError'

const BASE_URL = import.meta.env.VITE_API_BASE_URL

async function request<T>(path: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${path}`)

    if (!response.ok) {
        throw new ApiError(response.status, `Request failed with status ${response.status}`)
    }

    return (await response.json()) as T
}

export function fetchProducts(limit = 12, skip = 0): Promise<ProductsResponse> {
    return request<ProductsResponse>(`/products?limit=${limit}&skip=${skip}`)
}

export function fetchProductById(id: number): Promise<Product> {
    return request<Product>(`/products/${id}`)
}