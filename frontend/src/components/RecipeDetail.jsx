import { useState } from 'react';
import { updateRecipeName, addIngredient, updateIngredient, deleteIngredient, addStep, updateStep, deleteStep } from '../api/recipes';
import ItemForm from './ItemForm';

export default function RecipeDetail({ recipe, onRefresh }) {
  const [error, setError] = useState(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState(recipe.name);
  const [showIngredientForm, setShowIngredientForm] = useState(false);
  const [editingIngredient, setEditingIngredient] = useState(null);
  const [showStepForm, setShowStepForm] = useState(false);
  const [editingStep, setEditingStep] = useState(null);
  const [stepText, setStepText] = useState('');

  async function handleNameSave() {
    try {
      await updateRecipeName(recipe.id, name);
      setEditingName(false);
      onRefresh();
    } catch (err) { setError(err.message); }
  }

  async function handleIngredientSave(data) {
    try {
      if (editingIngredient) {
        await updateIngredient(recipe.id, editingIngredient.id, data);
      } else {
        await addIngredient(recipe.id, data);
      }
      setShowIngredientForm(false);
      setEditingIngredient(null);
      onRefresh();
    } catch (err) { setError(err.message); }
  }

  async function handleIngredientDelete(id) {
    try {
      await deleteIngredient(recipe.id, id);
      onRefresh();
    } catch (err) { setError(err.message); }
  }

  async function handleStepSave(e) {
    e.preventDefault();
    try {
      if (editingStep) {
        await updateStep(recipe.id, editingStep.id, stepText);
      } else {
        await addStep(recipe.id, stepText);
      }
      setShowStepForm(false);
      setEditingStep(null);
      setStepText('');
      onRefresh();
    } catch (err) { setError(err.message); }
  }

  async function handleStepDelete(stepId) {
    try {
      await deleteStep(recipe.id, stepId);
      onRefresh();
    } catch (err) { setError(err.message); }
  }

  const sortedSteps = [...(recipe.steps || [])].sort((a, b) => a.stepOrder - b.stepOrder);
  const ingredients = recipe.ingredients || [];

  return (
    <div>
      {error && <p className="text-terracotta text-sm mb-4 animate-fade-in">{error}</p>}

      {/* Recipe Header Card */}
      <div className="bg-warm-surface border border-warm-border rounded-2xl overflow-hidden mb-8 animate-fade-in-up">
        <div className="bg-terracotta-light px-8 py-8 border-b border-terracotta/10">
          {editingName ? (
            <div className="flex items-center gap-3 animate-fade-in">
              <input value={name} onChange={e => setName(e.target.value)}
                className="font-display text-4xl font-semibold text-charcoal bg-transparent border-b-2 border-terracotta px-1 py-1 focus:outline-none w-full max-w-lg" />
              <button onClick={handleNameSave} className="text-sm bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-terracotta-dark transition-colors duration-200">Save</button>
              <button onClick={() => { setEditingName(false); setName(recipe.name); }} className="text-sm text-charcoal-light hover:text-charcoal transition-colors duration-200">Cancel</button>
            </div>
          ) : (
            <h1 className="font-display text-4xl font-semibold text-charcoal tracking-tight cursor-pointer hover:text-terracotta transition-colors duration-200 group"
                onClick={() => setEditingName(true)}>
              {recipe.name}
              <span className="text-charcoal-light/0 group-hover:text-charcoal-light/40 ml-3 text-sm font-body font-normal transition-colors duration-200">click to edit</span>
            </h1>
          )}
        </div>
        <div className="px-8 py-5 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-charcoal">{ingredients.length}</span>
            <span className="text-sm text-charcoal-light">Ingredients</span>
          </div>
          <div className="w-px h-6 bg-warm-border"></div>
          <div className="flex items-center gap-2">
            <span className="font-display text-2xl font-semibold text-charcoal">{sortedSteps.length}</span>
            <span className="text-sm text-charcoal-light">Steps</span>
          </div>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Ingredients Column */}
        <div className="lg:col-span-2 animate-fade-in-up stagger-1">
          <div className="bg-warm-surface border border-warm-border rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-warm-border flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-charcoal">Ingredients</h2>
              <button onClick={() => { setEditingIngredient(null); setShowIngredientForm(true); }}
                className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200">
                + Add
              </button>
            </div>

            {showIngredientForm && (
              <div className="px-6 py-4 border-b border-warm-border bg-cream/50">
                <ItemForm item={editingIngredient} onSave={handleIngredientSave} onCancel={() => { setShowIngredientForm(false); setEditingIngredient(null); }} />
              </div>
            )}

            {ingredients.length === 0 ? (
              <div className="px-6 py-10 text-center">
                <p className="font-display italic text-charcoal-light">No ingredients yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-warm-border">
                {ingredients.map(item => (
                  <li key={item.id} className="group px-6 py-3.5 flex items-center gap-3 hover:bg-cream/50 transition-colors duration-150">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-sage-light text-sage text-xs font-semibold flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-charcoal text-sm">{item.product}</p>
                      {item.brand && <p className="text-xs text-charcoal-light">{item.brand}</p>}
                    </div>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => { setEditingIngredient(item); setShowIngredientForm(true); }}
                        className="text-xs text-charcoal-light hover:text-charcoal transition-colors">Edit</button>
                      <button onClick={() => handleIngredientDelete(item.id)}
                        className="text-xs text-charcoal-light/40 hover:text-terracotta transition-colors">Remove</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Steps Column */}
        <div className="lg:col-span-3 animate-fade-in-up stagger-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg font-semibold text-charcoal">Instructions</h2>
            <button onClick={() => { setEditingStep(null); setStepText(''); setShowStepForm(true); }}
              className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200">
              + Add Step
            </button>
          </div>

          {showStepForm && (
            <form onSubmit={handleStepSave} className="bg-warm-surface border border-warm-border rounded-xl p-6 mb-5 flex gap-6 items-end animate-fade-in-up">
              <div className="flex-1">
                <label className="block text-xs font-medium tracking-wide uppercase text-charcoal-light mb-2">
                  Instruction <span className="text-terracotta">*</span>
                </label>
                <input value={stepText} onChange={e => setStepText(e.target.value)} required maxLength={1000}
                  placeholder="e.g. Preheat the oven to 375°F"
                  className="w-full border-b-2 border-warm-border bg-transparent px-1 py-2 text-sm text-charcoal placeholder:text-charcoal-light/40 focus:outline-none focus:border-terracotta transition-colors duration-200" />
              </div>
              <button type="submit" className="bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors duration-200 shadow-sm">
                {editingStep ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={() => { setShowStepForm(false); setEditingStep(null); }}
                className="text-charcoal-light hover:text-charcoal px-4 py-2.5 text-sm transition-colors duration-200">
                Cancel
              </button>
            </form>
          )}

          {sortedSteps.length === 0 ? (
            <div className="py-16 text-center border-2 border-dashed border-warm-border rounded-2xl">
              <p className="font-display text-lg italic text-charcoal-light">No instructions yet.</p>
              <p className="text-sm text-charcoal-light/60 mt-1">Add steps to complete your recipe.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {sortedSteps.map((step, i) => (
                <div key={step.id}
                  className={`group flex gap-5 animate-fade-in-up stagger-${Math.min(i + 1, 4)}`}>
                  {/* Step number */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <span className="w-10 h-10 rounded-full bg-terracotta text-white text-sm font-semibold flex items-center justify-center shadow-sm">
                      {i + 1}
                    </span>
                    {i < sortedSteps.length - 1 && (
                      <div className="w-px flex-1 bg-warm-border mt-2"></div>
                    )}
                  </div>
                  {/* Step content */}
                  <div className="flex-1 bg-warm-surface border border-warm-border rounded-xl px-5 py-4 hover:shadow-sm transition-shadow duration-200">
                    <p className="text-charcoal leading-relaxed">{step.instruction}</p>
                    <div className="flex gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={() => { setEditingStep(step); setStepText(step.instruction); setShowStepForm(true); }}
                        className="text-xs text-charcoal-light hover:text-charcoal transition-colors">Edit</button>
                      <button onClick={() => handleStepDelete(step.id)}
                        className="text-xs text-charcoal-light/40 hover:text-terracotta transition-colors">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
