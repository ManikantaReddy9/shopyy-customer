import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import categoryMap from '../utils/categoryMap';
import toast from 'react-hot-toast';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useCart();

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

  const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery','NonVeg'];

  // Dummy category logic (since API has only 'groceries', we'll mock categories)
  const categorizeProduct = (title) => {
  const lower = title.toLowerCase();

  for (const [category, keywords] of Object.entries(categoryMap)) {
    if (keywords.some((word) => lower.includes(word))) {
      return category;
    }
  }

  return 'Others';
};


  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || categorizeProduct(product.title) === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">🛒 Grocery Products</h2>
        <button onClick={() => navigate('/cart')}>
          <ShoppingCart className="text-green-600 hover:text-green-800 transition" size={28} />
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search groceries..."
          className="px-4 py-2 w-full max-w-md border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${
              selectedCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-white border text-green-700 hover:bg-green-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
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
