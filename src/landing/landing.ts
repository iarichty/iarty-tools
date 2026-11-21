import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type Pt = [number, number]
type Cleanup = () => void
type TransitionDoc = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

const NS = 'http://www.w3.org/2000/svg'
const NUMBER_FMT = new Intl.NumberFormat('id-ID')

const q = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T => {
  const e = ctx.querySelector<T>(sel)
  if (!e) throw new Error(`Landing: elemen tidak ditemukan (${sel})`)
  return e
}
const qa = <T extends Element = HTMLElement>(sel: string, ctx: ParentNode = document): T[] =>
  Array.from(ctx.querySelectorAll<T>(sel))

/** Pasang seluruh animasi & interaksi. Panggil hasilnya untuk membersihkan (mis. saat unmount React). */
export function initLanding(): Cleanup {
  const RM = matchMedia('(prefers-reduced-motion:reduce)').matches
  const root = document.documentElement
  const cleanups: Cleanup[] = []
  const timers: number[] = []
  const intervals: number[] = []
  let raf = 0
  let heroTl: gsap.core.Timeline | null = null

  const onEl = <K extends keyof HTMLElementEventMap>(
    t: HTMLElement,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
  ): void => {
    t.addEventListener(type, fn)
    cleanups.push(() => t.removeEventListener(type, fn))
  }
  const onWin = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void): void => {
    window.addEventListener(type, fn)
    cleanups.push(() => window.removeEventListener(type, fn))
  }
  const onDoc = <K extends keyof DocumentEventMap>(type: K, fn: (e: DocumentEventMap[K]) => void): void => {
    document.addEventListener(type, fn)
    cleanups.push(() => document.removeEventListener(type, fn))
  }

  const ctx = gsap.context(() => {
    /* ===== adegan isometrik ===== */
    const svg = q<SVGSVGElement>('#iso')
    svg.replaceChildren()
    const el = <K extends keyof SVGElementTagNameMap>(
      tag: K,
      attrs: Record<string, string | number>,
      parent: Element = svg,
    ): SVGElementTagNameMap[K] => {
      const e = document.createElementNS(NS, tag)
      for (const [k, val] of Object.entries(attrs)) {
        if (String(val).startsWith('var(')) e.style.setProperty(k, String(val))
        else e.setAttribute(k, String(val))
      }
      parent.appendChild(e)
      return e
    }
    const pts = (a: Pt[]): string => a.map((p) => p.join(',')).join(' ')
    const v = (n: string): string => `var(${n})`

    el('polygon', { points: pts([[250, 150], [480, 265], [250, 380], [20, 265]]), fill: v('--b1'), stroke: v('--b2'), 'stroke-width': 2 })
    el('polygon', { points: pts([[20, 265], [250, 380], [250, 402], [20, 287]]), fill: v('--b2') })
    el('polygon', { points: pts([[480, 265], [250, 380], [250, 402], [480, 287]]), fill: v('--b3') })

    const P: Record<'N' | 'W' | 'E' | 'S' | 'C', Pt> = {
      N: [250, 196], W: [128, 265], E: [372, 265], S: [250, 334], C: [250, 265],
    }
    ;(['N', 'W', 'E', 'S'] as const).forEach((k) => el('path', { d: `M${P.C}L${P[k]}`, class: 'flow' }))

    const cube = (c: Pt, w: number, h: number, f: string, l: string, r: string, label: string, fs: number, tc: string): SVGGElement => {
      const [cx, cy] = c
      const qh = w / 2
      const g = el('g', { class: 'blk' })
      const face = { stroke: v('--b2'), 'stroke-width': 1.6, 'stroke-linejoin': 'round' }
      el('polygon', { points: pts([[cx - w, cy - h], [cx, cy + qh - h], [cx, cy + qh], [cx - w, cy]]), fill: l, ...face }, g)
      el('polygon', { points: pts([[cx + w, cy - h], [cx, cy + qh - h], [cx, cy + qh], [cx + w, cy]]), fill: r, ...face }, g)
      el('polygon', { points: pts([[cx, cy - qh - h], [cx + w, cy - h], [cx, cy + qh - h], [cx - w, cy - h]]), fill: f, ...face }, g)
      const t = el('text', {
        transform: `translate(${cx},${cy - h}) matrix(.866,.5,-.866,.5,0,0)`,
        'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': fs, 'font-weight': 700,
        fill: tc, 'font-family': 'Bricolage Grotesque,sans-serif',
      }, g)
      t.textContent = label
      return g
    }
    const side = [v('--cube'), v('--cubeL'), v('--cubeR')] as const
    const blocks: SVGGElement[] = [
      cube(P.N, 38, 24, ...side, '@', 30, v('--fg')),
      cube(P.W, 38, 24, ...side, 'IG', 24, v('--fg')),
      cube(P.E, 38, 24, ...side, 'TT', 24, v('--fg')),
      cube(P.C, 40, 38, '#1a74f0', '#0b55c7', '#0a47a6', 'ZIP', 22, '#fff'),
      cube(P.S, 38, 24, ...side, 'X', 30, v('--fg')),
    ]
    blocks.forEach((b) => {
      b.addEventListener('mouseenter', () => gsap.to(b, { y: -12, duration: 0.35, ease: 'back.out(3)' }))
      b.addEventListener('mouseleave', () => gsap.to(b, { y: 0, duration: 0.5, ease: 'elastic.out(1,.5)' }))
    })

    /* ===== pemecah teks ===== */
    const makeWords = (e: HTMLElement, byChar: boolean): HTMLElement[] => {
      const txt = e.textContent ?? ''
      e.textContent = ''
      e.setAttribute('aria-label', txt)
      const parts = txt.split(' ')
      parts.forEach((w, i) => {
        const ws = document.createElement('span')
        ws.className = 'w'
        ws.setAttribute('aria-hidden', 'true')
        const units = byChar ? w.split('') : [w]
        units.forEach((u) => {
          const s = document.createElement('span')
          s.className = 'c'
          s.textContent = u
          ws.appendChild(s)
        })
        e.appendChild(ws)
        if (i < parts.length - 1) e.appendChild(document.createTextNode(' '))
      })
      return qa('.c', e)
    }

    /* ===== timeline hero ===== */
    const chars = makeWords(q('#h1'), true)
    if (!RM) {
      heroTl = gsap.timeline({ defaults: { ease: 'power4.out' }, paused: true })
      heroTl
        .from('.badge', { y: 20, opacity: 0, duration: 0.6 })
        .from(chars, { yPercent: 115, rotate: 8, opacity: 0, duration: 0.9, stagger: 0.02 }, '-=.3')
        .from('.hl [data-in]:not(.badge)', { y: 24, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=.5')
        .from('.chip', { x: -40, opacity: 0, duration: 0.7, stagger: 0.14 }, '-=.9')
        .from(blocks, { y: -120, opacity: 0, duration: 1, stagger: 0.1, ease: 'bounce.out', transformOrigin: '50% 50%' }, '-=.9')
        .from('.tag', { scale: 0, duration: 0.5, stagger: 0.1, ease: 'back.out(3)' }, '-=.4')
        .from('.idea', { y: 30, opacity: 0, duration: 0.6 }, '-=.5')

      const abc = 'abcdefghijklmnopqrstuvwxyz'
      chars.forEach((c) => {
        const original = c.textContent ?? ''
        c.addEventListener('mouseenter', () => {
          gsap.to(c, { y: -10, color: '#0b7bff', duration: 0.15, yoyo: true, repeat: 1 })
          let n = 0
          const iv = window.setInterval(() => {
            c.textContent = abc.charAt(Math.floor(Math.random() * 26))
            if (++n > 4) {
              window.clearInterval(iv)
              c.textContent = original
            }
          }, 45)
          intervals.push(iv)
        })
      })
    }

    /* ===== pergantian nama platform ===== */
    const names = ['Instagram', 'TikTok', 'Threads', 'X (Twitter)']
    const cy = q('#cyc')
    let ni = 0
    if (!RM) {
      intervals.push(
        window.setInterval(() => {
          gsap.to(cy, {
            yPercent: -60, opacity: 0, duration: 0.25,
            onComplete: () => {
              ni = (ni + 1) % names.length
              cy.textContent = names[ni] ?? ''
              gsap.fromTo(cy, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.35, ease: 'back.out(2)' })
            },
          })
        }, 2200),
      )
    }

    /* ===== efek mengetik ===== */
    const phrases = ['Tanpa upload ke server', 'Tanpa simpan file ZIP', 'Tanpa daftar akun']
    const tp = q('#typ')
    let pi = 0
    let ci = 0
    let deleting = false
    const type = (): void => {
      const p = phrases[pi] ?? ''
      tp.textContent = p.slice(0, ci)
      if (!deleting && ci === p.length) {
        deleting = true
        timers.push(window.setTimeout(type, 1600))
        return
      }
      if (deleting && ci === 0) {
        deleting = false
        pi = (pi + 1) % phrases.length
      }
      ci += deleting ? -1 : 1
      timers.push(window.setTimeout(type, deleting ? 28 : 55))
    }
    type()

    /* ===== tilt 3D + parallax ===== */
    const hr = q('#hr')
    const iw = q('#isoWrap')
    if (!RM) {
      const rx = gsap.quickTo(svg, 'rotationX', { duration: 0.8, ease: 'power3' })
      const ry = gsap.quickTo(svg, 'rotationY', { duration: 0.8, ease: 'power3' })
      const cx = gsap.quickTo('#chips', 'x', { duration: 1, ease: 'power3' })
      const cyq = gsap.quickTo('#chips', 'y', { duration: 1, ease: 'power3' })
      onEl(hr, 'mousemove', (e) => {
        const r = hr.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        ry(x * 26); rx(-y * 20); cx(x * -18); cyq(y * -12)
      })
      onEl(hr, 'mouseleave', () => { rx(0); ry(0); cx(0); cyq(0) })
      gsap.to(iw, { y: '-=10', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' })
    }

    /* ===== grid titik reaktif ===== */
    const cv = q<HTMLCanvasElement>('#dots')
    const c2d = cv.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const SP = 24
    let mx = -999
    let my = -999
    let W = 0
    let H = 0
    const resize = (): void => {
      W = hr.clientWidth
      H = hr.clientHeight
      cv.width = W * dpr
      cv.height = H * dpr
      c2d?.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    onWin('resize', resize)
    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(resize)
      ro.observe(hr)
      cleanups.push(() => ro.disconnect())
    }
    onEl(hr, 'mousemove', (e) => {
      const r = hr.getBoundingClientRect()
      mx = e.clientX - r.left
      my = e.clientY - r.top
    })
    onEl(hr, 'mouseleave', () => { mx = -999; my = -999 })
    const draw = (t: number): void => {
      if (c2d) {
        c2d.clearRect(0, 0, W, H)
        const dc = getComputedStyle(root).getPropertyValue('--dot').trim()
        for (let x = SP / 2; x < W; x += SP) {
          for (let y = SP / 2; y < H; y += SP) {
            const dx = x - mx
            const dy = y - my
            const d = Math.sqrt(dx * dx + dy * dy)
            const k = Math.max(0, 1 - d / 150)
            const w = RM ? 0 : Math.sin(t / 900 + x * 0.02 + y * 0.02) * 0.3
            c2d.beginPath()
            c2d.arc(x - dx * k * 0.18, y - dy * k * 0.18, 1.1 + k * 2.6 + w, 0, Math.PI * 2)
            c2d.fillStyle = k > 0.02 ? `rgba(11,123,255,${0.25 + k * 0.75})` : dc
            c2d.fill()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    /* ===== marquee berbasis kecepatan scroll ===== */
    if (!RM) {
      const mt = gsap.to('#mq', { xPercent: -50, duration: 30, ease: 'none', repeat: -1 })
      const sk = gsap.quickTo('#mq', 'skewX', { duration: 0.4 })
      ScrollTrigger.create({
        onUpdate: (self) => {
          const vel = self.getVelocity()
          mt.timeScale(1 + Math.min(Math.abs(vel) / 250, 8) * (vel < 0 ? -1 : 1))
          sk(Math.max(-12, Math.min(12, vel / -120)))
          gsap.to(mt, { timeScale: 1, duration: 1.2, overwrite: true })
        },
      })
    }

    /* ===== reveal saat scroll ===== */
    qa('[data-words]').forEach((h) => {
      const w = makeWords(h, false)
      if (RM) return
      gsap.from(w, { yPercent: 110, rotate: 4, duration: 0.9, stagger: 0.06, ease: 'power4.out', scrollTrigger: { trigger: h, start: 'top 85%' } })
    })
    if (!RM) {
      gsap.from('.card', { opacity: 0, y: 40, duration: 0.8, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger: '#grid', start: 'top 80%' } })
      gsap.from('.step', { opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: '.steps', start: 'top 85%' } })
    }
    qa('[data-n]').forEach((b) => {
      const n = Number(b.dataset.n ?? 0)
      const o = { v: 0 }
      ScrollTrigger.create({
        trigger: b, start: 'top 90%', once: true,
        onEnter: () => {
          gsap.to(o, {
            v: n, duration: RM ? 0 : 1.6, ease: 'power2.out',
            onUpdate: () => { b.textContent = `${Math.round(o.v)}${n === 100 ? '%' : ''}` },
          })
        },
      })
    })

    /* ===== sorotan kartu ===== */
    qa('.card').forEach((c) => {
      onEl(c, 'mousemove', (e) => {
        const r = c.getBoundingClientRect()
        c.style.setProperty('--mx', `${e.clientX - r.left}px`)
        c.style.setProperty('--my', `${e.clientY - r.top}px`)
      })
    })

    /* ===== animasi alur: tarik ZIP ke iPhone ===== */
    const stg = q('#stage')
    const phw = q('#phw')
    const ph = q('#ph')
    const zf = q('#zipf')
    const dz = q('#dz')
    const res = q('#res')
    const lst = q('#lst')
    const people: Array<[string, string, string]> = [
      ['nadia.putri', 'Nadia Putri', '1494790108377-be9c29b29330'],
      ['reza_kusuma', 'Reza Kusuma', '1507003211169-0a1dd7228f2d'],
      ['dimas.arya', 'Dimas Arya', '1500648767791-00dcc994a43e'],
      ['salsa.bella', 'Salsa Bella', '1534528741775-53994a69daeb'],
      ['kopi.senja', 'Kopi Senja', '1517841905240-472988babdf9'],
      ['andra.visual', 'Andra Visual', '1539571696357-5a69c17a67c6'],
      ['mira.studio', 'Mira Studio', '1524504388940-b1c1722653e1'],
      ['bagas.ds', 'Bagas DS', '1522075469751-3a6694fb2f61'],
      ['tika.rahma', 'Tika Rahma', '1544005313-94ddf0286df2'],
      ['fajar.nugroho', 'Fajar Nugroho', '1506794778202-cad84cf45f1d'],
      ['lina.writes', 'Lina Writes', '1534528741775-53994a69daeb'],
      ['yoga.trip', 'Yoga Trip', '1492562080023-ab3db95bfbce'],
    ]
    lst.innerHTML = people
      .map(([handle, name, avatarId], i) => {
        const h = (i * 47 + 200) % 360
        const fallbackBg = `linear-gradient(135deg,hsl(${h} 70% 45%),hsl(${h + 50} 75% 38%))`
        const avatarUrl = `https://images.unsplash.com/photo-${avatarId}?w=100&h=100&fit=crop&crop=faces`
        return `<div class="rw"><span class="av" style="background:${fallbackBg}"><img src="${avatarUrl}" alt="${name}" loading="lazy" onerror="this.remove()" /></span><span class="nm"><b>${name}</b><small>@${handle}</small></span><span class="op">Buka</span></div>`
      })
      .join('')

    const fit = (): void => { ph.style.transform = `scale(${phw.clientWidth / 427})` }
    fit()
    onWin('resize', fit)
    if ('ResizeObserver' in window) {
      const ro2 = new ResizeObserver(fit)
      ro2.observe(phw)
      cleanups.push(() => ro2.disconnect())
    }

    const step = (n: number): void => {
      qa('#steps li').forEach((l, i) => l.classList.toggle('on', i === n))
    }
    const pos = (e: Element): { x: number; y: number } => {
      const s = stg.getBoundingClientRect()
      const r = e.getBoundingClientRect()
      return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 }
    }
    const cnt = { a: 0, b: 0, c: 0 }
    const nums = (): void => {
      q('#nA').textContent = NUMBER_FMT.format(Math.round(cnt.a))
      q('#nB').textContent = NUMBER_FMT.format(Math.round(cnt.b))
      q('#nC').textContent = String(Math.round(cnt.c))
    }
    const reset = (): void => {
      gsap.set(dz, { clearProps: 'all' })
      gsap.set('#dz1', { opacity: 1 })
      gsap.set('#dz2', { opacity: 0 })
      gsap.set('#bar', { scaleX: 0 })
      gsap.set(res, { opacity: 0, display: 'none' })
      gsap.set('.rw', { opacity: 0, y: 28 })
      gsap.set(lst, { y: 0 })
      gsap.set(zf, { opacity: 0 })
      cnt.a = cnt.b = cnt.c = 0
      nums()
      dz.classList.remove('over')
      q('#stx').textContent = 'Membuka ZIP…'
      q('#pct').textContent = '0%'
    }
    let seq: gsap.core.Timeline | null = null
    let again: gsap.core.Tween | null = null
    const stopAll = (): void => { seq?.kill(); again?.kill() }
    const showEnd = (): void => {
      stopAll()
      reset()
      gsap.set(dz, { display: 'none' })
      gsap.set(res, { display: 'block', opacity: 1 })
      gsap.set('.rw', { opacity: 1, y: 0 })
      cnt.a = 1248; cnt.b = 892; cnt.c = 128
      nums()
      step(2)
    }
    const run = (): void => {
      stopAll()
      reset()
      step(0)
      const s = stg.getBoundingClientRect()
      const d = pos(dz)
      const sx = zf.offsetWidth / 2 + 8
      const sy = s.height * 0.22
      seq = gsap.timeline({ onComplete: () => { again = gsap.delayedCall(3, run) } })
      seq
        .set(zf, { x: sx, y: sy, opacity: 0, scale: 0.9, rotate: -5, xPercent: -50, yPercent: -50 })
        .to(zf, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' })
        .to(zf, { x: d.x, y: d.y - 20, rotate: 4, duration: 1.4, ease: 'power2.inOut' }, '+=.3')
        .add(() => { dz.classList.add('over') }, '-=.5')
        .to(zf, { scale: 0.5, opacity: 0, y: d.y + 10, duration: 0.35, ease: 'power2.in' }, '+=.1')
        .add(() => { dz.classList.remove('over'); step(1) })
        .to('#dz1', { opacity: 0, duration: 0.25 }, '<')
        .to('#dz2', { opacity: 1, duration: 0.3 })
        .to('#bar', {
          scaleX: 1, duration: 2.4, ease: 'power1.inOut',
          onUpdate: function (this: gsap.core.Tween) {
            const p = this.progress()
            q('#stx').textContent = p < 0.4 ? 'Membuka ZIP di browser…' : p < 0.8 ? 'Membaca follower dan following…' : 'Menyusun hasil…'
            q('#pct').textContent = `${Math.round(p * 100)}%`
          },
        })
        .add(() => { step(2) })
        .to(dz, { height: 0, opacity: 0, marginTop: 0, borderWidth: 0, duration: 0.6, ease: 'power3.inOut' })
        .set(res, { display: 'block' })
        .to(res, { opacity: 1, duration: 0.3 }, '<')
        .to(cnt, { a: 1248, b: 892, c: 128, duration: 1.2, ease: 'power2.out', onUpdate: nums }, '<')
        .to('.rw', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '<.2')
        .to(lst, { y: -220, duration: 2.2, ease: 'power1.inOut' }, '+=.3')
    }
    if (RM) {
      showEnd()
    } else {
      reset()
      ScrollTrigger.create({
        trigger: stg, start: 'top 70%', end: 'bottom 15%',
        onEnter: run, onEnterBack: run, onLeave: stopAll, onLeaveBack: stopAll,
      })
    }
    onEl(q('#replay'), 'click', () => { if (RM) showEnd(); else run() })
    cleanups.push(stopAll)

    /* ===== tombol tema (circle bloom) ===== */
    const tg = q('#tgl')
    type Theme = 'light' | 'dark'
    const effective = (): Theme => {
      const saved = localStorage.getItem('theme') as Theme | null
      if (saved === 'dark' || saved === 'light') return saved
      if (root.classList.contains('dark')) return 'dark'
      return (root.getAttribute('data-theme') as Theme | null) ?? (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light')
    }
    const setTheme = (t: Theme, save: boolean): void => {
      root.setAttribute('data-theme', t)
      root.classList.remove('light', 'dark')
      root.classList.add(t)
      tg.setAttribute('aria-label', t === 'dark' ? 'Beralih ke mode terang' : 'Beralih ke mode gelap')
      if (save) {
        try {
          localStorage.setItem('iarty-theme', t)
          localStorage.setItem('theme', t)
        } catch { /* penyimpanan tidak tersedia */ }
      }
    }
    let saved: string | null = null
    try { saved = localStorage.getItem('theme') || localStorage.getItem('iarty-theme') } catch { /* abaikan */ }
    setTheme(saved === 'dark' || saved === 'light' ? saved : effective(), false)
    onEl(tg, 'click', () => {
      const next: Theme = effective() === 'dark' ? 'light' : 'dark'
      const doc = document as TransitionDoc
      if (RM || !doc.startViewTransition) { setTheme(next, true); return }
      const r = tg.getBoundingClientRect()
      const x = r.left + r.width / 2
      const y = r.top + r.height / 2
      const rad = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
      const tr = doc.startViewTransition(() => setTheme(next, true))
      tr.ready
        .then(() => {
          root.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${rad}px at ${x}px ${y}px)`] },
            { duration: 700, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => undefined)
    })

    /* ===== loader + transisi halaman ===== */
    const tr = q('#tr')
    const pn = qa('#tr i')
    const trc = q('#trc')
    const pg = { v: 0 }
    const fin = (): void => {
      tr.style.visibility = 'hidden'
      tr.style.pointerEvents = 'none'
      trc.classList.add('min')
      root.style.overflow = ''
      ScrollTrigger.refresh()
    }
    const go = (fn: () => void, keep = false): void => {
      if (RM) { fn(); return }
      tr.style.visibility = 'visible'
      tr.style.pointerEvents = 'all'
      gsap.set(pn, { transformOrigin: '50% 100%', scaleY: 0 })
      gsap.set(trc, { opacity: 0 })
      gsap.set('.ldl', { opacity: 1, scale: 1 })
      const t = gsap.timeline()
      t.to(pn, { scaleY: 1, duration: 0.65, stagger: { each: 0.05, from: 'edges' }, ease: 'expo.inOut' })
        .fromTo(trc, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.4, ease: 'back.out(2)' }, '-=.3')
        .add(fn)
      if (keep) return
      t.set(pn, { transformOrigin: '50% 0%' }, '+=.25')
        .to(trc, { opacity: 0, duration: 0.2 }, '<')
        .to(pn, { scaleY: 0, duration: 0.75, stagger: { each: 0.05, from: 'center' }, ease: 'expo.inOut' })
        .add(() => {
          tr.style.visibility = 'hidden'
          tr.style.pointerEvents = 'none'
          ScrollTrigger.refresh()
        })
    }
    if (RM) {
      tr.style.display = 'none'
    } else {
      tr.style.visibility = 'visible'
      trc.classList.remove('min')
      root.style.overflow = 'hidden'
      const ready = Promise.all([
        new Promise<void>((r) => {
          if (document.readyState === 'complete' || document.readyState === 'interactive') r()
          else window.addEventListener('DOMContentLoaded', () => r(), { once: true })
        }),
        document.fonts ? document.fonts.ready : Promise.resolve(),
      ])
      const L = gsap.timeline()
      L.to('#ldp', { strokeDashoffset: 0, duration: 1.5, ease: 'power2.inOut' }, 0)
        .to(pg, {
          v: 100, duration: 1.9, ease: 'power2.inOut',
          onUpdate: () => {
            q('#trn').textContent = String(Math.round(pg.v))
            gsap.set('#trb', { scaleX: pg.v / 100 })
          },
        }, 0)
        .to('#ldp', { fill: '#fff', duration: 0.5 }, 1.4)
        .to('.ldl', { scale: 1.12, duration: 0.4, ease: 'back.out(3)', yoyo: true, repeat: 1 }, 1.5)
      L.eventCallback('onComplete', () => {
        void ready.then(() => {
          gsap.timeline({ onComplete: fin })
            .to(['.ldn', '.ldt', '.ldb'], { opacity: 0, y: -10, duration: 0.3, stagger: 0.05 })
            .to('.ldl', { scale: 0.6, opacity: 0, duration: 0.35, ease: 'power2.in' }, '<')
            .to(pn, { scaleY: 0, duration: 0.95, stagger: { each: 0.07, from: 'center' }, ease: 'expo.inOut' }, '-=.05')
            .add(() => { heroTl?.play() }, '-=.6')
        })
      })
    }

    onDoc('click', (e) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]')
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === '_blank') return
      const h = a.getAttribute('href') ?? ''
      if (h.startsWith('#')) {
        e.preventDefault()
        const target = h.length > 1 ? document.getElementById(h.slice(1)) : null
        go(() => { if (target) target.scrollIntoView(); else window.scrollTo(0, 0) })
      } else if (/^https?:/.test(h)) {
        e.preventDefault()
        go(() => { window.location.href = h }, true)
      } else if (h.startsWith('/')) {
        e.preventDefault()
        go(() => { window.location.href = h }, true)
      }
    })
    onWin('pageshow', (e) => { if (e.persisted) fin() })

    /* ===== tombol magnetik + cincin kursor ===== */
    if (!RM && matchMedia('(hover:hover)').matches) {
      qa('.mag').forEach((b) => {
        const qx = gsap.quickTo(b, 'x', { duration: 0.5, ease: 'power3' })
        const qy = gsap.quickTo(b, 'y', { duration: 0.5, ease: 'power3' })
        onEl(b, 'mousemove', (e) => {
          const r = b.getBoundingClientRect()
          qx((e.clientX - r.left - r.width / 2) * 0.3)
          qy((e.clientY - r.top - r.height / 2) * 0.4)
        })
        onEl(b, 'mouseleave', () => { qx(0); qy(0) })
      })
      const cur = q('#cur')
      const qcx = gsap.quickTo(cur, 'x', { duration: 0.25, ease: 'power3' })
      const qcy = gsap.quickTo(cur, 'y', { duration: 0.25, ease: 'power3' })
      onWin('mousemove', (e) => {
        gsap.to(cur, { opacity: 1, duration: 0.3 })
        qcx(e.clientX - 17)
        qcy(e.clientY - 17)
      })
      qa('a,.blk,.pill,.card').forEach((a) => {
        a.addEventListener('mouseenter', () => gsap.to(cur, { scale: 1.7, duration: 0.3 }))
        a.addEventListener('mouseleave', () => gsap.to(cur, { scale: 1, duration: 0.3 }))
      })
    }
  })

  return () => {
    cancelAnimationFrame(raf)
    timers.forEach((t) => window.clearTimeout(t))
    intervals.forEach((i) => window.clearInterval(i))
    cleanups.forEach((fn) => fn())
    ctx.revert()
    ScrollTrigger.getAll().forEach((s) => s.kill())
  }
}
