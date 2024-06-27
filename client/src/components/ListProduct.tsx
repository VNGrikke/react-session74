import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemProduct, updateItemProduct } from '../services/list.service';
import { addCartItem } from '../services/cart.service';
import { ProductItem } from '../interfaces';


export default function ListProduct() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state:any) => state.product);

    useEffect(() => {
        dispatch(getItemProduct());
    }, [dispatch]);

    const addToCart = (product: ProductItem) => {
        if (product.total > 0) {
            dispatch(addCartItem({ ...product }));
            dispatch(updateItemProduct({ ...product, total: product.total - 1 }));
        } else {
            alert('Product is out of stock');
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-1/2 p-4">
            <h2 className="text-xl mb-4">List Product</h2>
            {products.map((product: ProductItem) => (
                <div key={product.id} className="flex items-center mb-4 p-4 border rounded">
                    <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
                    <div className="flex-1">
                        <h3 className="text-lg">{product.name}</h3>
                        <p className="text-sm">{product.description}</p>
                    </div>
                    <div>
                        <p className="text-sm">Total: {product.total}</p>
                        <p className="text-sm">Price: ${product.price}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => addToCart(product)}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

