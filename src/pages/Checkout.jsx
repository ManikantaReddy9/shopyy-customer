// pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';                    // keep your path
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();        // ✅ get clearCart
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handleOrderConfirm = async () => {
    const { name, phone, address, city, pincode } = customer;
    if (!name || !phone || !address || !city || !pincode) {
      setError('Please fill in all delivery details.');
      return;
    }
    if (!cartItems.length) {
      setError('Your cart is empty.');
      return;
    }

    setLoading(true);
    try {
      // 1) Save order
      const docRef = await addDoc(collection(db, 'orders'), {
        customerName: name,
        phone,
        address,
        city,
        pincode,
        paymentMethod,
        items: cartItems,
        totalPrice: totalAmount,
        status: 'pending',
        createdAt: serverTimestamp(),
      });
      console.log('✅ Order saved:', docRef.id);

      // 2) Persist customer basics (optional)
      localStorage.setItem('customerDetails', JSON.stringify(customer));

      // 3) Clear cart AFTER success
      clearCart();                                     // ✅ this clears the UI/cart state

      // 4) Go to success
      navigate('/success', { state: { orderId: docRef.id } });
    } catch (err) {
      console.error('❌ Error placing order:', err);
      setError('Something went wrong while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Customer Details */}
      <div className="space-y-4 mb-6">
        <input name="name" value={customer.name} onChange={handleChange} placeholder="Full Name" className="w-full border p-2 rounded" />
        <input name="phone" value={customer.phone} onChange={handleChange} placeholder="Phone Number" className="w-full border p-2 rounded" />
        <textarea name="address" value={customer.address} onChange={handleChange} placeholder="Address" className="w-full border p-2 rounded" />
        <input name="city" value={customer.city} onChange={handleChange} placeholder="City" className="w-full border p-2 rounded" />
        <input name="pincode" value={customer.pincode} onChange={handleChange} placeholder="Pincode" className="w-full border p-2 rounded" />
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Payment */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        {['COD', 'UPI', 'Card'].map((m) => (
          <label key={m} className="flex items-center space-x-2 mb-2">
            <input
              type="radio"
              name="payment"
              value={m}
              checked={paymentMethod === m}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>{m === 'COD' ? 'Cash on Delivery (COD)' : m === 'UPI' ? 'UPI' : 'Credit / Debit Card'}</span>
          </label>
        ))}
      </div>

      {/* Order Summary */}
      {cartItems && cartItems.length > 0 ? (
        <div className="space-y-2 mt-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title} x {item.quantity}</span> {/* ✅ use title to match your cart */}
              <span>₹{Number(item.price) * item.quantity}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrderConfirm}
            disabled={loading}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded disabled:opacity-60"
          >
            {loading ? 'Placing Order…' : 'Confirm Order'}
          </button>
        </div>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
}
