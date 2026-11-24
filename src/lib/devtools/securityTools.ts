/**
 * Security, Privacy, Cryptography, and Masking Utilities (Client-Side).
 */

// 1. Text & File Hash Generator using Web Crypto
export async function calculateHash(data: string | ArrayBuffer, algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'): Promise<string> {
    const buffer = typeof data === 'string' ? new TextEncoder().encode(data) : data;
    const hashBuffer = await crypto.subtle.digest(algorithm, buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// 2. HMAC Generator
export async function generateHmac(message: string, secret: string, algorithm: 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256'): Promise<{ hex: string; base64: string }> {
    const enc = new TextEncoder();
    const keyData = enc.encode(secret);
    const key = await crypto.subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: { name: algorithm } },
        false,
        ['sign']
    );
    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    const byteArray = new Uint8Array(signature);
    const hex = Array.from(byteArray).map(b => b.toString(16).padStart(2, '0')).join('');
    let binary = '';
    for (let i = 0; i < byteArray.byteLength; i++) {
        binary += String.fromCharCode(byteArray[i]);
    }
    const base64 = btoa(binary);
    return { hex, base64 };
}

// 3. AES-GCM Encrypt & Decrypt
export async function encryptAesGcm(text: string, secretPassword: string): Promise<string> {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(secretPassword), { name: 'PBKDF2' }, false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt']
    );

    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text));

    // Combine salt + iv + encrypted to base64
    const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
    combined.set(salt, 0);
    combined.set(iv, salt.length);
    combined.set(new Uint8Array(encrypted), salt.length + iv.length);

    let binary = '';
    for (let i = 0; i < combined.length; i++) binary += String.fromCharCode(combined[i]);
    return btoa(binary);
}

export async function decryptAesGcm(base64Payload: string, secretPassword: string): Promise<string> {
    const binary = atob(base64Payload.trim());
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    const salt = bytes.slice(0, 16);
    const iv = bytes.slice(16, 28);
    const data = bytes.slice(28);

    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(secretPassword), { name: 'PBKDF2' }, false, ['deriveKey']);
    const key = await crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
    return new TextDecoder().decode(decrypted);
}

// 4. Sensitive Data Masking & Cleaning
export function maskSensitiveText(text: string, type: 'email' | 'phone' | 'creditCard' | 'all'): string {
    let result = text;
    if (type === 'email' || type === 'all') {
        result = result.replace(/([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})/g, (_match, user, domain, tld) => {
            const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : '***';
            return `${maskedUser}@${domain}.${tld}`;
        });
    }
    if (type === 'phone' || type === 'all') {
        result = result.replace(/(\+?\d{1,4}[-.\s]?)?(\d{3,4})[-.\s]?(\d{3,4})[-.\s]?(\d{3,4})/g, (_match, prefix, _p1, _p2, p3) => {
            return `${prefix || ''}***-****-${p3}`;
        });
    }
    if (type === 'creditCard' || type === 'all') {
        result = result.replace(/\b(?:\d[ -]*?){13,16}\b/g, (match) => {
            const digits = match.replace(/\D/g, '');
            return `****-****-****-${digits.slice(-4)}`;
        });
    }
    return result;
}

// 5. Secure Random Token Generator
export function generateSecureToken(length = 32, format: 'hex' | 'base64' | 'urlsafe' = 'hex'): string {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    if (format === 'hex') {
        return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').slice(0, length);
    }
    let binary = '';
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary);
    if (format === 'urlsafe') {
        return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '').slice(0, length);
    }
    return b64.slice(0, length);
}
