import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `relative px-1 py-1 text-sm tracking-wide transition-colors duration-200 ${
      isActive
        ? 'text-terracotta font-medium'
        : 'text-charcoal-light hover:text-charcoal'
    }`;

  return (
    <nav className="border-b border-warm-border bg-cream">
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <NavLink to="/" className="group flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-charcoal tracking-tight">Kitch</span>
          <span className="text-xs text-charcoal-light font-light tracking-widest uppercase hidden sm:inline">Kitchen Manager</span>
        </NavLink>
        <div className="flex items-center gap-6">
          <NavLink to="/" className={linkClass} end>Inventory</NavLink>
          <NavLink to="/shopping" className={linkClass}>Shopping</NavLink>
          <NavLink to="/recipes" className={linkClass}>Recipes</NavLink>
        </div>
      </div>
    </nav>
  );
}
