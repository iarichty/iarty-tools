/**
 * Number, Math, Unit, and Date Utilities.
 */

// 1. Number Base Converter with BigInt support
export function convertNumberBase(value: string, fromBase: number, toBase: number): string {
    const clean = value.trim();
    if (!clean) return '';
    try {
        if (fromBase === 10) {
            const big = BigInt(clean);
            return big.toString(toBase).toUpperCase();
        }
        let decimal = BigInt(0);
        const chars = clean.toLowerCase();
        for (let i = 0; i < chars.length; i++) {
            const digit = parseInt(chars[i], fromBase);
            if (isNaN(digit) || digit >= fromBase) throw new Error(`Invalid digit '${chars[i]}' for base ${fromBase}`);
            decimal = decimal * BigInt(fromBase) + BigInt(digit);
        }
        return decimal.toString(toBase).toUpperCase();
    } catch {
        const parsed = parseInt(clean, fromBase);
        if (isNaN(parsed)) return 'Invalid number';
        return parsed.toString(toBase).toUpperCase();
    }
}

// 2. Percentage Calculations
export function calculatePercentages(valA: number, valB: number) {
    const ofVal = (valA / 100) * valB;
    const isWhatPercentOf = valB !== 0 ? (valA / valB) * 100 : 0;
    const diff = valA !== 0 ? ((valB - valA) / Math.abs(valA)) * 100 : 0;
    const discount = valA - (valA * (valB / 100));
    return {
        aPercentOfB: ofVal,
        aIsWhatPercentOfB: isWhatPercentOf,
        percentageChange: diff,
        discountedPrice: discount
    };
}

// 4. Random Number Generator
export function generateRandomNumbers(options: {
    min: number;
    max: number;
    count: number;
    unique: boolean;
    decimal: boolean;
    secure: boolean;
}): number[] {
    const { min, max, count, unique, decimal, secure } = options;
    const results: number[] = [];
    const seen = new Set<number>();
    const safeCount = Math.min(count, unique ? Math.abs(max - min) + 1 : 1000);

    const getRand = (): number => {
        if (secure && typeof crypto !== 'undefined') {
            const arr = new Uint32Array(1);
            crypto.getRandomValues(arr);
            const norm = arr[0] / (0xffffffff + 1);
            return min + norm * (max - min);
        }
        return min + Math.random() * (max - min);
    };

    let attempts = 0;
    while (results.length < safeCount && attempts < safeCount * 10) {
        attempts++;
        const raw = getRand();
        const num = decimal ? parseFloat(raw.toFixed(4)) : Math.floor(raw);
        if (unique) {
            if (!seen.has(num)) {
                seen.add(num);
                results.push(num);
            }
        } else {
            results.push(num);
        }
    }
    return results;
}

// 5. Fraction Calculator
export function simplifyFraction(numerator: number, denominator: number): { num: number; den: number } {
    if (denominator === 0) return { num: numerator, den: denominator };
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const common = Math.abs(gcd(numerator, denominator));
    return {
        num: numerator / common,
        den: denominator / common
    };
}

export function decimalToFraction(decimal: number): { num: number; den: number } {
    const len = (decimal.toString().split('.')[1] || '').length;
    const den = Math.pow(10, len);
    const num = Math.round(decimal * den);
    return simplifyFraction(num, den);
}

// 6. Unit Converter
export type UnitCategory = 'length' | 'weight' | 'temperature' | 'data' | 'speed';

const UNIT_CONVERSIONS: Record<string, Record<string, number>> = {
    length: { m: 1, km: 0.001, cm: 100, mm: 1000, inch: 39.3701, ft: 3.28084, mile: 0.000621371 },
    weight: { kg: 1, g: 1000, mg: 1000000, lb: 2.20462, oz: 35.274 },
    data: { B: 1, KB: 1 / 1024, MB: 1 / (1024 ** 2), GB: 1 / (1024 ** 3), TB: 1 / (1024 ** 4) },
    speed: { 'm/s': 1, 'km/h': 3.6, mph: 2.23694, knot: 1.94384 }
};

export function convertUnits(val: number, from: string, to: string, category: UnitCategory): number {
    if (category === 'temperature') {
        if (from === to) return val;
        let celsius = val;
        if (from === 'F') celsius = (val - 32) * (5 / 9);
        else if (from === 'K') celsius = val - 273.15;

        if (to === 'C') return celsius;
        if (to === 'F') return celsius * (9 / 5) + 32;
        if (to === 'K') return celsius + 273.15;
        return val;
    }

    const table = UNIT_CONVERSIONS[category];
    if (!table || !table[from] || !table[to]) return val;
    const base = val / table[from];
    return base * table[to];
}

// 7. Date Calculator
export function calculateDateDiff(dateA: Date, dateB: Date) {
    const diffMs = Math.abs(dateB.getTime() - dateA.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375);
    const years = Math.floor(days / 365.25);
    return { days, weeks, months, years };
}

export function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// 9. Roman Numeral Converter
const ROMAN_MAP: Array<[number, string]> = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

export function toRoman(num: number): string {
    if (num <= 0 || num > 3999) return 'Out of range (1-3999)';
    let result = '';
    for (const [val, letter] of ROMAN_MAP) {
        while (num >= val) {
            result += letter;
            num -= val;
        }
    }
    return result;
}

export function fromRoman(roman: string): number {
    const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    const str = roman.toUpperCase().trim();
    let total = 0;
    for (let i = 0; i < str.length; i++) {
        const cur = map[str[i]] || 0;
        const next = map[str[i + 1]] || 0;
        if (cur < next) {
            total += next - cur;
            i++;
        } else {
            total += cur;
        }
    }
    return total;
}

// 10. Averages Calculator
export function calculateAverages(numbers: number[]) {
    if (numbers.length === 0) return { mean: 0, median: 0, mode: [] as number[], geometric: 0 };
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = sorted.reduce((a, b) => a + b, 0);
    const mean = sum / sorted.length;

    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    const counts: Record<number, number> = {};
    let maxFreq = 0;
    sorted.forEach(n => {
        counts[n] = (counts[n] || 0) + 1;
        if (counts[n] > maxFreq) maxFreq = counts[n];
    });
    const mode = Object.keys(counts)
        .map(Number)
        .filter(n => counts[n] === maxFreq && maxFreq > 1);

    const product = sorted.reduce((acc, val) => acc * (val > 0 ? val : 1), 1);
    const geometric = Math.pow(product, 1 / sorted.length);

    return { mean, median, mode, geometric };
}

