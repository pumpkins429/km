const CHINESE_NUMERALS = [
  '零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
];

const SEASON_CHARS: Record<string, string> = {
  spring: '春',
  summer: '夏',
  autumn: '秋',
  winter: '冬',
};

/**
 * Format large numbers with Chinese 万(10k) and 亿(100M) notation.
 * e.g., 15000 → "1.5万", 250000000 → "2.5亿"
 */
export function formatNumber(n: number): string {
  if (n >= 1e8) {
    const value = n / 1e8;
    return removeTrailingZero(value) + '亿';
  }
  if (n >= 1e4) {
    const value = n / 1e4;
    return removeTrailingZero(value) + '万';
  }
  return n.toString();
}

/**
 * Format a stat value for display with its label.
 * e.g., formatStat(75) → "75"
 */
export function formatStat(value: number): string {
  return value.toString();
}

/**
 * Format year + season for display.
 * e.g., formatYearSeason(5, 'spring') → "五年·春"
 */
export function formatYearSeason(year: number, season: string): string {
  const numeral = CHINESE_NUMERALS[year] ?? year.toString();
  const seasonChar = SEASON_CHARS[season] ?? season;
  return `${numeral}年·${seasonChar}`;
}

/**
 * Format lifespan as "X年Y月" from total months.
 */
export function formatLifespan(months: number): string {
  const years = Math.floor(months / 12);
  const remaining = months % 12;
  if (remaining === 0) return `${years}年`;
  return `${years}年${remaining}月`;
}

function removeTrailingZero(value: number): string {
  const str = value.toString();
  if (str.endsWith('.0')) return str.slice(0, -2);
  return str;
}
