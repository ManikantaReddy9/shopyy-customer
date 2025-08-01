import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // 👈 Cart context

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart(); // 👈 useCart hook

  useEffect(() => {
    axios
      .get('https://dummyjson.com/products/category/groceries')
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product); // 👈 Add to cart context function
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">🛒 Grocery Products</h2>
        <button onClick={() => navigate('/cart')}>
          <ShoppingCart className="text-green-600 hover:text-green-800 transition" size={28} />
        </button>
      </div>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search groceries..."
          className="px-4 py-2 w-full max-w-md border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product, index) => {
          const bgColors = ['bg-rose-100', 'bg-lime-100', 'bg-orange-100', 'bg-sky-100', 'bg-amber-100'];
          return (
            <div
              key={product.id}
              className={`${bgColors[index % bgColors.length]} border p-2 rounded-xl shadow hover:shadow-md transition flex flex-col justify-between`}
            >
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                ➕ Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
