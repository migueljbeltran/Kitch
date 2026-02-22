import { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem, moveToShopping } from '../api/inventory';
import ItemForm from '../components/ItemForm';

export default function InventoryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  async function fetchItems() {
    try {
      setError(null);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchItems(); }, []);

  async function handleSave(data) {
    try {
      if (editing) {
        await updateItem(editing.id, data);
      } else {
        await createItem(data);
      }
      setShowForm(false);
      setEditing(null);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteItem(id);
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleMoveToShopping() {
    try {
      await moveToShopping();
      fetchItems();
    } catch (err) {
      setError(err.message);
    }
  }

  function handleEdit(item) {
    setEditing(item);
    setShowForm(true);
  }

  function handleCancel() {
    setShowForm(false);
    setEditing(null);
  }

  if (loading) return <p className="text-charcoal-light font-display italic animate-fade-in">Loading your pantry...</p>;

  const categories = [...new Set(items.map(i => i.category).filter(Boolean))];
  const lowStock = items.filter(i => i.quantity === 0).length;
  const expiringSoon = items.filter(i => {
    if (!i.expiry) return false;
    const diff = new Date(i.expiry) - new Date();
    return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal tracking-tight">Inventory</h1>
          <p className="text-charcoal-light text-sm mt-1">Everything in your kitchen at a glance</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleMoveToShopping} className="text-sm text-charcoal-light hover:text-terracotta border border-warm-border px-4 py-2.5 rounded-lg transition-colors duration-200 hover:border-terracotta-light">
            Move to Shopping
          </button>
          <button onClick={() => { setEditing(null); setShowForm(true); }} className="bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors duration-200 shadow-sm">
            + Add Item
          </button>
        </div>
      </div>

      {error && <p className="text-terracotta text-sm mb-4 animate-fade-in">{error}</p>}
      {showForm && <ItemForm item={editing} onSave={handleSave} onCancel={handleCancel} />}

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-warm-surface border border-warm-border rounded-xl p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal-light mb-1">Total Items</p>
          <p className="font-display text-3xl font-semibold text-charcoal">{items.length}</p>
        </div>
        <div className="bg-warm-surface border border-warm-border rounded-xl p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal-light mb-1">Categories</p>
          <p className="font-display text-3xl font-semibold text-charcoal">{categories.length}</p>
        </div>
        <div className="bg-warm-surface border border-warm-border rounded-xl p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal-light mb-1">Out of Stock</p>
          <p className={`font-display text-3xl font-semibold ${lowStock > 0 ? 'text-terracotta' : 'text-sage'}`}>{lowStock}</p>
        </div>
        <div className="bg-warm-surface border border-warm-border rounded-xl p-5">
          <p className="text-xs font-medium tracking-widest uppercase text-charcoal-light mb-1">Expiring Soon</p>
          <p className={`font-display text-3xl font-semibold ${expiringSoon > 0 ? 'text-terracotta' : 'text-sage'}`}>{expiringSoon}</p>
        </div>
      </div>

      {/* Items Grid */}
      {items.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-warm-border rounded-2xl">
          <p className="font-display text-xl italic text-charcoal-light">Your pantry is empty.</p>
          <p className="text-sm text-charcoal-light/60 mt-2">Add your first item to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div key={item.id}
              className={`group bg-warm-surface border border-warm-border rounded-xl overflow-hidden hover:shadow-lg hover:shadow-charcoal/5 transition-all duration-300 hover:-translate-y-0.5 animate-fade-in-up stagger-${Math.min(i + 1, 4)}`}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-charcoal text-lg leading-tight">{item.product}</h3>
                    {item.brand && <p className="text-charcoal-light text-sm mt-0.5">{item.brand}</p>}
                  </div>
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-display text-xl font-semibold ${
                    item.quantity === 0 ? 'bg-terracotta-light text-terracotta' : 'bg-sage-light text-sage'
                  }`}>
                    {item.quantity}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {item.category && (
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-sage-light text-sage">
                      {item.category}
                    </span>
                  )}
                  {item.expiry && (
                    <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-cream-dark text-charcoal-light">
                      Exp: {item.expiry}
                    </span>
                  )}
                </div>
              </div>
              <div className="border-t border-warm-border px-5 py-2.5 flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-cream/50">
                <button onClick={() => handleEdit(item)} className="text-sm text-charcoal-light hover:text-charcoal transition-colors">Edit</button>
                <button onClick={() => handleDelete(item.id)} className="text-sm text-charcoal-light/40 hover:text-terracotta transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
