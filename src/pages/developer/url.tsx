import HelmetContainer from '@/components/HelmetContainer';
import { UrlEncoderTool } from '@/components/devtools/UrlEncoderTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLink } from 'react-icons/fi';

export default function UrlToolsPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="URL Encoder, Decoder & UTM Cleaner — IARTY Tools"
                description="Encode and decode URLs and URI components, parse hostname and paths, edit query parameters, and strip UTM & tracking tags."
                path="/developer/url"
                faq={[
                    {
                        question: 'What tracking parameters can this tool remove?',
                        answer: 'It automatically strips UTM tags (utm_source, utm_medium, utm_campaign) as well as fbclid, gclid, and other analytics trackers.'
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
                        <FiLink className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            URL Encoder / Decoder & Builder
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Encode URI components, parse URL structure, edit query parameters, and strip marketing & analytics trackers.
                        </p>
                    </div>
                </div>
            </div>

            <UrlEncoderTool />
        </div>
    );
}

