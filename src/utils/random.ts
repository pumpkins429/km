/**
 * Mulberry32 seeded PRNG. Same seed = same sequence.
 * Returns a function that produces random numbers in [0, 1).
 */
export function createRNG(seed: number): () => number {
  let state = seed | 0;
  return (): number => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Weighted random selection from an array.
 * Items with higher weights are more likely to be chosen.
 * Returns the selected item.
 */
export function weightedRandomSelect<T>(
  items: T[],
  weightFn: (item: T) => number,
  rng: () => number
): T | null {
  if (items.length === 0) return null;

  const totalWeight = items.reduce((sum, item) => sum + weightFn(item), 0);
  if (totalWeight <= 0) return null;

  const threshold = rng() * totalWeight;
  let cumulative = 0;

  for (const item of items) {
    cumulative += weightFn(item);
    if (cumulative >= threshold) return item;
  }

  return items[items.length - 1];
}

/**
 * Fisher-Yates shuffle using the provided RNG.
 * Mutates and returns the array.
 */
export function shuffle<T>(array: T[], rng: () => number): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Random integer in [min, max] inclusive.
 */
export function randomInt(min: number, max: number, rng: () => number): number {
  return Math.floor(rng() * (max - min + 1)) + min;
}

/**
 * Pick N random items from an array without replacement.
 */
export function pickRandom<T>(items: T[], count: number, rng: () => number): T[] {
  const copy = [...items];
  shuffle(copy, rng);
  return copy.slice(0, count);
}
