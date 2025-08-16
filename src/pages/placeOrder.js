// placeOrder.js
import axios from "axios";

export async function placeOrder(orderData) {
  try {
    // Save order to backend
    await axios.post("http://localhost:5000/api/orders", orderData);
    console.log("Order placed successfully!");
  } catch (error) {
    console.error("Order error:", error);
  }
}
