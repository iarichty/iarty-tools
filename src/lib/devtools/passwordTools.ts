/**
 * Password generator, strength analyzer, entropy calculation, crack time estimation.
 */

export interface PasswordConfig {
    length: number;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    symbols: boolean;
    excludeSimilar: boolean;
    excludeAmbiguous: boolean;
    startWithLetter: boolean;
    requireNumber: boolean;
    requireSymbol: boolean;
    noRepeating: boolean;
}

export interface PasswordStrength {
    score: number; // 0 to 4
    label: 'Weak' | 'Fair' | 'Good' | 'Strong' | 'Very Strong';
    entropy: number;
    crackTime: string;
    suggestions: string[];
}

const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
const SIMILAR_CHARS = 'il1Lo0O';
const AMBIGUOUS_CHARS = '{}[]()/\\\'"`~,;:.<>';

export function generatePassword(config: PasswordConfig): string {
    let pool = '';
    if (config.uppercase) pool += UPPERCASE_CHARS;
    if (config.lowercase) pool += LOWERCASE_CHARS;
    if (config.numbers) pool += NUMBER_CHARS;
    if (config.symbols) pool += SYMBOL_CHARS;

    if (config.excludeSimilar) {
        pool = pool.split('').filter(c => !SIMILAR_CHARS.includes(c)).join('');
    }
    if (config.excludeAmbiguous) {
        pool = pool.split('').filter(c => !AMBIGUOUS_CHARS.includes(c)).join('');
    }

    if (!pool) pool = LOWERCASE_CHARS + NUMBER_CHARS;

    const length = Math.max(4, Math.min(256, config.length));
    let result = '';

    for (let i = 0; i < length; i++) {
        let char = '';
        if (i === 0 && config.startWithLetter) {
            const letterPool = pool.split('').filter(c => /[a-zA-Z]/.test(c)).join('') || 'a';
            char = letterPool[Math.floor(Math.random() * letterPool.length)];
        } else {
            char = pool[Math.floor(Math.random() * pool.length)];
        }

        if (config.noRepeating && result.includes(char) && pool.length > result.length) {
            i--;
            continue;
        }
        result += char;
    }

    return result;
}

const PASSPHRASE_WORDS = [
    'apple', 'river', 'galaxy', 'silent', 'ocean', 'breeze', 'shadow', 'timber',
    'mountain', 'crystal', 'winter', 'summer', 'thunder', 'whisper', 'forest',
    'beacon', 'harbor', 'island', 'valley', 'meadow', 'falcon', 'comet', 'planet',
    'cosmic', 'orbit', 'matrix', 'circuit', 'quantum', 'cipher', 'vector'
];

export function generatePassphrase(wordCount = 4, separator = '-'): string {
    const words: string[] = [];
    for (let i = 0; i < wordCount; i++) {
        words.push(PASSPHRASE_WORDS[Math.floor(Math.random() * PASSPHRASE_WORDS.length)]);
    }
    return words.join(separator);
}

export function generatePin(length = 6): string {
    let pin = '';
    for (let i = 0; i < length; i++) {
        pin += Math.floor(Math.random() * 10).toString();
    }
    return pin;
}

export function analyzePasswordStrength(password: string): PasswordStrength {
    if (!password) {
        return {
            score: 0,
            label: 'Weak',
            entropy: 0,
            crackTime: 'Instant',
            suggestions: ['Password is empty']
        };
    }

    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    const entropy = Math.round(password.length * Math.log2(poolSize || 1));
    const suggestions: string[] = [];

    if (password.length < 8) suggestions.push('Make password at least 8 characters long');
    if (!/[A-Z]/.test(password)) suggestions.push('Add uppercase letters');
    if (!/[0-9]/.test(password)) suggestions.push('Add numbers');
    if (!/[^a-zA-Z0-9]/.test(password)) suggestions.push('Add special symbols');

    let score = 0;
    let label: PasswordStrength['label'] = 'Weak';
    let crackTime = 'Few seconds';

    if (entropy < 28) {
        score = 0;
        label = 'Weak';
        crackTime = 'Instant';
    } else if (entropy < 40) {
        score = 1;
        label = 'Fair';
        crackTime = 'Minutes to hours';
    } else if (entropy < 60) {
        score = 2;
        label = 'Good';
        crackTime = 'Days to months';
    } else if (entropy < 80) {
        score = 3;
        label = 'Strong';
        crackTime = 'Years';
    } else {
        score = 4;
        label = 'Very Strong';
        crackTime = 'Centuries';
    }

    return { score, label, entropy, crackTime, suggestions };
}

