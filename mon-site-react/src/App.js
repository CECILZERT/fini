import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import VendorSignup from "./pages/VendorSignup";
import AddProduct from "./pages/AddProduct";
import VendorDashboard from "./pages/VendorDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import { loadData, saveData } from "./utils/storage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const [vendors, setVendors] = useState([]);
  const [products, setProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const [vendorForm, setVendorForm] = useState({
    name: "",
    email: "",
    phone: "",
    whatsapp: "",
    storeName: "",
    description: ""
  });

  const [productForm, setProductForm] = useState({
    vendorId: "",
    name: "",
    price: "",
    category: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    setVendors(loadData("vendors"));
    setProducts(loadData("products"));
  }, []);

  const addVendor = () => {
    const newVendor = {
      id: Date.now().toString(),
      ...vendorForm
    };

    const updated = [...vendors, newVendor];
    saveData("vendors", updated);
    setVendors(updated);

    alert("Inscription réussie !");
    setCurrentPage("add-product");
  };

  const addProduct = () => {
    const newProduct = {
      id: Date.now().toString(),
      ...productForm
    };

    const updated = [...products, newProduct];
    saveData("products", updated);
    setProducts(updated);

    alert("Produit ajouté !");
    setProductForm({
      vendorId: "",
      name: "",
      price: "",
      category: "",
      image: "",
      description: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} />

      <main className="container mx-auto px-4 py-8">
        {currentPage === "home" && (
          <Home
            products={products}
            vendors={vendors}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}

        {currentPage === "vendor-signup" && (
          <VendorSignup
            vendorForm={vendorForm}
            setVendorForm={setVendorForm}
            onSubmit={addVendor}
          />
        )}

        {currentPage === "add-product" && (
          <AddProduct
            vendors={vendors}
            productForm={productForm}
            setProductForm={setProductForm}
            onSubmit={addProduct}
          />
        )}

        {currentPage === "vendor-dashboard" && (
          <VendorDashboard vendor={vendors[0]} products={products} />
        )}

        {currentPage === "admin" && (
          <AdminDashboard vendors={vendors} products={products} />
        )}
      </main>

      <Footer />
    </div>
  );
}
