import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import VendorSignup from './pages/VendorSignup';
import AddProduct from './pages/AddProduct';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Categories from './pages/Categories';
import NotFound from './pages/NotFound';

import useVendors from './hooks/useVendors';
import useProducts from './hooks/useProducts';
import useCategories from './hooks/useCategories';

import api from './api';
import { getLocalVendors, saveLocalVendors, getLocalProducts, saveLocalProducts } from './utils/storage';

export default function App(){
  const [currentPage, setCurrentPage] = useState('home');

  const { vendors, setVendors } = useVendors();
  const { products, setProducts } = useProducts();
  const { categories, setCategories } = useCategories();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [vendorForm, setVendorForm] = useState({ name:'', email:'', phone:'', whatsapp:'', storeName:'', description:'' });
  const [productForm, setProductForm] = useState({ name:'', price:'', category:'', description:'', image:'', imageUrl:'', vendorId:'' });

  // Ensure hooks data synced with localStorage fallback
  useEffect(()=> {
    if (!process.env.REACT_APP_API_URL) {
      // initial already loaded by hooks; ensure local copy if missing
      if (!vendors.length) setVendors(getLocalVendors());
      if (!products.length) setProducts(getLocalProducts());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---------- Vendor submit ----------
  async function handleVendorSubmit(){
    const required = vendorForm.name && vendorForm.email && vendorForm.phone && vendorForm.whatsapp && vendorForm.storeName;
    if (!required) { alert('Veuillez remplir tous les champs obligatoires'); return; }

    try {
      if (process.env.REACT_APP_API_URL) {
        const res = await api.post('/vendors', vendorForm);
        setVendors(prev => [res.data, ...prev]);
      } else {
        const newV = { ...vendorForm, _id: Date.now().toString(), id: Date.now().toString(), createdAt: new Date().toISOString() };
        const n = [newV, ...vendors];
        setVendors(n);
        saveLocalVendors(n);
      }
      setVendorForm({ name:'', email:'', phone:'', whatsapp:'', storeName:'', description:'' });
      alert('Inscription réussie !');
      setCurrentPage('add-product');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l\'inscription');
    }
  }

  // ---------- Product submit ----------
  async function handleProductSubmit(){
    const required = productForm.name && productForm.price && productForm.category && productForm.vendorId;
    if (!required) { alert('Veuillez remplir tous les champs obligatoires'); return; }

    try {
      if (process.env.REACT_APP_API_URL) {
        const res = await api.post('/products', productForm);
        setProducts(prev => [res.data, ...prev]);
      } else {
        const newP = { ...productForm, _id: Date.now().toString(), id: Date.now().toString(), createdAt: new Date().toISOString() };
        const n = [newP, ...products];
        setProducts(n);
        saveLocalProducts(n);
      }
      setProductForm({ name:'', price:'', category:'', description:'', image:'', imageUrl:'', vendorId:'' });
      alert('Produit ajouté avec succès !');
    } catch (e) {
      console.error(e);
      alert('Erreur lors de l\'ajout du produit');
    }
  }

  // ---------- Add category ----------
  async function addCategory(name) {
    if (!name) return;
    try {
      if (process.env.REACT_APP_API_URL) {
        await api.post('/categories', { name });
        const res = await api.get('/categories');
        setCategories(res.data.map(c => c.name || c));
      } else {
        setCategories(prev => Array.from(new Set([name, ...prev])));
      }
    } catch (e) {
      console.error(e);
    }
  }

  // ---------- Buy via WhatsApp ----------
  async function handleBuy(product) {
    const vendor = vendors.find(v => v._id === product.vendorId || v.id === product.vendorId);
    if (!vendor || !vendor.whatsapp) { alert('Vendeur introuvable ou WhatsApp non renseigné'); return; }
    // optional: create sale if backend exists
    try { if (process.env.REACT_APP_API_URL) await api.post('/sales', { productId: product._id || product.id, vendorId: vendor._id || vendor.id, amount: product.price }); } catch(e){}
    const message = `Bonjour, je suis intéressé(e) par: ${product.name} - ${product.price} FCFA`;
    const whatsappUrl = `https://wa.me/${(vendor.whatsapp||'').replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  // ---------- Delete product (admin/local) ----------
  function deleteProductLocal(id) {
    if (!confirm('Supprimer ce produit ?')) return;
    const n = products.filter(p => (p._id || p.id) !== id);
    setProducts(n);
    saveLocalProducts(n);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <Navbar current={currentPage} onNavigate={setCurrentPage} />
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'home' && (
          <Home products={products} vendors={vendors} categories={categories} searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onBuy={handleBuy} />
        )}

        {currentPage === 'vendor-signup' && (
          <VendorSignup vendorForm={vendorForm} setVendorForm={setVendorForm} onSubmit={handleVendorSubmit} />
        )}

        {currentPage === 'add-product' && (
          <AddProduct vendors={vendors} productForm={productForm} setProductForm={setProductForm} onSubmit={handleProductSubmit} />
        )}

        {currentPage === 'vendor-dashboard' && (
          <VendorDashboard vendorId={vendors[0]?._id || vendors[0]?.id} />
        )}

        {currentPage === 'admin-dashboard' && (
          <AdminDashboard setVendors={setVendors} setProducts={setProducts} />
        )}

        {currentPage === 'categories' && (
          <Categories categories={categories} onAdd={addCategory} />
        )}

        {['notfound','404'].includes(currentPage) && <NotFound />}
      </main>
      <Footer />
    </div>
  );
}
