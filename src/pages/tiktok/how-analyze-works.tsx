import { motion } from 'framer-motion';
import {
    FiDownload, FiSettings, FiUser, FiClock,
    FiUpload, FiArrowLeft, FiInfo,
    FiExternalLink, FiFileText
} from 'react-icons/fi';
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

export default function HowTikTokWorks() {
    const { locale, setLocale } = useI18n();
    const language = (locale === 'id' || locale === 'en' || locale === 'zh') ? locale : 'en';

    const translations: Record<Language, TranslationType> = {
        en: {
            back: 'BACK TO DASHBOARD',
            title: 'How to Get TikTok Data',
            subtitle: 'Follow these steps to request and download your TikTok data for analysis.',
            note: 'Note: TikTok usually takes 1-3 days to process your data request. You will get a notification when it is ready.',
            cta_ready: 'I HAVE THE ZIP FILE',
            cta_open: 'OPEN TIKTOK',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Settings & Privacy',
                    description: 'Open TikTok, go to your Profile, tap the three lines (hamburger menu) and select "Settings and Privacy".',
                    color: 'from-gray-600 to-gray-800'
                },
                {
                    icon: <FiUser />,
                    title: 'Account Center',
                    description: 'Tap on "Account" at the top of the menu to access your personal data settings.',
                    color: 'from-[#fe2c55] to-pink-600'
                },
                {
                    icon: <FiDownload />,
                    title: 'Download Data',
                    description: 'Select "Download your data". This is where you request a copy of your TikTok information.',
                    color: 'from-blue-500 to-[#25f4ee]'
                },
                {
                    icon: <FiFileText />,
                    title: 'Select Format',
                    description: 'Crucial: Choose "JSON - Machine-readable file" (NOT TXT). This is the format our analyzer supports.',
                    color: 'from-[#25f4ee] to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: 'Request & Wait',
                    description: 'Tap "Request data". TikTok will start preparing your file. Check back in the "Download data" tab later.',
                    color: 'from-purple-600 to-[#fe2c55]'
                },
                {
                    icon: <FiUpload />,
                    title: 'Analyze on IARTY',
                    description: 'Once the ZIP is ready, download it to your device and upload it here to see your insights.',
                    color: 'from-orange-500 to-yellow-500'
                }
            ]
        },
        id: {
            back: 'KEMBALI KE DASHBOARD',
            title: 'Cara Ambil Data TikTok',
            subtitle: 'Ikuti langkah berikut untuk meminta dan mengunduh data TikTok Anda dengan aman.',
            note: 'Catatan: TikTok biasanya butuh 1-3 hari untuk memproses permintaan data. Anda akan menerima notifikasi jika sudah siap.',
            cta_ready: 'SAYA SUDAH PUNYA ZIP',
            cta_open: 'BUKA TIKTOK',
            steps: [
                {
                    icon: <FiSettings />,
                    title: 'Pengaturan & Privasi',
                    description: 'Buka TikTok, masuk ke Profil, tekan menu garis tiga di pojok kanan atas dan pilih "Pengaturan dan Privasi".',
                    color: 'from-gray-600 to-gray-800'
                },
                {
                    icon: <FiUser />,
                    title: 'Pusat Akun',
                    description: 'Pilih menu "Akun" untuk mengakses informasi profil dan pengaturan data pribadi Anda.',
                    color: 'from-[#fe2c55] to-pink-600'
                },
                {
                    icon: <FiDownload />,
                    title: 'Unduh Data Anda',
                    description: 'Cari dan pilih menu "Unduh data Anda". Di sini Anda bisa meminta salinan data akun.',
                    color: 'from-blue-500 to-[#25f4ee]'
                },
                {
                    icon: <FiFileText />,
                    title: 'Pilih Format JSON',
                    description: 'Penting: Pilih format "JSON" (BUKAN Teks). Format ini diperlukan agar sistem kami bisa membaca data Anda.',
                    color: 'from-[#25f4ee] to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: 'Minta & Tunggu',
                    description: 'Klik "Minta data". TikTok akan menyiapkan file. Cek tab "Unduh data" secara berkala (biasanya 24 jam+).',
                    color: 'from-purple-600 to-[#fe2c55]'
                },
                {
                    icon: <FiUpload />,
                    title: 'Unggah ke IARTY',
                    description: 'Setelah file ZIP siap, unduh ke HP/PC Anda, lalu unggah ke halaman analisis untuk melihat hasilnya.',
                    color: 'from-orange-500 to-yellow-500'
                }
            ]
        },
        zh: {
            back: '返回仪表板',
            title: '如何获取您的 TikTok 数据',
            subtitle: '按照以下步骤安全请求并下载您的 TikTok 数据。',
            note: '注意：TikTok 通常需要 1-3 天准备数据文件，准备就绪后会收到通知。',
            cta_ready: '我已有 ZIP 文件',
            cta_open: '打开 TIKTOK',
            steps: [
                {
                    icon: <FiSettings />,
                    title: '设置与隐私',
                    description: '打开 TikTok，进入个人主页，点击右上角三条横线菜单，选择“设置与隐私”。',
                    color: 'from-gray-600 to-gray-800'
                },
                {
                    icon: <FiUser />,
                    title: '账户中心',
                    description: '选择“账户”菜单访问您的个人资料及隐私数据设置。',
                    color: 'from-[#fe2c55] to-pink-600'
                },
                {
                    icon: <FiDownload />,
                    title: '下载您的数据',
                    description: '找到并选择“下载您的数据”。在此您可以申请个人数据副本。',
                    color: 'from-blue-500 to-[#25f4ee]'
                },
                {
                    icon: <FiFileText />,
                    title: '选择 JSON 格式',
                    description: '重要提示：必须选择“JSON”格式（不要选 TXT）。只有 JSON 格式才能被我们的系统解析。',
                    color: 'from-[#25f4ee] to-teal-500'
                },
                {
                    icon: <FiClock />,
                    title: '提交申请并等待',
                    description: '点击“请求数据”。TikTok 会准备文件，请在“下载数据”标签页定期查看（通常 24 小时以上）。',
                    color: 'from-purple-600 to-[#fe2c55]'
                },
                {
                    icon: <FiUpload />,
                    title: '上传至 IARTY',
                    description: 'ZIP 文件就绪后，下载到手机或电脑，然后上传到分析页面查看完整报告。',
                    color: 'from-orange-500 to-yellow-500'
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
                title="How to get your TikTok data | IARTY Tools"
                path="/tiktok/how-analyze-works"
            />
            {/* Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-25 dark:opacity-10">
                <div className="absolute top-[-10%] left-[-10%] w-160 h-160 bg-[#fe2c55] rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-160 h-160 bg-[#25f4ee] rounded-full blur-[150px]" />
            </div>

            <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 md:py-16">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                        <button
                            onClick={() => window.history.back()}
                            className="group flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mut)] hover:text-[#fe2c55] transition-colors mb-4 cursor-pointer"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform w-4 h-4" />
                            {translations[language].back}
                        </button>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
                            TikTok <span className="text-transparent bg-clip-text bg-linear-to-r from-[#fe2c55] via-purple-500 to-[#25f4ee]">Guide</span>
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
                                    ? 'bg-[#fe2c55] text-white shadow-xs'
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
                            className="group relative bg-[var(--card)] border border-[var(--line)] p-6 rounded-2xl shadow-xs hover:border-[#fe2c55] transition-all duration-200 overflow-hidden"
                        >
                            {/* Watermark Number */}
                            <div className="absolute top-4 right-6 text-5xl font-black text-[var(--line)] pointer-events-none group-hover:text-[#fe2c55]/10 transition-colors">
                                {String(index + 1).padStart(2, '0')}
                            </div>

                            <div className={`w-12 h-12 bg-linear-to-tr ${step.color} rounded-xl flex items-center justify-center text-white text-xl mb-5 shadow-xs`}>
                                {step.icon}
                            </div>

                            <h3 className="text-lg font-bold mb-2 tracking-tight text-[var(--fg)] group-hover:text-[#fe2c55] transition-colors">
                                {step.title}
                            </h3>
                            <p className="text-sm text-[var(--mut)] leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Footer Section */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-14 text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-[var(--soft)] text-[var(--fg)] rounded-xl border border-[var(--line)]">
                        <FiInfo className="shrink-0 text-[#fe2c55]" />
                        <p className="text-xs sm:text-sm font-medium">
                            {translations[language].note}
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            to="/tiktok"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#fe2c55] text-white rounded-lg text-sm font-semibold hover:bg-[#e0264b] active:scale-98 transition-all shadow-xs"
                        >
                            <FiUpload className="w-4 h-4" />
                            {translations[language].cta_ready}
                        </Link>

                        <a
                            href="https://www.tiktok.com/setting/download-your-data"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--card)] border border-[var(--line)] rounded-lg text-sm font-semibold text-[var(--fg)] hover:border-[#fe2c55] transition-all"
                        >
                            {translations[language].cta_open} <FiExternalLink className="text-[#25f4ee]" />
                        </a>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}