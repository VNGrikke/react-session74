import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CartItem } from '../interfaces';
import { getCartItems, updateCartItem, deleteCartItem } from '../services/cart.service';


export default function Cart() {
    const dispatch = useDispatch();
    const { items: cart, loading, error } = useSelector((state: any) => state.cart);

    useEffect(() => {
        dispatch(getCartItems());
    }, [dispatch]);

    const updateCart = (item: CartItem, quantity: number) => {
        dispatch(updateCartItem({ ...item, quantity }));
    };

    const removeFromCart = (item: CartItem) => {
        dispatch(deleteCartItem(item.id));
    };

    const subtotal = cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="w-1/2 p-4">
            <h2 className="text-xl mb-4">Shopping cart</h2>
            {cart.map((item: CartItem) => (
                <div key={item.id} className="flex items-center mb-4 p-4 border rounded">
                    <img src={item.image} alt={item.name} className="w-16 h-16 mr-4" />
                    <div className="flex-1">
                        <h3 className="text-lg">{item.name}</h3>
                        <p className="text-sm">Price: ${item.price}</p>
                        <p className="text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateCart(item, parseInt(e.target.value))}
                        className="border rounded px-2 py-1 w-16 mr-4"
                    />
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                        onClick={() => updateCart(item, item.quantity)}
                    >
                        Update
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded"
                        onClick={() => removeFromCart(item)}
                    >
                        Remove
                    </button>
                </div>
            ))}
            <div className="mt-4">
                <p className="text-lg">Subtotal: ${subtotal.toFixed(2)}</p>
            </div>
        </div>
    );
};
