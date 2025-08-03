import { BrowserRouter as Router,Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import {Toaster} from 'react-hot-toast';
function App() {
  return (
    <Router basename="/shopyy-customer">
      <Toaster position="top-center" toastOptions={{duration:2000}}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
