/**
 * JSON Utilities: formatting, minifying, tree view, YAML/XML/CSV/TS conversions, statistics.
 */

export interface JsonStats {
    characters: number;
    sizeFormatted: string;
    objectCount: number;
    arrayCount: number;
    keysCount: number;
    depth: number;
}

export function formatJson(jsonStr: string, indent: 2 | 4 | '\t' = 2): string {
    const parsed = JSON.parse(jsonStr);
    return JSON.stringify(parsed, null, indent);
}

export function minifyJson(jsonStr: string): string {
    const parsed = JSON.parse(jsonStr);
    return JSON.stringify(parsed);
}

export function sortJsonKeys(obj: any, direction: 'asc' | 'desc' = 'asc'): any {
    if (Array.isArray(obj)) {
        return obj.map(item => sortJsonKeys(item, direction));
    }
    if (obj !== null && typeof obj === 'object') {
        const keys = Object.keys(obj).sort((a, b) => {
            return direction === 'asc' ? a.localeCompare(b) : b.localeCompare(a);
        });
        const sorted: Record<string, any> = {};
        for (const k of keys) {
            sorted[k] = sortJsonKeys(obj[k], direction);
        }
        return sorted;
    }
    return obj;
}

export function escapeJsonString(str: string): string {
    return JSON.stringify(str).slice(1, -1);
}

export function unescapeJsonString(str: string): string {
    try {
        return JSON.parse(`"${str}"`);
    } catch {
        return str
            .replace(/\\n/g, '\n')
            .replace(/\\r/g, '\r')
            .replace(/\\t/g, '\t')
            .replace(/\\"/g, '"')
            .replace(/\\\\/g, '\\');
    }
}

export function getJsonStats(rawJson: string, parsed?: any): JsonStats {
    let data = parsed;
    if (data === undefined) {
        try {
            data = JSON.parse(rawJson);
        } catch {
            data = null;
        }
    }

    const characters = rawJson.length;
    const bytes = new Blob([rawJson]).size;
    let sizeFormatted = `${bytes} B`;
    if (bytes >= 1024 * 1024) {
        sizeFormatted = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    } else if (bytes >= 1024) {
        sizeFormatted = `${(bytes / 1024).toFixed(2)} KB`;
    }

    let objectCount = 0;
    let arrayCount = 0;
    let keysCount = 0;
    let maxDepth = 0;

    function traverse(node: any, currentDepth: number) {
        if (currentDepth > maxDepth) maxDepth = currentDepth;
        if (Array.isArray(node)) {
            arrayCount++;
            for (const item of node) {
                traverse(item, currentDepth + 1);
            }
        } else if (node !== null && typeof node === 'object') {
            objectCount++;
            const keys = Object.keys(node);
            keysCount += keys.length;
            for (const k of keys) {
                traverse(node[k], currentDepth + 1);
            }
        }
    }

    if (data !== null && data !== undefined) {
        traverse(data, 1);
    }

    return {
        characters,
        sizeFormatted,
        objectCount,
        arrayCount,
        keysCount,
        depth: maxDepth
    };
}

export function jsonToYaml(obj: any, indentLevel = 0): string {
    const pad = '  '.repeat(indentLevel);
    if (obj === null) return 'null\n';
    if (typeof obj === 'boolean' || typeof obj === 'number') return `${obj}\n`;
    if (typeof obj === 'string') {
        if (obj.includes('\n') || /[:#\[\]{},&*?|<>=!%@`]/.test(obj)) {
            return JSON.stringify(obj) + '\n';
        }
        return `${obj}\n`;
    }
    if (Array.isArray(obj)) {
        if (obj.length === 0) return '[]\n';
        let res = '';
        for (const item of obj) {
            if (typeof item === 'object' && item !== null) {
                const sub = jsonToYaml(item, indentLevel + 1);
                const trimmed = sub.trimStart();
                res += `${pad}- ${trimmed}`;
            } else {
                res += `${pad}- ${jsonToYaml(item, 0)}`;
            }
        }
        return res;
    }
    if (typeof obj === 'object') {
        const keys = Object.keys(obj);
        if (keys.length === 0) return '{}\n';
        let res = '';
        for (const key of keys) {
            const val = obj[key];
            if (typeof val === 'object' && val !== null) {
                res += `${pad}${key}:\n${jsonToYaml(val, indentLevel + 1)}`;
            } else {
                res += `${pad}${key}: ${jsonToYaml(val, 0)}`;
            }
        }
        return res;
    }
    return String(obj) + '\n';
}

export function jsonToXml(obj: any, rootName = 'root'): string {
    function toXml(val: any, name: string): string {
        const safeName = name.replace(/[^a-zA-Z0-9_\-]/g, '_') || 'item';
        if (val === null || val === undefined) {
            return `<${safeName}/>`;
        }
        if (Array.isArray(val)) {
            return val.map(item => toXml(item, safeName)).join('');
        }
        if (typeof val === 'object') {
            const inner = Object.keys(val).map(k => toXml(val[k], k)).join('');
            return `<${safeName}>${inner}</${safeName}>`;
        }
        const text = String(val)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
        return `<${safeName}>${text}</${safeName}>`;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>\n${toXml(obj, rootName)}`;
}

export function jsonToCsv(data: any): string {
    let rows: any[] = [];
    if (Array.isArray(data)) {
        rows = data;
    } else if (typeof data === 'object' && data !== null) {
        rows = [data];
    } else {
        return String(data);
    }

    if (rows.length === 0) return '';

    const headersSet = new Set<string>();
    rows.forEach(row => {
        if (row && typeof row === 'object') {
            Object.keys(row).forEach(k => headersSet.add(k));
        }
    });

    const headers = Array.from(headersSet);
    const escapeCsv = (val: any): string => {
        if (val === null || val === undefined) return '';
        const s = typeof val === 'object' ? JSON.stringify(val) : String(val);
        if (s.includes(',') || s.includes('"') || s.includes('\n')) {
            return `"${s.replace(/"/g, '""')}"`;
        }
        return s;
    };

    const headerLine = headers.map(escapeCsv).join(',');
    const dataLines = rows.map(row => {
        if (!row || typeof row !== 'object') return escapeCsv(row);
        return headers.map(h => escapeCsv(row[h])).join(',');
    });

    return [headerLine, ...dataLines].join('\n');
}

export function jsonToTypeScript(obj: any, rootName = 'RootObject'): string {
    const interfaces: string[] = [];

    function generate(data: any, name: string): string {
        if (data === null || data === undefined) return 'any';
        if (Array.isArray(data)) {
            if (data.length === 0) return 'any[]';
            const innerType = generate(data[0], `${name}Item`);
            return `${innerType}[]`;
        }
        if (typeof data === 'object') {
            const props: string[] = [];
            for (const [key, val] of Object.entries(data)) {
                const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
                const subInterfaceName = `${name}_${key.charAt(0).toUpperCase() + key.slice(1)}`;
                const typeName = generate(val, subInterfaceName);
                props.push(`    ${safeKey}: ${typeName};`);
            }
            const iface = `export interface ${name} {\n${props.join('\n')}\n}`;
            interfaces.push(iface);
            return name;
        }
        return typeof data;
    }

    generate(obj, rootName);
    return interfaces.join('\n\n');
}

