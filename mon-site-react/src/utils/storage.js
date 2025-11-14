// fallback localStorage helpers
export function getLocalVendors() {
  try {
    const v = localStorage.getItem('vendors');
    return v ? JSON.parse(v) : [];
  } catch { return []; }
}
export function saveLocalVendors(vendors) {
  localStorage.setItem('vendors', JSON.stringify(vendors || []));
}

export function getLocalProducts() {
  try {
    const p = localStorage.getItem('products');
    return p ? JSON.parse(p) : [];
  } catch { return []; }
}
export function saveLocalProducts(products) {
  localStorage.setItem('products', JSON.stringify(products || []));
}

