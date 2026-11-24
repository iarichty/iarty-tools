import { describe, it, expect } from 'vitest';
import {
    formatJson,
    minifyJson,
    sortJsonKeys,
    getJsonStats,
    jsonToYaml,
    jsonToCsv,
    jsonToTypeScript
} from './jsonTools';
import { validateJsonSyntax, validateJsonSchema } from './jsonValidator';
import { textToBase64, base64ToText, isValidBase64 } from './base64Tools';
import { parseUrl, cleanUrlTracking } from './urlTools';
import { generateUuidV4, generateUuidV7, validateUuid, formatUuid } from './uuidTools';
import { generatePassword, analyzePasswordStrength } from './passwordTools';
import { getTextStats, convertCase, generateSlug, removeDuplicateLines } from './textTools';
import { decodeJwt, hexToRgb, rgbToHex } from './codeTools';

describe('Developer Tools Test Suite', () => {
    it('JSON tools format, minify, sort, and convert properly', () => {
        const sample = '{"b":2,"a":1}';
        expect(formatJson(sample, 2)).toContain('  "b": 2');
        expect(minifyJson(sample)).toBe('{"b":2,"a":1}');

        const sorted = sortJsonKeys(JSON.parse(sample), 'asc');
        expect(Object.keys(sorted)).toEqual(['a', 'b']);

        const stats = getJsonStats(sample);
        expect(stats.keysCount).toBe(2);
        expect(stats.characters).toBe(sample.length);

        const yaml = jsonToYaml({ name: 'test', count: 5 });
        expect(yaml).toContain('name: test');

        const csv = jsonToCsv([{ a: 1, b: 'foo' }]);
        expect(csv).toContain('a,b');

        const ts = jsonToTypeScript({ id: '123', active: true });
        expect(ts).toContain('id: string');
    });

    it('JSON validator catches syntax errors and schema issues', () => {
        const valid = validateJsonSyntax('{"ok": true}');
        expect(valid.isValid).toBe(true);

        const invalid = validateJsonSyntax('{"broken": true, }');
        expect(invalid.isValid).toBe(false);
        expect(invalid.errors.length).toBeGreaterThan(0);

        const schemaCheck = validateJsonSchema({ num: 'not-a-number' }, {
            type: 'object',
            properties: { num: { type: 'number' } },
            required: ['num']
        });
        expect(schemaCheck.isValid).toBe(false);
    });

    it('Base64 tools handle UTF-8 and validation correctly', () => {
        const str = 'IARTY Tools 🚀';
        const b64 = textToBase64(str);
        expect(isValidBase64(b64)).toBe(true);
        expect(base64ToText(b64)).toBe(str);
    });

    it('URL tools parse and clean UTM tracking correctly', () => {
        const url = 'https://iarty.biz.id/tools?utm_source=fb&q=hello#top';
        const parsed = parseUrl(url);
        expect(parsed.hostname).toBe('iarty.biz.id');
        expect(parsed.params.length).toBe(2);

        const cleaned = cleanUrlTracking(url);
        expect(cleaned).not.toContain('utm_source');
        expect(cleaned).toContain('q=hello');
    });

    it('UUID tools generate and validate v4 and v7 properly', () => {
        const v4 = generateUuidV4();
        expect(validateUuid(v4).valid).toBe(true);

        const v7 = generateUuidV7();
        expect(validateUuid(v7).valid).toBe(true);

        const formatted = formatUuid(v4, { uppercase: true, removeHyphens: true });
        expect(formatted).not.toContain('-');
        expect(formatted).toBe(formatted.toUpperCase());
    });

    it('Password generator and strength analyzer calculate correctly', () => {
        const pass = generatePassword({
            length: 16,
            uppercase: true,
            lowercase: true,
            numbers: true,
            symbols: true,
            excludeSimilar: false,
            excludeAmbiguous: false,
            startWithLetter: true,
            requireNumber: true,
            requireSymbol: true,
            noRepeating: false
        });
        expect(pass.length).toBe(16);

        const strength = analyzePasswordStrength(pass);
        expect(strength.score).toBeGreaterThanOrEqual(2);
    });

    it('Text suite calculates statistics, converts cases, and generates slugs', () => {
        const text = 'Quick brown fox';
        const stats = getTextStats(text);
        expect(stats.words).toBe(3);

        expect(convertCase('hello_world', 'pascal')).toBe('HelloWorld');
        expect(convertCase('hello_world', 'kebab')).toBe('hello-world');
        expect(generateSlug('Hello World 2026!')).toBe('hello-world-2026');

        const deduped = removeDuplicateLines('a\nb\na\nc');
        expect(deduped.split('\n')).toEqual(['a', 'b', 'c']);
    });

    it('Code & JWT tools decode claims and convert color values', () => {
        const rgb = hexToRgb('#ff0000');
        expect(rgb).toEqual({ r: 255, g: 0, b: 0 });
        expect(rgbToHex(255, 0, 0)).toBe('#ff0000');

        const jwt = decodeJwt('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature');
        expect(jwt.valid).toBe(true);
        expect(jwt.payload.sub).toBe('123');
    });
});

