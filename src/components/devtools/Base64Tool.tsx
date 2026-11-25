import React, { useState, useId } from 'react';
import { ToolCard, CopyButton, DownloadButton } from '@/components/devtools/ToolCard';
import { textToBase64, base64ToText, isValidBase64, parseDataUri, fileToBase64 } from '@/lib/devtools/base64Tools';
import { FiFileText, FiUpload, FiImage, FiCheck, FiX } from 'react-icons/fi';

export const Base64Tool: React.FC = () => {
    const fileInputId = useId();
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const [urlSafe, setUrlSafe] = useState<boolean>(false);
    const [input, setInput] = useState<string>('Hello World! 🌍');
    const [output, setOutput] = useState<string>('');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [fileInfo, setFileInfo] = useState<{ name: string; size: string; type: string } | null>(null);

    const handleProcess = () => {
        setImagePreview(null);
        if (mode === 'encode') {
            setOutput(textToBase64(input, urlSafe));
        } else {
            try {
                const parsedUri = parseDataUri(input);
                if (parsedUri && parsedUri.mimeType.startsWith('image/')) {
                    setImagePreview(input);
                } else if (input.startsWith('iVBORw0KGgo') || input.startsWith('/9j/')) {
                    setImagePreview(`data:image/png;base64,${input}`);
                }
                setOutput(base64ToText(input));
            } catch (e: unknown) {
                setOutput(`Decoding Error: ${(e instanceof Error ? e.message : String(e))}`);
            }
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileInfo({
            name: file.name,
            size: `${(file.size / 1024).toFixed(2)} KB`,
            type: file.type || 'unknown'
        });

        try {
            const dataUri = await fileToBase64(file);
            if (file.type.startsWith('image/')) {
                setImagePreview(dataUri);
            }
            if (mode === 'encode') {
                setOutput(dataUri);
            } else {
                setInput(dataUri);
            }
        } catch (err: unknown) {
            setOutput(`Error reading file: ${(err instanceof Error ? err.message : String(err))}`);
        }
    };

    const isValid = mode === 'decode' ? isValidBase64(input) : true;

    return (
        <ToolCard
            title="Base64 Encoder / Decoder"
            description="Encode & decode text, images, Data URIs, files, and URL-safe Base64."
            icon={<FiFileText className="w-5 h-5" />}
            onClear={() => { setInput(''); setOutput(''); setImagePreview(null); setFileInfo(null); }}
            onReset={() => {
                setInput('Hello World! 🌍');
                setOutput('');
                setImagePreview(null);
                setFileInfo(null);
            }}
        >
            <div className="flex flex-wrap items-center gap-3 mb-4 pb-4 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-1 bg-gray-100 dark:bg-white/10 p-1 rounded-2xl">
                    <button
                        onClick={() => { setMode('encode'); setOutput(''); }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            mode === 'encode' ? 'bg-white dark:bg-gray-800 text-purple-600 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                        }`}
                    >
                        Encode
                    </button>
                    <button
                        onClick={() => { setMode('decode'); setOutput(''); }}
                        className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                            mode === 'decode' ? 'bg-white dark:bg-gray-800 text-purple-600 shadow-sm' : 'text-gray-600 dark:text-gray-300'
                        }`}
                    >
                        Decode
                    </button>
                </div>

                {mode === 'encode' && (
                    <label className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={urlSafe}
                            onChange={(e) => setUrlSafe(e.target.checked)}
                            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <span>URL-safe Base64</span>
                    </label>
                )}

                <button
                    onClick={handleProcess}
                    className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                >
                    Run {mode === 'encode' ? 'Encode' : 'Decode'}
                </button>

                <div className="ml-auto">
                    <label htmlFor={fileInputId} className="cursor-pointer text-xs flex items-center gap-1 text-purple-600 dark:text-purple-400 hover:underline">
                        <FiUpload className="w-3.5 h-3.5" />
                        <span>Upload File</span>
                        <input
                            id={fileInputId}
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                    </label>
                </div>
            </div>

            {fileInfo && (
                <div className="mb-4 p-3 bg-gray-50 dark:bg-black/20 rounded-xl text-xs flex items-center gap-4 text-gray-600 dark:text-gray-300">
                    <span>File: <strong>{fileInfo.name}</strong></span>
                    <span>Size: <strong>{fileInfo.size}</strong></span>
                    <span>Type: <strong>{fileInfo.type}</strong></span>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                            {mode === 'encode' ? 'Plain Text / Input' : 'Base64 Input'}
                        </span>
                        {mode === 'decode' && input && (
                            <span className={`text-[11px] flex items-center gap-1 ${isValid ? 'text-emerald-500' : 'text-red-500'}`}>
                                {isValid ? <FiCheck /> : <FiX />} {isValid ? 'Valid Base64' : 'Invalid Base64'}
                            </span>
                        )}
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
                        rows={10}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 dark:text-gray-200"
                    />
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Output</span>
                        {output && (
                            <div className="flex items-center gap-2">
                                <CopyButton text={output} />
                                <DownloadButton filename={mode === 'encode' ? 'encoded.txt' : 'decoded.txt'} content={output} />
                            </div>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="Result will appear here..."
                        rows={10}
                        className="w-full p-3 font-mono text-xs bg-gray-50 dark:bg-black/30 border border-black/5 dark:border-white/10 rounded-2xl text-gray-800 dark:text-gray-200"
                    />
                </div>
            </div>

            {imagePreview && (
                <div className="mt-4 p-4 border border-black/5 dark:border-white/10 rounded-2xl flex flex-col items-center">
                    <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1">
                        <FiImage /> Image Preview
                    </div>
                    <img src={imagePreview} alt="Base64 Preview" className="max-h-48 rounded-xl object-contain shadow-sm" />
                </div>
            )}
        </ToolCard>
    );
};

