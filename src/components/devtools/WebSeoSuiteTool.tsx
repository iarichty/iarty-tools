import React, { useState } from 'react';
import { ToolCard, CopyButton, DownloadButton } from '@/components/devtools/ToolCard';
import {
    generateOpenGraphTags,
    generateSitemapXml,
    generateRobotsTxt,
    checkColorContrast
} from '@/lib/devtools/seoTools';
import { FiSearch } from 'react-icons/fi';

export const WebSeoSuiteTool: React.FC = () => {
    const [subTab, setSubTab] = useState<'og' | 'serp' | 'sitemap' | 'robots' | 'contrast'>('og');

    // OG State
    const [ogTitle, setOgTitle] = useState('My Awesome Web Application');
    const [ogDesc, setOgDesc] = useState('Build privacy-first utilities for your audience.');
    const [ogUrl, setOgUrl] = useState('https://tools.iarty.biz.id');
    const [ogImage, setOgImage] = useState('https://tools.iarty.biz.id/og-image.jpg');

    // Contrast
    const [fgColor, setFgColor] = useState('#2563eb');
    const [bgColor, setBgColor] = useState('#ffffff');

    // Robots
    const [robotsDisallow, setRobotsDisallow] = useState('/admin\n/private');

    const generatedOg = generateOpenGraphTags({
        title: ogTitle,
        description: ogDesc,
        url: ogUrl,
        image: ogImage
    });

    const contrast = checkColorContrast(fgColor, bgColor);

    return (
        <ToolCard
            title="Web & SEO Tools Suite"
            description="Open Graph generator, SERP snippet preview, XML sitemap creator, robots.txt builder, and WCAG color contrast validator."
            icon={<FiSearch className="w-5 h-5" />}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['og', 'serp', 'sitemap', 'robots', 'contrast'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            subTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab === 'og' ? 'Open Graph & Social' : tab === 'serp' ? 'SERP Preview' : tab}
                    </button>
                ))}
            </div>

            {/* OPEN GRAPH */}
            {subTab === 'og' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <input
                            type="text"
                            value={ogTitle}
                            onChange={(e) => setOgTitle(e.target.value)}
                            placeholder="Title"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                        <input
                            type="text"
                            value={ogUrl}
                            onChange={(e) => setOgUrl(e.target.value)}
                            placeholder="URL"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                        <input
                            type="text"
                            value={ogImage}
                            onChange={(e) => setOgImage(e.target.value)}
                            placeholder="Image URL"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                        <input
                            type="text"
                            value={ogDesc}
                            onChange={(e) => setOgDesc(e.target.value)}
                            placeholder="Description"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Generated Meta Tags:</span>
                        <CopyButton text={generatedOg} />
                    </div>
                    <textarea
                        value={generatedOg}
                        readOnly
                        rows={8}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                    />
                </div>
            )}

            {/* SERP PREVIEW */}
            {subTab === 'serp' && (
                <div>
                    <div className="space-y-3 mb-6">
                        <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>SEO Title ({ogTitle.length} chars)</span>
                                <span>Ideal: 50-60 chars</span>
                            </div>
                            <input
                                type="text"
                                value={ogTitle}
                                onChange={(e) => setOgTitle(e.target.value)}
                                className="w-full p-2 text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Meta Description ({ogDesc.length} chars)</span>
                                <span>Ideal: 120-160 chars</span>
                            </div>
                            <textarea
                                value={ogDesc}
                                onChange={(e) => setOgDesc(e.target.value)}
                                rows={2}
                                className="w-full p-2 text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>

                    <div className="p-4 bg-white dark:bg-[#1a1a1a] border border-black/10 dark:border-white/10 rounded-2xl max-w-xl">
                        <span className="text-[11px] text-gray-600 dark:text-gray-400 block truncate">{ogUrl}</span>
                        <h3 className="text-base font-medium text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate">
                            {ogTitle}
                        </h3>
                        <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2 leading-relaxed">
                            {ogDesc}
                        </p>
                    </div>
                </div>
            )}

            {/* SITEMAP */}
            {subTab === 'sitemap' && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase">Sitemap XML Output:</span>
                        <DownloadButton
                            filename="sitemap.xml"
                            content={generateSitemapXml([{ loc: ogUrl, priority: 1.0, changefreq: 'daily' }])}
                            mimeType="application/xml"
                        />
                    </div>
                    <textarea
                        value={generateSitemapXml([{ loc: ogUrl, priority: 1.0, changefreq: 'daily' }])}
                        readOnly
                        rows={8}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                    />
                </div>
            )}

            {/* ROBOTS */}
            {subTab === 'robots' && (
                <div>
                    <div className="mb-3">
                        <label className="block text-xs font-bold text-gray-500 mb-1">Disallow Paths (one per line)</label>
                        <textarea
                            value={robotsDisallow}
                            onChange={(e) => setRobotsDisallow(e.target.value)}
                            rows={3}
                            className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                    </div>
                    {(() => {
                        const content = generateRobotsTxt({
                            disallow: robotsDisallow.split('\n').filter(Boolean),
                            sitemapUrl: `${ogUrl}/sitemap.xml`
                        });
                        return (
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase">robots.txt Preview:</span>
                                    <DownloadButton filename="robots.txt" content={content} />
                                </div>
                                <textarea
                                    value={content}
                                    readOnly
                                    rows={6}
                                    className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                                />
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* CONTRAST */}
            {subTab === 'contrast' && (
                <div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Foreground Color</label>
                            <input
                                type="color"
                                value={fgColor}
                                onChange={(e) => setFgColor(e.target.value)}
                                className="w-full h-10 rounded-xl cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Background Color</label>
                            <input
                                type="color"
                                value={bgColor}
                                onChange={(e) => setBgColor(e.target.value)}
                                className="w-full h-10 rounded-xl cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="p-4 rounded-2xl mb-4 text-center font-bold" style={{ backgroundColor: bgColor, color: fgColor }}>
                        Sample Preview Text (Contrast: {contrast.ratio}:1)
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                        <div className={`p-3 rounded-xl font-bold ${contrast.normalAA ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            Normal Text AA: {contrast.normalAA ? 'PASS ✅' : 'FAIL ❌'}
                        </div>
                        <div className={`p-3 rounded-xl font-bold ${contrast.normalAAA ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            Normal Text AAA: {contrast.normalAAA ? 'PASS ✅' : 'FAIL ❌'}
                        </div>
                        <div className={`p-3 rounded-xl font-bold ${contrast.largeAA ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            Large Text AA: {contrast.largeAA ? 'PASS ✅' : 'FAIL ❌'}
                        </div>
                        <div className={`p-3 rounded-xl font-bold ${contrast.largeAAA ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            Large Text AAA: {contrast.largeAAA ? 'PASS ✅' : 'FAIL ❌'}
                        </div>
                    </div>
                </div>
            )}
        </ToolCard>
    );
};

