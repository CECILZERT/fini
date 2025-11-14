export default function ProductForm({ vendors, productForm, setProductForm, onSubmit }) {
  return (
    <div className="space-y-4">
      <div>
        <label>Vendeur</label>
        <select
          value={productForm.vendorId}
          onChange={(e) => setProductForm({ ...productForm, vendorId: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="">Choisir un vendeur</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>{v.storeName}</option>
          ))}
        </select>
      </div>

      <div>
        <label>Nom du produit</label>
        <input
          value={productForm.name}
          onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label>Prix</label>
        <input
          type="number"
          value={productForm.price}
          onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label>Catégorie</label>
        <input
          value={productForm.category}
          onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label>URL Image</label>
        <input
          value={productForm.image}
          onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label>Description</label>
        <textarea
          value={productForm.description}
          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          className="w-full px-4 py-2 border rounded-lg"
          rows={4}
        />
      </div>

      <button
        onClick={onSubmit}
        className="w-full bg-green-600 text-white py-3 rounded-lg"
      >
        Ajouter le Produit
      </button>
    </div>
  );
}

