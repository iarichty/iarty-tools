import HelmetContainer from '@/components/HelmetContainer';
import { QrCodeTool } from '@/components/devtools/QrCodeTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiGrid } from 'react-icons/fi';

export default function QrCodePage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="QR Code Generator & Styler (URL, Wi-Fi, vCard) — IARTY Tools"
                description="Create customized QR Codes for websites, Wi-Fi networks, and contact cards. Download in high-resolution PNG or vector SVG format."
                path="/developer/qr"
                faq={[
                    {
                        question: 'Can I customize the color and error correction?',
                        answer: 'Yes! Customize foreground/background colors, dimensions, and error correction levels (L, M, Q, H).'
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
                        <FiGrid className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            QR Code Generator & Styler
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Generate QR codes for text, URLs, Wi-Fi networks, and vCard contacts with PNG & SVG vector download.
                        </p>
                    </div>
                </div>
            </div>

            <QrCodeTool />
        </div>
    );
}

