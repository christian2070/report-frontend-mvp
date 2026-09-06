export function buildAssetUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_ASSETS_URL;

  if (!path.startsWith('/')) {
    return `${baseUrl}/${path}`;
  }

  return `${baseUrl}${path}`;
}
