import HelmetContainer from '@/components/HelmetContainer';
import { JsonFormatterTool } from '@/components/devtools/JsonFormatterTool';
import { JsonValidatorTool } from '@/components/devtools/JsonValidatorTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCode } from 'react-icons/fi';

export default function JsonToolsPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="JSON Formatter, Beautifier & Validator — IARTY Tools"
                description="Free online JSON Formatter, Beautifier, Minifier, and Validator. Convert JSON to YAML, XML, CSV, TypeScript with 100% client-side privacy."
                path="/developer/json"
                faq={[
                    {
                        question: 'Is my JSON uploaded to any server?',
                        answer: 'No. All JSON beautification, sorting, and validation occurs entirely in your browser.'
                    },
                    {
                        question: 'Can I validate against custom JSON Schema?',
                        answer: 'Yes, the validator supports real-time syntax checking as well as custom JSON schema validation.'
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
                        <FiCode className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            JSON Formatter, Beautifier & Validator
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Format, minify, sort keys, convert to YAML/XML/CSV/TS, and inspect syntax errors with line-column detection.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <JsonFormatterTool />
                <JsonValidatorTool />
            </div>
        </div>
    );
}

