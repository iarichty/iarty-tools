import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import { FiLayout, FiCheckCircle } from 'react-icons/fi';

export const CssEverydaySuiteTool: React.FC = () => {
    const [subTab, setSubTab] = useState<'shadow' | 'radius' | 'flex' | 'decision'>('shadow');

    // Box Shadow
    const [hOffset] = useState<number>(0);
    const [vOffset, setVOffset] = useState<number>(10);
    const [blur, setBlur] = useState<number>(25);
    const [spread, setSpread] = useState<number>(-5);
    const [shadowColor] = useState<string>('rgba(0,0,0,0.15)');

    // Radius
    const [radiusTL, setRadiusTL] = useState<number>(24);
    const [radiusTR, setRadiusTR] = useState<number>(24);
    const [radiusBR, setRadiusBR] = useState<number>(24);
    const [radiusBL, setRadiusBL] = useState<number>(24);

    // Decision Maker
    const [decisionOptions, setDecisionOptions] = useState<string>('Yes\nNo\nMaybe');
    const [pickedDecision, setPickedDecision] = useState<string>('');

    const shadowCss = `box-shadow: ${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor};`;
    const radiusCss = `border-radius: ${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px;`;

    const handlePickDecision = () => {
        const opts = decisionOptions.split('\n').map(s => s.trim()).filter(Boolean);
        if (opts.length > 0) {
            const rand = opts[Math.floor(Math.random() * opts.length)];
            setPickedDecision(rand);
        }
    };

    return (
        <ToolCard
            title="CSS Generators & Everyday Decision Helpers"
            description="Interactive CSS box-shadow generator, custom border-radius tuner, flexbox preview, and randomized decision maker."
            icon={<FiLayout className="w-5 h-5" />}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['shadow', 'radius', 'decision'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            subTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab === 'shadow' ? 'Box Shadow' : tab === 'radius' ? 'Border Radius' : 'Decision Maker'}
                    </button>
                ))}
            </div>

            {/* BOX SHADOW */}
            {subTab === 'shadow' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3">
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>V-Offset: {vOffset}px</span>
                        </div>
                        <input
                            type="range"
                            min={-50}
                            max={50}
                            value={vOffset}
                            onChange={(e) => setVOffset(parseInt(e.target.value))}
                            className="w-full accent-purple-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>Blur: {blur}px</span>
                        </div>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={blur}
                            onChange={(e) => setBlur(parseInt(e.target.value))}
                            className="w-full accent-purple-600"
                        />
                        <div className="flex justify-between text-xs font-bold text-gray-500">
                            <span>Spread: {spread}px</span>
                        </div>
                        <input
                            type="range"
                            min={-30}
                            max={50}
                            value={spread}
                            onChange={(e) => setSpread(parseInt(e.target.value))}
                            className="w-full accent-purple-600"
                        />
                        <div className="flex items-center justify-between pt-2">
                            <span className="font-mono text-xs text-gray-600 dark:text-gray-300">{shadowCss}</span>
                            <CopyButton text={shadowCss} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-12 bg-gray-50 dark:bg-black/20 rounded-3xl">
                        <div
                            className="w-36 h-36 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center font-bold text-xs text-gray-500"
                            style={{ boxShadow: `${hOffset}px ${vOffset}px ${blur}px ${spread}px ${shadowColor}` }}
                        >
                            Preview
                        </div>
                    </div>
                </div>
            )}

            {/* BORDER RADIUS */}
            {subTab === 'radius' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                            <span className="font-bold text-gray-500 block mb-1">Top Left: {radiusTL}px</span>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={radiusTL}
                                onChange={(e) => setRadiusTL(parseInt(e.target.value))}
                                className="w-full accent-purple-600"
                            />
                        </div>
                        <div>
                            <span className="font-bold text-gray-500 block mb-1">Top Right: {radiusTR}px</span>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={radiusTR}
                                onChange={(e) => setRadiusTR(parseInt(e.target.value))}
                                className="w-full accent-purple-600"
                            />
                        </div>
                        <div>
                            <span className="font-bold text-gray-500 block mb-1">Bottom Left: {radiusBL}px</span>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={radiusBL}
                                onChange={(e) => setRadiusBL(parseInt(e.target.value))}
                                className="w-full accent-purple-600"
                            />
                        </div>
                        <div>
                            <span className="font-bold text-gray-500 block mb-1">Bottom Right: {radiusBR}px</span>
                            <input
                                type="range"
                                min={0}
                                max={100}
                                value={radiusBR}
                                onChange={(e) => setRadiusBR(parseInt(e.target.value))}
                                className="w-full accent-purple-600"
                            />
                        </div>
                        <div className="col-span-2 pt-2 flex items-center justify-between">
                            <span className="font-mono text-xs text-gray-600 dark:text-gray-300">{radiusCss}</span>
                            <CopyButton text={radiusCss} />
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-12 bg-gray-50 dark:bg-black/20 rounded-3xl">
                        <div
                            className="w-36 h-36 bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-lg"
                            style={{ borderRadius: `${radiusTL}px ${radiusTR}px ${radiusBR}px ${radiusBL}px` }}
                        >
                            Shape
                        </div>
                    </div>
                </div>
            )}

            {/* DECISION MAKER */}
            {subTab === 'decision' && (
                <div className="space-y-4">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Options (one choice per line)</label>
                    <textarea
                        value={decisionOptions}
                        onChange={(e) => setDecisionOptions(e.target.value)}
                        rows={4}
                        className="w-full p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                    />
                    <button
                        onClick={handlePickDecision}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                    >
                        Roll / Decide Randomly
                    </button>
                    {pickedDecision && (
                        <div className="p-4 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 rounded-2xl flex items-center gap-3">
                            <FiCheckCircle className="w-6 h-6 text-purple-600" />
                            <div>
                                <span className="text-[10px] uppercase font-bold text-gray-400 block">Picked Decision:</span>
                                <span className="text-lg font-black text-purple-700 dark:text-purple-300">{pickedDecision}</span>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </ToolCard>
    );
};
