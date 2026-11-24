/**
 * URL Encoder / Decoder, Query Parameter Editor, and URL Cleaner.
 */

export interface ParsedUrl {
    valid: boolean;
    protocol: string;
    host: string;
    hostname: string;
    port: string;
    pathname: string;
    search: string;
    hash: string;
    params: Array<{ key: string; value: string }>;
    length: number;
}

export function parseUrl(rawUrl: string): ParsedUrl {
    try {
        let input = rawUrl.trim();
        if (!/^https?:\/\//i.test(input) && !input.startsWith('/')) {
            input = `https://${input}`;
        }
        const parsed = new URL(input, 'https://example.com');
        const params: Array<{ key: string; value: string }> = [];
        parsed.searchParams.forEach((value, key) => {
            params.push({ key, value });
        });

        return {
            valid: true,
            protocol: parsed.protocol,
            host: parsed.host,
            hostname: parsed.hostname,
            port: parsed.port,
            pathname: parsed.pathname,
            search: parsed.search,
            hash: parsed.hash,
            params,
            length: rawUrl.length
        };
    } catch {
        return {
            valid: false,
            protocol: '',
            host: '',
            hostname: '',
            port: '',
            pathname: '',
            search: '',
            hash: '',
            params: [],
            length: rawUrl.length
        };
    }
}

const TRACKING_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
    'fbclid', 'gclid', 'gclsrc', 'dclid', 'zanpid', 'msclkid', 'mc_cid', 'mc_eid',
    '_ga', '_gl', 'yclid', 'ttclid'
];

export function cleanUrlTracking(rawUrl: string, removeAllTracking = true): string {
    try {
        const url = new URL(rawUrl.trim());
        if (removeAllTracking) {
            TRACKING_PARAMS.forEach(p => url.searchParams.delete(p));
        }
        return url.toString();
    } catch {
        return rawUrl;
    }
}

export function buildUrl(base: string, params: Array<{ key: string; value: string }>, hash = ''): string {
    try {
        let input = base.trim();
        if (!/^https?:\/\//i.test(input)) input = `https://${input}`;
        const url = new URL(input);
        url.search = '';
        params.forEach(p => {
            if (p.key.trim()) {
                url.searchParams.append(p.key.trim(), p.value);
            }
        });
        if (hash) {
            url.hash = hash.startsWith('#') ? hash : `#${hash}`;
        }
        return url.toString();
    } catch {
        return base;
    }
}

