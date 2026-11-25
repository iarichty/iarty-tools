/**
 * Text and string utilities: counters, case converters, slug generator, diff, and deduplication.
 */

export interface TextStats {
    characters: number;
    charactersNoSpaces: number;
    words: number;
    sentences: number;
    paragraphs: number;
    lines: number;
    bytes: number;
    readingTimeMinutes: number;
}

export function getTextStats(text: string): TextStats {
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const words = (text.trim().match(/\S+/g) || []).length;
    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (text.trim() ? 1 : 0);
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (text.trim() ? 1 : 0);
    const lines = text ? text.split('\n').length : 0;
    const bytes = new Blob([text]).size;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return {
        characters,
        charactersNoSpaces,
        words,
        sentences,
        paragraphs,
        lines,
        bytes,
        readingTimeMinutes
    };
}

export function convertCase(
    text: string,
    type: 'upper' | 'lower' | 'title' | 'sentence' | 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'toggle'
): string {
    if (!text) return '';

    const words = text
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/[_-]+/g, ' ')
        .trim()
        .split(/\s+/);

    switch (type) {
        case 'upper':
            return text.toUpperCase();
        case 'lower':
            return text.toLowerCase();
        case 'title':
            return text.replace(/\b\w+/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        case 'sentence':
            return text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase());
        case 'camel':
            return words
                .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
                .join('');
        case 'pascal':
            return words
                .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                .join('');
        case 'snake':
            return words.map(w => w.toLowerCase()).join('_');
        case 'kebab':
            return words.map(w => w.toLowerCase()).join('-');
        case 'constant':
            return words.map(w => w.toUpperCase()).join('_');
        case 'toggle':
            return text
                .split('')
                .map(c => (c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()))
                .join('');
    }
}

export function generateSlug(text: string, separator = '-'): string {
    return text
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 ]/g, '')
        .replace(/\s+/g, separator);
}

export function removeDuplicateLines(text: string, caseSensitive = false, trim = true): string {
    const lines = text.split('\n');
    const seen = new Set<string>();
    const result: string[] = [];

    for (const rawLine of lines) {
        const line = trim ? rawLine.trim() : rawLine;
        const key = caseSensitive ? line : line.toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            result.push(rawLine);
        }
    }

    return result.join('\n');
}

export interface DiffLine {
    type: 'added' | 'removed' | 'unchanged';
    text: string;
    lineNumA?: number;
    lineNumB?: number;
}

export function computeSimpleDiff(textA: string, textB: string): DiffLine[] {
    const linesA = textA.split('\n');
    const linesB = textB.split('\n');
    const result: DiffLine[] = [];

    let i = 0;
    let j = 0;

    while (i < linesA.length || j < linesB.length) {
        if (i < linesA.length && j < linesB.length && linesA[i] === linesB[j]) {
            result.push({ type: 'unchanged', text: linesA[i], lineNumA: i + 1, lineNumB: j + 1 });
            i++;
            j++;
        } else if (j < linesB.length && !linesA.includes(linesB[j])) {
            result.push({ type: 'added', text: linesB[j], lineNumB: j + 1 });
            j++;
        } else if (i < linesA.length && !linesB.includes(linesA[i])) {
            result.push({ type: 'removed', text: linesA[i], lineNumA: i + 1 });
            i++;
        } else {
            if (i < linesA.length) {
                result.push({ type: 'removed', text: linesA[i], lineNumA: i + 1 });
                i++;
            }
            if (j < linesB.length) {
                result.push({ type: 'added', text: linesB[j], lineNumB: j + 1 });
                j++;
            }
        }
    }

    return result;
}

