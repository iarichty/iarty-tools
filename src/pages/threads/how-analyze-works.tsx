import { motion } from 'framer-motion';
import { FiDownload, FiSettings, FiUser, FiClock, FiCheck, FiUpload, FiArrowLeft, FiInfo, FiExternalLink } from 'react-icons/fi';
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

export default function HowThreadsWorks() {
    const { locale, setLocale } = useI18n();
    const language = (locale === 'id' || locale === 'en' || locale === 'zh') ? locale : 'en';

    const translations: Record<Language, TranslationType> = {
        en: {
            back: 'BACK TO DASHBOARD',
            title: 'How to Get Your Data',
            subtitle: 'Threads connections come from the same Accounts Center export as Instagram. Follow these steps.',
            note: 'Note: Meta usually takes 5-30 minutes to prepare your file, depending on the size of your account.',
            cta_ready: 'I ALREADY HAVE THE FILE',
            cta_open: 'OPEN ACCOUNTS CENTER',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Open Threads',
                    description: 'Open the Threads app, tap your profile, then the two-line menu and "Settings".',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: 'Accounts Center',
                    description: 'Tap "Accounts Center", then scroll to "Your information and permissions".',
                    color: 'from-slate-600 to-slate-800'
                },
                {
                    icon: <FiDownload />,
                    title: 'Download Information',
                    description: 'Select "Download or transfer information" and choose your Threads account.',
                    color: 'from-slate-500 to-slate-700'
                },
                {
                    icon: <FiCheck />,
                    title: 'Select Specific Types',
                    description: 'Choose "Some of your information" and tick "Followers and Following".',
                    color: 'from-slate-500 to-gray-600'
                },
                {
                    icon: <FiClock />,
                    title: 'Format & Period',
                    description: 'Crucial: select JSON format (not HTML) and set the date range to "All time".',
                    color: 'from-gray-500 to-zinc-600'
                },
                {
                    icon: <FiUpload />,
                    title: 'Upload to IARTY',
                    description: 'Wait for the email from Meta, download the .zip file and upload it to our analyzer.',
                    color: 'from-zinc-600 to-slate-800'
                }
            ]
        },
        id: {
            back: 'KEMBALI KE DASHBOARD',
            title: 'Cara Ambil Data',
            subtitle: 'Koneksi Threads berasal dari export Accounts Center yang sama dengan Instagram. Ikuti langkah berikut.',
            note: 'Catatan: Meta biasanya membutuhkan 5-30 menit untuk menyiapkan file, tergantung ukuran akun Anda.',
            cta_ready: 'SAYA SUDAH PUNYA FILE',
            cta_open: 'BUKA ACCOUNTS CENTER',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Buka Threads',
                    description: 'Buka aplikasi Threads, masuk ke profil, tekan menu dua garis lalu "Pengaturan".',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: 'Pusat Akun',
                    description: 'Ketuk "Pusat Akun", lalu cari menu "Informasi dan izin Anda".',
                    color: 'from-slate-600 to-slate-800'
                },
                {
                    icon: <FiDownload />,
                    title: 'Unduh Informasi',
                    description: 'Pilih "Unduh atau transfer informasi" dan pilih akun Threads Anda.',
                    color: 'from-slate-500 to-slate-700'
                },
                {
                    icon: <FiCheck />,
                    title: 'Pilih Jenis Data',
                    description: 'Pilih "Sebagian informasi Anda" dan centang "Pengikut dan Mengikuti".',
                    color: 'from-slate-500 to-gray-600'
                },
                {
                    icon: <FiClock />,
                    title: 'Format & Periode',
                    description: 'Penting: pilih format JSON (bukan HTML) dan atur rentang tanggal ke "Sepanjang waktu".',
                    color: 'from-gray-500 to-zinc-600'
                },
                {
                    icon: <FiUpload />,
                    title: 'Unggah ke IARTY',
                    description: 'Tunggu email dari Meta, unduh file .zip tersebut, dan unggah ke halaman analisis kami.',
                    color: 'from-zinc-600 to-slate-800'
                }
            ]
        },
        zh: {
            back: '返回仪表板',
            title: '如何获取您的 Threads 数据',
            subtitle: '按照以下官方步骤安全导出您的 Threads 关注与粉丝档案。',
            note: '注意：Meta 通常需要 5-30 分钟生成文件，具体时间取决于您的账户体量。',
            cta_ready: '我已有 ZIP 文件',
            cta_open: '打开 ACCOUNTS CENTER',
            steps: [
                {
                    icon: <FiSettings />,
                    title: '打开 Threads',
                    description: '打开 Threads 应用，进入个人主页，点击双横线菜单进入“设置”。',
                    color: 'from-slate-700 to-slate-900'
                },
                {
                    icon: <FiUser />,
                    title: '账户中心',
                    description: '点击“账户中心”，然后进入“您的信息和权限”。',
                    color: 'from-slate-600 to-slate-800'
                },
                {
                    icon: <FiDownload />,
                    title: '下载信息',
                    description: '选择“下载或转移信息”，并选定您的 Threads 账号。',
                    color: 'from-slate-500 to-slate-700'
                },
                {
                    icon: <FiCheck />,
                    title: '选择数据类型',
                    description: '选择“部分信息”，并勾选“关注者与正在关注”。',
                    color: 'from-slate-500 to-gray-600'
                },
                {
                    icon: <FiClock />,
                    title: '格式与周期',
                    description: '重要提示：务必选择 JSON 格式（不要选 HTML），时间范围设为“所有时间”。',
                    color: 'from-gray-500 to-zinc-600'
                },
                {
                    icon: <FiUpload />,
                    title: '上传至 IARTY',
                    description: '等待 Meta 发送通知或邮件，下载 .zip 文件，直接上传到我们的分析页面。',
                    color: 'from-zinc-600 to-slate-800'
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
                title="How to get your Threads data | IARTY Tools"
                path="/threads/how-analyze-works"
            />
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-slate-400/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-zinc-500/20 rounded-full blur-[120px]" />
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
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-gray-500 dark:from-white dark:to-gray-400">
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
                            to="/threads"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--blue)] text-white rounded-lg text-sm font-semibold hover:bg-[#0551b5] active:scale-98 transition-all shadow-xs"
                        >
                            <FiUpload className="w-4 h-4" aria-hidden />
                            {translations[language].cta_ready}
                        </Link>
                        <a
                            href="https://accountscenter.instagram.com/your_information_and_permissions"
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
