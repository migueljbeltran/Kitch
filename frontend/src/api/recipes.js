import { throwIfError } from './helpers';

const BASE = '/api/recipes';

const headers = { 'Content-Type': 'application/json' };

export async function getRecipes() {
  const res = await fetch(BASE);
  await throwIfError(res, 'Failed to fetch recipes');
  return res.json();
}

export async function getRecipe(id) {
  const res = await fetch(`${BASE}/${id}`);
  await throwIfError(res, 'Recipe not found');
  return res.json();
}

export async function createRecipe(data) {
  const res = await fetch(BASE, { method: 'POST', headers, body: JSON.stringify(data) });
  await throwIfError(res, 'Failed to create recipe');
  return res.json();
}

export async function updateRecipeName(id, name) {
  const res = await fetch(`${BASE}/${id}`, { method: 'PUT', headers, body: JSON.stringify({ name }) });
  await throwIfError(res, 'Failed to update recipe');
  return res.json();
}

export async function deleteRecipe(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  await throwIfError(res, 'Failed to delete recipe');
}

export async function addIngredient(recipeId, data) {
  const res = await fetch(`${BASE}/${recipeId}/ingredients`, { method: 'POST', headers, body: JSON.stringify(data) });
  await throwIfError(res, 'Failed to add ingredient');
  return res.json();
}

export async function updateIngredient(recipeId, ingredientId, data) {
  const res = await fetch(`${BASE}/${recipeId}/ingredients/${ingredientId}`, { method: 'PUT', headers, body: JSON.stringify(data) });
  await throwIfError(res, 'Failed to update ingredient');
  return res.json();
}

export async function deleteIngredient(recipeId, ingredientId) {
  const res = await fetch(`${BASE}/${recipeId}/ingredients/${ingredientId}`, { method: 'DELETE' });
  await throwIfError(res, 'Failed to delete ingredient');
}

export async function addStep(recipeId, instruction) {
  const res = await fetch(`${BASE}/${recipeId}/steps`, { method: 'POST', headers, body: JSON.stringify({ instruction }) });
  await throwIfError(res, 'Failed to add step');
  return res.json();
}

export async function updateStep(recipeId, stepId, instruction) {
  const res = await fetch(`${BASE}/${recipeId}/steps/${stepId}`, { method: 'PUT', headers, body: JSON.stringify({ instruction }) });
  await throwIfError(res, 'Failed to update step');
  return res.json();
}

export async function deleteStep(recipeId, stepId) {
  const res = await fetch(`${BASE}/${recipeId}/steps/${stepId}`, { method: 'DELETE' });
  await throwIfError(res, 'Failed to delete step');
}
