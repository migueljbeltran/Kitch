import { useState, useEffect, useCallback } from 'react';
import { getItems, createItem, updateItem, deleteItem } from '../api/shopping';
import ItemForm from '../components/ItemForm';
import Button from '../components/Button';

const STORAGE_KEY = 'kitch-shopping-checked';

function loadChecked() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export default function ShoppingPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [checked, setChecked] = useState(loadChecked);
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setError(null);
      const data = await getItems();
      setItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
  }, [checked]);

  async function handleSave(data) {
    try {
      setSubmitting(true);
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
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Remove this item from your shopping list?')) return;
    try {
      await deleteItem(id);
      setChecked(prev => { const next = { ...prev }; delete next[id]; return next; });
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

  function toggleChecked(id) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  if (loading) return <p className="text-charcoal-light font-display italic animate-fade-in">Loading your list...</p>;

  // Group items by category
  const grouped = {};
  items.forEach(item => {
    const cat = item.category || 'Other';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(item);
  });
  const categoryNames = Object.keys(grouped).sort();
  const checkedCount = Object.values(checked).filter(Boolean).length;

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal tracking-tight">Shopping List</h1>
          <p className="text-charcoal-light text-sm mt-1">
            {checkedCount > 0
              ? `${checkedCount} of ${items.length} items checked off`
              : `${items.length} ${items.length === 1 ? 'item' : 'items'} to buy`}
          </p>
        </div>
        <Button onClick={() => { setEditing(null); setShowForm(true); }}>
          + Add Item
        </Button>
      </div>

      {error && <p className="text-terracotta text-sm mb-4 animate-fade-in">{error}</p>}
      {showForm && <ItemForm item={editing} onSave={handleSave} onCancel={handleCancel} submitting={submitting} />}

      {/* Progress bar */}
      {items.length > 0 && (
        <div className="mb-8 animate-fade-in-up stagger-1">
          <div className="h-2 bg-cream-dark rounded-full overflow-hidden">
            <div className="h-full bg-sage rounded-full transition-all duration-500 ease-out"
              style={{ width: `${items.length > 0 ? (checkedCount / items.length) * 100 : 0}%` }} />
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="py-16 text-center border-2 border-dashed border-warm-border rounded-2xl">
          <p className="font-display text-xl italic text-charcoal-light">Nothing on the list.</p>
          <p className="text-sm text-charcoal-light/60 mt-2">Add items or move out-of-stock inventory here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {categoryNames.map((cat, catIdx) => (
            <div key={cat} className={`animate-fade-in-up stagger-${Math.min(catIdx + 1, 4)}`}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-xs font-medium tracking-widest uppercase text-charcoal-light">{cat}</h2>
                <div className="flex-1 border-t border-warm-border"></div>
                <span className="text-xs text-charcoal-light/50">{grouped[cat].length}</span>
              </div>
              <div className="space-y-2">
                {grouped[cat].map(item => {
                  const isChecked = checked[item.id];
                  return (
                    <div key={item.id}
                      className={`group flex items-center gap-4 bg-warm-surface border border-warm-border rounded-xl px-5 py-4 transition-all duration-200 hover:shadow-sm ${isChecked ? 'opacity-50' : ''}`}>
                      <button onClick={() => toggleChecked(item.id)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          isChecked ? 'bg-sage border-sage text-white' : 'border-warm-border hover:border-sage'
                        }`}>
                        {isChecked && (
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium text-charcoal transition-all duration-200 ${isChecked ? 'line-through' : ''}`}>
                          {item.product}
                          {item.brand && <span className="font-normal text-charcoal-light ml-2">({item.brand})</span>}
                        </p>
                        {item.expiry && (
                          <p className="text-xs text-charcoal-light/60 mt-0.5">Exp: {item.expiry}</p>
                        )}
                      </div>
                      <span className="text-sm font-medium text-charcoal-light bg-cream-dark px-3 py-1 rounded-full">
                        qty {item.quantity}
                      </span>
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button onClick={() => handleEdit(item)} className="text-sm text-charcoal-light hover:text-charcoal transition-colors">Edit</button>
                        <button onClick={() => handleDelete(item.id)} className="text-sm text-charcoal-light/40 hover:text-terracotta transition-colors">Remove</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
