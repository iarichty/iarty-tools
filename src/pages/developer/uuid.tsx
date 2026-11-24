import HelmetContainer from '@/components/HelmetContainer';
import { UuidGeneratorTool } from '@/components/devtools/UuidGeneratorTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLayers } from 'react-icons/fi';

export default function UuidPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="UUID Generator & Validator (v1, v4, v5, v7) — IARTY Tools"
                description="Generate bulk UUIDs (v1 timestamp, v4 random, v5 SHA-1, v7 time-sortable). Export to SQL, CSV, JSON, and JavaScript."
                path="/developer/uuid"
                faq={[
                    {
                        question: 'What is UUID v7?',
                        answer: 'UUID v7 is a time-ordered UUID format ideal for database primary keys, providing sequential ordering and improved index performance.'
                    }
                ]}
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
                        <FiLayers className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            UUID Generator & Validator
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Generate standard UUIDs v1, v4, v5, and v7 with custom prefixes, bulk generation, and multiple export formats.
                        </p>
                    </div>
                </div>
            </div>

            <UuidGeneratorTool />
        </div>
    );
}
