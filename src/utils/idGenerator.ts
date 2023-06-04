export function generateID(length?: number) {
  return (Math.random() + 1).toString(36).substring(length ? length : 7);
}