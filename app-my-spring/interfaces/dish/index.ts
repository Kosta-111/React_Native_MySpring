export interface IDishItem {
    "id": number,
    "name": string,
    "price": number,
    "images": string[],
    "description": string,
    "categoryId": number
}

export interface IDishCreateRequest {
    "name": string,
    "price": number,
    "images": File[],
    "description": string | null,
    "categoryId": number
}

export interface IDishEditRequest {
    "id": number,
    "name": string,
    "price": number,
    "images": File[],
    "description": string | null
}

export interface IDishIdResponse {
    "id": number
}