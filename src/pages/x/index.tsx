import {
    FiTarget,
    FiUserX,
    FiUserPlus,
    FiAtSign,
} from 'react-icons/fi';
import AnalyzePage, {
    type AnalyzePageConfig,
} from '@/components/analysis/AnalyzePage';
import { useI18n } from '@/context/useI18n';

/** Build the X (Twitter) page config with the current translations. */
function buildConfig(t: (key: string) => string): AnalyzePageConfig {
    return {
        platform: 'x',
        seoTitle: 'X (Twitter) Insights | IARTY Tools',
        path: '/x',
        wrapperClassName:
            'min-h-screen bg-[var(--bg)] text-[var(--fg)] transition-colors duration-300',
        background: (
            <div className="pointer-events-none fixed inset-0 overflow-hidden opacity-30 dark:opacity-15">
                <div className="absolute right-[-10%] top-[-10%] h-96 w-96 rounded-full bg-slate-500/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
            </div>
        ),
        backLinkClassName:
            'group mb-4 flex w-fit items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--mut)] transition-colors hover:text-[var(--blue)]',
        heading: (
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
                X{' '}
                <span className="bg-linear-to-r from-slate-700 to-blue-500 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
                    Insights
                </span>
            </h1>
        ),
        subheading: t('home.x.desc'),
        guide: {
            to: '/x/how-analyze-works',
            label: 'How to get your data',
            icon: <FiTarget className="text-[var(--blue)]" aria-hidden />,
        },
        headerRowClassName:
            'mb-8 flex flex-col justify-between gap-6 md:flex-row md:items-end',
        guideButtonClassName:
            'flex items-center gap-2 rounded-md border border-[var(--line)] bg-[var(--card)] px-4 py-2 text-xs font-semibold text-[var(--fg)] shadow-xs transition-colors hover:border-[var(--blue)] active:scale-98',
        upload: {
            title: t('upload.x.title'),
            description: t('upload.x.desc'),
            buttonLabel: t('upload.x.button'),
            accentClassName: 'bg-linear-to-tr from-slate-900 to-blue-600',
            dragClassName: 'border-[var(--blue)] bg-[var(--soft)]',
        },
        stats: [
            { label: t('stat.followers'), key: 'followers', icon: <FiUserPlus />, accent: '#0b7bff' },
            { label: t('stat.following'), key: 'following', icon: <FiAtSign />, accent: '#64748b' },
            {
                label: t('stat.notFollowingBack'),
                key: 'nonFollowbacks',
                icon: <FiUserX />,
                accent: '#dc2626',
            },
            {
                label: t('stat.youDontFollowBack'),
                key: 'notFollowingBack',
                icon: <FiUserPlus />,
                accent: '#0ea5e9',
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
                'bg-linear-to-tr from-slate-100 to-blue-100 text-slate-700 dark:from-white/5 dark:to-blue-500/10 dark:text-slate-300',
            linkClassName:
                'border border-[var(--line)] bg-[var(--card)] text-[var(--fg)] hover:border-[var(--blue)] hover:text-[var(--blue)]',
            sortLayoutId: 'x-sort-pill',
            dateLabel: 'Since',
            platform: 'x',
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

export default function XAnalyze() {
    const { t } = useI18n();
    return <AnalyzePage config={buildConfig(t)} />;
}
