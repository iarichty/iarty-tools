import HelmetContainer from '@/components/HelmetContainer';
import { Base64Tool } from '@/components/devtools/Base64Tool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';

export default function Base64Page() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Base64 Encoder & Decoder — IARTY Tools"
                description="Convert text, images, files to Base64 and decode Data URIs. Supports URL-safe Base64 and UTF-8 encoding."
                path="/developer/base64"
                faq={[
                    {
                        question: 'Does this Base64 tool support image preview and files?',
                        answer: 'Yes! You can upload images or files to convert them into Data URIs, or decode existing Base64 strings with live previews.'
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
                        <FiFileText className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Base64 Encoder / Decoder
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Encode and decode text, binary files, images, Data URIs, and URL-safe Base64 with instant browser preview.
                        </p>
                    </div>
                </div>
            </div>

            <Base64Tool />
        </div>
    );
}
