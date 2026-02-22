import { useState, useEffect } from 'react';
import Button from './Button';

export default function ItemForm({ item, onSave, onCancel, submitting }) {
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
          <label htmlFor="item-product" className={labelClass}>Product <span className="text-terracotta">*</span></label>
          <input id="item-product" name="product" value={form.product} onChange={handleChange} required maxLength={255}
            placeholder="e.g. Olive Oil" className={inputClass} />
        </div>
        <div>
          <label htmlFor="item-brand" className={labelClass}>Brand</label>
          <input id="item-brand" name="brand" value={form.brand} onChange={handleChange} maxLength={255}
            placeholder="e.g. Bertolli" className={inputClass} />
        </div>
        <div>
          <label htmlFor="item-category" className={labelClass}>Category</label>
          <input id="item-category" name="category" value={form.category} onChange={handleChange} maxLength={255}
            placeholder="e.g. Pantry" className={inputClass} />
        </div>
        <div>
          <label htmlFor="item-quantity" className={labelClass}>Quantity</label>
          <input id="item-quantity" name="quantity" type="number" value={form.quantity} onChange={handleChange} min={0}
            className={inputClass} />
        </div>
        <div>
          <label htmlFor="item-expiry" className={labelClass}>Expiry</label>
          <input id="item-expiry" name="expiry" type="date" value={form.expiry} onChange={handleChange}
            className={inputClass} />
        </div>
        <div className="flex items-end gap-3">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : (item ? 'Update' : 'Add Item')}
          </Button>
          <Button variant="secondary" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
