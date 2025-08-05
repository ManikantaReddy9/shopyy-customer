import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("COD");


  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleOrderConfirm = () => {
    const { name, phone, address, city, pincode } = customer;
    if (!name || !phone || !address || !city || !pincode) {
      setError('Please fill in all delivery details.');
      return;
    }

    // You can also send these details to backend here

    localStorage.setItem('customerDetails', JSON.stringify(customer));
    navigate('/success');
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {/* Customer Details Form */}
      <div className="space-y-4 mb-6">
        <input
          name="name"
          value={customer.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="phone"
          value={customer.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          value={customer.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full border p-2 rounded"
        />
        <input
          name="city"
          value={customer.city}
          onChange={handleChange}
          placeholder="City"
          className="w-full border p-2 rounded"
        />
        <input
          name="pincode"
          value={customer.pincode}
          onChange={handleChange}
          placeholder="Pincode"
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <div className="space-y-2">
            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="payment"
                value="COD"
                checked={paymentMethod === 'COD'}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Cash on Delivery (COD)</span>
            </label>

            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="payment"
                value="UPI"
                checked={paymentMethod === 'UPI'}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>UPI</span>
            </label>

            <label className="flex items-center space-x-2">
            <input
                type="radio"
                name="payment"
                value="Card"
                checked={paymentMethod === 'Card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <span>Credit / Debit Card</span>
            </label>
        </div>
        </div>

      {/* Order Summary */}
      {cartItems && cartItems.length > 0 ? (
        <div className="space-y-2 mt-3">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <button
            onClick={handleOrderConfirm}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
          >
            Confirm Order
          </button>
        </div>
      ) : (
        <p>No items in cart.</p>
      )}
    </div>
  );
};

export default Checkout;
