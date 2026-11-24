import React, { useState, useId } from 'react';
import { ToolCard, CopyButton, DownloadButton } from '@/components/devtools/ToolCard';
import {
    formatJson,
    minifyJson,
    sortJsonKeys,
    escapeJsonString,
    unescapeJsonString,
    jsonToYaml,
    jsonToXml,
    jsonToCsv,
    jsonToTypeScript,
    getJsonStats
} from '@/lib/devtools/jsonTools';
import { FiCode, FiUpload } from 'react-icons/fi';

export const JsonFormatterTool: React.FC = () => {
    const fileInputId = useId();
    const [input, setInput] = useState<string>(
        '{\n  "name": "IARTY Tools",\n  "version": 1,\n  "features": ["json", "uuid", "base64", "qr"],\n  "active": true\n}'
    );
    const [output, setOutput] = useState<string>('');
    const [indent, setIndent] = useState<2 | 4 | '\t'>(2);
    const [error, setError] = useState<string | null>(null);

    const stats = getJsonStats(input);

    const handleFormat = () => {
        try {
            setError(null);
            setOutput(formatJson(input, indent));
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleMinify = () => {
        try {
            setError(null);
            setOutput(minifyJson(input));
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleSort = (dir: 'asc' | 'desc') => {
        try {
            setError(null);
            const parsed = JSON.parse(input);
            const sorted = sortJsonKeys(parsed, dir);
            setOutput(JSON.stringify(sorted, null, indent));
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleEscape = () => {
        setOutput(escapeJsonString(input));
    };

    const handleUnescape = () => {
        setOutput(unescapeJsonString(input));
    };

    const handleConvert = (type: 'yaml' | 'xml' | 'csv' | 'ts') => {
        try {
            setError(null);
            const parsed = JSON.parse(input);
            switch (type) {
                case 'yaml':
                    setOutput(jsonToYaml(parsed));
                    break;
                case 'xml':
                    setOutput(jsonToXml(parsed));
                    break;
                case 'csv':
                    setOutput(jsonToCsv(parsed));
                    break;
                case 'ts':
                    setOutput(jsonToTypeScript(parsed));
                    break;
            }
        } catch (e: any) {
            setError(e.message);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            setInput(event.target?.result as string);
        };
        reader.readAsText(file);
    };

    return (
        <ToolCard
            title="JSON Formatter & Beautifier"
            description="Format, validate, minify, sort keys, and convert JSON to YAML, XML, CSV, or TypeScript."
            icon={<FiCode className="w-5 h-5" />}
            onClear={() => { setInput(''); setOutput(''); setError(null); }}
            onReset={() => {
                setInput('{\n  "title": "sample",\n  "items": [1, 2, 3]\n}');
                setOutput('');
                setError(null);
            }}
        >
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-[var(--line)]">
                <button
                    onClick={handleFormat}
                    className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-all"
                >
                    Beautify
                </button>
                <button
                    onClick={handleMinify}
                    className="px-3 py-1.5 bg-[var(--soft)] hover:bg-[var(--line)] text-[var(--fg)] text-xs font-semibold rounded-lg border border-[var(--line)] transition-all"
                >
                    Minify
                </button>

                <div className="flex items-center gap-1 bg-[var(--soft)] px-2 py-1 rounded-lg border border-[var(--line)] text-xs">
                    <span className="text-[var(--mut)] font-medium">Indent:</span>
                    <button
                        onClick={() => setIndent(2)}
                        className={`px-2 py-0.5 rounded ${indent === 2 ? 'bg-[var(--card)] text-[var(--blue)] font-bold shadow-xs' : 'text-[var(--mut)]'}`}
                    >
                        2
                    </button>
                    <button
                        onClick={() => setIndent(4)}
                        className={`px-2 py-0.5 rounded ${indent === 4 ? 'bg-[var(--card)] text-[var(--blue)] font-bold shadow-xs' : 'text-[var(--mut)]'}`}
                    >
                        4
                    </button>
                    <button
                        onClick={() => setIndent('\t')}
                        className={`px-2 py-0.5 rounded ${indent === '\t' ? 'bg-[var(--card)] text-[var(--blue)] font-bold shadow-xs' : 'text-[var(--mut)]'}`}
                    >
                        Tab
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={() => handleSort('asc')}
                        className="px-2.5 py-1.5 bg-[var(--soft)] hover:bg-[var(--line)] border border-[var(--line)] text-xs font-medium rounded-lg text-[var(--fg)]"
                    >
                        Sort A-Z
                    </button>
                    <button
                        onClick={() => handleSort('desc')}
                        className="px-2.5 py-1.5 bg-[var(--soft)] hover:bg-[var(--line)] border border-[var(--line)] text-xs font-medium rounded-lg text-[var(--fg)]"
                    >
                        Sort Z-A
                    </button>
                </div>

                <div className="flex items-center gap-1">
                    <button
                        onClick={handleEscape}
                        className="px-2.5 py-1.5 bg-[var(--soft)] hover:bg-[var(--line)] border border-[var(--line)] text-xs font-medium rounded-lg text-[var(--fg)]"
                    >
                        Escape
                    </button>
                    <button
                        onClick={handleUnescape}
                        className="px-2.5 py-1.5 bg-[var(--soft)] hover:bg-[var(--line)] border border-[var(--line)] text-xs font-medium rounded-lg text-[var(--fg)]"
                    >
                        Unescape
                    </button>
                </div>

                {/* Conversion drop-ins */}
                <div className="flex items-center gap-1 ml-auto">
                    <span className="text-xs text-[var(--mut)] mr-1">To:</span>
                    <button
                        onClick={() => handleConvert('yaml')}
                        className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 text-[var(--blue)] hover:bg-blue-100 text-xs font-medium rounded-md border border-blue-200/40"
                    >
                        YAML
                    </button>
                    <button
                        onClick={() => handleConvert('xml')}
                        className="px-2 py-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100 text-xs font-medium rounded-md border border-amber-200/40"
                    >
                        XML
                    </button>
                    <button
                        onClick={() => handleConvert('csv')}
                        className="px-2 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100 text-xs font-medium rounded-md border border-emerald-200/40"
                    >
                        CSV
                    </button>
                    <button
                        onClick={() => handleConvert('ts')}
                        className="px-2 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-xs font-medium rounded-md border border-blue-200/40"
                    >
                        TypeScript
                    </button>
                </div>
            </div>

            {/* Error Banner */}
            {error && (
                <div className="p-3 mb-4 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 rounded-xl text-red-600 dark:text-red-400 text-xs font-mono">
                    ⚠️ {error}
                </div>
            )}

            {/* Two-Pane Editor */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Input */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[var(--mut)] uppercase tracking-wider">Input JSON</span>
                        <div className="flex items-center gap-2">
                            <label htmlFor={fileInputId} className="cursor-pointer text-xs flex items-center gap-1 text-[var(--blue)] hover:underline">
                                <FiUpload className="w-3.5 h-3.5" />
                                <span>Upload</span>
                                <input
                                    id={fileInputId}
                                    type="file"
                                    accept=".json,application/json"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Paste JSON here..."
                        rows={14}
                        className="w-full p-3 font-mono text-xs bg-[var(--soft)] border border-[var(--line)] rounded-xl focus:outline-none focus:border-[var(--blue)] focus:ring-1 focus:ring-[var(--blue)] text-[var(--fg)] resize-y"
                    />
                </div>

                {/* Output */}
                <div className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-[var(--mut)] uppercase tracking-wider">Result</span>
                        {output && (
                            <div className="flex items-center gap-2">
                                <CopyButton text={output} />
                                <DownloadButton filename="result.json" content={output} />
                            </div>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Formatted or converted output will appear here..."
                        rows={14}
                        className="w-full p-3 font-mono text-xs bg-[var(--soft)] border border-[var(--line)] rounded-xl text-[var(--fg)] resize-y"
                    />
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="mt-4 pt-4 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>Chars: <strong className="text-gray-800 dark:text-gray-200">{stats.characters}</strong></span>
                <span>Size: <strong className="text-gray-800 dark:text-gray-200">{stats.sizeFormatted}</strong></span>
                <span>Objects: <strong className="text-gray-800 dark:text-gray-200">{stats.objectCount}</strong></span>
                <span>Arrays: <strong className="text-gray-800 dark:text-gray-200">{stats.arrayCount}</strong></span>
                <span>Keys: <strong className="text-gray-800 dark:text-gray-200">{stats.keysCount}</strong></span>
                <span>Max Depth: <strong className="text-gray-800 dark:text-gray-200">{stats.depth}</strong></span>
            </div>
        </ToolCard>
    );
};
