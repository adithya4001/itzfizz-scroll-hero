import React, { useLayoutEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: '58', title: 'More pick-ups.', detail: 'Increase in pick-up point use', accent: 'lime' },
  { value: '23', title: 'Less friction.', detail: 'Decrease in customer phone calls', accent: 'blue' },
  { value: '27', title: 'Better reach.', detail: 'Increase in pick-up point use', accent: 'peach' },
  { value: '40', title: 'More clarity.', detail: 'Decrease in customer phone calls', accent: 'lavender' },
]

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M12 4v16m-6-6 6 6 6-6'} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Car() {
  return <svg className="car-art" viewBox="0 0 520 220" role="img" aria-label="Orange sports car viewed from above">
    <defs>
      <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ff9d36"/><stop offset=".45" stopColor="#fc6f21"/><stop offset=".75" stopColor="#e95517"/><stop offset="1" stopColor="#ff9b39"/></linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#717b76"/><stop offset=".38" stopColor="#2b3433"/><stop offset="1" stopColor="#111d1c"/></linearGradient>
      <linearGradient id="shine"><stop stopColor="#fff4d2" stopOpacity=".6"/><stop offset="1" stopColor="#fff4d2" stopOpacity="0"/></linearGradient>
    </defs>
    <rect x="79" y="16" width="80" height="25" rx="9" fill="#111512"/><rect x="79" y="179" width="80" height="25" rx="9" fill="#111512"/>
    <rect x="355" y="18" width="75" height="24" rx="9" fill="#111512"/><rect x="355" y="178" width="75" height="24" rx="9" fill="#111512"/>
    <path d="M58 34Q17 45 15 110q2 65 43 76l76 10h252q80-1 107-39 23-47 0-94-27-38-107-39H134Z" fill="url(#paint)" stroke="#bd461b" strokeWidth="3"/>
    <path d="m69 36 51 18h230l58-19M69 184l51-18h230l58 19" fill="none" stroke="#ffb86b" strokeWidth="4"/>
    <path d="M52 54Q27 110 52 166l36-17V71Z" fill="#252c28"/>
    <path d="m105 65 38-16h138l57 17q22 44 0 88l-57 17H143l-38-16q-18-45 0-90Z" fill="#151e1b" stroke="#bb501f" strokeWidth="3"/>
    <path d="m124 68 38-12h87l-12 108h-75l-38-12Z" fill="url(#glass)"/>
    <path d="m262 57 60 17q15 36 0 72l-60 17Z" fill="url(#glass)"/>
    <path d="m162 68 69-6-9 94-60-7Z" fill="#323b35"/>
    <path d="m271 67 37 11q9 29 2 54Z" fill="#d7e6df" opacity=".2"/>
    <path d="m113 60 29-9h110M114 160l28 9h110" fill="none" stroke="#9aaca2" strokeWidth="2" opacity=".6"/>
    <path d="m350 58 100 10q27 42 0 84l-100 10q25-52 0-104Z" fill="#fb7b28"/>
    <path d="m361 67 72 8M361 153l72-8" stroke="#b74716" strokeWidth="3"/>
    <path d="m466 61 18 14 8 22-19-9Zm0 98 18-14 8-22-19 9Z" fill="#18211e"/>
    <path d="m477 72 8 12m-8 64 8-12" stroke="#f7f3d3" strokeWidth="4" strokeLinecap="round"/>
    <rect x="29" y="60" width="8" height="29" rx="3" fill="#ff3531"/><rect x="29" y="131" width="8" height="29" rx="3" fill="#ff3531"/>
    <path d="M66 40h6v140h-6Z" fill="#1e2723"/>
    <path d="m88 34 4 17h64l-17-17Zm0 152 4-17h64l-17 17Z" fill="#38423b"/>
    <path d="m327 44 19-17 13 4-6 17Zm0 132 19 17 13-4-6-17Z" fill="#fa7928" stroke="#bc481b" strokeWidth="2"/>
    <path d="M77 42q131-15 329 2" fill="none" stroke="url(#shine)" strokeWidth="5"/>
    <path d="m365 83 59 3m-59 48 59-3" stroke="#ffb768" strokeWidth="2" opacity=".7"/>
    <path d="M50 101h30v18H50Z" fill="#0c1410"/>
  </svg>
}

function App() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia(root)
    media.add({ reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 767px)', desktop: '(min-width: 768px)' }, ({ conditions }) => {
      const select = gsap.utils.selector(root)
      if (conditions.reduced) return
      const intro = gsap.timeline({ defaults: { ease: 'power3.out' } })
      intro.from(select('.intro-line'), { y: 16, opacity: 0, duration: .7, stagger: .1 })
        .from(select('.headline-letter'), { yPercent: 105, opacity: 0, duration: .85, stagger: .035 }, .15)
        .from(select('.metric'), { y: 24, opacity: 0, duration: .75, stagger: .13 }, .55)
        .from(select('.scroll-cue'), { opacity: 0, y: 10, duration: .6 }, 1)

      const track = select('.track')[0]
      const car = select('.car')[0]
      const travel = () => Math.max(0, track.clientWidth - car.clientWidth - track.clientWidth * .045)
      const journey = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: select('.journey')[0],
          pin: select('.hero')[0],
          start: 'top top',
          end: () => `+=${window.innerHeight * (conditions.mobile ? 1.5 : 2)}`,
          scrub: .65,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
      journey.fromTo(car, { x: () => track.clientWidth * .025 }, { x: travel, duration: 1, ease: 'power1.inOut' }, 0)
        .fromTo(select('.track-fill'), { scaleX: .08 }, { scaleX: 1, duration: 1, ease: 'power1.inOut' }, 0)
        .fromTo(select('.progress-fill'), { scaleX: 0 }, { scaleX: 1, duration: 1 }, 0)
        .fromTo(select('.track-word'), { x: 18 }, { x: 0, duration: 1 }, 0)
        .to(select('.scroll-cue'), { opacity: .3, duration: .2 }, .2)
      return () => { intro.kill(); journey.kill() }
    })
    return () => media.revert()
  }, [])

  return <main ref={root} id="top">
    <a className="skip-link" href="#finish">Skip animation</a>
    <section className="journey" aria-labelledby="hero-title">
      <div className="hero flex flex-col">
        <header className="intro-line flex items-center justify-between">
          <a className="wordmark" href="#top" aria-label="Itzfizz home">itzfizz<span className="brand-dot">®</span></a>
          <span className="edition hidden sm:flex items-center gap-3"><span className="status-dot"/> DIGITAL EXPERIENCES, REAL IMPACT</span>
          <span className="header-index">EXPERIENCE / 01</span>
        </header>

        <div className="hero-copy">
          <p className="eyebrow intro-line flex items-center gap-2"><span className="tiny-cross">✳</span> THE DRIVE TO DO MORE</p>
          <h1 id="hero-title" aria-label="Welcome Itzfizz">{['WELCOME', 'ITZFIZZ'].map((word) => <span className="headline-word" aria-hidden="true" key={word}>{[...word].map((letter, index) => <span className="letter-mask" key={index}><span className="headline-letter">{letter}</span></span>)}</span>)}</h1>
          <div className="intro-line copy-row flex justify-between items-end gap-6">
            <p>Good things move forward.<br/><span>Let’s make your next move count.</span></p>
            <span className="track-label hidden sm:block">BUILT FOR MOMENTUM ↗</span>
          </div>
        </div>

        <div className="track" aria-label="Scroll to move the car across the track">
          <div className="track-fill"/>
          <div className="lane-line lane-line-top"/>
          <div className="lane-line lane-line-bottom"/>
          <div className="track-word" aria-hidden="true">MOVE WITH IMPACT.</div>
          <div className="car"><Car/></div>
          <span className="track-end" aria-hidden="true">→</span>
        </div>

        <div className="impact-row flex justify-between items-center"><p className="eyebrow">SMALL CHANGES. BIG DIFFERENCE.</p><span className="eyebrow">THE IMPACT, IN NUMBERS ↘</span></div>
        <div className="metrics grid grid-cols-2 md:grid-cols-4 gap-3">
          {metrics.map((metric, index) => <article className={`metric metric-${metric.accent}`} key={metric.value}>
            <div className="flex justify-between items-start"><p className="metric-value">{metric.value}<span>%</span></p><span className="metric-index">0{index + 1}</span></div>
            <h2>{metric.title}</h2><p className="metric-detail">{metric.detail}</p>
          </article>)}
        </div>
        <div className="hero-bottom flex items-center justify-between gap-6">
          <a className="scroll-cue flex items-center gap-3" href="#finish"><span className="circle-arrow"><Arrow/></span><span>SCROLL TO MOVE FORWARD</span></a>
          <div className="journey-progress" aria-hidden="true"><div className="progress-fill"/></div>
          <span className="bottom-note hidden sm:block">A LITTLE MOTION. A LOT OF POSSIBILITY.</span>
        </div>
      </div>
    </section>

    <section id="finish" className="finish flex flex-col justify-between" aria-labelledby="finish-title" tabIndex="-1">
      <p className="eyebrow flex items-center gap-2"><span className="tiny-cross">✳</span> YOU’VE GOT MOMENTUM.</p>
      <div><h2 id="finish-title">Now, imagine<br/>what’s <em>next.</em></h2><p>Every great experience starts with a move.<br/>Make yours matter.</p></div>
      <footer className="flex items-end justify-between gap-6"><span className="wordmark">itzfizz<span className="brand-dot">®</span></span><a className="back-link flex items-center gap-3" href="#top">TAKE ANOTHER DRIVE <Arrow diagonal/></a></footer>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>)
