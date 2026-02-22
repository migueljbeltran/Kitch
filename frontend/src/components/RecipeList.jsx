import { Link } from 'react-router-dom';

const ACCENTS = [
  { bg: 'bg-terracotta-light', text: 'text-terracotta', border: 'border-terracotta/20' },
  { bg: 'bg-sage-light', text: 'text-sage', border: 'border-sage/20' },
  { bg: 'bg-cream-dark', text: 'text-charcoal-light', border: 'border-charcoal/10' },
];

export default function RecipeList({ recipes, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className="py-16 text-center border-2 border-dashed border-warm-border rounded-2xl">
        <p className="font-display text-xl italic text-charcoal-light">No recipes yet.</p>
        <p className="text-sm text-charcoal-light/60 mt-2">Create your first recipe to build your collection.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {recipes.map((recipe, i) => {
        const accent = ACCENTS[i % ACCENTS.length];
        return (
          <div key={recipe.id}
            className={`group bg-warm-surface border border-warm-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-charcoal/5 transition-all duration-300 hover:-translate-y-1 animate-fade-in-up stagger-${Math.min(i + 1, 4)}`}>
            {/* Colored header band */}
            <div className={`${accent.bg} px-6 py-5 ${accent.border} border-b`}>
              <Link to={`/recipes/${recipe.id}`} className="block">
                <h3 className="font-display text-2xl font-semibold text-charcoal group-hover:text-terracotta transition-colors duration-200">
                  {recipe.name}
                </h3>
              </Link>
            </div>

            <div className="px-6 py-5">
              {/* Recipe meta */}
              <div className="flex items-center gap-6 mb-4">
                <div>
                  <p className="text-2xl font-display font-semibold text-charcoal">{recipe.ingredients?.length || 0}</p>
                  <p className="text-xs tracking-wide uppercase text-charcoal-light">Ingredients</p>
                </div>
                <div className="w-px h-8 bg-warm-border"></div>
                <div>
                  <p className="text-2xl font-display font-semibold text-charcoal">{recipe.steps?.length || 0}</p>
                  <p className="text-xs tracking-wide uppercase text-charcoal-light">Steps</p>
                </div>
              </div>

              {/* Ingredient preview */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <p className="text-sm text-charcoal-light leading-relaxed">
                  {recipe.ingredients.slice(0, 3).map(ing => ing.product).join(', ')}
                  {recipe.ingredients.length > 3 && ` + ${recipe.ingredients.length - 3} more`}
                </p>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-warm-border">
                <Link to={`/recipes/${recipe.id}`}
                  className="text-sm font-medium text-terracotta hover:text-terracotta-dark transition-colors duration-200">
                  View Recipe &rarr;
                </Link>
                <button onClick={() => onDelete(recipe.id)}
                  className="text-xs text-charcoal-light/30 hover:text-terracotta transition-colors duration-200">
                  Remove
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
