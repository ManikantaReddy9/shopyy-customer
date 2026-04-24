import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const data = location.state?.product;

  const { addToCart } = useCart();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (!data) return;

    axios
      .get(`https://dummyjson.com/products/category/${data.category}`)
      .then((res) => {
        const filtered = res.data.products.filter(
          (item) => item.id !== data.id
        );
        setRelated(filtered);
      });
  }, [data]);

  const handleAddToCart = (product) => {
    addToCart(product);

    toast.success(`${product.title} added to cart 🛒`);
  };

  if (!data) return <div className="p-4">No Product Found</div>;

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      
      {/* 🔥 Image */}
      <img
        src={data.thumbnail}
        alt={data.title}
        className="w-full h-[300px] object-cover"
      />

      {/* 🔥 Info */}
      <div className="bg-white rounded-t-2xl -mt-6 p-4 shadow">
        <h1 className="text-xl font-bold">{data.title}</h1>

        <div className="flex justify-between my-3">
          <span className="text-green-600 text-xl font-bold">
            ₹{data.price}
          </span>
          <span>⭐ {data.rating}</span>
        </div>

        <p className="text-blue-500 mb-2">
          {data.stock > 0 ? "In Stock" : "Out of Stock"}
        </p>

        <p className="text-gray-500 leading-6">{data.description}</p>

        {/* 🛒 Add to Cart */}
        <button
          onClick={() => handleAddToCart(data)}
          className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
        >
          🛒 Add to Cart
        </button>
      </div>

      {/* 🔥 Related Products */}
      <h2 className="text-lg font-bold m-4">Related Products</h2>

      <div className="flex overflow-x-auto gap-3 px-4 pb-4">
        {related.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              navigate("/productDetails", { state: { product: item } })
            }
            className="min-w-[140px] bg-white rounded-lg p-2 cursor-pointer shadow"
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="h-[100px] w-full object-cover rounded"
            />
            <p className="text-xs truncate mt-1">{item.title}</p>
            <p className="text-green-600 font-semibold">₹{item.price}</p>
          </div>
        ))}
      </div>

      {/* 🔥 Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-2">
        <button
          onClick={() => navigate("/products")}
          className="flex-1 bg-gray-200 py-3 rounded-lg font-bold"
        >
          🛍 Products
        </button>

        <button
          onClick={() => navigate("/cart")}
          className="flex-1 bg-gray-200 py-3 rounded-lg font-bold"
        >
          🛒 Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;