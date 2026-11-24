/**
 * Web, SEO & Accessibility Utilities.
 */

export function generateOpenGraphTags(data: {
    title: string;
    description: string;
    url: string;
    image: string;
    type?: string;
    twitterCard?: string;
}): string {
    const lines = [
        `<!-- Primary Meta Tags -->`,
        `<title>${data.title}</title>`,
        `<meta name="title" content="${data.title}">`,
        `<meta name="description" content="${data.description}">`,
        ``,
        `<!-- Open Graph / Facebook -->`,
        `<meta property="og:type" content="${data.type || 'website'}">`,
        `<meta property="og:url" content="${data.url}">`,
        `<meta property="og:title" content="${data.title}">`,
        `<meta property="og:description" content="${data.description}">`,
        `<meta property="og:image" content="${data.image}">`,
        ``,
        `<!-- Twitter -->`,
        `<meta property="twitter:card" content="${data.twitterCard || 'summary_large_image'}">`,
        `<meta property="twitter:url" content="${data.url}">`,
        `<meta property="twitter:title" content="${data.title}">`,
        `<meta property="twitter:description" content="${data.description}">`,
        `<meta property="twitter:image" content="${data.image}">`
    ];
    return lines.join('\n');
}

export function generateSitemapXml(urls: Array<{ loc: string; lastmod?: string; changefreq?: string; priority?: number }>): string {
    const items = urls.map(u => {
        return `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ''}${u.changefreq ? `\n    <changefreq>${u.changefreq}</changefreq>` : ''}${u.priority !== undefined ? `\n    <priority>${u.priority.toFixed(1)}</priority>` : ''}\n  </url>`;
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

export function generateRobotsTxt(rules: {
    userAgent?: string;
    allow?: string[];
    disallow?: string[];
    sitemapUrl?: string;
    crawlDelay?: number;
}): string {
    const lines: string[] = [
        `User-agent: ${rules.userAgent || '*'}`,
    ];
    if (rules.crawlDelay) lines.push(`Crawl-delay: ${rules.crawlDelay}`);
    (rules.allow || ['/']).forEach(p => lines.push(`Allow: ${p}`));
    (rules.disallow || []).forEach(p => lines.push(`Disallow: ${p}`));
    if (rules.sitemapUrl) lines.push(`\nSitemap: ${rules.sitemapUrl}`);
    return lines.join('\n');
}

export function checkColorContrast(fgHex: string, bgHex: string): {
    ratio: number;
    normalAA: boolean;
    normalAAA: boolean;
    largeAA: boolean;
    largeAAA: boolean;
} {
    const getLuminance = (hex: string): number => {
        const clean = hex.replace('#', '');
        const r = parseInt(clean.slice(0, 2), 16) / 255;
        const g = parseInt(clean.slice(2, 4), 16) / 255;
        const b = parseInt(clean.slice(4, 6), 16) / 255;
        const a = [r, g, b].map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    };

    const l1 = getLuminance(fgHex);
    const l2 = getLuminance(bgHex);
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const ratio = parseFloat(((brightest + 0.05) / (darkest + 0.05)).toFixed(2));

    return {
        ratio,
        normalAA: ratio >= 4.5,
        normalAAA: ratio >= 7.0,
        largeAA: ratio >= 3.0,
        largeAAA: ratio >= 4.5
    };
}

