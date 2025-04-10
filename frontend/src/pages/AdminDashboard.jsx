import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    material: '',
    price: '',
    image: null,
  });

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products');
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAdd = async () => {
    if (!formData.name || !formData.category || !formData.material || !formData.price || !formData.image) {
      return alert('Please fill all fields');
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('material', formData.material);
    data.append('price', formData.price);
    data.append('image', formData.image);

    try {
      await axios.post('http://localhost:5000/api/products', data);
      setFormData({ name: '', category: '', material: '', price: '', image: null });
      fetchProducts();
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="admin-dashboard">
      <h2>📦 Admin Dashboard</h2>

      <div className="admin-form">
        <input placeholder="Product Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
        <input placeholder="Category" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
        <input placeholder="Material" value={formData.material} onChange={e => setFormData({ ...formData, material: e.target.value })} />
        <input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} />
        <input type="file" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} />
        <button onClick={handleAdd}>Add Product</button>
      </div>

      <div className="admin-products">
        {products.map(p => (
          <div key={p._id} className="admin-card">
            {p.imageUrl && <img src={`http://localhost:5000/${p.imageUrl}`} alt={p.name} className="admin-img" />}
            <h3>{p.name}</h3>
            <p>{p.category} | {p.material}</p>
            <p>₹{p.price}</p>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
