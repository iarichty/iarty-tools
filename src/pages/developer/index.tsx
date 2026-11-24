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
import { Link } from 'react-router-dom';
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
    FiExternalLink,
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
    path: string;
    category: Category;
    description: string;
    badge?: string;
    icon: React.ComponentType<{ className?: string }>;
}

const TOOLS_LIST: ToolItem[] = [
    {
        id: 'json-formatter',
        name: 'JSON Formatter',
        path: '/developer/json',
        category: 'format',
        description: 'Beautify, minify, sort keys, YAML/XML/CSV/TS converter',
        badge: 'Popular',
        icon: FiCode
    },
    {
        id: 'json-validator',
        name: 'JSON Validator',
        path: '/developer/json',
        category: 'format',
        description: 'Detailed syntax error diagnostics & JSON schema validation',
        icon: FiCheckSquare
    },
    {
        id: 'base64',
        name: 'Base64 Tool',
        path: '/developer/base64',
        category: 'format',
        description: 'Encode/decode text, images, files & URL-safe Base64',
        icon: FiFileText
    },
    {
        id: 'url',
        name: 'URL Tool',
        path: '/developer/url',
        category: 'web',
        description: 'Encode, decode, parse components & strip UTM tracking',
        icon: FiLink
    },
    {
        id: 'uuid',
        name: 'UUID Generator',
        path: '/developer/uuid',
        category: 'developer',
        description: 'Generate v1, v4, v5, and v7 time-sortable UUIDs in bulk',
        badge: 'v7 Sortable',
        icon: FiLayers
    },
    {
        id: 'qr',
        name: 'QR Code Tool',
        path: '/developer/qr',
        category: 'web',
        description: 'Generate QR codes for URLs, Wi-Fi, vCard with SVG/PNG export',
        badge: 'Styling',
        icon: FiGrid
    },
    {
        id: 'password',
        name: 'Password Generator',
        path: '/developer/password',
        category: 'security',
        description: 'Secure passwords, memorable passphrases, PINs with crack-time estimation',
        badge: 'Entropy',
        icon: FiLock
    },
    {
        id: 'security',
        name: 'Privacy & Security',
        path: '/developer/security',
        category: 'security',
        description: 'SHA-256/512 hashing, HMAC, AES-256-GCM encryption & PII masking',
        badge: 'Crypto',
        icon: FiShield
    },
    {
        id: 'text',
        name: 'Text & Diff Suite',
        path: '/developer/text',
        category: 'developer',
        description: 'Word/char counter, case converter, slugify, deduplicate & visual diff',
        icon: FiType
    },
    {
        id: 'math',
        name: 'Math & Numbers',
        path: '/developer/math',
        category: 'math',
        description: 'Base converter (BigInt), percentage, random numbers, units & dates',
        icon: FiPercent
    },
    {
        id: 'seo',
        name: 'Web & SEO Suite',
        path: '/developer/seo',
        category: 'web',
        description: 'Open Graph tags, SERP snippet preview, sitemap.xml & contrast checker',
        icon: FiSearch
    },
    {
        id: 'css',
        name: 'CSS & Utilities',
        path: '/developer/css',
        category: 'developer',
        description: 'Interactive box-shadow generator, border-radius tuner & decision maker',
        icon: FiLayout
    },
    {
        id: 'dev',
        name: 'Dev Helpers',
        path: '/developer',
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

    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Developer & Online Utilities — IARTY Tools"
                description="Privacy-first, 100% client-side online developer tools: JSON formatter & validator, Base64, UUID v1-v7, QR generator, Password generator, Math & number base converters, Web & SEO helpers, AES encryption, and CSS generators."
                path="/developer"
            />

            {/* Background Ambience consistent with Instagram/TikTok pages */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute right-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />
            </div>

            {/* Header Hero */}
            <div className="mb-10 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[var(--blue)] dark:bg-blue-950/40 dark:text-blue-400 mb-4 border border-blue-200/50 dark:border-blue-900/30">
                    <span>100% Client-Side · Pure Privacy · Offline Ready</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-[var(--fg)] tracking-tight">
                    Developer & Online Utilities
                </h1>
                <p className="mt-3 text-sm sm:text-base text-[var(--mut)] max-w-2xl mx-auto">
                    Instant client-side developer toolkit with 70+ utilities. No server requests, no tracking, complete privacy.
                </p>

                {/* Instant Search Bar */}
                <div className="mt-6 max-w-md mx-auto relative">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--mut)]" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tool (e.g. JSON, UUID, Base64, AES, QR)..."
                        className="w-full pl-10 pr-9 py-2.5 bg-[var(--card)] border border-[var(--line)] rounded-xl text-xs sm:text-sm font-medium focus:outline-none focus:border-[var(--blue)] focus:ring-1 focus:ring-[var(--blue)] shadow-xs text-[var(--fg)]"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--mut)] hover:text-[var(--fg)]"
                        >
                            <FiX className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 no-scrollbar">
                {CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border ${
                            selectedCategory === cat.id
                                ? 'bg-[var(--blue)] text-white border-[var(--blue)] shadow-xs'
                                : 'bg-[var(--card)] border-[var(--line)] text-[var(--mut)] hover:text-[var(--fg)] hover:border-[var(--blue)]'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Interactive Grid: 4 columns with proper gap-4 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {filteredTools.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <div
                            key={item.id}
                            className={`p-4 rounded-xl transition-all relative border flex flex-col justify-between ${
                                isActive
                                    ? 'bg-[var(--card)] border-[var(--blue)] ring-2 ring-[var(--blue)]/20 shadow-sm'
                                    : 'bg-[var(--card)] border-[var(--line)] hover:border-[var(--blue)]/50 shadow-xs'
                            }`}
                        >
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <div className={`p-2.5 rounded-lg ${isActive ? 'bg-blue-600 text-white' : 'bg-[var(--soft)] text-[var(--blue)]'}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        {item.badge && (
                                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-50 text-[var(--blue)] dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.path !== '/developer' && (
                                            <Link
                                                to={item.path}
                                                title={`Open dedicated ${item.name} page for SEO`}
                                                className="p-1 text-[var(--mut)] hover:text-[var(--blue)] rounded transition-colors"
                                            >
                                                <FiExternalLink className="w-3.5 h-3.5" />
                                            </Link>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-[var(--fg)]">{item.name}</h3>
                                <p className="text-xs mt-1 text-[var(--mut)] leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                            </div>

                            <button
                                onClick={() => setActiveTab(item.id)}
                                className={`mt-4 w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors ${
                                    isActive
                                        ? 'bg-[var(--blue)] text-white'
                                        : 'bg-[var(--soft)] text-[var(--fg)] hover:bg-[var(--line)]'
                                }`}
                            >
                                {isActive ? 'Active Workspace' : 'Open Tool'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Active Workspace View */}
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[var(--mut)] uppercase tracking-wider">Active Workspace:</span>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-50 text-[var(--blue)] dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200/40 dark:border-blue-900/30">
                        {activeToolInfo.name}
                    </span>
                </div>
                {activeToolInfo.path !== '/developer' && (
                    <Link
                        to={activeToolInfo.path}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--blue)] hover:underline"
                    >
                        <span>Open Full SEO Page</span>
                        <FiExternalLink className="w-3 h-3" />
                    </Link>
                )}
            </div>

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
        </div>
    );
}
