import HelmetContainer from '@/components/HelmetContainer';
import { MathSuiteTool } from '@/components/devtools/MathSuiteTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiPercent } from 'react-icons/fi';

export default function MathPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Number & Math Utilities (Base, Units, Dates) — IARTY Tools"
                description="Number base converter with BigInt support, percentage calculators, random numbers, fraction simplifier, unit converters, and date differences."
                path="/developer/math"
            />

            <div className="mb-6">
                <Link
                    to="/developer"
                    className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--mut)] hover:text-[var(--blue)] transition-colors mb-4"
                >
                    <FiArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Developer Tools</span>
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/40 text-[var(--blue)] rounded-xl">
                        <FiPercent className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Number & Math Utilities Suite
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Base conversion (Binary, Hex, Octal, BigInt), percentages, secure random numbers, fractions, units, and dates.
                        </p>
                    </div>
                </div>
            </div>

            <MathSuiteTool />
        </div>
    );
}
