export const generateUniqueNumbers = (count: number, max: number) => {
  const numbers = new Set<number>();
  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * max) + 1);
  }
  return [...numbers];
};
