export default function ItemTable({ items, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <div className="py-12 text-center animate-fade-in">
        <p className="font-display text-lg italic text-charcoal-light">Nothing here yet.</p>
        <p className="text-sm text-charcoal-light/60 mt-1">Add your first item to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto animate-fade-in-up">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="border-b-2 border-charcoal/10">
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light">Product</th>
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light">Brand</th>
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light">Category</th>
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light">Qty</th>
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light">Expiry</th>
            <th className="px-4 py-3 text-xs font-medium tracking-widest uppercase text-charcoal-light text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className={`border-b border-warm-border hover:bg-cream-dark/50 transition-colors duration-150 animate-fade-in-up stagger-${Math.min(i + 1, 4)}`}>
              <td className="px-4 py-3.5 font-medium text-charcoal">{item.product}</td>
              <td className="px-4 py-3.5 text-charcoal-light">{item.brand || <span className="opacity-30">—</span>}</td>
              <td className="px-4 py-3.5">
                {item.category ? (
                  <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-sage-light text-sage">{item.category}</span>
                ) : (
                  <span className="opacity-30">—</span>
                )}
              </td>
              <td className="px-4 py-3.5">
                <span className={`font-medium ${item.quantity === 0 ? 'text-terracotta' : 'text-charcoal'}`}>{item.quantity}</span>
              </td>
              <td className="px-4 py-3.5 text-charcoal-light">{item.expiry || <span className="opacity-30">—</span>}</td>
              <td className="px-4 py-3.5 text-right space-x-3">
                <button onClick={() => onEdit(item)} className="text-charcoal-light hover:text-charcoal transition-colors text-sm">Edit</button>
                <button onClick={() => onDelete(item.id)} className="text-charcoal-light/40 hover:text-terracotta transition-colors text-sm">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
