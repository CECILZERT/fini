import { useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Home({ products, vendors, searchTerm, setSearchTerm, selectedCategory, setSelectedCategory }) {
  
  const categories = ["Tous", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchCategory =
      selectedCategory === "Tous" || p.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const handleBuy = (product) => {
    const vendor = vendors.find(v => v.id === product.vendorId);

    if (vendor?.whatsapp) {
      const message = `Bonjour, je suis intéressé(e) par ${product.name} (${product.price} FCFA).`;
      const url = `https://wa.me/${vendor.whatsapp}?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank");
    }
  };

  return (
    <div>
      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border shadow-sm"
        />
      </div>

      {/* CATEGORIES */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === cat
                ? "bg-purple-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-500">Aucun produit trouvé.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const vendor = vendors.find(v => v.id === product.vendorId);
            return (
              <ProductCard
                key={product.id}
                product={product}
                vendor={vendor}
                onBuy={handleBuy}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

