import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import { decodeJwt, hexToRgb, rgbToHsl, formatSql, formatHtml } from '@/lib/devtools/codeTools';
import { FiCpu } from 'react-icons/fi';

export const DevUtilitiesSuiteTool: React.FC = () => {
    const [tool, setTool] = useState<'jwt' | 'timestamp' | 'color' | 'sql' | 'html'>('jwt');

    // JWT state
    const [jwtInput, setJwtInput] = useState<string>(
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsaWNlIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    );

    // Timestamp state
    const [timestamp, setTimestamp] = useState<number>(Math.floor(Date.now() / 1000));
    const [dateStr, setDateStr] = useState<string>(new Date().toISOString());

    // Color state
    const [hexColor, setHexColor] = useState<string>('#9333ea');

    // Formatter state
    const [codeSnippet, setCodeSnippet] = useState<string>('SELECT id, name, email FROM users WHERE active = 1 ORDER BY created_at DESC LIMIT 10;');
    const [formattedCode, setFormattedCode] = useState<string>('');

    const decodedJwt = decodeJwt(jwtInput);

    const handleTimestampConvert = (ts: number) => {
        setTimestamp(ts);
        setDateStr(new Date(ts * 1000).toISOString());
    };

    const handleDateConvert = (iso: string) => {
        setDateStr(iso);
        const parsed = new Date(iso).getTime();
        if (!isNaN(parsed)) {
            setTimestamp(Math.floor(parsed / 1000));
        }
    };

    const rgb = hexToRgb(hexColor) || { r: 147, g: 51, b: 234 };
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    return (
        <ToolCard
            title="Developer Helpers (JWT, Timestamp, Colors & Formatters)"
            description="Decode JWT tokens, convert Unix timestamps to ISO dates, convert HEX/RGB/HSL colors, and format SQL/HTML."
            icon={<FiCpu className="w-5 h-5" />}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['jwt', 'timestamp', 'color', 'sql', 'html'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => { setTool(tab); setFormattedCode(''); }}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            tool === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* JWT DECODER */}
            {tool === 'jwt' && (
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">JWT String</label>
                    <textarea
                        value={jwtInput}
                        onChange={(e) => setJwtInput(e.target.value)}
                        rows={3}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl mb-4"
                    />

                    {decodedJwt.valid ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/10">
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">Header</span>
                                <pre className="font-mono text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
                                    {JSON.stringify(decodedJwt.header, null, 2)}
                                </pre>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/10">
                                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider block mb-2">Payload Claims</span>
                                <pre className="font-mono text-xs overflow-x-auto text-gray-800 dark:text-gray-200">
                                    {JSON.stringify(decodedJwt.payload, null, 2)}
                                </pre>
                                {decodedJwt.expiresAt && (
                                    <div className="mt-2 text-xs font-semibold text-gray-500">
                                        Expires: {decodedJwt.expiresAt} {decodedJwt.isExpired ? '(Expired ❌)' : '(Valid ✅)'}
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">Invalid JWT token structure.</div>
                    )}
                </div>
            )}

            {/* TIMESTAMP CONVERTER */}
            {tool === 'timestamp' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Unix Timestamp (Seconds)</label>
                            <input
                                type="number"
                                value={timestamp}
                                onChange={(e) => handleTimestampConvert(parseInt(e.target.value) || 0)}
                                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">ISO 8601 Date String</label>
                            <input
                                type="text"
                                value={dateStr}
                                onChange={(e) => handleDateConvert(e.target.value)}
                                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => handleTimestampConvert(Math.floor(Date.now() / 1000))}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                    >
                        Set to Current Time
                    </button>
                </div>
            )}

            {/* COLOR CONVERTER */}
            {tool === 'color' && (
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <input
                            type="color"
                            value={hexColor}
                            onChange={(e) => setHexColor(e.target.value)}
                            className="w-16 h-16 rounded-2xl cursor-pointer"
                        />
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                <span className="text-gray-400 block font-bold text-[10px]">HEX</span>
                                <span className="font-mono font-bold">{hexColor.toUpperCase()}</span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                <span className="text-gray-400 block font-bold text-[10px]">RGB</span>
                                <span className="font-mono font-bold">rgb({rgb.r}, {rgb.g}, {rgb.b})</span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                <span className="text-gray-400 block font-bold text-[10px]">HSL</span>
                                <span className="font-mono font-bold">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SQL / HTML FORMATTER */}
            {(tool === 'sql' || tool === 'html') && (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <button
                            onClick={() => {
                                if (tool === 'sql') setFormattedCode(formatSql(codeSnippet));
                                else setFormattedCode(formatHtml(codeSnippet));
                            }}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                        >
                            Format {tool.toUpperCase()}
                        </button>
                        {formattedCode && <CopyButton text={formattedCode} />}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <textarea
                            value={codeSnippet}
                            onChange={(e) => setCodeSnippet(e.target.value)}
                            rows={8}
                            placeholder={`Enter ${tool.toUpperCase()} snippet...`}
                            className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                        />
                        <textarea
                            value={formattedCode}
                            readOnly
                            rows={8}
                            placeholder="Formatted code will appear here..."
                            className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                        />
                    </div>
                </div>
            )}
        </ToolCard>
    );
};
