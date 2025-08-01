import { ShoppingBag, Apple, Package } from 'lucide-react';

function ShoppingBagWithItems() {
  return (
    <div className="relative w-20 h-20">
      <ShoppingBag className="w-full h-full text-green-600" />
      <Apple className="absolute top-1 left-4 w-5 h-5 text-red-500 animate-bounce" />
      <Package className="absolute top-3 left-8 w-5 h-5 text-yellow-500 animate-pulse" />
    </div>
  );
}
 
export default ShoppingBagWithItems;
