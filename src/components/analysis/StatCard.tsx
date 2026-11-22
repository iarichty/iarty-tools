import type { ReactNode } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface Props {
    label: string;
    value: number | string;
    accent: string;
    icon: ReactNode;
    /** When true, render the value verbatim (e.g. a ratio) instead of counting up. */
    isRatio?: boolean;
}

/** A single summary metric tile. */
export default function StatCard({ label, value, accent, icon, isRatio }: Props) {
    return (
        <div className="rounded-xl border border-[var(--line)] bg-[var(--card)] p-5 shadow-xs transition-colors">
            <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-[var(--mut)]">
                    {label}
                </p>
                <span className="text-lg" style={{ color: accent }} aria-hidden>
                    {icon}
                </span>
            </div>
            <h3 className="text-3xl font-bold tabular-nums" style={{ color: accent }}>
                {isRatio ? value : <AnimatedNumber value={Number(value)} />}
            </h3>
        </div>
    );
}
