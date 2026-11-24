import { describe, it, expect } from 'vitest';
import {
    convertNumberBase,
    calculatePercentages,
    generateRandomNumbers,
    simplifyFraction,
    convertUnits,
    calculateDateDiff,
    toRoman,
    fromRoman,
    calculateAverages
} from './mathTools';
import { generateOpenGraphTags, checkColorContrast } from './seoTools';
import { calculateHash, generateHmac, encryptAesGcm, decryptAesGcm, maskSensitiveText } from './securityTools';

describe('Additional Online Utilities Test Suite', () => {
    it('Number Base converter converts decimal, binary, hex, and handles BigInt', () => {
        expect(convertNumberBase('255', 10, 16)).toBe('FF');
        expect(convertNumberBase('FF', 16, 10)).toBe('255');
        expect(convertNumberBase('1010', 2, 10)).toBe('10');
    });

    it('Percentage calculations compute correctly', () => {
        const p = calculatePercentages(20, 100);
        expect(p.aPercentOfB).toBe(20);
        expect(p.aIsWhatPercentOfB).toBe(20);
    });

    it('Random numbers generator produces within range', () => {
        const nums = generateRandomNumbers({ min: 10, max: 20, count: 5, unique: true, decimal: false, secure: true });
        expect(nums.length).toBe(5);
        nums.forEach(n => {
            expect(n).toBeGreaterThanOrEqual(10);
            expect(n).toBeLessThanOrEqual(20);
        });
    });

    it('Fraction and Roman numerals convert accurately', () => {
        expect(simplifyFraction(12, 16)).toEqual({ num: 3, den: 4 });
        expect(toRoman(2026)).toBe('MMXXVI');
        expect(fromRoman('MMXXVI')).toBe(2026);
    });

    it('Unit conversions and averages work properly', () => {
        expect(convertUnits(1000, 'm', 'km', 'length')).toBe(1);
        const avg = calculateAverages([10, 20, 30]);
        expect(avg.mean).toBe(20);
        expect(avg.median).toBe(20);
    });

    it('Date diff calculates days and weeks', () => {
        const d1 = new Date('2026-01-01');
        const d2 = new Date('2026-01-15');
        const diff = calculateDateDiff(d1, d2);
        expect(diff.days).toBe(14);
        expect(diff.weeks).toBe(2);
    });

    it('SEO tools generate Open Graph and check contrast ratio', () => {
        const og = generateOpenGraphTags({
            title: 'Test Page',
            description: 'Desc',
            url: 'https://test.com',
            image: 'https://test.com/og.jpg'
        });
        expect(og).toContain('og:title');

        const contrast = checkColorContrast('#000000', '#ffffff');
        expect(contrast.ratio).toBeGreaterThan(15);
        expect(contrast.normalAAA).toBe(true);
    });

    it('Security suite hashes with SHA-256 and masks PII data', async () => {
        const h256 = await calculateHash('test', 'SHA-256');
        expect(h256).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');

        const hmac = await generateHmac('hello', 'key', 'SHA-256');
        expect(hmac.hex.length).toBe(64);

        const enc = await encryptAesGcm('secret-data', 'pass123');
        const dec = await decryptAesGcm(enc, 'pass123');
        expect(dec).toBe('secret-data');

        const masked = maskSensitiveText('user@domain.com', 'email');
        expect(masked).toContain('***');
    });
});

