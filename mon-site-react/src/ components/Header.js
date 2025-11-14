import { ShoppingCart, Store, Plus } from "lucide-react";

export default function Header({ setCurrentPage }) {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => setCurrentPage("home")}
        >
          <ShoppingCart className="w-8 h-8 text-purple-600" />
          <h1 className="text-2xl font-bold text-purple-600">MarketPlace</h1>
        </div>

        <nav className="flex items-center space-x-4">
          <button onClick={() => setCurrentPage("home")} className="px-4 py-2 hover:bg-purple-50 rounded-lg">
            Boutique
          </button>

          <button
            onClick={() => setCurrentPage("vendor-signup")}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center space-x-2"
          >
            <Store className="w-4 h-4" />
            <span>Devenir Vendeur</span>
          </button>

          <button
            onClick={() => setCurrentPage("add-product")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Ajouter Produit</span>
          </button>
        </nav>
      </div>
    </header>
  );
}

