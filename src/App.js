import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import { Toaster } from 'react-hot-toast';
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import { useEffect } from "react";
import { messaging } from "./firebase"; // Firebase config file
import { getToken, onMessage } from "firebase/messaging";

function App() {

  // Request Notification Permission and Get Token
  useEffect(() => {
    const requestPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          console.log("Notification permission granted.");

          // Get FCM token
          const token = await getToken(messaging, {
            vapidKey: "BD_9pz8-EZL8XqLNkdksvwehjTyaJvupeQIpitU2mU3kiWAsILMr1_9IBwpHOHwHi9CJBRvav4pRjUHcHs7OCGs"
          });
          console.log("FCM Token:", token);
        } else {
          console.log("Notification permission denied.");
        }
      } catch (error) {
        console.error("Error getting notification permission or token:", error);
      }
    };

    requestPermission();

    // Listen for incoming messages
    onMessage(messaging, (payload) => {
      console.log("Message received:", payload);
      alert(payload.notification?.title + " - " + payload.notification?.body);
    });

  }, []);

  return (
    <Router basename="/shopyy-customer">
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

export default App;
