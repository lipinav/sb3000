export function pureUrl(uri: string): string {
  const url = new URL(uri);
  return url.origin+url.pathname;
}