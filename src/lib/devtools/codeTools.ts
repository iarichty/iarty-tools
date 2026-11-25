/**
 * Developer utility helpers: JWT Decoder, Timestamp Converter, Color Converter, and Code Formatters.
 */

export interface DecodedJwt {
    valid: boolean;
    header: unknown;
    payload: unknown;
    signature: string;
    isExpired?: boolean;
    expiresAt?: string;
    issuedAt?: string;
}

export function decodeJwt(token: string): DecodedJwt {
    try {
        const parts = token.trim().split('.');
        if (parts.length !== 3) {
            return { valid: false, header: null, payload: null, signature: '' };
        }

        const decodeB64Url = (str: string) => {
            let clean = str.replace(/-/g, '+').replace(/_/g, '/');
            while (clean.length % 4 !== 0) clean += '=';
            return JSON.parse(decodeURIComponent(escape(atob(clean))));
        };

        const header = decodeB64Url(parts[0]);
        const payload = decodeB64Url(parts[1]);
        const signature = parts[2];

        let isExpired: boolean | undefined;
        let expiresAt: string | undefined;
        let issuedAt: string | undefined;

        if (payload.exp) {
            const expDate = new Date(payload.exp * 1000);
            expiresAt = expDate.toISOString();
            isExpired = Date.now() >= payload.exp * 1000;
        }

        if (payload.iat) {
            issuedAt = new Date(payload.iat * 1000).toISOString();
        }

        return {
            valid: true,
            header,
            payload,
            signature,
            isExpired,
            expiresAt,
            issuedAt
        };
    } catch {
        return { valid: false, header: null, payload: null, signature: '' };
    }
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
    let clean = hex.trim().replace(/^#/, '');
    if (clean.length === 3) {
        clean = clean.split('').map(c => c + c).join('');
    }
    if (clean.length !== 6) return null;
    const num = parseInt(clean, 16);
    if (isNaN(num)) return null;
    return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
    };
}

export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100)
    };
}

export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    h /= 360;
    s /= 100;
    l /= 100;
    let r = l;
    let g = l;
    let b = l;

    if (s !== 0) {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

export function formatSql(sql: string): string {
    const keywords = [
        'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'JOIN',
        'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'UNION', 'INSERT INTO',
        'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'AND', 'OR', 'ON', 'AS'
    ];

    let formatted = sql.replace(/\s+/g, ' ').trim();
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(regex, () => {
            if (['AND', 'OR', 'ON', 'AS'].includes(kw)) {
                return `\n    ${kw}`;
            }
            return `\n${kw}`;
        });
    });

    return formatted.trim();
}

export function formatHtml(html: string): string {
    let formatted = '';
    let indent = 0;
    const tab = '  ';

    html.split(/>\s*</).forEach(element => {
        if (element.match(/^\/\w/)) {
            indent = Math.max(0, indent - 1);
        }

        formatted += tab.repeat(indent) + '<' + element + '>\n';

        if (element.match(/^<?\w[^>]*[^/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br') && !element.startsWith('hr')) {
            indent++;
        }
    });

    return formatted.substring(1, formatted.length - 2).trim();
}
