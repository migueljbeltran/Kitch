import { useState, useEffect } from 'react';
import { getRecipes, createRecipe, deleteRecipe } from '../api/recipes';
import RecipeList from '../components/RecipeList';
import RecipeForm from '../components/RecipeForm';

export default function RecipePage() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  async function fetchRecipes() {
    try {
      setError(null);
      const data = await getRecipes();
      setRecipes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchRecipes(); }, []);

  async function handleCreate(data) {
    try {
      await createRecipe(data);
      setShowForm(false);
      fetchRecipes();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
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
        <button onClick={() => setShowForm(true)} className="bg-terracotta text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-terracotta-dark transition-colors duration-200 shadow-sm">
          + New Recipe
        </button>
      </div>
      {error && <p className="text-terracotta text-sm mb-4 animate-fade-in">{error}</p>}
      {showForm && <RecipeForm onSave={handleCreate} onCancel={() => setShowForm(false)} />}
      <RecipeList recipes={recipes} onDelete={handleDelete} />
    </div>
  );
}
