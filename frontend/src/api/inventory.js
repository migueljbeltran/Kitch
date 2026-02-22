const BASE = '/api/inventory';

const headers = { 'Content-Type': 'application/json' };

export async function getItems() {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error('Failed to fetch inventory');
  return res.json();
}

export async function getItem(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error('Item not found');
  return res.json();
}

export async function createItem(data) {
  const res = await fetch(BASE, { method: 'POST', headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to create item');
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
  if (!res.ok) throw new Error('Failed to update item');
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
}

export async function moveToShopping() {
  const res = await fetch(`${BASE}/move-to-shopping`, { method: 'POST' });
  if (!res.ok) throw new Error('Failed to move items');
  return res.json();
}
