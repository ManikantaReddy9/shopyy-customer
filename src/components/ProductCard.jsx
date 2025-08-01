import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { dispatch } = useCart();

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>₹{product.price}</p>
      <button
        onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}
        className="bg-blue-600 text-white px-4 py-1 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
