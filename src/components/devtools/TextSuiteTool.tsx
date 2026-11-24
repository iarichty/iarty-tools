import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import {
    getTextStats,
    convertCase,
    generateSlug,
    removeDuplicateLines,
    computeSimpleDiff,
    type DiffLine
} from '@/lib/devtools/textTools';
import { FiType } from 'react-icons/fi';

export const TextSuiteTool: React.FC = () => {
    const [text, setText] = useState<string>(
        'Hello World! Welcome to the IARTY Developer Tools suite.\nThis tool helps you count characters, convert cases, generate slugs, and compare diffs.'
    );
    const [subTool, setSubTool] = useState<'counter' | 'case' | 'slug' | 'duplicates' | 'diff'>('counter');
    const [diffB, setDiffB] = useState<string>(
        'Hello World! Welcome to the IARTY Tools suite.\nThis tool helps you count words, convert cases, generate slugs, and compare text diffs.'
    );
    const [diffResult, setDiffResult] = useState<DiffLine[]>([]);

    const stats = getTextStats(text);

    const handleCaseConvert = (type: any) => {
        setText(convertCase(text, type));
    };

    const handleDeduplicate = () => {
        setText(removeDuplicateLines(text));
    };

    const handleRunDiff = () => {
        setDiffResult(computeSimpleDiff(text, diffB));
    };

    return (
        <ToolCard
            title="Text & String Utilities Suite"
            description="Character & word counter, case conversion (camel, snake, kebab, Pascal), URL slug generator, duplicate line remover, and visual diff checker."
            icon={<FiType className="w-5 h-5" />}
            onReset={() => {
                setText('Sample text for testing utilities.');
            }}
            onClear={() => setText('')}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['counter', 'case', 'slug', 'duplicates', 'diff'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSubTool(tab)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                            subTool === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab === 'diff' ? 'Diff Checker' : tab}
                    </button>
                ))}
            </div>

            {subTool === 'diff' ? (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Original Text (A)</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                rows={8}
                                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Modified Text (B)</label>
                            <textarea
                                value={diffB}
                                onChange={(e) => setDiffB(e.target.value)}
                                rows={8}
                                className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleRunDiff}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl mb-4"
                    >
                        Compare Differences
                    </button>

                    {diffResult.length > 0 && (
                        <div className="p-3 bg-gray-50 dark:bg-black/30 rounded-2xl border border-black/5 dark:border-white/10 font-mono text-xs space-y-1">
                            {diffResult.map((line, idx) => (
                                <div
                                    key={idx}
                                    className={`px-2 py-0.5 rounded flex items-center ${
                                        line.type === 'added'
                                            ? 'bg-emerald-100/70 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                                            : line.type === 'removed'
                                            ? 'bg-red-100/70 text-red-800 dark:bg-red-950/40 dark:text-red-300'
                                            : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    <span className="w-6 select-none font-bold">
                                        {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                                    </span>
                                    <span>{line.text}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Input Text</label>
                        <CopyButton text={text} />
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows={6}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl"
                    />

                    {subTool === 'counter' && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block">Characters</span>
                                <span className="text-lg font-black text-gray-900 dark:text-white">{stats.characters}</span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block">Words</span>
                                <span className="text-lg font-black text-gray-900 dark:text-white">{stats.words}</span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block">Lines</span>
                                <span className="text-lg font-black text-gray-900 dark:text-white">{stats.lines}</span>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block">Reading Time</span>
                                <span className="text-lg font-black text-gray-900 dark:text-white">~{stats.readingTimeMinutes} min</span>
                            </div>
                        </div>
                    )}

                    {subTool === 'case' && (
                        <div className="flex flex-wrap gap-2 mt-4">
                            {(['upper', 'lower', 'title', 'sentence', 'camel', 'pascal', 'snake', 'kebab', 'constant', 'toggle'] as const).map(c => (
                                <button
                                    key={c}
                                    onClick={() => handleCaseConvert(c)}
                                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-semibold rounded-xl uppercase text-gray-700 dark:text-gray-300"
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    {subTool === 'slug' && (
                        <div className="mt-4 p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex items-center justify-between">
                            <div>
                                <span className="text-[11px] font-bold text-gray-400 block">Generated Slug:</span>
                                <span className="font-mono text-sm font-bold text-purple-600 dark:text-purple-400">{generateSlug(text)}</span>
                            </div>
                            <CopyButton text={generateSlug(text)} />
                        </div>
                    )}

                    {subTool === 'duplicates' && (
                        <div className="mt-4">
                            <button
                                onClick={handleDeduplicate}
                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                            >
                                Remove Duplicate Lines
                            </button>
                        </div>
                    )}
                </div>
            )}
        </ToolCard>
    );
};
