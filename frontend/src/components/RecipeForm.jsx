import { useState } from 'react';

export default function RecipeForm({ onSave, onCancel }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ name, ingredients: [], steps: [] });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-warm-surface border border-warm-border rounded-xl p-6 mb-6 flex gap-6 items-end animate-fade-in-up">
      <div className="flex-1">
        <label className="block text-xs font-medium tracking-wide uppercase text-charcoal-light mb-2">
          Recipe Name <span className="text-terracotta">*</span>
        </label>
        <input value={name} onChange={e => setName(e.target.value)} required maxLength={255}
          placeholder="e.g. Grandma's Tomato Soup"
          className="w-full border-b-2 border-warm-border bg-transparent px-1 py-2 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:border-terracotta transition-colors duration-200" />
      </div>
      <button type="submit" className="bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors duration-200 shadow-sm">
        Create
      </button>
      <button type="button" onClick={onCancel} className="text-charcoal-light hover:text-charcoal px-4 py-2.5 text-sm transition-colors duration-200">
        Cancel
      </button>
    </form>
  );
}
