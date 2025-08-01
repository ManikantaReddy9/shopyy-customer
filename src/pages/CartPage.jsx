import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleIncrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    updateQuantity(itemId, item.quantity + 1);
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity === 1) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, item.quantity - 1);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <ShoppingCart size={24} /> Cart
        </h2>
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4 bg-white rounded-xl shadow">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-2 p-2"
            >
              {/* Product Image & Info */}
              <div className="flex items-center gap-2 w-full md:w-2/5 justify-between">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-green-600 font-medium">₹{item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className='flex bg-white rounded-l shadow'>
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="text-green p-1 rounded"
                    >
                      ➖
                    </button>
                    <span className="text-md font-medium">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="text-green p-1 rounded"
                    >
                      ➕
                    </button>
                  </div>
                  
                  <div className="text-green-800 font-semibold text-lg">
                    ₹{item.price * item.quantity}
                  </div>
                  </div>
                </div>
              </div>
            ))}
          <button
            onClick={() => navigate('/products')}
            className="text-grey p-2 font-bold w-48  bg-white rounded-xl shadow-lg border-gray-500"
          >
            + Add more Products
          </button>
          <div className="text-right text-xl font-bold text-green-800 mt-6">
            Total: ₹{totalAmount}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
