import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import { parseUrl, cleanUrlTracking, buildUrl } from '@/lib/devtools/urlTools';
import { FiLink, FiPlus, FiTrash, FiShield } from 'react-icons/fi';

export const UrlEncoderTool: React.FC = () => {
    const [rawUrl, setRawUrl] = useState<string>(
        'https://example.com/search?q=developer+tools&utm_source=newsletter&utm_medium=email&fbclid=12345#overview'
    );
    const [encodedResult, setEncodedResult] = useState<string>('');

    const parsed = parseUrl(rawUrl);
    const [params, setParams] = useState<Array<{ key: string; value: string }>>(parsed.params);

    const handleCleanTracking = () => {
        const cleaned = cleanUrlTracking(rawUrl);
        setRawUrl(cleaned);
        const p = parseUrl(cleaned);
        setParams(p.params);
    };

    const handleEncode = () => {
        setEncodedResult(encodeURIComponent(rawUrl));
    };

    const handleDecode = () => {
        try {
            setEncodedResult(decodeURIComponent(rawUrl));
        } catch {
            setEncodedResult('Invalid encoded URI component');
        }
    };

    const handleUpdateParam = (index: number, key: string, value: string) => {
        const next = [...params];
        next[index] = { key, value };
        setParams(next);
        const nextUrl = buildUrl(`${parsed.protocol}//${parsed.host}${parsed.pathname}`, next, parsed.hash);
        setRawUrl(nextUrl);
    };

    const handleDeleteParam = (index: number) => {
        const next = params.filter((_, i) => i !== index);
        setParams(next);
        const nextUrl = buildUrl(`${parsed.protocol}//${parsed.host}${parsed.pathname}`, next, parsed.hash);
        setRawUrl(nextUrl);
    };

    const handleAddParam = () => {
        setParams([...params, { key: '', value: '' }]);
    };

    return (
        <ToolCard
            title="URL Encoder / Decoder & Builder"
            description="Encode, decode, parse components, edit query params, and strip UTM/tracking tags."
            icon={<FiLink className="w-5 h-5" />}
            onClear={() => { setRawUrl(''); setEncodedResult(''); setParams([]); }}
            onReset={() => {
                const sample = 'https://example.com/search?q=developer+tools&utm_source=test';
                setRawUrl(sample);
                setParams(parseUrl(sample).params);
            }}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                <button
                    onClick={handleEncode}
                    className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all"
                >
                    Encode URI Component
                </button>
                <button
                    onClick={handleDecode}
                    className="px-3.5 py-1.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-gray-700 dark:text-gray-200 text-xs font-semibold rounded-xl transition-all"
                >
                    Decode URI Component
                </button>
                <button
                    onClick={handleCleanTracking}
                    className="px-3.5 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-semibold rounded-xl transition-all flex items-center gap-1.5"
                >
                    <FiShield className="w-3.5 h-3.5" />
                    <span>Strip UTM / Trackers</span>
                </button>
            </div>

            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL / URI Input</label>
                    <span className="text-xs text-gray-400">Length: {rawUrl.length} chars</span>
                </div>
                <input
                    type="text"
                    value={rawUrl}
                    onChange={(e) => {
                        setRawUrl(e.target.value);
                        setParams(parseUrl(e.target.value).params);
                    }}
                    className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                    placeholder="https://example.com/path?key=value#hash"
                />
            </div>

            {encodedResult && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/10">
                    <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-gray-500">Result</span>
                        <CopyButton text={encodedResult} />
                    </div>
                    <div className="font-mono text-xs break-all text-gray-800 dark:text-gray-200">{encodedResult}</div>
                </div>
            )}

            {/* Parsed Components */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Protocol</span>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{parsed.protocol || '—'}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Host</span>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{parsed.host || '—'}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Path</span>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{parsed.pathname || '—'}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                    <span className="text-gray-400 block text-[10px] uppercase font-bold">Hash</span>
                    <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{parsed.hash || '—'}</span>
                </div>
            </div>

            {/* Query Parameters Editor */}
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Query Parameters ({params.length})</span>
                    <button
                        onClick={handleAddParam}
                        className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 hover:bg-purple-100 text-xs font-bold rounded-lg flex items-center gap-1"
                    >
                        <FiPlus /> Add Param
                    </button>
                </div>

                <div className="space-y-2">
                    {params.map((param, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input
                                type="text"
                                value={param.key}
                                onChange={(e) => handleUpdateParam(index, e.target.value, param.value)}
                                placeholder="key"
                                className="w-1/3 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-200"
                            />
                            <span className="text-gray-400 font-mono">=</span>
                            <input
                                type="text"
                                value={param.value}
                                onChange={(e) => handleUpdateParam(index, param.key, e.target.value)}
                                placeholder="value"
                                className="flex-1 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-200"
                            />
                            <button
                                onClick={() => handleDeleteParam(index)}
                                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl"
                            >
                                <FiTrash className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    ))}
                    {params.length === 0 && (
                        <div className="text-xs text-gray-400 italic">No query parameters in this URL.</div>
                    )}
                </div>
            </div>
        </ToolCard>
    );
};
