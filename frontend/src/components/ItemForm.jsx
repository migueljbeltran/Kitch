import { useState, useEffect } from 'react';

export default function ItemForm({ item, onSave, onCancel }) {
  const [form, setForm] = useState({
    product: '',
    brand: '',
    category: '',
    quantity: 0,
    expiry: '',
  });

  useEffect(() => {
    if (item) {
      setForm({
        product: item.product || '',
        brand: item.brand || '',
        category: item.category || '',
        quantity: item.quantity ?? 0,
        expiry: item.expiry || '',
      });
    }
  }, [item]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'quantity' ? Number(value) : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  const inputClass = "w-full border-b-2 border-warm-border bg-transparent px-1 py-2 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:border-terracotta transition-colors duration-200";
  const labelClass = "block text-xs font-medium tracking-wide uppercase text-charcoal-light mb-2";

  return (
    <form onSubmit={handleSubmit} className="bg-warm-surface border border-warm-border rounded-xl p-6 mb-6 animate-fade-in-up">
      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <label className={labelClass}>Product <span className="text-terracotta">*</span></label>
          <input name="product" value={form.product} onChange={handleChange} required maxLength={255}
            placeholder="e.g. Olive Oil" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Brand</label>
          <input name="brand" value={form.brand} onChange={handleChange} maxLength={255}
            placeholder="e.g. Bertolli" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input name="category" value={form.category} onChange={handleChange} maxLength={255}
            placeholder="e.g. Pantry" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Quantity</label>
          <input name="quantity" type="number" value={form.quantity} onChange={handleChange} min={0}
            className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Expiry</label>
          <input name="expiry" type="date" value={form.expiry} onChange={handleChange}
            className={inputClass} />
        </div>
        <div className="flex items-end gap-3">
          <button type="submit" className="bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors duration-200 shadow-sm">
            {item ? 'Update' : 'Add Item'}
          </button>
          <button type="button" onClick={onCancel} className="text-charcoal-light hover:text-charcoal px-4 py-2.5 text-sm transition-colors duration-200">
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
