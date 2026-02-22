import { useState } from 'react';
import Button from './Button';

export default function RecipeForm({ onSave, onCancel, submitting }) {
  const [name, setName] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onSave({ name, ingredients: [], steps: [] });
  }

  return (
    <form onSubmit={handleSubmit} className="bg-warm-surface border border-warm-border rounded-xl p-6 mb-6 flex gap-6 items-end animate-fade-in-up">
      <div className="flex-1">
        <label htmlFor="recipe-name" className="block text-xs font-medium tracking-wide uppercase text-charcoal-light mb-2">
          Recipe Name <span className="text-terracotta">*</span>
        </label>
        <input id="recipe-name" value={name} onChange={e => setName(e.target.value)} required maxLength={255}
          placeholder="e.g. Grandma's Tomato Soup"
          className="w-full border-b-2 border-warm-border bg-transparent px-1 py-2 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:border-terracotta transition-colors duration-200" />
      </div>
      <Button type="submit" disabled={submitting}>
        {submitting ? 'Creating...' : 'Create'}
      </Button>
      <Button variant="secondary" type="button" onClick={onCancel}>
        Cancel
      </Button>
    </form>
  );
}
