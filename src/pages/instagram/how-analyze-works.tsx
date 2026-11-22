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

export default function HowInstagramWorks() {
    const { locale, setLocale } = useI18n();
    const language = (locale === 'id' || locale === 'en' || locale === 'zh') ? locale : 'en';

    const translations: Record<Language, TranslationType> = {
        en: {
            back: 'BACK TO DASHBOARD',
            title: 'How to Get Your Data',
            subtitle: 'Follow these steps to securely download your Instagram connections data.',
            note: 'Note: Instagram usually takes 5-30 minutes to prepare your file, but it can take longer depending on your account size.',
            cta_ready: 'I ALREADY HAVE THE FILE',
            cta_open: 'OPEN INSTAGRAM',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Instagram Settings',
                    description: 'Open Instagram, go to your profile, tap the three lines menu and select "Settings and Activity".',
                    color: 'from-purple-500 to-indigo-500'
                },
                {
                    icon: <FiUser />,
                    title: 'Accounts Center',
                    description: 'Tap "Accounts Center" at the top, then scroll to "Your information and permissions".',
                    color: 'from-indigo-500 to-blue-500'
                },
                {
                    icon: <FiDownload />,
                    title: 'Download Information',
                    description: 'Select "Download or transfer information", then "Request a download".',
                    color: 'from-blue-500 to-cyan-500'
                },
                {
                    icon: <FiCheck />,
                    title: 'Select Specific Types',
                    description: 'Choose "Some of your information" and find "Followers and Following".',
                    color: 'from-cyan-500 to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: 'Format & Period',
                    description: 'Crucial: Select JSON format (not HTML) and set Date Range to "All Time".',
                    color: 'from-teal-500 to-orange-500'
                },
                {
                    icon: <FiUpload />,
                    title: 'Upload to IARTY',
                    description: 'Wait for the email from Instagram, download the .zip file, and upload it to our analyzer.',
                    color: 'from-orange-500 to-pink-500'
                }
            ]
        },
        id: {
            back: 'KEMBALI KE DASHBOARD',
            title: 'Cara Ambil Data',
            subtitle: 'Ikuti langkah-langkah berikut untuk mendapatkan data koneksi Instagram Anda dengan aman.',
            note: 'Catatan: Instagram biasanya membutuhkan 5-30 menit untuk menyiapkan file, namun bisa lebih lama tergantung ukuran akun Anda.',
            cta_ready: 'SAYA SUDAH PUNYA FILE',
            cta_open: 'BUKA INSTAGRAM',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Pengaturan Instagram',
                    description: 'Buka Instagram, masuk ke profil, tekan menu garis tiga dan pilih "Pengaturan dan Aktivitas".',
                    color: 'from-purple-500 to-indigo-500'
                },
                {
                    icon: <FiUser />,
                    title: 'Pusat Akun',
                    description: 'Ketuk "Pusat Akun" di bagian atas, lalu cari menu "Informasi dan izin Anda".',
                    color: 'from-indigo-500 to-blue-500'
                },
                {
                    icon: <FiDownload />,
                    title: 'Unduh Informasi',
                    description: 'Pilih "Unduh atau transfer informasi", kemudian pilih "Minta unduhan".',
                    color: 'from-blue-500 to-cyan-500'
                },
                {
                    icon: <FiCheck />,
                    title: 'Pilih Jenis Data',
                    description: 'Pilih "Sebagian informasi Anda" dan centang "Pengikut dan Mengikuti".',
                    color: 'from-cyan-500 to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: 'Format & Periode',
                    description: 'Penting: Pilih format JSON (bukan HTML) dan atur Rentang Tanggal ke "Sepanjang Waktu".',
                    color: 'from-teal-500 to-orange-500'
                },
                {
                    icon: <FiUpload />,
                    title: 'Unggah ke IARTY',
                    description: 'Tunggu email dari Instagram, unduh file .zip tersebut, dan unggah ke halaman analisis kami.',
                    color: 'from-orange-500 to-pink-500'
                }
            ]
        },
        zh: {
            back: '返回控制台',
            title: '如何获取数据',
            subtitle: '按照以下步骤安全下载您的 Instagram 关注与粉丝关系数据。',
            note: '注意：Instagram 通常需要 5-30 分钟生成文件，具体取决于您的账号规模。',
            cta_ready: '我已拥有 ZIP 文件',
            cta_open: '打开 INSTAGRAM',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Instagram 设置',
                    description: '打开 Instagram，进入个人主页，点击右上角三条横线菜单并选择“设置与活动”。',
                    color: 'from-purple-500 to-indigo-500'
                },
                {
                    icon: <FiUser />,
                    title: '账户中心',
                    description: '点击顶部的“账户中心”，然后找到并进入“你的信息和权限”。',
                    color: 'from-indigo-500 to-blue-500'
                },
                {
                    icon: <FiDownload />,
                    title: '下载信息',
                    description: '选择“下载或转移信息”，然后选择“申请下载”。',
                    color: 'from-blue-500 to-cyan-500'
                },
                {
                    icon: <FiCheck />,
                    title: '选择具体类型',
                    description: '选择“部分信息”，找到并勾选“粉丝和关注”。',
                    color: 'from-cyan-500 to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: '格式与时间范围',
                    description: '关键步骤：选择 JSON 格式（切勿选择 HTML），并将日期范围设置为“所有时间”。',
                    color: 'from-teal-500 to-orange-500'
                },
                {
                    icon: <FiUpload />,
                    title: '上传至 IARTY',
                    description: '等待 Instagram 发送确认邮件，下载 .zip 压缩包，并直接上传到我们的分析工具中。',
                    color: 'from-orange-500 to-pink-500'
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
                title="How to get your Instagram data | IARTY Tools"
                path="/instagram/how-analyze-works"
            />
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]" />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">

                {/* Header Section */}
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
                            Guide <span className="text-transparent bg-clip-text bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">Center</span>
                        </h1>
                        <p className="text-[var(--mut)] text-base max-w-xl">
                            {translations[language].subtitle}
                        </p>
                    </motion.div>

                    {/* Language Switcher */}
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

                {/* Steps Grid */}
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
                            {/* Step Number Badge */}
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

                {/* Footer Note & CTA */}
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
                            to="/instagram"
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