import {
    FiBarChart2,
    FiHelpCircle,
    FiUserMinus,
    FiUsers,
} from 'react-icons/fi';
import AnalyzePage, {
    type AnalyzePageConfig,
} from '@/components/analysis/AnalyzePage';
import { useI18n } from '@/context/useI18n';

/** Build the TikTok page config with the current translations. */
function buildConfig(t: (key: string) => string): AnalyzePageConfig {
    return {
        platform: 'tiktok',
        seoTitle: 'TikTok Insights | IARTY Tools',
        path: '/tiktok',
        wrapperClassName:
            'min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300',
        background: (
            <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-25 dark:opacity-10">
                <div className="absolute left-[-10%] top-[-10%] h-[50%] w-[50%] rounded-full bg-[#fe2c55] blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] h-[50%] w-[50%] rounded-full bg-[#25f4ee] blur-[150px]" />
            </div>
        ),
        backLinkClassName:
            'group mb-4 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mut)] transition-colors hover:text-[#fe2c55]',
        heading: (
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                TikTok{' '}
                <span className="bg-linear-to-r from-[#fe2c55] via-purple-500 to-[#25f4ee] bg-clip-text text-transparent">
                    Insights
                </span>
            </h1>
        ),
        subheading: t('home.tt.desc'),
        guide: {
            to: '/tiktok/how-analyze-works',
            label: 'Data guide',
            icon: <FiHelpCircle className="text-[#fe2c55]" aria-hidden />,
        },
        headerRowClassName:
            'mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end',
        guideButtonClassName:
            'flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--fg)] shadow-xs transition-colors hover:border-[#fe2c55] active:scale-98',
        upload: {
            title: t('upload.tt.title'),
            description: t('upload.tt.desc'),
            buttonLabel: t('upload.tt.button'),
            accentClassName: 'bg-linear-to-br from-[#fe2c55] to-[#25f4ee]',
            dragClassName: 'border-[#fe2c55] bg-[var(--soft)]',
        },
        stats: [
            { label: t('stat.followers'), key: 'followers', icon: <FiUsers />, accent: '#0b7bff' },
            { label: t('stat.following'), key: 'following', icon: <FiUsers />, accent: '#25f4ee' },
            {
                label: t('stat.notFollowingBack'),
                key: 'nonFollowbacks',
                icon: <FiUserMinus />,
                accent: '#fe2c55',
            },
        ],
        extraStat: {
            label: t('stat.ratio'),
            value: '0.0',
            icon: <FiBarChart2 />,
            accent: '#a855f7',
            isRatio: true,
        },
        resultsTheme: {
            cardClassName:
                'overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs',
            headerClassName:
                'border-b border-[var(--line)] bg-[var(--soft)] p-6',
            tabListClassName:
                'flex w-fit rounded-lg border border-[var(--line)] bg-[var(--card)] p-1',
            tabActiveClassName: 'bg-[#fe2c55] text-white shadow-xs font-semibold',
            tabInactiveClassName: 'text-[var(--mut)] hover:text-[var(--fg)]',
            searchClassName:
                'rounded-lg border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] py-2 focus:border-[#fe2c55] focus:ring-1 focus:ring-[#fe2c55] md:w-72',
            sortAccentClassName: 'bg-[#25f4ee]',
            sortActiveTextClassName: 'text-black font-semibold',
            gridClassName:
                'grid max-h-[500px] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3',
            avatarClassName:
                'rounded-xl border border-[var(--line)] bg-linear-to-tr from-[#fe2c55]/10 to-[#25f4ee]/10 text-[#fe2c55]',
            linkClassName:
                'border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] hover:border-[#fe2c55] hover:text-[#fe2c55]',
            sortLayoutId: 'tt-sort-pill',
            dateLabel: 'Active',
            platform: 'tiktok',
        },
        panelCardClassName:
            'rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xs',
        resultsSpacingClassName: 'space-y-6',
        errorClassName:
            'mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-600 dark:border-[#fe2c55]/20 dark:bg-[#fe2c55]/10 dark:text-[#fe2c55]',
        footerClassName: 'mt-6 text-center text-xs text-[var(--mut)]',
        accent: '#fe2c55',
    };
}

export default function TikTokAnalyze() {
    const { t } = useI18n();
    return <AnalyzePage config={buildConfig(t)} />;
}
