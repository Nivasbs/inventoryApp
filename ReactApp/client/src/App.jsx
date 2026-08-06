import { useState, useEffect } from 'react';
import { getItems, createItem, deleteItem } from './services/api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items on load
  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await getItems();
      setItems(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not connect to the backend API.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity || !price) return;

    try {
      await createItem({ 
        name, 
        stockQuantity: parseInt(quantity), 
        unitPrice: parseFloat(price) 
      });
      setName('');
      setQuantity('');
      setPrice('');
      fetchItems(); // Refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to add item.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      console.error(err);
      alert('Failed to delete item.');
    }
  };

  return (
    <div style={{ background: '#f2f4f5', minHeight: '100vh', fontFamily: '"72", Arial, Helvetica, sans-serif', color: '#32363a' }}>
      {/* SAP Fiori Shell Header */}
      <header style={{ background: '#1d2d3e', color: '#fff', padding: '14px 24px', display: 'flex', alignItems: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.15)' }}>
        <span style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '0.4px' }}>Inventory Management Dashboard</span>
      </header>

      {/* Main Container */}
      <div style={{ maxWidth: '1000px', margin: '24px auto', padding: '0 20px' }}>
        
        {/* Page Header */}
        <div style={{ marginBottom: '20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#1d2d3e' }}>Stock Overview</h1>
          <p style={{ fontSize: '14px', color: '#6a6d70', margin: 0 }}>Monitor material quantities and unit pricing across enterprise inventory</p>
        </div>

        {error && <div style={{ background: '#ffdbdb', color: '#a60000', padding: '12px 16px', borderRadius: '4px', marginBottom: '20px', border: '1px solid #f5bbbb' }}>{error}</div>}

        {/* Form Card */}
        <div style={{ background: '#fff', borderRadius: '4px', border: '1px solid #d9d9d9', padding: '20px', marginBottom: '24px', boxShadow: '0 0 2px rgba(0,0,0,0.05)' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 16px 0', color: '#32363a' }}>Add New Material</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: '2', minWidth: '200px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#555' }}>Item Name</label>
              <input 
                type="text" 
                placeholder="Enter item name..." 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #89919a', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div style={{ flex: '1', minWidth: '120px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#555' }}>Quantity</label>
              <input 
                type="number" 
                placeholder="0" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #89919a', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div style={{ flex: '1', minWidth: '120px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', marginBottom: '6px', color: '#555' }}>Price ($)</label>
              <input 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
                style={{ width: '100%', padding: '8px 12px', border: '1px solid #89919a', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }}
              />
            </div>
            <div>
              <button type="submit" style={{ padding: '9px 20px', background: '#0a6ed1', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '14px' }}>
                Add Item
              </button>
            </div>
          </form>
        </div>

        {/* Table Card */}
        <div style={{ background: '#fff', borderRadius: '4px', border: '1px solid #d9d9d9', overflow: 'hidden', boxShadow: '0 0 2px rgba(0,0,0,0.05)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #d9d9d9', background: '#f7f7f7' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#32363a' }}>Inventory List ({items.length})</h3>
          </div>

          {loading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6a6d70' }}>Loading data...</div>
          ) : items.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#6a6d70' }}>No items found in inventory.</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#f2f4f5', borderBottom: '1px solid #d9d9d9', color: '#555' }}>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Item Name</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Stock Quantity</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600' }}>Unit Price</th>
                  <th style={{ padding: '12px 20px', fontWeight: '600', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={item.id || item.Id} style={{ borderBottom: index < items.length - 1 ? '1px solid #e5e5e5' : 'none' }}>
                    <td style={{ padding: '14px 20px', fontWeight: '600', color: '#32363a' }}>{item.name}</td>
                    <td style={{ padding: '14px 20px', color: '#32363a' }}>{item.stockQuantity}</td>
                    <td style={{ padding: '14px 20px', color: '#32363a' }}>${Number(item.unitPrice).toFixed(2)}</td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <button 
                        onClick={() => handleDelete(item.id || item.Id)} 
                        style={{ background: '#bb0000', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default App;