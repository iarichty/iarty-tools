import HelmetContainer from '@/components/HelmetContainer';
import { TextSuiteTool } from '@/components/devtools/TextSuiteTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiType } from 'react-icons/fi';

export default function TextToolsPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Text, Diff & String Utilities — IARTY Tools"
                description="Character and word counter, case converters (camelCase, snake_case, PascalCase, kebab-case), URL slug generator, duplicate line remover, and visual text diff."
                path="/developer/text"
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
                        <FiType className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Text & String Utilities Suite
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Analyze text stats, convert letter casing, generate clean URL slugs, remove duplicate rows, and inspect line-by-line diffs.
                        </p>
                    </div>
                </div>
            </div>

            <TextSuiteTool />
        </div>
    );
}

