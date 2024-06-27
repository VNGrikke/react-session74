export interface ProductItem {
    id: number;
    name: string;
    price: number;
    total: number;
    description: string;
    image: string;
}

export interface CartItem extends ProductItem {
    quantity: number;
}
