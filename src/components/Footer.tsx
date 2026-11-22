import { FiHeart, FiGithub, FiExternalLink, FiShield, FiInfo } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-[var(--line)] bg-[var(--soft)] text-[var(--fg)] transition-colors">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-lg text-[var(--fg)]">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--blue)] text-white shadow-xs">
                                <svg viewBox="0 0 1024 1024" className="h-5 w-5 fill-current" aria-hidden="true">
                                    <path d="M 523.13 -0.56 L 635.4 111.72 L 228.69 518.43 L 616.78 906.53 L 499.81 1023.5 L -0.56 523.13 Z M 717.03 193.34 L 1023.51 499.82 L 703.11 820.21 L 590.74 707.84 L 794.16 504.41 L 600.06 310.31 Z M 428.66 432 L 594.11 432 L 594.11 590.73 L 428.66 590.73 Z"/>
                                </svg>
                            </span>
                            <span className="tracking-tight leading-none">IARTY Tools</span>
                        </Link>
                        <p className="max-w-md text-sm text-[var(--mut)] leading-relaxed">
                            Analisis koneksi media sosial Anda dengan aman, cepat, dan transparan. 100% diproses di browser tanpa pernah menyimpan data pribadi.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-[var(--mut)]">
                            <span>Built with</span>
                            <FiHeart className="h-3.5 w-3.5 text-red-500 fill-red-500" />
                            <span>by</span>
                            <a href="https://fiqtor.pages.dev" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--blue)] hover:underline">fiqtor.pages.dev</a>
                            <span>·</span>
                            <a href="https://iarty.id" target="_blank" rel="noopener noreferrer" className="font-semibold text-[var(--blue)] hover:underline">iarty.id</a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        <FooterLink to="/instagram/how-analyze-works" icon={<FiInfo />} label="Panduan Instagram" />
                        <FooterLink to="/tiktok/how-analyze-works" icon={<FiShield />} label="Panduan TikTok" />
                        <FooterLink to="/threads/how-analyze-works" icon={<FiInfo />} label="Panduan Threads" />
                        <FooterLink to="/x/how-analyze-works" icon={<FiShield />} label="Panduan X" />
                        <FooterLink href="https://github.com/iarichty/iarty-tools" icon={<FiGithub />} label="GitHub Repo" isExternal />
                        <FooterLink href="https://fiqtor.pages.dev" icon={<FiExternalLink />} label="Developer" isExternal />
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--mut)]">
                    <p>© {currentYear} PT IARTY TEKNOLOGI DIGITAL. All rights reserved.</p>
                    <p>
                        <a href="https://github.com/iarichty/iarty-tools" target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--blue)] hover:underline">Open Source</a>
                        {' '}di GitHub
                    </p>
                </div>
            </div>
        </footer>
    );
}

interface FooterLinkProps {
    to?: string;
    href?: string;
    icon: React.ReactNode;
    label: string;
    isExternal?: boolean;
}

function FooterLink({ to, href, icon, label, isExternal = false }: FooterLinkProps) {
    const className = "flex items-center gap-2.5 p-3 rounded-lg border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] hover:border-[var(--blue)] transition-colors group text-sm";
    const inner = (
        <>
            <span className="text-[var(--mut)] group-hover:text-[var(--blue)] transition-colors">{icon}</span>
            <span className="font-medium text-xs sm:text-sm truncate">{label}</span>
        </>
    );

    if (isExternal && href) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {inner}
            </a>
        );
    }

    return (
        <Link to={to || '/'} className={className}>
            {inner}
        </Link>
    );
}