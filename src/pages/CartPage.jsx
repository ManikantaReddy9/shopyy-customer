import React from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import emptyCartImage from '../assets/emptyCart.png';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, incrementItem, decrementItem } = useCart();

  const handleIncrement = (itemId) => {
    incrementItem(itemId);
  };

  const handleDecrement = (itemId) => {
    const item = cartItems.find((item) => item.id === itemId);
    if (item.quantity === 1) {
      removeFromCart(itemId);
    } else {
      decrementItem(itemId);
    }
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-100 p-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
          <ShoppingCart size={24} /> Cart
        </h2>
      </div>

      {/* Empty Cart Message */}
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-4">
          <img
            src={emptyCartImage}
            alt="Empty cart"
            className="w-40 h-40 object-contain opacity-80"
          />
          <p className="text-center text-gray-600 text-lg font-medium">
            Your cart is empty.
          </p>
          <button
            onClick={() => navigate('/products')}
            className="p-2 px-4 bg-white border rounded-xl min-w-[180px] shadow hover:shadow-md text-gray-700 font-semibold"
          >
            + Add Products to Cart
          </button>
        </div>

        
      ) : (
        <div className="flex flex-col gap-4 bg-white rounded-xl shadow p-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between gap-4 border-b pb-4"
            >
              <div className="flex items-center justify-between gap-4 p-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-12 h-12 object-cover rounded"
                />
                <div className='flex flex-col min-w-[80px] flex-1'>
                  <h3 className="font-medium text-sm text-gray-800">{item.title}</h3>
                  <p className="text-green-600 text-sm font-semibold">
                    ₹{Number(item.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-gray-100 rounded px-1 py-1 shadow-sm min-w-[90px] justify-center">
                  <button
                    onClick={() => handleDecrement(item.id)}
                    className="text-green-700 w-6 h-6 text-xs rounded shadow-sm hover:bg-green-100"
                  >
                    ➖
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrement(item.id)}
                    className="text-green-700 w-6 h-6 text-xs rounded shadow-sm hover:bg-green-100"
                  >
                    ➕
                  </button>
                </div>
                {/* Item Total */}
                <div className="text-left min-w-[70px] font-semibold text-green-800">
                  ₹{Number(item.price) * item.quantity}
                </div>
              </div>
              </div>
            </div>
          ))}

          {/* Add More / Total */}
          <div className="flex justify-between items-center pt-1">
            <button
              onClick={() => navigate('/products')}
              className="p-2 bg-white border rounded-xl min-w-[180px] shadow hover:shadow-md text-gray-700 font-semibold"
            >
              + Add more Products
            </button>
            <div className="text-sm min-w-[100px] font-bold text-green-800">
              Total: ₹{totalAmount.toFixed(2)}
            </div>
          </div>
        </div>
      )}
      {cartItems.length > 0 && (<div className="relative px-4 pt-4 pb-24">
        <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg border-t px-4 py-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Total: ₹{totalAmount.toFixed(2)}</span>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium shadow">
            Pay Now
          </button>
        </div>
      </div>)}
    </div>
  );
}

export default Cart;
