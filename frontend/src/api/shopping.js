import { throwIfError } from './helpers';

const BASE = '/api/shopping';

const headers = { 'Content-Type': 'application/json' };

export async function getItems() {
  const res = await fetch(BASE);
  await throwIfError(res, 'Failed to fetch shopping list');
  return res.json();
}

export async function getItem(id) {
  const res = await fetch(`${BASE}/${id}`);
  await throwIfError(res, 'Item not found');
  return res.json();
}

export async function createItem(data) {
  const res = await fetch(BASE, { method: 'POST', headers, body: JSON.stringify(data) });
  await throwIfError(res, 'Failed to create item');
  return res.json();
}

export async function updateItem(id, data) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers, body: JSON.stringify(data) });
  await throwIfError(res, 'Failed to update item');
  return res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await throwIfError(res, 'Failed to delete item');
}
