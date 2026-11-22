import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function GlobalLoader() {
    const location = useLocation();
    const isFirstMount = useRef(true);
    const lastPathRef = useRef(location.pathname);

    useEffect(() => {
        const root = document.documentElement;
        const tr = document.getElementById('tr');
        const pn = document.querySelectorAll('#tr i');
        const trc = document.getElementById('trc');
        const ldp = document.getElementById('ldp');
        const trn = document.getElementById('trn');
        const trb = document.getElementById('trb');

        if (!tr || !trc || !ldp || !trn || !trb) return;

        const RM = matchMedia('(prefers-reduced-motion:reduce)').matches;
        if (RM) {
            tr.style.display = 'none';
            return;
        }

        const fin = () => {
            tr.style.visibility = 'hidden';
            tr.style.pointerEvents = 'none';
            trc.classList.add('min');
            root.style.overflow = '';
        };

        const ctx = gsap.context(() => {
            if (isFirstMount.current) {
                isFirstMount.current = false;
                tr.style.visibility = 'visible';
                tr.style.pointerEvents = 'all';
                trc.classList.remove('min');
                root.style.overflow = 'hidden';

                const pg = { v: 0 };
                const L = gsap.timeline();
                L.to(ldp, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0)
                    .to(
                        pg,
                        {
                            v: 100,
                            duration: 1.5,
                            ease: 'power2.inOut',
                            onUpdate: () => {
                                trn.textContent = String(Math.round(pg.v));
                                gsap.set(trb, { scaleX: pg.v / 100 });
                            },
                        },
                        0
                    )
                    .to(ldp, { fill: '#fff', duration: 0.4 }, 1.1)
                    .to('.ldl', { scale: 1.1, duration: 0.35, ease: 'back.out(3)', yoyo: true, repeat: 1 }, 1.2);

                L.eventCallback('onComplete', () => {
                    gsap.timeline({ onComplete: fin })
                        .to(['.ldn', '.ldt', '.ldb'], { opacity: 0, y: -10, duration: 0.25, stagger: 0.04 })
                        .to('.ldl', { scale: 0.6, opacity: 0, duration: 0.3, ease: 'power2.in' }, '<')
                        .to(pn, { scaleY: 0, duration: 0.8, stagger: { each: 0.06, from: 'center' }, ease: 'expo.inOut' }, '-=.05');
                });
                return;
            }

            if (lastPathRef.current !== location.pathname) {
                lastPathRef.current = location.pathname;
                tr.style.visibility = 'visible';
                tr.style.pointerEvents = 'all';
                gsap.set(pn, { transformOrigin: '50% 100%', scaleY: 0 });
                gsap.set(trc, { opacity: 0 });
                gsap.set('.ldl', { opacity: 1, scale: 1 });

                const t = gsap.timeline();
                t.to(pn, { scaleY: 1, duration: 0.45, stagger: { each: 0.04, from: 'edges' }, ease: 'expo.inOut' })
                    .fromTo(trc, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, '-=.2')
                    .set(pn, { transformOrigin: '50% 0%' }, '+=.15')
                    .to(trc, { opacity: 0, duration: 0.2 }, '<')
                    .to(pn, { scaleY: 0, duration: 0.55, stagger: { each: 0.04, from: 'center' }, ease: 'expo.inOut' })
                    .add(fin);
            }
        });

        return () => {
            ctx.revert();
            fin();
        };
    }, [location.pathname]);

    return (
        <div id="tr" aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <div id="trc">
                <svg className="ldl" viewBox="0 0 1024 1024">
                    <path
                        id="ldp"
                        pathLength="1"
                        d="M 523.13 -0.56 L 635.4 111.72 L 228.69 518.43 L 616.78 906.53 L 499.81 1023.5 L -0.56 523.13 Z M 717.03 193.34 L 1023.51 499.82 L 703.11 820.21 L 590.74 707.84 L 794.16 504.41 L 600.06 310.31 Z M 428.66 432 L 594.11 432 L 594.11 590.73 L 428.66 590.73 Z"
                    />
                </svg>
                <div className="ldn">
                    <span id="trn">0</span>
                    <small>%</small>
                </div>
                <div className="ldb">
                    <b id="trb"></b>
                </div>
                <div className="ldt">Menyiapkan analisis privat</div>
            </div>
        </div>
    );
}

