export default function Button({ children, variant = 'primary', disabled, ...props }) {
  const base = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200';
  const variants = {
    primary: 'bg-terracotta text-white hover:bg-terracotta-dark shadow-sm disabled:opacity-50 disabled:cursor-not-allowed',
    secondary: 'text-charcoal-light hover:text-charcoal',
    outline: 'text-charcoal-light hover:text-terracotta border border-warm-border hover:border-terracotta-light',
  };

  return (
    <button className={`${base} ${variants[variant]}`} disabled={disabled} {...props}>
      {children}
    </button>
  );
}
