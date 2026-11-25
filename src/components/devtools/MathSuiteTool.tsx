import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import {
    convertNumberBase,
    calculatePercentages,
    generateRandomNumbers,
    simplifyFraction,
    convertUnits,
    calculateDateDiff,
    toRoman,
    fromRoman,
    calculateAverages
} from '@/lib/devtools/mathTools';
import { FiPercent } from 'react-icons/fi';

export const MathSuiteTool: React.FC = () => {
    const [subTab, setSubTab] = useState<'base' | 'percent' | 'random' | 'fraction' | 'units' | 'date' | 'roman' | 'averages'>('base');

    // Base Converter
    const [baseInput, setBaseInput] = useState<string>('255');
    const [fromBase, setFromBase] = useState<number>(10);
    const [toBase, setToBase] = useState<number>(16);

    // Percentage
    const [valA, setValA] = useState<number>(20);
    const [valB, setValB] = useState<number>(150);

    // Random
    const [randMin, setRandMin] = useState<number>(1);
    const [randMax, setRandMax] = useState<number>(100);
    const [randCount, setRandCount] = useState<number>(5);
    const [randResults, setRandResults] = useState<number[]>([]);

    // Fraction
    const [fracNum, setFracNum] = useState<number>(12);
    const [fracDen, setFracDen] = useState<number>(16);

    // Unit Converter
    const [unitVal, setUnitVal] = useState<number>(10);
    const [unitCat, setUnitCat] = useState<'length' | 'weight' | 'data' | 'speed' | 'temperature'>('length');
    const [unitFrom, setUnitFrom] = useState<string>('m');
    const [unitTo, setUnitTo] = useState<string>('ft');

    // Date
    const [dateA, setDateA] = useState<string>(new Date().toISOString().split('T')[0]);
    const [dateB, setDateB] = useState<string>('2027-01-01');

    // Roman
    const [numVal, setNumVal] = useState<number>(2026);
    const [romanVal, setRomanVal] = useState<string>('MMXXVI');

    // Averages
    const [avgInput, setAvgInput] = useState<string>('12, 18, 25, 30, 42');

    return (
        <ToolCard
            title="Number & Math Utilities"
            description="Number base converter (Binary, Hex, Octal, BigInt), percentage calculator, random numbers, fractions, units, and dates."
            icon={<FiPercent className="w-5 h-5" />}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['base', 'percent', 'random', 'fraction', 'units', 'date', 'roman', 'averages'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            subTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* BASE CONVERTER */}
            {subTab === 'base' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">From Base</label>
                            <select
                                value={fromBase}
                                onChange={(e) => setFromBase(parseInt(e.target.value))}
                                className="w-full p-2 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-semibold"
                            >
                                <option value={10}>Decimal (Base 10)</option>
                                <option value={2}>Binary (Base 2)</option>
                                <option value={16}>Hexadecimal (Base 16)</option>
                                <option value={8}>Octal (Base 8)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">To Base</label>
                            <select
                                value={toBase}
                                onChange={(e) => setToBase(parseInt(e.target.value))}
                                className="w-full p-2 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-semibold"
                            >
                                <option value={16}>Hexadecimal (Base 16)</option>
                                <option value={2}>Binary (Base 2)</option>
                                <option value={10}>Decimal (Base 10)</option>
                                <option value={8}>Octal (Base 8)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Input Number</label>
                            <input
                                type="text"
                                value={baseInput}
                                onChange={(e) => setBaseInput(e.target.value)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                    <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex items-center justify-between">
                        <div>
                            <span className="text-[10px] font-bold uppercase text-gray-400 block">Converted Result:</span>
                            <span className="font-mono text-base font-bold text-purple-600 dark:text-purple-400">
                                {convertNumberBase(baseInput, fromBase, toBase)}
                            </span>
                        </div>
                        <CopyButton text={convertNumberBase(baseInput, fromBase, toBase)} />
                    </div>
                </div>
            )}

            {/* PERCENTAGES */}
            {subTab === 'percent' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Value A</label>
                            <input
                                type="number"
                                value={valA}
                                onChange={(e) => setValA(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Value B</label>
                            <input
                                type="number"
                                value={valB}
                                onChange={(e) => setValB(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                    {(() => {
                        const p = calculatePercentages(valA, valB);
                        return (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">{valA}% of {valB}</span>
                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{p.aPercentOfB}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">{valA} is what % of {valB}</span>
                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{p.aIsWhatPercentOfB.toFixed(2)}%</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">% Change ({valA} → {valB})</span>
                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{p.percentageChange.toFixed(2)}%</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">Price after {valB}% off</span>
                                    <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{p.discountedPrice}</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* RANDOM NUMBERS */}
            {subTab === 'random' && (
                <div>
                    <div className="grid grid-cols-3 gap-3 mb-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Min</label>
                            <input
                                type="number"
                                value={randMin}
                                onChange={(e) => setRandMin(parseInt(e.target.value) || 0)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Max</label>
                            <input
                                type="number"
                                value={randMax}
                                onChange={(e) => setRandMax(parseInt(e.target.value) || 100)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Count</label>
                            <input
                                type="number"
                                value={randCount}
                                onChange={(e) => setRandCount(parseInt(e.target.value) || 1)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                    <button
                        onClick={() => setRandResults(generateRandomNumbers({ min: randMin, max: randMax, count: randCount, unique: true, decimal: false, secure: true }))}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl mb-4"
                    >
                        Generate Random Numbers (Secure)
                    </button>
                    {randResults.length > 0 && (
                        <div className="p-4 bg-gray-50 dark:bg-black/20 rounded-2xl flex items-center justify-between font-mono text-sm">
                            <span>{randResults.join(', ')}</span>
                            <CopyButton text={randResults.join(', ')} />
                        </div>
                    )}
                </div>
            )}

            {/* FRACTIONS */}
            {subTab === 'fraction' && (
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="number"
                            value={fracNum}
                            onChange={(e) => setFracNum(parseInt(e.target.value) || 0)}
                            className="w-24 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-center"
                        />
                        <span className="font-bold text-lg text-gray-400">/</span>
                        <input
                            type="number"
                            value={fracDen}
                            onChange={(e) => setFracDen(parseInt(e.target.value) || 1)}
                            className="w-24 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-center"
                        />
                    </div>
                    {(() => {
                        const s = simplifyFraction(fracNum, fracDen);
                        return (
                            <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs font-semibold">
                                Simplified: <strong className="text-purple-600">{s.num} / {s.den}</strong> (Decimal: {(fracNum / fracDen).toFixed(4)})
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* UNITS */}
            {subTab === 'units' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Category</label>
                            <select
                                value={unitCat}
                                onChange={(e) => setUnitCat(e.target.value as 'length' | 'weight' | 'data' | 'speed' | 'temperature')}
                                className="w-full p-2 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-bold"
                            >
                                <option value="length">Length</option>
                                <option value="weight">Weight</option>
                                <option value="data">Data Storage</option>
                                <option value="speed">Speed</option>
                                <option value="temperature">Temperature</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Value</label>
                            <input
                                type="number"
                                value={unitVal}
                                onChange={(e) => setUnitVal(parseFloat(e.target.value) || 0)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">From</label>
                            <input
                                type="text"
                                value={unitFrom}
                                onChange={(e) => setUnitFrom(e.target.value)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                                placeholder="e.g. m, km, kg"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">To</label>
                            <input
                                type="text"
                                value={unitTo}
                                onChange={(e) => setUnitTo(e.target.value)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                                placeholder="e.g. ft, lb, MB"
                            />
                        </div>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs font-semibold">
                        Result: <strong className="text-purple-600">{convertUnits(unitVal, unitFrom, unitTo, unitCat)} {unitTo}</strong>
                    </div>
                </div>
            )}

            {/* DATE */}
            {subTab === 'date' && (
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Date A</label>
                            <input
                                type="date"
                                value={dateA}
                                onChange={(e) => setDateA(e.target.value)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1">Date B</label>
                            <input
                                type="date"
                                value={dateB}
                                onChange={(e) => setDateB(e.target.value)}
                                className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                            />
                        </div>
                    </div>
                    {(() => {
                        const diff = calculateDateDiff(new Date(dateA), new Date(dateB));
                        return (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">Days</span>
                                    <span className="font-bold text-sm">{diff.days}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">Weeks</span>
                                    <span className="font-bold text-sm">{diff.weeks}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">Months</span>
                                    <span className="font-bold text-sm">~{diff.months}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs">
                                    <span className="text-gray-400 block font-bold text-[10px]">Years</span>
                                    <span className="font-bold text-sm">~{diff.years}</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}

            {/* ROMAN */}
            {subTab === 'roman' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Number to Roman</label>
                        <input
                            type="number"
                            value={numVal}
                            onChange={(e) => setNumVal(parseInt(e.target.value) || 0)}
                            className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-2"
                        />
                        <div className="p-2.5 bg-gray-50 dark:bg-black/20 rounded-xl font-mono text-xs font-bold text-purple-600">
                            {toRoman(numVal)}
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-500 mb-1">Roman to Number</label>
                        <input
                            type="text"
                            value={romanVal}
                            onChange={(e) => setRomanVal(e.target.value)}
                            className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-2 uppercase"
                        />
                        <div className="p-2.5 bg-gray-50 dark:bg-black/20 rounded-xl font-mono text-xs font-bold text-purple-600">
                            {fromRoman(romanVal)}
                        </div>
                    </div>
                </div>
            )}

            {/* AVERAGES */}
            {subTab === 'averages' && (
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Comma-separated Numbers</label>
                    <input
                        type="text"
                        value={avgInput}
                        onChange={(e) => setAvgInput(e.target.value)}
                        className="w-full p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-3"
                    />
                    {(() => {
                        const parsed = avgInput.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
                        const avg = calculateAverages(parsed);
                        return (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                    <span className="text-gray-400 font-bold block">Mean (Average)</span>
                                    <span className="font-bold text-sm">{avg.mean.toFixed(2)}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                    <span className="text-gray-400 font-bold block">Median</span>
                                    <span className="font-bold text-sm">{avg.median}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                    <span className="text-gray-400 font-bold block">Mode</span>
                                    <span className="font-bold text-sm">{avg.mode.length > 0 ? avg.mode.join(', ') : 'None'}</span>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                                    <span className="text-gray-400 font-bold block">Geometric Mean</span>
                                    <span className="font-bold text-sm">{avg.geometric.toFixed(2)}</span>
                                </div>
                            </div>
                        );
                    })()}
                </div>
            )}
        </ToolCard>
    );
};

