import React, { useState } from 'react';
import { FiCopy, FiCheck, FiDownload, FiTrash2, FiRotateCcw } from 'react-icons/fi';

interface ToolCardProps {
    title: string;
    description: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
    badge?: string;
    actions?: React.ReactNode;
    onReset?: () => void;
    onClear?: () => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({
    title,
    description,
    icon,
    children,
    badge,
    actions,
    onReset,
    onClear
}) => {
    return (
        <div className="bg-white dark:bg-gray-900 border border-black/5 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/5 dark:border-white/10">
                <div className="flex items-center gap-3.5">
                    {icon && (
                        <div className="p-3 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 rounded-2xl">
                            {icon}
                        </div>
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
                            {badge && (
                                <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                                    {badge}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    {actions}
                    {onReset && (
                        <button
                            onClick={onReset}
                            title="Reset settings"
                            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            <FiRotateCcw className="w-4 h-4" />
                        </button>
                    )}
                    {onClear && (
                        <button
                            onClick={onClear}
                            title="Clear"
                            className="p-2 text-red-500 hover:text-red-700 rounded-xl hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                        >
                            <FiTrash2 className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>

            <div className="mt-6">{children}</div>
        </div>
    );
};

export const CopyButton: React.FC<{ text: string; label?: string; className?: string }> = ({
    text,
    label = 'Copy',
    className = ''
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs transition-all ${
                copied
                    ? 'bg-emerald-500 text-white shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/15 text-gray-700 dark:text-gray-200'
            } ${className}`}
        >
            {copied ? <FiCheck className="w-3.5 h-3.5" /> : <FiCopy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : label}</span>
        </button>
    );
};

export const DownloadButton: React.FC<{
    filename: string;
    content: string;
    mimeType?: string;
    label?: string;
    className?: string;
}> = ({ filename, content, mimeType = 'text/plain', label = 'Download', className = '' }) => {
    const handleDownload = () => {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-medium text-xs bg-purple-600 hover:bg-purple-700 text-white transition-all shadow-sm ${className}`}
        >
            <FiDownload className="w-3.5 h-3.5" />
            <span>{label}</span>
        </button>
    );
};

