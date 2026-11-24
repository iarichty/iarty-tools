import HelmetContainer from '@/components/HelmetContainer';
import { SecuritySuiteTool } from '@/components/devtools/SecuritySuiteTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiShield } from 'react-icons/fi';

export default function SecurityPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Privacy, Security & Cryptography Suite — IARTY Tools"
                description="Client-side SHA-256/512 hashing, HMAC calculation, AES-256-GCM encryption/decryption, PII data masking, and secure token generation."
                path="/developer/security"
                faq={[
                    {
                        question: 'How secure is AES-GCM encryption here?',
                        answer: 'It uses standard Web Crypto API PBKDF2 with 100,000 iterations to derive a 256-bit AES key with random salts and IVs.'
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
                        <FiShield className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Privacy, Security & Cryptography Suite
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Compute SHA-256/512 hashes, sign HMAC, encrypt/decrypt with AES-GCM, and mask sensitive PII records in your browser.
                        </p>
                    </div>
                </div>
            </div>

            <SecuritySuiteTool />
        </div>
    );
}
