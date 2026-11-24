/**
 * Base64 Encoder / Decoder with URL-safe, UTF-8, Data URI, and file handling.
 */

export function textToBase64(text: string, urlSafe = false): string {
    const bytes = new TextEncoder().encode(text);
    let binary = '';
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    let b64 = btoa(binary);
    if (urlSafe) {
        b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return b64;
}

export function base64ToText(b64: string): string {
    let clean = b64.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (clean.length % 4 !== 0) {
        clean += '=';
    }
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
}

export function isValidBase64(str: string): boolean {
    const clean = str.trim().replace(/-/g, '+').replace(/_/g, '/');
    if (!clean) return false;
    const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    if (!base64Regex.test(clean)) return false;
    try {
        return atob(clean).length > 0;
    } catch {
        return false;
    }
}

export function parseDataUri(uri: string): { mimeType: string; isBase64: boolean; data: string } | null {
    const match = uri.trim().match(/^data:([^;,]+)?(;base64)?,(.*)$/);
    if (!match) return null;
    return {
        mimeType: match[1] || 'text/plain',
        isBase64: Boolean(match[2]),
        data: match[3] || ''
    };
}

export function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

