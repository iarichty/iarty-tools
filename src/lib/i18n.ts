/**
 * Tiny zero-dependency i18n layer.
 *
 * The app ships two locales (English + Bahasa Indonesia). Translations live in
 * a flat dictionary keyed by a stable string id, so components can look them up
 * via the `useI18n()` hook. We intentionally avoid a third-party i18n runtime to
 * keep the bundle lean and the mental model simple.
 */

export type Locale = 'en' | 'id' | 'zh';

export const LOCALES: Locale[] = ['en', 'id', 'zh'];

/** Human-readable label for the language switcher. */
export const LOCALE_LABELS: Record<Locale, string> = {
    en: 'English',
    id: 'Bahasa Indonesia',
    zh: '中文 (简体)',
};

/** Short label (2 letters) for the compact switcher. */
export const LOCALE_SHORT: Record<Locale, string> = {
    en: 'EN',
    id: 'ID',
    zh: 'ZH',
};

type Dict = Record<string, string>;

const en: Dict = {
    'nav.home': 'Home',
    'nav.developer': 'Dev Tools',
    'nav.instagram': 'Instagram',
    'nav.tiktok': 'TikTok',
    'nav.threads': 'Threads',
    'nav.x': 'X (Twitter)',
    'nav.theme': 'Toggle theme',
    'nav.language': 'Change language',
    'nav.openMenu': 'Open menu',
    'nav.closeMenu': 'Close menu',

    'common.back': 'Back',
    'common.viewProfile': 'View Profile',
    'common.loading': 'Loading…',
    'common.processing': 'Processing…',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',

    'home.title1': 'IARTY',
    'home.title2': 'Tools',
    'home.tagline': 'The professional toolkit for social insights.',
    'home.noAccess': 'No account access required.',
    'home.analyzeAccount': 'Analyze Account',
    'home.feature.privacy.title': 'Pure Privacy',
    'home.feature.privacy.desc':
        'Client-side processing. Your data never leaves this browser tab.',
    'home.feature.fast.title': 'Blazing Fast',
    'home.feature.fast.desc':
        'No API limits. Scan thousands of profiles in seconds, right on your device.',
    'home.feature.insights.title': 'Actionable Insights',
    'home.feature.insights.desc':
        'Instantly see who unfollowed you and who you should follow back.',
    'home.ig.desc':
        "Analyze followers, following, and find who isn't following you back instantly.",
    'home.tt.desc':
        'Deep dive into your TikTok connections and track your fan-base growth locally.',
    'home.demo': 'Try with sample data',
    'home.offline': 'Works fully offline',
    'home.comingSoon': 'Coming soon',
    'home.threads.desc':
        'Analyze your Threads connections from your Accounts Center export — instantly.',
    'home.x.desc': 'Bring your X (Twitter) archive for the same insight — no account access.',

    'upload.ig.title': 'Upload your ZIP file',
    'upload.ig.desc':
        'Drag your Instagram data export here, or click to choose it from your folder.',
    'upload.ig.button': 'Choose ZIP file',
    'upload.tt.title': 'Upload your TikTok file (.zip)',
    'upload.tt.desc':
        'Make sure you have downloaded your data from TikTok in JSON format.',
    'upload.tt.button': 'Select file now',
    'upload.threads.title': 'Upload your Threads ZIP file',
    'upload.threads.desc':
        'Upload the .zip you downloaded from Meta Accounts Center (Threads connections).',
    'upload.threads.button': 'Choose ZIP file',
    'upload.x.title': 'Upload your X (Twitter) archive',
    'upload.x.desc':
        'Drop the twitter-*.zip archive you received from X, right here.',
    'upload.x.button': 'Choose archive',
    'upload.progress.reading': 'Reading file…',
    'upload.progress.unzipping': 'Unzipping…',
    'upload.progress.parsing': 'Analyzing connections…',
    'upload.preview': 'Detected',
    'upload.previewFollowers': 'followers',
    'upload.previewFollowing': 'following',

    'stat.followers': 'Followers',
    'stat.following': 'Following',
    'stat.notFollowingBack': 'Not Following Back',
    'stat.youDontFollowBack': "You Don't Follow Back",
    'stat.ratio': 'Follower Ratio',
    'stat.mutuals': 'Mutuals',
    'stat.fans': 'Fans',
    'stat.avgFollowAge': 'Avg. Follow Age',
    'stat.days': 'days',

    'tab.notFollowingBack': 'Not Following Back',
    'tab.youDontFollowBack': "You Don't Follow Back",
    'tab.followers': 'Followers',
    'tab.following': 'Following',
    'tab.mutuals': 'Mutuals',
    'tab.fans': 'Fans',

    'search.placeholder': 'Search username…',
    'sort.label': 'Sort order',
    'sort.newest': 'Newest',
    'sort.oldest': 'Oldest',
    'results.empty': 'No results found.',
    'results.copyAll': 'Copy all',
    'results.exportCsv': 'Export CSV',
    'results.exportAll': 'Download all (ZIP)',
    'results.exportPng': 'Save as image',
    'results.selectAll': 'Select all',
    'results.selected': '{count} selected',
    'results.openSelected': 'Open selected',
    'results.exportSummary': 'Export summary',
    'results.popupBlocked': 'Allow pop-ups to open multiple profiles.',
    'a11y.resultCategory': 'Result category',
    'a11y.selectUser': 'Select {name}',

    'insights.title': 'Insights',
    'insights.growth': 'Follower growth',
    'insights.growthEmpty': 'Not enough dated data to chart growth.',
    'insights.mutual': 'Mutual connections',
    'insights.fans': 'Fans (you don\'t follow)',
    'insights.oldest': 'Longest-standing follow',

    'unfollower.title': 'Since your last analysis',
    'unfollower.subtitle': 'Compared with the snapshot saved on {date}.',
    'unfollower.unfollowedYou': 'Unfollowed you',
    'unfollower.newFollowers': 'New followers',
    'unfollower.youUnfollowed': 'You unfollowed',
    'unfollower.youNowFollow': 'You now follow',
    'unfollower.none': 'No changes detected in this category.',

    'footer.analyzed': 'Analyzed {count} accounts — processed entirely in your browser.',

    'demo.banner': 'You are viewing sample data. Upload your own export to see real results.',
};

const id: Dict = {
    'nav.home': 'Beranda',
    'nav.developer': 'Dev Tools',
    'nav.instagram': 'Instagram',
    'nav.tiktok': 'TikTok',
    'nav.threads': 'Threads',
    'nav.x': 'X (Twitter)',
    'nav.theme': 'Ganti tema',
    'nav.language': 'Ganti bahasa',
    'nav.openMenu': 'Buka menu',
    'nav.closeMenu': 'Tutup menu',

    'common.back': 'Kembali',
    'common.viewProfile': 'Lihat Profil',
    'common.loading': 'Memuat…',
    'common.processing': 'Memproses…',
    'common.cancel': 'Batal',
    'common.close': 'Tutup',
    'common.copy': 'Salin',
    'common.copied': 'Tersalin!',

    'home.title1': 'IARTY',
    'home.title2': 'Tools',
    'home.tagline': 'Perangkat profesional untuk insight media sosial.',
    'home.noAccess': 'Tanpa perlu akses akun.',
    'home.analyzeAccount': 'Analisis Akun',
    'home.feature.privacy.title': 'Privasi Murni',
    'home.feature.privacy.desc':
        'Diproses di sisi klien. Data Anda tidak pernah keluar dari tab browser ini.',
    'home.feature.fast.title': 'Sangat Cepat',
    'home.feature.fast.desc':
        'Tanpa batas API. Pindai ribuan profil dalam hitungan detik, langsung di perangkat Anda.',
    'home.feature.insights.title': 'Insight yang Berguna',
    'home.feature.insights.desc':
        'Ketahui siapa yang berhenti mengikuti Anda dan siapa yang sebaiknya Anda ikuti kembali.',
    'home.ig.desc':
        'Analisis follower, following, dan temukan siapa yang tidak follback secara instan.',
    'home.tt.desc':
        'Telusuri koneksi TikTok Anda dan pantau pertumbuhan followers secara lokal.',
    'home.demo': 'Coba dengan data contoh',
    'home.offline': 'Bekerja sepenuhnya offline',
    'home.comingSoon': 'Segera hadir',
    'home.threads.desc':
        'Analisis koneksi Threads Anda dari export Accounts Center — secara instan.',
    'home.x.desc': 'Bawa arsip X (Twitter) Anda untuk insight serupa — tanpa akses akun.',

    'upload.ig.title': 'Unggah file ZIP Anda',
    'upload.ig.desc':
        'Tarik hasil export data Instagram ke sini, atau klik untuk memilih dari folder.',
    'upload.ig.button': 'Pilih file ZIP',
    'upload.tt.title': 'Unggah file TikTok Anda (.zip)',
    'upload.tt.desc':
        'Pastikan Anda sudah mengunduh data dari TikTok dalam format JSON.',
    'upload.tt.button': 'Pilih file sekarang',
    'upload.threads.title': 'Unggah file ZIP Threads Anda',
    'upload.threads.desc':
        'Unggah file .zip yang Anda unduh dari Pusat Akun Meta (koneksi Threads).',
    'upload.threads.button': 'Pilih file ZIP',
    'upload.x.title': 'Unggah arsip X (Twitter) Anda',
    'upload.x.desc':
        'Tarik arsip twitter-*.zip yang Anda terima dari X ke sini.',
    'upload.x.button': 'Pilih arsip',
    'upload.progress.reading': 'Membaca file…',
    'upload.progress.unzipping': 'Mengekstrak…',
    'upload.progress.parsing': 'Menganalisis koneksi…',
    'upload.preview': 'Terdeteksi',
    'upload.previewFollowers': 'follower',
    'upload.previewFollowing': 'following',

    'stat.followers': 'Follower',
    'stat.following': 'Following',
    'stat.notFollowingBack': 'Tidak Follback',
    'stat.youDontFollowBack': 'Belum Anda Follow',
    'stat.ratio': 'Rasio Follower',
    'stat.mutuals': 'Saling Follow',
    'stat.fans': 'Fans',
    'stat.avgFollowAge': 'Rata-rata Lama Follow',
    'stat.days': 'hari',

    'tab.notFollowingBack': 'Tidak Follback',
    'tab.youDontFollowBack': 'Belum Anda Follow',
    'tab.followers': 'Follower',
    'tab.following': 'Following',
    'tab.mutuals': 'Saling Follow',
    'tab.fans': 'Fans',

    'search.placeholder': 'Cari username…',
    'sort.label': 'Urutan',
    'sort.newest': 'Terbaru',
    'sort.oldest': 'Terlama',
    'results.empty': 'Tidak ada hasil.',
    'results.copyAll': 'Salin semua',
    'results.exportCsv': 'Export CSV',
    'results.exportAll': 'Unduh semua (ZIP)',
    'results.exportPng': 'Simpan sebagai gambar',
    'results.selectAll': 'Pilih semua',
    'results.selected': '{count} dipilih',
    'results.openSelected': 'Buka yang dipilih',
    'results.exportSummary': 'Export ringkasan',
    'results.popupBlocked': 'Izinkan pop-up untuk membuka banyak profil.',
    'a11y.resultCategory': 'Kategori hasil',
    'a11y.selectUser': 'Pilih {name}',

    'insights.title': 'Insight',
    'insights.growth': 'Pertumbuhan follower',
    'insights.growthEmpty': 'Data bertanggal belum cukup untuk menampilkan grafik.',
    'insights.mutual': 'Koneksi saling follow',
    'insights.fans': 'Fans (tidak Anda follow)',
    'insights.oldest': 'Follow terlama',

    'unfollower.title': 'Sejak analisis terakhir',
    'unfollower.subtitle': 'Dibandingkan dengan snapshot yang disimpan pada {date}.',
    'unfollower.unfollowedYou': 'Berhenti mengikuti Anda',
    'unfollower.newFollowers': 'Follower baru',
    'unfollower.youUnfollowed': 'Anda berhenti follow',
    'unfollower.youNowFollow': 'Anda kini follow',
    'unfollower.none': 'Tidak ada perubahan pada kategori ini.',

    'footer.analyzed':
        'Menganalisis {count} akun — diproses sepenuhnya di browser Anda.',

    'demo.banner':
        'Anda melihat data contoh. Unggah hasil export Anda untuk melihat hasil nyata.',
};

const zh: Dict = {
    'nav.home': '首页',
    'nav.developer': '开发者工具',
    'nav.instagram': 'Instagram',
    'nav.tiktok': 'TikTok',
    'nav.threads': 'Threads',
    'nav.x': 'X (Twitter)',
    'nav.theme': '切换主题',
    'nav.language': '切换语言',
    'nav.openMenu': '打开菜单',
    'nav.closeMenu': '关闭菜单',

    'common.back': '返回',
    'common.viewProfile': '查看个人主页',
    'common.loading': '加载中…',
    'common.processing': '处理中…',
    'common.cancel': '取消',
    'common.close': '关闭',
    'common.copy': '复制',
    'common.copied': '已复制！',

    'home.title1': 'IARTY',
    'home.title2': 'Tools',
    'home.tagline': '专业级社交媒体洞察与分析工具。',
    'home.noAccess': '无需任何账号访问权限。',
    'home.analyzeAccount': '分析账号',
    'home.feature.privacy.title': '极致隐私保护',
    'home.feature.privacy.desc': '完全纯客户端处理。您的数据绝不会离开此浏览器标签页。',
    'home.feature.fast.title': '极速响应',
    'home.feature.fast.desc': '无 API 限制。数秒内直接在设备上扫描分析数千个主页资料。',
    'home.feature.insights.title': '实用洞察分析',
    'home.feature.insights.desc': '立即发现谁取关了您，以及哪些好友值得您回关。',
    'home.ig.desc': '即时分析粉丝和关注列表，快速查找未回关您的用户。',
    'home.tt.desc': '深度探索您的 TikTok 社交关系，在本地追踪粉丝增长动态。',
    'home.demo': '试用演示样本数据',
    'home.offline': '支持完全离线运行',
    'home.comingSoon': '即将推出',
    'home.threads.desc': '直接从 Meta 账户中心导出文件分析您的 Threads 关注关系。',
    'home.x.desc': '导入您的 X (Twitter) 数据存档以获取同款深度分析 — 无需账号授权。',

    'upload.ig.title': '上传您的 ZIP 文件',
    'upload.ig.desc': '将 Instagram 数据导出压缩包拖至此处，或从文件夹中选择。',
    'upload.ig.button': '选择 ZIP 文件',
    'upload.tt.title': '上传您的 TikTok 文件 (.zip)',
    'upload.tt.desc': '请确保您从 TikTok 下载的数据格式为 JSON。',
    'upload.tt.button': '立即选择文件',
    'upload.threads.title': '上传您的 Threads ZIP 文件',
    'upload.threads.desc': '上传从 Meta 账户中心下载的 Threads 关注关系压缩包 (.zip)。',
    'upload.threads.button': '选择 ZIP 文件',
    'upload.x.title': '上传您的 X (Twitter) 存档文件',
    'upload.x.desc': '将从 X 接收到的 twitter-*.zip 压缩包拖至此处。',
    'upload.x.button': '选择存档文件',
    'upload.progress.reading': '正在读取文件…',
    'upload.progress.unzipping': '正在解压…',
    'upload.progress.parsing': '正在分析关注关系…',
    'upload.preview': '已检测到',
    'upload.previewFollowers': '粉丝',
    'upload.previewFollowing': '关注中',

    'stat.followers': '粉丝',
    'stat.following': '关注中',
    'stat.notFollowingBack': '未回关我',
    'stat.youDontFollowBack': '我未回关',
    'stat.ratio': '粉丝比例',
    'stat.mutuals': '互相关注',
    'stat.fans': '粉丝 (我未关注)',
    'stat.avgFollowAge': '平均关注时长',
    'stat.days': '天',

    'tab.notFollowingBack': '未回关我',
    'tab.youDontFollowBack': '我未回关',
    'tab.followers': '粉丝',
    'tab.following': '关注中',
    'tab.mutuals': '互相关注',
    'tab.fans': '粉丝',

    'search.placeholder': '搜索用户名…',
    'sort.label': '排序方式',
    'sort.newest': '最新',
    'sort.oldest': '最早',
    'results.empty': '未找到相关结果。',
    'results.copyAll': '复制全部',
    'results.exportCsv': '导出 CSV',
    'results.exportAll': '下载全部 (ZIP)',
    'results.exportPng': '保存为图片',
    'results.selectAll': '全选',
    'results.selected': '已选择 {count} 项',
    'results.openSelected': '打开选中主页',
    'results.exportSummary': '导出摘要',
    'results.popupBlocked': '请允许弹出窗口以批量打开多个主页资料。',
    'a11y.resultCategory': '结果分类',
    'a11y.selectUser': '选择 {name}',

    'insights.title': '深度洞察',
    'insights.growth': '粉丝增长趋势',
    'insights.growthEmpty': '时间记录数据不足，暂无法生成增长图表。',
    'insights.mutual': '互相关注关系',
    'insights.fans': '单向粉丝 (您未关注对方)',
    'insights.oldest': '最早关注的用户',

    'unfollower.title': '自上次分析以来的变化',
    'unfollower.subtitle': '与 {date} 保存的快照对比。',
    'unfollower.unfollowedYou': '已取关您的用户',
    'unfollower.newFollowers': '新增粉丝',
    'unfollower.youUnfollowed': '您已取关的用户',
    'unfollower.youNowFollow': '您新关注的用户',
    'unfollower.none': '此分类在此期间没有发生变动。',

    'footer.analyzed': '已分析 {count} 个账号 — 完全在您的本地浏览器中处理。',

    'demo.banner': '您正在查看演示样本数据。上传您自己的导出文件以查看真实分析结果。',
};

const DICTS: Record<Locale, Dict> = { en, id, zh };

/** Look up a translation, interpolating `{name}` placeholders from `vars`. */
export function translate(
    locale: Locale,
    key: string,
    vars?: Record<string, string | number>,
): string {
    const template = DICTS[locale]?.[key] ?? DICTS.en[key] ?? key;
    if (!vars) return template;
    return template.replace(/\{(\w+)\}/g, (_, name: string) =>
        name in vars ? String(vars[name]) : `{${name}}`,
    );
}

/** Best-effort locale detection from the browser, defaulting to English. */
export function detectLocale(): Locale {
    if (typeof navigator === 'undefined') return 'en';
    const lang = navigator.language?.toLowerCase() ?? '';
    if (lang.startsWith('id')) return 'id';
    if (lang.startsWith('zh')) return 'zh';
    return 'en';
}
