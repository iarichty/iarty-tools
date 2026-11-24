import { useState, useMemo } from 'react';
import HelmetContainer from '@/components/HelmetContainer';
import { JsonFormatterTool } from '@/components/devtools/JsonFormatterTool';
import { JsonValidatorTool } from '@/components/devtools/JsonValidatorTool';
import { Base64Tool } from '@/components/devtools/Base64Tool';
import { UrlEncoderTool } from '@/components/devtools/UrlEncoderTool';
import { UuidGeneratorTool } from '@/components/devtools/UuidGeneratorTool';
import { QrCodeTool } from '@/components/devtools/QrCodeTool';
import { PasswordGeneratorTool } from '@/components/devtools/PasswordGeneratorTool';
import { TextSuiteTool } from '@/components/devtools/TextSuiteTool';
import { DevUtilitiesSuiteTool } from '@/components/devtools/DevUtilitiesSuiteTool';
import { MathSuiteTool } from '@/components/devtools/MathSuiteTool';
import { WebSeoSuiteTool } from '@/components/devtools/WebSeoSuiteTool';
import { SecuritySuiteTool } from '@/components/devtools/SecuritySuiteTool';
import { CssEverydaySuiteTool } from '@/components/devtools/CssEverydaySuiteTool';
import {
    FiCode,
    FiCheckSquare,
    FiFileText,
    FiLink,
    FiLayers,
    FiGrid,
    FiLock,
    FiType,
    FiCpu,
    FiPercent,
    FiSearch,
    FiShield,
    FiLayout,
    FiStar,
    FiCompass,
    FiX
} from 'react-icons/fi';

type ActiveTab =
    | 'json-formatter'
    | 'json-validator'
    | 'base64'
    | 'url'
    | 'uuid'
    | 'qr'
    | 'password'
    | 'text'
    | 'dev'
    | 'math'
    | 'seo'
    | 'security'
    | 'css';

type Category = 'all' | 'developer' | 'format' | 'security' | 'math' | 'web';

interface ToolItem {
    id: ActiveTab;
    name: string;
    category: Category;
    description: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
}

const TOOLS_LIST: ToolItem[] = [
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        category: 'format',
        description: 'Beautify, minify, sort keys, YAML/XML/CSV/TS converter',
        badge: 'Popular',
        icon: FiCode
    },
    {
        id: 'json-validator',
        name: 'JSON Validator',
        category: 'format',
        description: 'Detailed syntax error diagnostics & JSON schema validation',
        icon: FiCheckSquare
    },
    {
        id: 'base64',
        name: 'Base64 Tool',
        category: 'format',
        description: 'Encode/decode text, images, files & URL-safe Base64',
        icon: FiFileText
    },
    {
        id: 'url',
        name: 'URL Tool',
        category: 'web',
        description: 'Encode, decode, parse components & strip UTM tracking',
        icon: FiLink
    },
    {
        id: 'uuid',
        name: 'UUID Generator',
        category: 'developer',
        description: 'Generate v1, v4, v5, and v7 time-sortable UUIDs in bulk',
        badge: 'v7 Sortable',
        icon: FiLayers
    },
    {
        id: 'qr',
        name: 'QR Code Tool',
        category: 'web',
        description: 'Generate QR codes for URLs, Wi-Fi, vCard with SVG/PNG export',
        badge: 'Styling',
        icon: FiGrid
    },
    {
        id: 'password',
        name: 'Password Generator',
        category: 'security',
        description: 'Secure passwords, memorable passphrases, PINs with crack-time estimation',
        badge: 'Entropy',
        icon: FiLock
    },
    {
        id: 'security',
        name: 'Privacy & Security',
        category: 'security',
        description: 'SHA-256/512 hashing, HMAC, AES-256-GCM encryption & PII masking',
        badge: 'Crypto',
        icon: FiShield
    },
    {
        id: 'text',
        name: 'Text & Diff Suite',
        category: 'developer',
        description: 'Word/char counter, case converter, slugify, deduplicate & visual diff',
        icon: FiType
    },
    {
        id: 'math',
        name: 'Math & Numbers',
        category: 'math',
        description: 'Base converter (BigInt), percentage, random numbers, units & dates',
        icon: FiPercent
    },
    {
        id: 'seo',
        name: 'Web & SEO Suite',
        category: 'web',
        description: 'Open Graph tags, SERP snippet preview, sitemap.xml & contrast checker',
        icon: FiSearch
    },
    {
        id: 'css',
        name: 'CSS & Utilities',
        category: 'developer',
        description: 'Interactive box-shadow generator, border-radius tuner & decision maker',
        icon: FiLayout
    },
    {
        id: 'dev',
        name: 'Dev Helpers',
        category: 'developer',
        description: 'JWT token decoder, Unix timestamp converter, color picker & SQL formatter',
        icon: FiCpu
    },
];

const CATEGORIES: Array<{ id: Category; label: string }> = [
    { id: 'all', label: 'All Tools' },
    { id: 'format', label: 'JSON & Data' },
    { id: 'developer', label: 'Developer & Code' },
    { id: 'security', label: 'Privacy & Crypto' },
    { id: 'web', label: 'Web, QR & SEO' },
    { id: 'math', label: 'Math & Numbers' },
];

export default function DevToolsPage() {
    const [activeTab, setActiveTab] = useState<ActiveTab>('json-formatter');
    const [selectedCategory, setSelectedCategory] = useState<Category>('all');
    const [searchQuery, setSearchQuery] = useState<string>('');

    const filteredTools = useMemo(() => {
        return TOOLS_LIST.filter(t => {
            const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
            const matchesSearch =
                !searchQuery.trim() ||
                t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                t.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCat && matchesSearch;
        });
    }, [selectedCategory, searchQuery]);

    const activeToolInfo = TOOLS_LIST.find(t => t.id === activeTab) || TOOLS_LIST[0];

    const faqItems = [
        {
            question: 'Are all developer and online utilities processed client-side?',
            answer: 'Yes! All operations including JSON formatting, UUID generation, AES encryption, HMAC, hashing, and QR generation run 100% inside your browser tab without sending data to servers.'
        },
        {
            question: 'Can I use IARTY Developer Tools offline?',
            answer: 'Yes. Once loaded, all offline service workers and client-side web workers continue to operate with zero network dependency.'
        },
        {
            question: 'What features are supported in the JSON Formatter?',
            answer: 'It supports beautifying, minifying, 2/4/tab indentation, key sorting (A-Z/Z-A), escaping, unescaping, and converting to YAML, XML, CSV, and TypeScript interfaces.'
        }
    ];

    return (
        <div className="min-h-screen pt-20 sm:pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Developer & Online Utilities — IARTY Tools"
                description="Privacy-first, 100% client-side online developer tools: JSON formatter & validator, Base64, UUID v1-v7, QR generator, Password generator, Math & number base converters, Web & SEO helpers, AES encryption, and CSS generators."
                path="/developer"
                faq={faqItems}
            />

            {/* Header Hero with Glassmorphism */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-purple-50/80 via-white to-transparent dark:from-purple-950/20 dark:via-gray-950 dark:to-transparent border border-black/5 dark:border-white/10 p-6 sm:p-10 mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100/80 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 mb-3 shadow-xs">
                    <FiCompass className="w-3.5 h-3.5" />
                    <span>100% Client-Side · Pure Privacy · Offline Ready</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    Developer & Online Utilities
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Instant client-side developer toolkit with 70+ utilities. No server requests, no tracking, complete privacy.
                </p>

                {/* Instant Search Bar */}
                <div className="mt-6 max-w-md mx-auto relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tool (e.g. JSON, UUID, Base64, AES, QR)..."
                        className="w-full pl-10 pr-9 py-2.5 bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm text-gray-900 dark:text-white"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 mb-4 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                            selectedCategory === cat.id
                                ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-sm'
                                : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Tools Quick Grid Carousel / Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-8">
                {filteredTools.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`p-3 rounded-2xl text-left transition-all relative border flex flex-col justify-between ${
                                isActive
                                    ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20 scale-[1.02]'
                                    : 'bg-white dark:bg-gray-900 border-black/5 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-purple-300 dark:hover:border-purple-800'
                            }`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className={`p-2 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400'}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                {item.badge && (
                                    <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md ${isActive ? 'bg-white/20 text-white' : 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300'}`}>
                                        {item.badge}
                                    </span>
                                )}
                            </div>
                            <div>
                                <h3 className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                                    {item.name}
                                </h3>
                                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isActive ? 'text-purple-100' : 'text-gray-400'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {filteredTools.length === 0 && (
                <div className="p-8 text-center text-sm text-gray-400 bg-gray-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/5 mb-8">
                    No tools match "{searchQuery}". Try searching for JSON, Base64, Hash, or QR.
                </div>
            )}

            {/* Active Tool Header Banner */}
            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Workspace:</span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300">
                    {activeToolInfo.name}
                </span>
            </div>

            {/* Tool Render Area */}
            <div className="transition-all duration-300">
                {activeTab === 'json-formatter' && <JsonFormatterTool />}
                {activeTab === 'json-validator' && <JsonValidatorTool />}
                {activeTab === 'base64' && <Base64Tool />}
                {activeTab === 'url' && <UrlEncoderTool />}
                {activeTab === 'uuid' && <UuidGeneratorTool />}
                {activeTab === 'qr' && <QrCodeTool />}
                {activeTab === 'password' && <PasswordGeneratorTool />}
                {activeTab === 'text' && <TextSuiteTool />}
                {activeTab === 'math' && <MathSuiteTool />}
                {activeTab === 'seo' && <WebSeoSuiteTool />}
                {activeTab === 'security' && <SecuritySuiteTool />}
                {activeTab === 'css' && <CssEverydaySuiteTool />}
                {activeTab === 'dev' && <DevUtilitiesSuiteTool />}
            </div>

            {/* AEO / FAQ Structured Section */}
            <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/10">
                <div className="flex items-center gap-2 mb-4">
                    <FiStar className="text-purple-500 w-4 h-4" />
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {faqItems.map((item, idx) => (
                        <div key={idx} className="p-5 bg-white dark:bg-gray-900/60 rounded-2xl border border-black/5 dark:border-white/10 shadow-xs">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-2">{item.question}</h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{item.answer}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
