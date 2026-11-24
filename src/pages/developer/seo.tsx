import HelmetContainer from '@/components/HelmetContainer';
import { WebSeoSuiteTool } from '@/components/devtools/WebSeoSuiteTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';

export default function SeoPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Web & SEO Tools Suite (OG, SERP, Sitemap, Robots) — IARTY Tools"
                description="Generate Open Graph & Twitter meta tags, preview Google SERP snippets, generate sitemap.xml and robots.txt, and check WCAG color contrast."
                path="/developer/seo"
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
                        <FiSearch className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Web & SEO Tools Suite
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Generate social meta tags, preview SERP snippets on desktop/mobile, configure robots.txt, and validate contrast accessibility.
                        </p>
                    </div>
                </div>
            </div>

            <WebSeoSuiteTool />
        </div>
    );
}
