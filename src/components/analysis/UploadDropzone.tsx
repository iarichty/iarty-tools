import { useId, useRef, useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiZap } from 'react-icons/fi';
import type { AnalysisProgress } from '@/hooks/useAnalysis';
import { useI18n } from '@/context/useI18n';

interface Props {
    title: string;
    description: string;
    buttonLabel: string;
    isLoading: boolean;
    onFile: (file: File) => void;
    /** Visual accent classes for the icon tile (gradient). */
    accentClassName: string;
    /** Border colour when dragging a file over the dropzone. */
    dragClassName: string;
    /** Optional progress snapshot emitted by the worker. */
    progress?: AnalysisProgress | null;
    /** Called when the user wants to explore the app with sample data. */
    onDemo?: () => void;
    icon?: ReactNode;
}

/**
 * Accessible upload dropzone with real drag-and-drop support.
 *
 * The visible element is a `<label>` tied to a visually-hidden file input, so
 * it is reachable and activatable from the keyboard. While the worker runs, a
 * real progress bar reflects each parsing stage.
 */
export default function UploadDropzone({
    title,
    description,
    buttonLabel,
    isLoading,
    onFile,
    accentClassName,
    dragClassName,
    progress,
    onDemo,
    icon,
}: Props) {
    const { t } = useI18n();
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleFiles = (files: FileList | null) => {
        const file = files?.[0];
        if (file) onFile(file);
    };

    const stageLabel = (() => {
        if (!progress) return t('common.processing');
        if (progress.stage === 'unzipping') return t('upload.progress.unzipping');
        return t('upload.progress.parsing');
    })();

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <label
                htmlFor={inputId}
                onDragOver={(e) => {
                    e.preventDefault();
                    if (!isLoading) setIsDragging(true);
                }}
                onDragLeave={(e) => {
                    e.preventDefault();
                    // Ignore leaves that are actually moves between children.
                    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setIsDragging(false);
                    }
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    if (!isLoading) handleFiles(e.dataTransfer.files);
                }}
                className={`relative flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed border-[var(--line)] bg-[var(--card)] p-10 md:p-14 text-center transition-all hover:border-[var(--blue)] ${
                    isDragging ? `${dragClassName} border-[var(--blue)] ring-4 ring-[var(--blue)]/10` : ''
                } ${isLoading ? 'cursor-wait opacity-90' : ''}`}
            >
                <div
                    className={`mb-5 flex h-16 w-16 items-center justify-center rounded-xl shadow-xs ${accentClassName}`}
                >
                    {icon ?? <FiUploadCloud className="h-8 w-8 text-white" />}
                </div>
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-[var(--fg)]">{title}</h3>
                <p className="mx-auto mb-6 max-w-sm text-sm text-[var(--mut)] leading-relaxed">
                    {description}
                </p>

                <input
                    id={inputId}
                    ref={inputRef}
                    type="file"
                    accept=".zip"
                    className="sr-only"
                    disabled={isLoading}
                    onChange={(e) => {
                        handleFiles(e.target.files);
                        // Allow re-selecting the same file.
                        e.target.value = '';
                    }}
                />

                <span className="inline-flex items-center gap-2 rounded-md bg-[var(--blue)] px-6 py-3 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-[#0551b5] active:scale-98">
                    {isLoading ? t('upload.progress.reading') : buttonLabel}
                </span>

                {isLoading && (
                    <div className="mt-6 w-full max-w-sm" aria-live="polite">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-[var(--mut)]">
                            <span>{stageLabel}</span>
                            <span className="tabular-nums">
                                {Math.round(progress?.percent ?? 0)}%
                            </span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--line)]">
                            <div
                                className="h-full rounded-full bg-[var(--blue)] transition-[width] duration-200"
                                style={{ width: `${Math.max(3, progress?.percent ?? 0)}%` }}
                            />
                        </div>
                    </div>
                )}
            </label>

            {onDemo && !isLoading && (
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={onDemo}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--mut)] transition-colors hover:text-[var(--blue)] underline-offset-4 hover:underline"
                    >
                        <FiZap />
                        {t('home.demo')}
                    </button>
                </div>
            )}
        </motion.div>
    );
}
