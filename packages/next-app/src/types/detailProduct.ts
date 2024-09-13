// Type cho mỗi phần chi tiết của sản phẩm
export type DetailType = {
    id: number;
    type: string;
    value: string;
};


export type ImageType = {
    id: number;
    link: string[];
    url: string;
};

export type ProductDetails = {
    brand: DetailType;
    fragranceNotes: DetailType[] | null;
    description: string;
    concentration: DetailType;
    imgDisplay: ImageType[];
    longevity: DetailType;
    sex: DetailType;
    sillage: DetailType;
    size: DetailType[];
    tutorial: string;
};

export type Product = {
    displayCost: number;
    id: number;
    isDisplay: boolean;
    name: string;
    originCost: number;
    rating: number;
    stockQuantity: number;
    updated_at: string;
    buyCount: number;
    details: ProductDetails;
};

export type GetProductByIdResponse = {
    GetProductById: Product;
};
