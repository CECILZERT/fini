export default function VendorForm({ vendorForm, setVendorForm, onSubmit }) {
  const fields = [
    { label: "Nom complet", key: "name", type: "text" },
    { label: "Email", key: "email", type: "email" },
    { label: "Téléphone", key: "phone", type: "tel" },
    { label: "WhatsApp", key: "whatsapp", type: "tel" },
    { label: "Nom de la Boutique", key: "storeName", type: "text" }
  ];

  return (
    <div className="space-y-4">
      {fields.map((f) => (
        <div key={f.key}>
          <label className="text-gray-700">{f.label}</label>
          <input
            type={f.type}
            value={vendorForm[f.key]}
            onChange={(e) => setVendorForm({ ...vendorForm, [f.key]: e.target.value })}
            className="w-full px-4 py-2 border rounded-lg"
          />
        </div>
      ))}

      <label>Description</label>
      <textarea
        value={vendorForm.description}
        onChange={(e) => setVendorForm({ ...vendorForm, description: e.target.value })}
        className="w-full px-4 py-2 border rounded-lg"
        rows={4}
      />

      <button
        onClick={onSubmit}
        className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg"
      >
        S'inscrire
      </button>
    </div>
  );
}

