export interface ICategoryItem {
    "id": number,
    "name": string,
    "image": string,
    "description": string,
    "userId": number
}

export interface ICategoryCreateRequest {
    "name": string,
    "image": File,
    "description": string | null
}

export interface ICategoryEditRequest {
    "id": number,
    "name": string,
    "image": File | null,
    "description": string | null
}

export interface ICategoryIdResponse {
    "id": number
}