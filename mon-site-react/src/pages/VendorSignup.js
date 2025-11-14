import VendorForm from "../components/VendorForm";

export default function VendorSignup({ vendorForm, setVendorForm, onSubmit }) {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-700">Devenir Vendeur</h2>

      <VendorForm
        vendorForm={vendorForm}
        setVendorForm={setVendorForm}
        onSubmit={onSubmit}
      />
    </div>
  );
}

