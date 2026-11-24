import React, { useState } from 'react';
import { ToolCard, CopyButton, DownloadButton } from '@/components/devtools/ToolCard';
import {
    generatePassword,
    generatePassphrase,
    generatePin,
    analyzePasswordStrength,
    type PasswordConfig
} from '@/lib/devtools/passwordTools';
import { FiLock, FiRefreshCw, FiEye, FiEyeOff } from 'react-icons/fi';

export const PasswordGeneratorTool: React.FC = () => {
    const [mode, setMode] = useState<'password' | 'passphrase' | 'pin'>('password');
    const [config, setConfig] = useState<PasswordConfig>({
        length: 16,
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true,
        excludeSimilar: true,
        excludeAmbiguous: false,
        startWithLetter: true,
        requireNumber: true,
        requireSymbol: true,
        noRepeating: false
    });
    const [wordCount, setWordCount] = useState<number>(4);
    const [pinLength, setPinLength] = useState<number>(6);
    const [bulkCount, setBulkCount] = useState<number>(1);
    const [passwords, setPasswords] = useState<string[]>(['']);
    const [showPassword, setShowPassword] = useState<boolean>(true);

    const generateCurrent = () => {
        const count = Math.max(1, Math.min(50, bulkCount));
        const list: string[] = [];
        for (let i = 0; i < count; i++) {
            if (mode === 'password') {
                list.push(generatePassword(config));
            } else if (mode === 'passphrase') {
                list.push(generatePassphrase(wordCount));
            } else {
                list.push(generatePin(pinLength));
            }
        }
        setPasswords(list);
    };

    React.useEffect(() => {
        generateCurrent();
    }, [mode, config.length, wordCount, pinLength]);

    const primaryPassword = passwords[0] || '';
    const strength = analyzePasswordStrength(primaryPassword);

    const getStrengthColor = () => {
        switch (strength.label) {
            case 'Very Strong': return 'bg-emerald-500';
            case 'Strong': return 'bg-green-500';
            case 'Good': return 'bg-blue-500';
            case 'Fair': return 'bg-amber-500';
            default: return 'bg-red-500';
        }
    };

    return (
        <ToolCard
            title="Password & Passphrase Generator"
            description="Generate random, memorable passphrases, numeric PINs with entropy analysis and crack time estimation."
            icon={<FiLock className="w-5 h-5" />}
            onReset={() => {
                setConfig({
                    length: 16,
                    uppercase: true,
                    lowercase: true,
                    numbers: true,
                    symbols: true,
                    excludeSimilar: true,
                    excludeAmbiguous: false,
                    startWithLetter: true,
                    requireNumber: true,
                    requireSymbol: true,
                    noRepeating: false
                });
                setMode('password');
            }}
        >
            {/* Mode selection */}
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[var(--line)]">
                <button
                    onClick={() => setMode('password')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        mode === 'password' ? 'bg-[var(--blue)] text-white shadow-xs' : 'bg-[var(--soft)] text-[var(--mut)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                >
                    Random Password
                </button>
                <button
                    onClick={() => setMode('passphrase')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        mode === 'passphrase' ? 'bg-[var(--blue)] text-white shadow-xs' : 'bg-[var(--soft)] text-[var(--mut)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                >
                    Memorable Passphrase
                </button>
                <button
                    onClick={() => setMode('pin')}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                        mode === 'pin' ? 'bg-[var(--blue)] text-white shadow-xs' : 'bg-[var(--soft)] text-[var(--mut)] hover:text-[var(--fg)] border border-[var(--line)]'
                    }`}
                >
                    Numeric PIN
                </button>

                <button
                    onClick={generateCurrent}
                    className="ml-auto p-2 text-[var(--blue)] hover:bg-[var(--soft)] rounded-lg transition-colors"
                    title="Regenerate"
                >
                    <FiRefreshCw className="w-4 h-4" />
                </button>
            </div>

            {/* Main Generated Display */}
            <div className="p-4 bg-[var(--soft)] border border-[var(--line)] rounded-xl mb-4">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[var(--mut)] uppercase tracking-wider">Generated Output</span>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="p-1.5 text-[var(--mut)] hover:text-[var(--fg)]"
                        >
                            {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                        <CopyButton text={primaryPassword} />
                    </div>
                </div>
                <div className="font-mono text-base sm:text-lg font-bold break-all text-[var(--blue)] select-all">
                    {showPassword ? primaryPassword : '•'.repeat(primaryPassword.length)}
                </div>

                {/* Strength Meter */}
                <div className="mt-4 pt-3 border-t border-[var(--line)]">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-[var(--fg)]">
                            Strength: <span className="font-bold">{strength.label}</span> ({strength.entropy} bits entropy)
                        </span>
                        <span className="text-[var(--mut)]">Crack Time: ~{strength.crackTime}</span>
                    </div>
                    <div className="w-full h-2 bg-[var(--line)] rounded-full overflow-hidden">
                        <div
                            className={`h-full ${getStrengthColor()} transition-all duration-300`}
                            style={{ width: `${Math.min(100, (strength.entropy / 100) * 100)}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Customizer */}
            {mode === 'password' && (
                <div className="space-y-4">
                    <div>
                        <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                            <span>Length: {config.length}</span>
                            <span className="text-gray-400">(4 - 128)</span>
                        </div>
                        <input
                            type="range"
                            min={4}
                            max={128}
                            value={config.length}
                            onChange={(e) => setConfig({ ...config, length: parseInt(e.target.value) })}
                            className="w-full accent-blue-600"
                        />
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.uppercase}
                                onChange={(e) => setConfig({ ...config, uppercase: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>Uppercase (A-Z)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.lowercase}
                                onChange={(e) => setConfig({ ...config, lowercase: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>Lowercase (a-z)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.numbers}
                                onChange={(e) => setConfig({ ...config, numbers: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>Numbers (0-9)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.symbols}
                                onChange={(e) => setConfig({ ...config, symbols: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>Symbols (!@#$)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.excludeSimilar}
                                onChange={(e) => setConfig({ ...config, excludeSimilar: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>No Similar (i, l, 1, O, 0)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={config.startWithLetter}
                                onChange={(e) => setConfig({ ...config, startWithLetter: e.target.checked })}
                                className="rounded text-purple-600"
                            />
                            <span>Start with letter</span>
                        </label>
                    </div>
                </div>
            )}

            {mode === 'passphrase' && (
                <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        <span>Word Count: {wordCount}</span>
                    </div>
                    <input
                        type="range"
                        min={3}
                        max={10}
                        value={wordCount}
                        onChange={(e) => setWordCount(parseInt(e.target.value))}
                        className="w-full accent-purple-600"
                    />
                </div>
            )}

            {mode === 'pin' && (
                <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                        <span>PIN Digits: {pinLength}</span>
                    </div>
                    <input
                        type="range"
                        min={4}
                        max={16}
                        value={pinLength}
                        onChange={(e) => setPinLength(parseInt(e.target.value))}
                        className="w-full accent-purple-600"
                    />
                </div>
            )}

            {/* Bulk Generator Option */}
            <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/10 flex items-center gap-3">
                <span className="text-xs text-gray-500 font-bold uppercase">Generate Bulk:</span>
                <input
                    type="number"
                    min={1}
                    max={50}
                    value={bulkCount}
                    onChange={(e) => setBulkCount(parseInt(e.target.value) || 1)}
                    className="w-16 p-1.5 text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-lg text-center"
                />
                <button
                    onClick={generateCurrent}
                    className="px-3 py-1.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-bold rounded-lg"
                >
                    Batch Run
                </button>
                {passwords.length > 1 && (
                    <DownloadButton
                        filename="passwords.txt"
                        content={passwords.join('\n')}
                        className="ml-auto"
                    />
                )}
            </div>

            {passwords.length > 1 && (
                <div className="mt-3 max-h-40 overflow-y-auto space-y-1 p-2 bg-gray-50 dark:bg-black/30 rounded-xl text-xs font-mono">
                    {passwords.map((pw, i) => (
                        <div key={i} className="flex justify-between items-center py-0.5">
                            <span className="truncate mr-2">{pw}</span>
                            <CopyButton text={pw} label="Copy" />
                        </div>
                    ))}
                </div>
            )}
        </ToolCard>
    );
};
