/**
 * UUID Generator (v1, v4, v5, v7), bulk generator, validator, and export formatters.
 */

export type UuidVersion = 'v1' | 'v4' | 'v5' | 'v7';

export function generateUuidV4(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

export function generateUuidV1(): string {
    const now = Date.now();
    const timeLow = ((now & 0xffffffff) >>> 0).toString(16).padStart(8, '0');
    const timeMid = (((now / 0x100000000) & 0xffff) >>> 0).toString(16).padStart(4, '0');
    const timeHiAndVersion = ((((now / 0x1000000000000) & 0x0fff) | 0x1000) >>> 0).toString(16).padStart(4, '0');
    const clockSeq = ((Math.random() * 0x3fff) | 0x8000).toString(16).padStart(4, '0');
    const node = Array.from({ length: 6 }, () => Math.floor(Math.random() * 256).toString(16).padStart(2, '0')).join('');
    return `${timeLow}-${timeMid}-${timeHiAndVersion}-${clockSeq}-${node}`;
}

export function generateUuidV7(): string {
    const timestamp = Date.now();
    const timeHex = timestamp.toString(16).padStart(12, '0');
    const part1 = timeHex.slice(0, 8);
    const part2 = timeHex.slice(8, 12);

    const randomBytes = new Uint8Array(10);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
        crypto.getRandomValues(randomBytes);
    } else {
        for (let i = 0; i < 10; i++) randomBytes[i] = Math.floor(Math.random() * 256);
    }

    const rand1 = ((randomBytes[0] << 8) | randomBytes[1]) & 0x0fff;
    const part3 = (0x7000 | rand1).toString(16).padStart(4, '0');

    const rand2 = (randomBytes[2] & 0x3f) | 0x80;
    const part4 = (rand2.toString(16).padStart(2, '0')) + (randomBytes[3].toString(16).padStart(2, '0'));

    const part5 = Array.from(randomBytes.slice(4))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');

    return `${part1}-${part2}-${part3}-${part4}-${part5}`;
}

export async function generateUuidV5(name: string, namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'): Promise<string> {
    const enc = new TextEncoder();
    const data = enc.encode(namespace + name);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    
    hashArray[6] = (hashArray[6] & 0x0f) | 0x50; // version 5
    hashArray[8] = (hashArray[8] & 0x3f) | 0x80; // variant

    const hex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
}

export function validateUuid(uuidStr: string): { valid: boolean; version?: number; variant?: string } {
    const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$/i;
    const match = uuidStr.trim().match(pattern);
    if (!match) return { valid: false };
    return {
        valid: true,
        version: parseInt(match[1], 10),
        variant: 'RFC 4122 / DCE 1.1'
    };
}

export function formatUuid(
    uuid: string,
    options: {
        uppercase?: boolean;
        removeHyphens?: boolean;
        prefix?: string;
        suffix?: string;
    } = {}
): string {
    let result = options.removeHyphens ? uuid.replace(/-/g, '') : uuid;
    if (options.uppercase) result = result.toUpperCase();
    else result = result.toLowerCase();
    if (options.prefix) result = `${options.prefix}${result}`;
    if (options.suffix) result = `${result}${options.suffix}`;
    return result;
}

