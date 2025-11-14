import ProductForm from "../components/ProductForm";

export default function AddProduct({ vendors, productForm, setProductForm, onSubmit }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-green-700">Ajouter un Produit</h2>

      <ProductForm
        vendors={vendors}
        productForm={productForm}
        setProductForm={setProductForm}
        onSubmit={onSubmit}
      />
    </div>
  );
}

