import {
    FiInfo,
    FiInstagram,
    FiUserPlus,
    FiUserX,
    FiUsers,
} from 'react-icons/fi';
import AnalyzePage, {
    type AnalyzePageConfig,
} from '@/components/analysis/AnalyzePage';
import { useI18n } from '@/context/useI18n';

/** Build the Instagram page config with the current translations. */
function buildConfig(t: (key: string) => string): AnalyzePageConfig {
    return {
        platform: 'instagram',
        seoTitle: 'Instagram Insights | IARTY Tools',
        path: '/instagram',
        wrapperClassName:
            'min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300',
        background: (
            <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute right-[-10%] top-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-96 w-96 rounded-full bg-purple-500/20 blur-[120px]" />
            </div>
        ),
        backLinkClassName:
            'group mb-4 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mut)] transition-colors hover:text-[var(--blue)]',
        heading: (
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                Instagram{' '}
                <span className="bg-linear-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] bg-clip-text text-transparent">
                    Insights
                </span>
            </h1>
        ),
        subheading: t('home.ig.desc'),
        guide: {
            to: '/instagram/how-analyze-works',
            label: 'How to get your data',
            icon: <FiInfo className="text-[var(--blue)]" aria-hidden />,
        },
        headerRowClassName:
            'mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end',
        guideButtonClassName:
            'flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--fg)] shadow-xs transition-colors hover:border-[var(--blue)] active:scale-98',
        upload: {
            title: t('upload.ig.title'),
            description: t('upload.ig.desc'),
            buttonLabel: t('upload.ig.button'),
            accentClassName: 'bg-linear-to-tr from-purple-500 to-orange-400',
            dragClassName: 'border-[var(--blue)] bg-[var(--soft)]',
        },
        stats: [
            { label: t('stat.followers'), key: 'followers', icon: <FiUsers />, accent: '#0b7bff' },
            { label: t('stat.following'), key: 'following', icon: <FiUserPlus />, accent: '#9333ea' },
            {
                label: t('stat.notFollowingBack'),
                key: 'nonFollowbacks',
                icon: <FiUserX />,
                accent: '#dc2626',
            },
            {
                label: t('stat.youDontFollowBack'),
                key: 'notFollowingBack',
                icon: <FiInstagram />,
                accent: '#ea580c',
            },
        ],
        resultsTheme: {
            cardClassName:
                'overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xs',
            headerClassName: 'border-b border-[var(--line)] p-6',
            tabListClassName: 'flex w-fit rounded-lg bg-[var(--soft)] border border-[var(--line)] p-1',
            tabActiveClassName:
                'bg-[var(--card)] text-[var(--blue)] shadow-xs font-semibold',
            tabInactiveClassName:
                'text-[var(--mut)] hover:text-[var(--fg)]',
            searchClassName:
                'rounded-lg border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] py-2 focus:border-[var(--blue)] focus:ring-1 focus:ring-[var(--blue)] md:w-64',
            sortAccentClassName: 'bg-[var(--card)] text-[var(--blue)]',
            sortActiveTextClassName: 'text-[var(--blue)]',
            gridClassName:
                'grid max-h-[600px] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2 lg:grid-cols-3',
            avatarClassName:
                'bg-linear-to-tr from-purple-100 to-orange-100 text-purple-600 dark:from-purple-900/20 dark:to-orange-900/20 dark:text-purple-400',
            linkClassName:
                'border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] hover:border-[var(--blue)] hover:text-[var(--blue)]',
            sortLayoutId: 'ig-sort-pill',
            dateLabel: 'Since',
            platform: 'instagram',
        },
        panelCardClassName:
            'rounded-2xl border border-[var(--line)] bg-[var(--card)] p-6 shadow-xs',
        resultsSpacingClassName: 'space-y-6',
        errorClassName:
            'mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm font-semibold text-red-600 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400',
        footerClassName: 'mt-6 text-center text-xs text-[var(--mut)]',
        accent: '#0b7bff',
    };
}

export default function InstagramAnalyze() {
    const { t } = useI18n();
    return <AnalyzePage config={buildConfig(t)} />;
}
