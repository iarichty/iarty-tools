import HelmetContainer from '@/components/HelmetContainer';
import { PasswordGeneratorTool } from '@/components/devtools/PasswordGeneratorTool';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiLock } from 'react-icons/fi';

export default function PasswordPage() {
    return (
        <div className="min-h-screen pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <HelmetContainer
                title="Secure Password & Passphrase Generator — IARTY Tools"
                description="Generate cryptographically strong random passwords, memorable passphrases, and numeric PINs with entropy analysis and crack time estimation."
                path="/developer/password"
                faq={[
                    {
                        question: 'Are my generated passwords stored anywhere?',
                        answer: 'No. Passwords are generated exclusively on your local device via Web Crypto and never leave your browser.'
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
                        <FiLock className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-2xl sm:text-4xl font-black text-[var(--fg)] tracking-tight">
                            Password & Passphrase Generator
                        </h1>
                        <p className="text-xs sm:text-sm text-[var(--mut)] mt-1">
                            Generate high-entropy random passwords, memorable multi-word passphrases, and PINs with crack-time estimators.
                        </p>
                    </div>
                </div>
            </div>

            <PasswordGeneratorTool />
        </div>
    );
}
