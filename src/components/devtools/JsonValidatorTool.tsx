import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import { validateJsonSyntax, validateJsonSchema, type ValidationReport } from '@/lib/devtools/jsonValidator';
import { FiCheckSquare, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export const JsonValidatorTool: React.FC = () => {
    const [jsonInput, setJsonInput] = useState<string>(
        '{\n  "title": "Product A",\n  "price": 49.99,\n  "tags": ["gadget", "tech"],\n  "inStock": true\n}'
    );
    const [schemaInput, setSchemaInput] = useState<string>('');
    const [useSchema, setUseSchema] = useState<boolean>(false);
    const [report, setReport] = useState<ValidationReport | null>(null);

    const handleValidate = () => {
        const syntaxReport = validateJsonSyntax(jsonInput);
        if (!syntaxReport.isValid || !useSchema || !schemaInput.trim()) {
            setReport(syntaxReport);
            return;
        }

        try {
            const parsedSchema = JSON.parse(schemaInput);
            const schemaReport = validateJsonSchema(syntaxReport.parsedData, parsedSchema);
            setReport(schemaReport);
        } catch (e: unknown) {
            setReport({
                isValid: false,
                errors: [{ line: 1, column: 1, message: `Invalid Schema: ${(e instanceof Error ? e.message : String(e))}`, severity: 'error' }],
                warnings: [],
                stats: { totalErrors: 1, totalWarnings: 0 }
            });
        }
    };

    return (
        <ToolCard
            title="JSON Validator"
            description="Deep syntax error detection, line/column tracking, missing comma/bracket detection, and JSON schema validation."
            icon={<FiCheckSquare className="w-5 h-5" />}
            onClear={() => { setJsonInput(''); setSchemaInput(''); setReport(null); }}
            onReset={() => {
                setJsonInput('{\n  "name": "valid json"\n}');
                setSchemaInput('');
                setReport(null);
            }}
        >
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={handleValidate}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                    Validate Now
                </button>
                <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={useSchema}
                        onChange={(e) => setUseSchema(e.target.checked)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Validate against JSON Schema</span>
                </label>
            </div>

            <div className={`grid grid-cols-1 ${useSchema ? 'lg:grid-cols-2' : ''} gap-4 mb-4`}>
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">JSON Input</label>
                    <textarea
                        value={jsonInput}
                        onChange={(e) => setJsonInput(e.target.value)}
                        placeholder="Paste JSON to validate..."
                        rows={10}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                    />
                </div>

                {useSchema && (
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">JSON Schema</label>
                        <textarea
                            value={schemaInput}
                            onChange={(e) => setSchemaInput(e.target.value)}
                            placeholder='e.g. {"type":"object","required":["title","price"],"properties":{"title":{"type":"string"}}}'
                            rows={10}
                            className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                        />
                    </div>
                )}
            </div>

            {/* Report */}
            {report && (
                <div className={`p-4 rounded-2xl border ${report.isValid ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40' : 'bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/40'}`}>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {report.isValid ? (
                                <>
                                    <FiCheckCircle className="w-5 h-5 text-emerald-500" />
                                    <span className="text-sm font-bold text-emerald-700 dark:text-emerald-400">Valid JSON Format</span>
                                </>
                            ) : (
                                <>
                                    <FiAlertCircle className="w-5 h-5 text-red-500" />
                                    <span className="text-sm font-bold text-red-700 dark:text-red-400">
                                        Found {report.stats.totalErrors} Error(s)
                                    </span>
                                </>
                            )}
                        </div>
                        <CopyButton
                            text={JSON.stringify(report, null, 2)}
                            label="Copy Report"
                        />
                    </div>

                    {report.errors.length > 0 && (
                        <div className="space-y-2 mt-3">
                            {report.errors.map((err, i) => (
                                <div key={i} className="p-3 bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/30 rounded-xl text-xs">
                                    <div className="font-semibold text-red-600 dark:text-red-400">
                                        Line {err.line}, Column {err.column}: {(err instanceof Error ? err.message : String(err))}
                                    </div>
                                    {err.snippet && (
                                        <div className="mt-1 font-mono text-[11px] p-2 bg-gray-50 dark:bg-black/40 rounded border border-black/5 dark:border-white/5 text-gray-700 dark:text-gray-300">
                                            {err.snippet}
                                        </div>
                                    )}
                                    {err.hint && (
                                        <div className="mt-1 text-gray-500 dark:text-gray-400 italic">
                                            💡 Hint: {err.hint}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </ToolCard>
    );
};
