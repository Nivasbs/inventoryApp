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
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Inventory Management</h1>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {/* Add Item Form */}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Item Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
          style={{ padding: '8px', flex: 2 }}
        />
        <input 
          type="number" 
          placeholder="Quantity" 
          value={quantity} 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
          style={{ padding: '8px', flex: 1 }}
        />
        <input 
          type="number" 
          step="0.01" 
          placeholder="Price" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
          style={{ padding: '8px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '8px 16px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          Add
        </button>
      </form>

      {/* Items List */}
      <h2>Items List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : items.length === 0 ? (
        <p>No items found in inventory.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {items.map((item) => (
            <li key={item.id || item.Id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ddd', alignItems: 'center' }}>
              <div>
                <strong>{item.name}</strong> — Qty: {item.stockQuantity} | Price: ${item.unitPrice}
              </div>
              <button 
                onClick={() => handleDelete(item.id || item.Id)} 
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;