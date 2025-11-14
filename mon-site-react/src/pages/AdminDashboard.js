export default function AdminDashboard({ vendors, products }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <h3 className="text-xl font-semibold mt-6 mb-2">Vendeurs</h3>
      <div className="space-y-2">
        {vendors.map(v => (
          <div key={v.id} className="border p-3 rounded-lg shadow-sm">
            <h4 className="font-bold">{v.storeName}</h4>
            <p>{v.name}</p>
            <p className="text-sm">{v.phone}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-semibold mt-6 mb-2">Produits</h3>
      <div className="space-y-2">
        {products.map(p => (
          <div key={p.id} className="border p-3 rounded-lg shadow-sm">
            <h4 className="font-bold">{p.name}</h4>
            <p>{p.price} FCFA</p>
            <p className="text-sm">{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

