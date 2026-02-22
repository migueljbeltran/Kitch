import { useState, useEffect, useCallback } from 'react';
import { getRecipes, createRecipe, deleteRecipe } from '../api/recipes';
import RecipeList from '../components/RecipeList';
import RecipeForm from '../components/RecipeForm';
import Button from '../components/Button';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchRecipes = useCallback(async () => {
    try {
      setError(null);
      const data = await getRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRecipes(); }, [fetchRecipes]);

  async function handleCreate(data) {
    try {
      setSubmitting(true);
      await createRecipe(data);
      setShowForm(false);
      fetchRecipes();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this recipe? This will also remove all its ingredients and steps.')) return;
    try {
      await deleteRecipe(id);
      fetchRecipes();
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <p className="text-charcoal-light font-display italic animate-fade-in">Loading recipes...</p>;

  return (
    <div className="animate-fade-in-up">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl font-semibold text-charcoal tracking-tight">Recipes</h1>
          <p className="text-charcoal-light text-sm mt-1">{recipes.length} {recipes.length === 1 ? 'recipe' : 'recipes'} in your collection</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          + New Recipe
        </Button>
      </div>
      {error && <p className="text-terracotta text-sm mb-4 animate-fade-in">{error}</p>}
      {showForm && <RecipeForm onSave={handleCreate} onCancel={() => setShowForm(false)} submitting={submitting} />}
      <RecipeList recipes={recipes} onDelete={handleDelete} />
    </div>
  );
}
