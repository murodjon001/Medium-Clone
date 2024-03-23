export function randomCharacters() {
  return Math.random().toString(36).slice(-8);
}
