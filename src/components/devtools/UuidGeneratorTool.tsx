import React, { useState } from 'react';
import { ToolCard, CopyButton, DownloadButton } from '@/components/devtools/ToolCard';
import {
    generateUuidV1,
    generateUuidV4,
    generateUuidV5,
    generateUuidV7,
    validateUuid,
    formatUuid,
    type UuidVersion
} from '@/lib/devtools/uuidTools';
import { FiLayers, FiRefreshCw } from 'react-icons/fi';

export const UuidGeneratorTool: React.FC = () => {
    const [version, setVersion] = useState<UuidVersion>('v4');
    const [quantity, setQuantity] = useState<number>(5);
    const [uppercase, setUppercase] = useState<boolean>(false);
    const [removeHyphens, setRemoveHyphens] = useState<boolean>(false);
    const [prefix, setPrefix] = useState<string>('');
    const [suffix, setSuffix] = useState<string>('');
    const [results, setResults] = useState<string[]>([]);
    const [exportFormat, setExportFormat] = useState<'plain' | 'json' | 'sql' | 'js' | 'csv'>('plain');
    const [validationInput, setValidationInput] = useState<string>('');
    const [validationResult, setValidationResult] = useState<any>(null);

    const handleGenerate = async () => {
        const list: string[] = [];
        const count = Math.max(1, Math.min(100, quantity));

        for (let i = 0; i < count; i++) {
            let id = '';
            switch (version) {
                case 'v1':
                    id = generateUuidV1();
                    break;
                case 'v4':
                    id = generateUuidV4();
                    break;
                case 'v5':
                    id = await generateUuidV5(`name-${i}-${Date.now()}`);
                    break;
                case 'v7':
                    id = generateUuidV7();
                    break;
            }
            list.push(formatUuid(id, { uppercase, removeHyphens, prefix, suffix }));
        }
        setResults(list);
    };

    const getFormattedOutput = (): string => {
        switch (exportFormat) {
            case 'json':
                return JSON.stringify(results, null, 2);
            case 'csv':
                return ['uuid', ...results].join('\n');
            case 'sql':
                return results.map(id => `('${id}')`).join(',\n') + ';';
            case 'js':
                return `const uuids = [\n${results.map(id => `  '${id}'`).join(',\n')}\n];`;
            case 'plain':
            default:
                return results.join('\n');
        }
    };

    const handleValidate = () => {
        setValidationResult(validateUuid(validationInput));
    };

    return (
        <ToolCard
            title="UUID Generator & Validator"
            description="Generate v1, v4, v5, and v7 (time-sortable) UUIDs in bulk with SQL, JSON, and CSV export."
            icon={<FiLayers className="w-5 h-5" />}
            onReset={() => {
                setVersion('v4');
                setQuantity(5);
                setUppercase(false);
                setRemoveHyphens(false);
                setPrefix('');
                setSuffix('');
            }}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">UUID Version</label>
                    <select
                        value={version}
                        onChange={(e) => setVersion(e.target.value as UuidVersion)}
                        className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200"
                    >
                        <option value="v4">UUID v4 (Random)</option>
                        <option value="v7">UUID v7 (Time-sortable)</option>
                        <option value="v1">UUID v1 (Timestamp)</option>
                        <option value="v5">UUID v5 (Deterministic SHA-1)</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Quantity (1-100)</label>
                    <input
                        type="number"
                        min={1}
                        max={100}
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                        className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-semibold text-gray-800 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Prefix (Optional)</label>
                    <input
                        type="text"
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        placeholder="e.g. usr_"
                        className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs text-gray-800 dark:text-gray-200"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Suffix (Optional)</label>
                    <input
                        type="text"
                        value={suffix}
                        onChange={(e) => setSuffix(e.target.value)}
                        placeholder="e.g. _v1"
                        className="w-full p-2.5 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs text-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-black/5 dark:border-white/10 text-xs">
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={uppercase}
                        onChange={(e) => setUppercase(e.target.checked)}
                        className="rounded text-purple-600"
                    />
                    <span>UPPERCASE</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={removeHyphens}
                        onChange={(e) => setRemoveHyphens(e.target.checked)}
                        className="rounded text-purple-600"
                    />
                    <span>Remove Hyphens</span>
                </label>

                <button
                    onClick={handleGenerate}
                    className="ml-auto px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                    <FiRefreshCw className="w-3.5 h-3.5" />
                    <span>Generate</span>
                </button>
            </div>

            {results.length > 0 && (
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">Export Format:</span>
                            {(['plain', 'json', 'csv', 'sql', 'js'] as const).map(fmt => (
                                <button
                                    key={fmt}
                                    onClick={() => setExportFormat(fmt)}
                                    className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                                        exportFormat === fmt ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300'
                                    }`}
                                >
                                    {fmt}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <CopyButton text={getFormattedOutput()} />
                            <DownloadButton filename={`uuids.${exportFormat === 'json' ? 'json' : exportFormat === 'csv' ? 'csv' : 'txt'}`} content={getFormattedOutput()} />
                        </div>
                    </div>
                    <textarea
                        value={getFormattedOutput()}
                        readOnly
                        rows={Math.min(10, results.length + 2)}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl text-gray-800 dark:text-gray-200"
                    />
                </div>
            )}

            {/* Validator section */}
            <div className="pt-4 border-t border-black/5 dark:border-white/10">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">Validate UUID</span>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={validationInput}
                        onChange={(e) => setValidationInput(e.target.value)}
                        placeholder="Paste UUID here to validate..."
                        className="flex-1 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-gray-800 dark:text-gray-200"
                    />
                    <button
                        onClick={handleValidate}
                        className="px-3 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-bold rounded-xl"
                    >
                        Validate
                    </button>
                </div>
                {validationResult && (
                    <div className={`mt-2 p-3 rounded-xl text-xs font-semibold ${validationResult.valid ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400'}`}>
                        {validationResult.valid
                            ? `Valid UUID! Version: ${validationResult.version} (${validationResult.variant})`
                            : 'Invalid UUID format.'}
                    </div>
                )}
            </div>
        </ToolCard>
    );
};
