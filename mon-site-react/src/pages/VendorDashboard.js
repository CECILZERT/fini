export default function VendorDashboard({ vendor, products }) {
  const myProducts = products.filter(p => p.vendorId === vendor.id);

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Tableau de Bord Vendeur</h2>

      <p className="mb-4 text-gray-600">
        Produits publiés : {myProducts.length}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {myProducts.map(p => (
          <div key={p.id} className="p-4 border rounded-lg shadow">
            <h3 className="font-bold">{p.name}</h3>
            <p>{p.price} FCFA</p>
            <p className="text-sm text-gray-500">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

