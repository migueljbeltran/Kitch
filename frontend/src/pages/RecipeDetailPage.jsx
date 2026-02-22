import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipe } from '../api/recipes';
import RecipeDetail from '../components/RecipeDetail';

export default function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecipe = useCallback(async () => {
    try {
      setError(null);
      const data = await getRecipe(id);
      setRecipe(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchRecipe(); }, [fetchRecipe]);

  if (loading) return <p className="text-charcoal-light font-display italic animate-fade-in">Loading recipe...</p>;
  if (error) return <p className="text-terracotta animate-fade-in">{error}</p>;

  return (
    <div className="animate-fade-in-up">
      <Link to="/recipes" className="inline-flex items-center gap-1.5 text-charcoal-light hover:text-terracotta text-sm mb-6 transition-colors duration-200 group">
        <span className="group-hover:-translate-x-0.5 transition-transform duration-200">&larr;</span>
        <span>Back to Recipes</span>
      </Link>
      <RecipeDetail recipe={recipe} onRefresh={fetchRecipe} />
    </div>
  );
}
