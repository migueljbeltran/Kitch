export async function throwIfError(res, fallback) {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message || fallback);
  }
}
