import React, { useState } from 'react';
import { ToolCard, CopyButton } from '@/components/devtools/ToolCard';
import {
    calculateHash,
    generateHmac,
    encryptAesGcm,
    decryptAesGcm,
    maskSensitiveText,
    generateSecureToken
} from '@/lib/devtools/securityTools';
import { FiShield } from 'react-icons/fi';

export const SecuritySuiteTool: React.FC = () => {
    const [subTab, setSubTab] = useState<'hash' | 'hmac' | 'aes' | 'mask' | 'token'>('hash');

    // Hash state
    const [hashInput, setHashInput] = useState<string>('Hello Security! 🔒');
    const [hashResults, setHashResults] = useState<{ sha256: string; sha512: string }>({ sha256: '', sha512: '' });

    // HMAC
    const [hmacMsg, setHmacMsg] = useState<string>('payload-data');
    const [hmacSecret, setHmacSecret] = useState<string>('my-secret-key');
    const [hmacResult, setHmacResult] = useState<string>('');

    // AES
    const [aesInput, setAesInput] = useState<string>('Confidential payload to encrypt');
    const [aesPassword, setAesPassword] = useState<string>('Password123!');
    const [aesOutput, setAesOutput] = useState<string>('');

    // Masking
    const [maskInput, setMaskInput] = useState<string>(
        'Contact john.doe@example.com or call +62 812-3456-7890. Card: 4111 2222 3333 4444'
    );

    // Tokens
    const [tokenLength, setTokenLength] = useState<number>(32);
    const [tokenFormat, setTokenFormat] = useState<'hex' | 'base64' | 'urlsafe'>('hex');
    const [generatedToken, setGeneratedToken] = useState<string>('');

    const runHashes = async () => {
        const s256 = await calculateHash(hashInput, 'SHA-256');
        const s512 = await calculateHash(hashInput, 'SHA-512');
        setHashResults({ sha256: s256, sha512: s512 });
    };

    const runHmac = async () => {
        const res = await generateHmac(hmacMsg, hmacSecret, 'SHA-256');
        setHmacResult(res.hex);
    };

    const handleAesEncrypt = async () => {
        try {
            const encrypted = await encryptAesGcm(aesInput, aesPassword);
            setAesOutput(encrypted);
        } catch (e: any) {
            setAesOutput(`Encryption error: ${e.message}`);
        }
    };

    const handleAesDecrypt = async () => {
        try {
            const decrypted = await decryptAesGcm(aesOutput, aesPassword);
            setAesOutput(decrypted);
        } catch (e: any) {
            setAesOutput(`Decryption error: ${e.message}`);
        }
    };

    React.useEffect(() => {
        runHashes();
    }, [hashInput]);

    return (
        <ToolCard
            title="Privacy, Security & Cryptography Suite"
            description="100% Client-side hashing (SHA-256/512), HMAC generation, AES-256-GCM encryption/decryption, PII text masking, and secure token generator."
            icon={<FiShield className="w-5 h-5" />}
        >
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                {(['hash', 'hmac', 'aes', 'mask', 'token'] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setSubTab(tab)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                            subTab === tab ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                        {tab === 'aes' ? 'AES-GCM' : tab === 'mask' ? 'PII Masking' : tab}
                    </button>
                ))}
            </div>

            {/* HASHES */}
            {subTab === 'hash' && (
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Text to Hash</label>
                    <input
                        type="text"
                        value={hashInput}
                        onChange={(e) => setHashInput(e.target.value)}
                        className="w-full p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-4"
                    />
                    <div className="space-y-3">
                        <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] uppercase font-bold text-gray-400">SHA-256</span>
                                <CopyButton text={hashResults.sha256} />
                            </div>
                            <div className="font-mono text-xs break-all text-purple-600 dark:text-purple-400 font-semibold">{hashResults.sha256}</div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] uppercase font-bold text-gray-400">SHA-512</span>
                                <CopyButton text={hashResults.sha512} />
                            </div>
                            <div className="font-mono text-xs break-all text-purple-600 dark:text-purple-400 font-semibold">{hashResults.sha512}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* HMAC */}
            {subTab === 'hmac' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <input
                            type="text"
                            value={hmacMsg}
                            onChange={(e) => setHmacMsg(e.target.value)}
                            placeholder="Message"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                        <input
                            type="text"
                            value={hmacSecret}
                            onChange={(e) => setHmacSecret(e.target.value)}
                            placeholder="Secret Key"
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                    </div>
                    <button
                        onClick={runHmac}
                        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl mb-4"
                    >
                        Compute HMAC (SHA-256)
                    </button>
                    {hmacResult && (
                        <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl flex items-center justify-between font-mono text-xs break-all">
                            <span>{hmacResult}</span>
                            <CopyButton text={hmacResult} />
                        </div>
                    )}
                </div>
            )}

            {/* AES */}
            {subTab === 'aes' && (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        <textarea
                            value={aesInput}
                            onChange={(e) => setAesInput(e.target.value)}
                            placeholder="Data to encrypt or decrypt..."
                            rows={3}
                            className="p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl"
                        />
                        <div>
                            <input
                                type="password"
                                value={aesPassword}
                                onChange={(e) => setAesPassword(e.target.value)}
                                placeholder="Passphrase"
                                className="w-full p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-3"
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleAesEncrypt}
                                    className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                                >
                                    Encrypt
                                </button>
                                <button
                                    onClick={handleAesDecrypt}
                                    className="flex-1 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-bold rounded-xl"
                                >
                                    Decrypt
                                </button>
                            </div>
                        </div>
                    </div>
                    {aesOutput && (
                        <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] uppercase font-bold text-gray-400">AES-GCM Result:</span>
                                <CopyButton text={aesOutput} />
                            </div>
                            <div className="font-mono text-xs break-all text-purple-600 dark:text-purple-400">{aesOutput}</div>
                        </div>
                    )}
                </div>
            )}

            {/* MASKING */}
            {subTab === 'mask' && (
                <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1">Sensitive Text</label>
                    <textarea
                        value={maskInput}
                        onChange={(e) => setMaskInput(e.target.value)}
                        rows={3}
                        className="w-full p-2.5 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl mb-3"
                    />
                    <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Masked Result (Email, Phone, CC):</span>
                        <div className="font-mono text-xs text-gray-800 dark:text-gray-200">{maskSensitiveText(maskInput, 'all')}</div>
                    </div>
                </div>
            )}

            {/* TOKEN */}
            {subTab === 'token' && (
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <select
                            value={tokenFormat}
                            onChange={(e) => setTokenFormat(e.target.value as any)}
                            className="p-2 bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-xs font-bold"
                        >
                            <option value="hex">HEX</option>
                            <option value="base64">Base64</option>
                            <option value="urlsafe">URL-safe</option>
                        </select>
                        <input
                            type="number"
                            min={16}
                            max={128}
                            value={tokenLength}
                            onChange={(e) => setTokenLength(parseInt(e.target.value) || 32)}
                            className="w-20 p-2 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-xl text-center"
                        />
                        <button
                            onClick={() => setGeneratedToken(generateSecureToken(tokenLength, tokenFormat))}
                            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl"
                        >
                            Generate Token
                        </button>
                    </div>
                    {generatedToken && (
                        <div className="p-3 bg-gray-50 dark:bg-black/20 rounded-xl flex items-center justify-between font-mono text-xs break-all">
                            <span>{generatedToken}</span>
                            <CopyButton text={generatedToken} />
                        </div>
                    )}
                </div>
            )}
        </ToolCard>
    );
};

