import { motion } from 'framer-motion';
import { FiSettings, FiUser, FiChevronRight, FiDownload, FiFileText, FiUpload, FiArrowLeft, FiInfo, FiExternalLink } from 'react-icons/fi';
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import HelmetContainer from '@/components/HelmetContainer';
import { useI18n } from '@/context/useI18n';

type Language = 'en' | 'id' | 'zh';

type Step = {
    icon: ReactNode;
    title: string;
    description: string;
    color: string;
};

type TranslationType = {
    back: string;
    title: string;
    subtitle: string;
    note: string;
    cta_ready: string;
    cta_open: string;
    steps: Step[];
};

export default function HowXWorks() {
    const { locale, setLocale } = useI18n();
    const language = (locale === 'id' || locale === 'en' || locale === 'zh') ? locale : 'en';

    const translations: Record<Language, TranslationType> = {
        en: {
            back: 'BACK TO DASHBOARD',
            title: 'How to Get Your Data',
            subtitle: 'Request your X (Twitter) archive, then upload it here to analyze your connections.',
            note: 'Note: X can take up to 24 hours to prepare your archive. The download link will be emailed to you.',
            cta_ready: 'I ALREADY HAVE THE FILE',
            cta_open: 'OPEN X SETTINGS',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Open Settings',
                    description: 'Open X, tap the menu, then "Settings and privacy".',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: 'Your Account',
                    description: 'Tap "Your account", then scroll to "Download an archive of your data".',
                    color: 'from-slate-600 to-blue-800'
                },
                {
                    icon: <FiChevronRight />,
                    title: 'Verify & Request',
                    description: 'Confirm your password, then tap "Request archive".',
                    color: 'from-blue-700 to-blue-900'
                },
                {
                    icon: <FiDownload />,
                    title: 'Download the ZIP',
                    description: 'Check your email, click the download link and save the twitter-*.zip file.',
                    color: 'from-blue-600 to-cyan-700'
                },
                {
                    icon: <FiFileText />,
                    title: 'Leave it as ZIP',
                    description: 'Do not extract the archive — upload the .zip file exactly as downloaded.',
                    color: 'from-cyan-600 to-slate-700'
                },
                {
                    icon: <FiUpload />,
                    title: 'Upload to IARTY',
                    description: 'Drop the archive into our analyzer to see followers, following and who does not follow back.',
                    color: 'from-slate-600 to-blue-800'
                }
            ]
        },
        id: {
            back: 'KEMBALI KE DASHBOARD',
            title: 'Cara Ambil Data',
            subtitle: 'Minta arsip X (Twitter) Anda, lalu unggah di sini untuk menganalisis koneksi Anda.',
            note: 'Catatan: X dapat membutuhkan waktu hingga 24 jam untuk menyiapkan arsip. Tautan unduhan akan dikirim ke email Anda.',
            cta_ready: 'SAYA SUDAH PUNYA FILE',
            cta_open: 'BUKA PENGATURAN X',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Buka Pengaturan',
                    description: 'Buka X, ketuk menu, lalu "Pengaturan dan privasi".',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: 'Akun Anda',
                    description: 'Ketuk "Akun Anda", lalu cari "Unduh arsip data Anda".',
                    color: 'from-slate-600 to-blue-800'
                },
                {
                    icon: <FiChevronRight />,
                    title: 'Verifikasi & Minta',
                    description: 'Konfirmasi kata sandi Anda, lalu ketuk "Minta arsip".',
                    color: 'from-blue-700 to-blue-900'
                },
                {
                    icon: <FiDownload />,
                    title: 'Unduh ZIP',
                    description: 'Cek email Anda, klik tautan unduhan dan simpan file twitter-*.zip.',
                    color: 'from-blue-600 to-cyan-700'
                },
                {
                    icon: <FiFileText />,
                    title: 'Biarkan Tetap ZIP',
                    description: 'Jangan ekstrak arsip — unggah file .zip persis seperti yang diunduh.',
                    color: 'from-cyan-600 to-slate-700'
                },
                {
                    icon: <FiUpload />,
                    title: 'Unggah ke IARTY',
                    description: 'Tarik arsip ke analyzer kami untuk melihat follower, following, dan siapa yang tidak follback.',
                    color: 'from-slate-600 to-blue-800'
                }
            ]
        },
        zh: {
            back: '返回仪表板',
            title: '如何获取您的 X (Twitter) 数据',
            subtitle: '按照以下官方步骤安全申请并下载您的 X 存档。',
            note: '注意：X 可能需要长达 24 小时准备存档。下载链接将发送至您的邮箱。',
            cta_ready: '我已有 ZIP 文件',
            cta_open: '打开 X 设置',
            steps: [
                {
                    icon: <FiSettings />,
                    title: '打开设置',
                    description: '打开 X，点击左侧菜单，然后选择“设置与隐私”。',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: '您的账户',
                    description: '点击“您的账户”，然后找到“下载您的数据存档”。',
                    color: 'from-slate-600 to-blue-800'
                },
                {
                    icon: <FiChevronRight />,
                    title: '验证与申请',
                    description: '输入密码确认身份，然后点击“申请存档”。',
                    color: 'from-blue-700 to-blue-900'
                },
                {
                    icon: <FiDownload />,
                    title: '下载 ZIP',
                    description: '查收邮件，点击下载链接保存 twitter-*.zip 文件。',
                    color: 'from-blue-600 to-cyan-700'
                },
                {
                    icon: <FiFileText />,
                    title: '保持 ZIP 格式',
                    description: '不要解压文件——直接上传下载好的原始 .zip 压缩包。',
                    color: 'from-cyan-600 to-slate-700'
                },
                {
                    icon: <FiUpload />,
                    title: '上传至 IARTY',
                    description: '将文件拖入分析器即可查看粉丝、关注以及未回关名单。',
                    color: 'from-slate-600 to-blue-800'
                }
            ]
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300">
            <HelmetContainer
                title="How to get your X (Twitter) data | IARTY Tools"
                path="/x/how-analyze-works"
            />
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-slate-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <button
                            onClick={() => window.history.back()}
                            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mut)] hover:text-[var(--blue)] transition-colors mb-4 cursor-pointer"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform w-4 h-4" />
                            {translations[language].back}
                        </button>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                            {translations[language].title.split(' ').slice(0, -1).join(' ')}{' '}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-700 to-blue-500 dark:from-white dark:to-blue-400">
                                {translations[language].title.split(' ').slice(-1)}
                            </span>
                        </h1>
                        <p className="text-[var(--mut)] text-base max-w-xl">
                            {translations[language].subtitle}
                        </p>
                    </motion.div>

                    <div className="flex p-1 bg-[var(--soft)] border border-[var(--line)] rounded-lg shadow-xs h-fit">
                        {(['id', 'en', 'zh'] as const).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLocale(lang)}
                                className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${language === lang
                                    ? 'bg-[var(--card)] text-[var(--blue)] shadow-xs'
                                    : 'text-[var(--mut)] hover:text-[var(--fg)]'
                                    }`}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {translations[language].steps.map((step, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            className="group relative bg-[var(--card)] border border-[var(--line)] p-6 rounded-2xl shadow-xs hover:border-[var(--blue)] transition-all duration-200 overflow-hidden"
                        >
                            <div className="absolute top-4 right-6 text-5xl font-black text-[var(--line)] pointer-events-none group-hover:text-[var(--blue)]/10 transition-colors">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className={`w-12 h-12 bg-linear-to-tr ${step.color} rounded-xl flex items-center justify-center text-white text-xl mb-5 shadow-xs`}>
                                {step.icon}
                            </div>

                            <h3 className="text-lg font-bold mb-2 tracking-tight text-[var(--fg)] group-hover:text-[var(--blue)] transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-sm text-[var(--mut)] leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-14 text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[var(--soft)] text-[var(--fg)] rounded-xl border border-[var(--line)]">
                        <FiInfo className="shrink-0 text-[var(--blue)]" />
                        <p className="text-xs sm:text-sm font-medium">
                            {translations[language].note}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/x"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue)] text-white rounded-lg text-sm font-semibold hover:bg-[#0551b5] active:scale-98 transition-all shadow-xs"
                        >
                            <FiUpload className="w-4 h-4" aria-hidden />
                            {translations[language].cta_ready}
                        </Link>
                        <a
                            href="https://x.com/settings/download_your_data"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card)] border border-[var(--line)] rounded-lg text-sm font-semibold text-[var(--fg)] hover:border-[var(--blue)] transition-all"
                        >
                            {translations[language].cta_open} <FiExternalLink aria-hidden />
                        </a>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
