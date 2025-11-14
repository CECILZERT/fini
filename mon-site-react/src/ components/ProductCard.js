import { ShoppingCart, Store, Phone } from "lucide-react";

export default function ProductCard({ product, vendor, onBuy }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="h-48 bg-purple-100 flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt="" className="w-full h-full object-cover" />
        ) : (
          <ShoppingCart className="w-16 h-16 text-purple-400" />
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-lg">{product.name}</h3>

        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>

        <div className="flex justify-between items-center mt-2">
          <span className="text-xl font-bold text-purple-600">{product.price} FCFA</span>
          <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-700">
            {product.category}
          </span>
        </div>

        {vendor && (
          <div className="flex items-center mt-2 text-gray-600 text-sm">
            <Store className="w-4 h-4 mr-1" />
            {vendor.storeName}
          </div>
        )}

        <button
          onClick={() => onBuy(product)}
          className="w-full mt-4 bg-green-600 text-white py-2 rounded-lg flex items-center justify-center space-x-2"
        >
          <Phone className="w-4 h-4" />
          <span>Acheter sur WhatsApp</span>
        </button>
      </div>
    </div>
  );
}

