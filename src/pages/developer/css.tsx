import HelmetContainer from '@/components/HelmetContainer';
import { CssEverydaySuiteTool } from '@/components/devtools/CssEverydaySuiteTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLayout } from 'react-icons/fi';

export default function CssPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="CSS Box Shadow & Border Radius Generator — IARTY Tools"
                description="Interactive CSS box-shadow generator, border-radius customizer, and randomized decision maker with live preview."
                path="/developer/css"
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
                        <FiLayout className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            CSS Generators & Utilities
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Tune box shadows, custom organic border radii, and roll random decisions with immediate CSS snippet export.
                        </p>
                    </div>
                </div>
            </div>

            <CssEverydaySuiteTool />
        </div>
    );
}

