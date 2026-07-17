import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import ScrollVelocity from "@/components/ScrollVelocity"
import ClickSpark from "@/components/ClickSpark"
import Magnet from "@/components/Magnet"
import SpotlightCard from "@/components/SpotlightCard"
import AnimatedContent from "@/components/AnimatedContent"
import CountUp from "@/components/CountUp"
import GlareHover from "@/components/GlareHover"
import Particles from "@/components/Particles"
import TextType from "@/components/TextType"
import GradientText from "@/components/GradientText"
import StarBorder from "@/components/StarBorder"
import TrueFocus from "@/components/TrueFocus"

const IG = "https://www.instagram.com/manuelbitez/"
const MAPS = "https://www.google.com/maps/search/Manuel+Bitez"
const NAV = [
  ["Hikaye", "#hikaye"], ["Bira & Pizza", "#bira"], ["Galeri", "#galeri"],
  ["Yorumlar", "#yorumlar"], ["İletişim", "#iletisim"],
]
const BEERS = [
  ["Guinness", "fıçı · Irish stout"],
  ["Kilkenny", "fıçı · Irish red ale"],
  ["Efes / Bomonti", "şişe · yerli"],
  ["… ve dahası", "15+ çeşit soğuk bira"],
]
const MEKANLAR = [
  { i: "🍺", n: "Manuel", d: "Fıçı bira & leziz kokteyller. Ülkenin en çok fıçı birayı bulunduran birahanelerinden.", c: "text-amber-600" },
  { i: "🍔", n: "Mitos", d: "Buz gibi şişe bira, tek çeşit cheeseburger, sosis, patates — ve dönen plaklar. Kahve yok, çay yok; sadece iyi bira.", c: "text-orange-600" },
  { i: "🍕", n: "Napoli Pizza", d: "Yanı başımızda odun ateşinde Napoli usulü pizza. #napolipizzacısı", c: "text-teal-600" },
]
const BADGES = ["★ 4,5 (325)", "Sahibi kadın 👩", "İçeride & adrese servis", "12 ay açık", "Popüler: Bira 🍺", "₺600–1.800"]
const REVIEWS = [
  { n: "Evrim EGE", meta: "Yerel Rehber · 119 yorum", t: "Köy içinde ve kendine has bir atmosferi olan keyifli mekan. Hele kış günü güneş varken kapı önünde biranızı yudumlamak 10 numara.", s: 5 },
  { n: "Ata Gündüzalp", meta: "Yerel Rehber · 28 yorum", t: "Güzel, sokak arası tatlış bir bar. Kokteyl içtim güzeldi, fiyatlar görece uygun. Gelinir görünür, afiyet olsun.", s: 5 },
  { n: "Safiye Yıldız", meta: "Yerel Rehber · 20 yorum", t: "Mahalle barı konseptli sıcak bir yer. Güler yüzlü, misafirperver bir karşılama. Tekrar geleceğim.", s: 4 },
]
const GALLERY = [
  ["foto/foto3.jpg", "MANUEL, gece", "-3deg"],
  ["foto/foto2.jpg", "gün batımı 🌅", "2.5deg"],
  ["foto/foto1.jpg", "sokak dolu", "-1.5deg"],
  ["foto/foto4.jpg", "fıçı akıyor 🍺", "3deg"],
]

function Wave({ className = "" }: { className?: string }) {
  return (
    <svg className={`wavy ${className}`} viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none">
      <path d="M0 12 Q 30 0 60 12 T 120 12 T 180 12 T 240 12 T 300 12 T 360 12 T 420 12 T 480 12 T 540 12 T 600 12 T 660 12 T 720 12 T 780 12 T 840 12 T 900 12 T 960 12 T 1020 12 T 1080 12 T 1140 12 T 1200 12" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}
function Stars({ n }: { n: number }) {
  return <span className="text-amber-500 tracking-wider">{"★".repeat(n)}<span className="text-amber-500/25">{"★".repeat(5 - n)}</span></span>
}

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [intro, setIntro] = useState(true)
  const hour = new Date().getHours()
  const isOpen = hour >= 17 || hour < 1
  const glow = useRef<HTMLDivElement>(null)
  const bar = useRef<HTMLDivElement>(null)
  const heroImg = useRef<HTMLImageElement>(null)
  const heroTxt = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 1800)
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (bar.current) {
        const h = document.documentElement.scrollHeight - window.innerHeight
        bar.current.style.width = `${(window.scrollY / h) * 100}%`
      }
    }
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX / window.innerWidth - 0.5
      const dy = e.clientY / window.innerHeight - 0.5
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`
      if (heroImg.current) heroImg.current.style.transform = `scale(1.08) translate(${dx * -22}px, ${dy * -14}px)`
      if (heroTxt.current) heroTxt.current.style.transform = `translate(${dx * 12}px, ${dy * 8}px)`
    }
    window.addEventListener("scroll", onScroll)
    window.addEventListener("mousemove", onMove)
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove) }
  }, [])

  return (
    <ClickSpark sparkColor="#ef7a2d" sparkSize={11} sparkRadius={22} sparkCount={9} duration={520}>
      <div className="min-h-screen bg-[#f7f0e3] text-[#2b2620] font-sans antialiased overflow-x-hidden">

        {/* giriş */}
        <div className={`fixed inset-0 z-[200] bg-[#1c2b26] flex items-center justify-center transition-opacity duration-700 ${intro ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
          <div className="text-center animate-[fadeup_.8s_ease-out]">
            <img src="foto/logo.jpg" alt="Manuel" className="h-24 w-24 rounded-full ring-2 ring-amber-400/70 object-cover mx-auto shadow-2xl" />
            <p className="mt-4 hand text-4xl text-amber-300">gel otur 🍺</p>
          </div>
        </div>

        <div className="fixed top-0 left-0 z-[60] h-[3px] bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500" ref={bar} style={{ width: 0 }} />
        <div ref={glow} className="pointer-events-none fixed left-0 top-0 z-[5] h-[500px] w-[500px] rounded-full hidden md:block"
          style={{ background: "radial-gradient(circle, rgba(239,122,45,0.14), transparent 62%)", mixBlendMode: "screen" }} />

        {lightbox && (
          <div onClick={() => setLightbox(null)} className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-6 cursor-zoom-out animate-[fadeup_.3s_ease-out]">
            <img src={lightbox} alt="" className="max-h-[88vh] max-w-[92vw] rounded-2xl shadow-2xl" />
          </div>
        )}

        {/* NAV */}
        <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#1c2b26]/90 backdrop-blur-md shadow-lg" : ""}`}>
          <nav className="mx-auto max-w-6xl px-6 h-[72px] flex items-center justify-between text-[#f7f0e3]">
            <a href="#top" className="flex items-center gap-2.5">
              <img src="foto/logo.jpg" alt="Manuel Bitez" className="h-10 w-10 rounded-full ring-2 ring-amber-400/70 object-cover" />
              <span className="font-heading font-semibold text-xl tracking-tight">Manuel</span>
            </a>
            <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
              {NAV.map(([n, href]) => (
                <a key={n} href={href} className="relative text-[#f7f0e3]/85 hover:text-amber-300 transition after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-amber-400 after:transition-all hover:after:w-full">{n}</a>
              ))}
            </div>
            <Magnet padding={60} magnetStrength={4}>
              <a href={IG} target="_blank" rel="noreferrer"><Button className="rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow-lg">@manuelbitez</Button></a>
            </Magnet>
          </nav>
        </header>

        {/* HERO — gün batımı */}
        <section id="top" className="relative h-[100svh] w-full overflow-hidden flex items-end">
          <img ref={heroImg} src="foto/foto2.jpg" alt="Manuel Bitez terasından gün batımı" className="absolute inset-0 h-full w-full object-cover object-[center_45%] scale-[1.08] transition-transform duration-300 ease-out will-change-transform" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a1508] via-[#2a1508]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2a1508]/55 via-transparent to-transparent" />
          <div className="absolute inset-0 z-[6] pointer-events-none">
            <Particles particleCount={120} particleColors={["#ffd27f", "#ffe9c7", "#ffffff"]} particleBaseSize={70} particleSpread={12} speed={0.1} alphaParticles moveParticlesOnHover particleHoverFactor={1.4} />
          </div>
          <div ref={heroTxt} className="relative z-10 mx-auto max-w-6xl px-6 w-full pb-16 md:pb-24 text-[#fdf6ea] will-change-transform">
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium mb-3 backdrop-blur border animate-[fadeup_.5s_ease-out_both] ${isOpen ? "bg-emerald-500/20 border-emerald-300/40 text-emerald-100" : "bg-white/10 border-white/25 text-[#fdf6ea]/90"}`}>
              <span className={`h-2 w-2 rounded-full ${isOpen ? "bg-emerald-400 animate-pulse" : "bg-orange-400"}`} />
              {isOpen ? "Şu an açık · 01:00'e kadar" : "Şimdi kapalı · 17:00'de açılır"}
            </span>
            <p className="hand text-3xl md:text-4xl text-amber-300 mb-1 animate-[fadeup_.6s_ease-out_both]">Bitez'in köy birahanesi</p>
            <h1 className="font-heading font-semibold text-7xl md:text-[9rem] leading-[0.9] tracking-tight animate-[fadeup_.9s_ease-out_both] drop-shadow-lg">Manuel</h1>
            <div className="mt-3 font-heading italic text-2xl md:text-4xl text-amber-200 animate-[fadeup_1.1s_ease-out_both] min-h-[2.6rem] drop-shadow">
              <TextType text={["Moda değil; alışkanlık.", "Mekân değil; sokak.", "5 yıldır aynı Manuel.", "Bira, pizza, gün batımı."]}
                typingSpeed={55} pauseDuration={1800} deletingSpeed={28} loop showCursor cursorCharacter="|" className="font-heading italic" textColors={["#fde68a"]} />
            </div>
            <p className="mt-6 max-w-lg text-lg text-[#fdf6ea]/90 leading-relaxed animate-[fadeup_1.3s_ease-out_both] drop-shadow">
              Zeytin ağaçları, sarı ışıklar, buz gibi biralar. Gün batınca ışıklar yanar,
              sokak şenlenir — rezervasyon yok, gel otur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4 animate-[fadeup_1.5s_ease-out_both]">
              <Magnet padding={80} magnetStrength={3}>
                <a href={MAPS} target="_blank" rel="noreferrer"><StarBorder as="div" color="#ffcf6b" speed="4s" thickness={2} className="font-semibold text-base cursor-pointer"><span className="text-[#fdf6ea]">Yol Tarifi</span></StarBorder></a>
              </Magnet>
              <a href={IG} target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="rounded-full border-[#fdf6ea]/50 bg-white/10 text-[#fdf6ea] hover:bg-white/20 px-8 h-12 text-base backdrop-blur">Instagram</Button></a>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[#fdf6ea]/60 text-xs tracking-[0.3em] animate-bounce">↓</div>
        </section>

        {/* ŞERİT */}
        <div className="bg-[#1c2b26] text-amber-400/90 py-4 overflow-hidden">
          <ScrollVelocity texts={["Köy Birahanesi · Napoli Pizza · En Soğuk Fıçı Bira · 12 Ay Açık · Bitez · "]} velocity={55} numCopies={7} className="hand text-3xl md:text-4xl" />
        </div>

        {/* ROZETLER */}
        <div className="bg-[#f7f0e3] border-b border-[#e5dcc9]">
          <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap justify-center gap-3">
            {BADGES.map((b) => (
              <span key={b} className="rounded-full bg-white/70 border border-[#e5dcc9] px-4 py-1.5 text-sm text-[#5c5344] shadow-sm">{b}</span>
            ))}
          </div>
        </div>

        {/* HİKAYE */}
        <section id="hikaye" className="mx-auto max-w-6xl px-6 py-24 md:py-28 grid md:grid-cols-[1.05fr_1fr] gap-16 items-center scroll-mt-20">
          <AnimatedContent distance={80} direction="horizontal" reverse duration={0.9} threshold={0.2}>
            <div className="relative sticker">
              <div className="tape -top-3 left-8 rounded-sm rotate-[6deg]" />
              <GlareHover width="100%" height="auto" borderRadius="18px" background="transparent" borderColor="transparent" glareColor="#ffffff" glareOpacity={0.25} glareAngle={-40} glareSize={260} transitionDuration={900} className="!block">
                <img src="foto/foto1.jpg" alt="Manuel'de canlı bir gece" className="rounded-[18px] shadow-2xl w-full object-cover aspect-[5/4]" />
              </GlareHover>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={80} direction="horizontal" duration={0.9} threshold={0.2} delay={0.1}>
            <div>
              <p className="hand text-3xl text-orange-500">bizim hikaye</p>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl mt-1 leading-[1.05]">Moda değil; <span className="italic text-orange-600">alışkanlık.</span></h2>
              <p className="mt-6 text-[#5c5344] text-lg leading-relaxed">
                Plan yapmadan denk gelinen arkadaşlar, "biraz daha oturalım" denen akşamüstleri…
                Sevdiğimiz içkiler, sevdiğimiz şarkılar ve yıllardır biriken güzel anılar.
              </p>
              <p className="mt-4 text-[#5c5344] text-lg leading-relaxed">
                Yanı başımızda <span className="font-medium text-[#2b2620]">Mitos</span> — Napoli usulü pizza, cheeseburger ve buz gibi şişe biralar.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 md:gap-6">
                <div><p className="font-heading text-3xl md:text-4xl font-semibold text-orange-600"><CountUp to={84351} separator="." duration={2} /></p><p className="text-xs md:text-sm text-[#8a7f6c]">misafir / yıl</p></div>
                <div><p className="font-heading text-3xl md:text-4xl font-semibold text-teal-600"><CountUp to={5} duration={1.2} />.</p><p className="text-xs md:text-sm text-[#8a7f6c]">yıl aynı sokak</p></div>
                <div><p className="font-heading text-3xl md:text-4xl font-semibold text-pink-600">12</p><p className="text-xs md:text-sm text-[#8a7f6c]">ay açık</p></div>
              </div>
            </div>
          </AnimatedContent>
        </section>

        {/* ENERJİ BANDI */}
        <section className="relative h-[62vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-fixed bg-center bg-cover scale-105" style={{ backgroundImage: "url(foto/foto1.jpg)" }} />
          <div className="absolute inset-0 bg-[#2a1508]/72" />
          <div className="relative z-10 text-center text-[#fdf6ea] px-6">
            <p className="hand text-3xl text-amber-300 mb-2">bu sokakta çok şey oldu</p>
            <h2 className="font-heading font-semibold text-5xl md:text-7xl leading-[1.05]">Mahallenin<br /><span className="italic text-amber-300">Kalbi.</span></h2>
            <p className="mt-5 hand text-4xl text-orange-300">viva manuel 🤘</p>
          </div>
        </section>

        {/* TEK SOKAK, ÜÇ MEKAN */}
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
          <AnimatedContent distance={50} duration={0.8}>
            <div className="text-center mb-12">
              <p className="hand text-3xl text-orange-500">tek sokak</p>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl mt-1">üç mekan, bir aile</h2>
              <p className="text-[#8a7f6c] mt-2 max-w-lg mx-auto">Manuel Sokağı'nda hepsi yan yana — birinden çık, diğerine gir.</p>
            </div>
          </AnimatedContent>
          <div className="grid md:grid-cols-3 gap-6">
            {MEKANLAR.map((m, i) => (
              <AnimatedContent key={m.n} distance={50} duration={0.8} delay={i * 0.1}>
                <div className="h-full rounded-3xl bg-white border border-[#eadfca] shadow-sm p-8 hover:-translate-y-1.5 hover:shadow-lg transition">
                  <div className="text-5xl mb-4">{m.i}</div>
                  <h3 className={`font-heading text-2xl font-semibold ${m.c}`}>{m.n}</h3>
                  <p className="mt-3 text-[#5c5344] leading-relaxed">{m.d}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* BİRA & PİZZA */}
        <section id="bira" className="bg-[#1c2b26] text-[#fdf6ea] py-24 md:py-28 relative scroll-mt-20">
          <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-[1fr_1.15fr] gap-16 items-center relative z-10">
            <AnimatedContent distance={80} direction="horizontal" reverse duration={0.9}>
              <div className="relative sticker">
                <div className="tape -top-3 right-10 rotate-[-8deg] rounded-sm" />
                <GlareHover width="100%" height="auto" borderRadius="18px" background="transparent" borderColor="transparent" glareColor="#ffd27f" glareOpacity={0.35} glareAngle={-30} glareSize={300} transitionDuration={1000} className="!block">
                  <img src="foto/foto4.jpg" alt="Guinness & Kilkenny fıçı biralar" className="rounded-[18px] shadow-2xl w-full object-cover aspect-[4/5] ring-1 ring-white/10" />
                </GlareHover>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={60} duration={0.9} delay={0.1}>
              <div>
                <p className="hand text-3xl text-amber-300">buz gibi</p>
                <GradientText colors={["#f5b942", "#ef7a2d", "#ffe1a8", "#f5b942"]} animationSpeed={6} className="font-heading font-semibold text-4xl md:text-5xl mt-1 !inline-block">En soğuk fıçı bira</GradientText>
                <p className="mt-5 text-[#fdf6ea]/75 text-lg leading-relaxed">
                  Metrekareye göre bölgenin — hatta ülkenin — <span className="text-amber-300 font-medium">en çok fıçı birayı</span> bulunduran dükkanlarından biriyiz. Taze, buz gibi, hep akan.
                </p>
                <ul className="mt-8 space-y-3">
                  {BEERS.map(([n, d]) => (
                    <li key={n} className="flex items-baseline gap-3 group">
                      <span className="font-medium whitespace-nowrap group-hover:text-amber-300 transition">{n}</span>
                      <span className="flex-1 border-b border-dotted border-white/20" />
                      <span className="text-sm text-[#fdf6ea]/60 text-right">{d}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 hand text-2xl text-orange-300">gün ola harman ola 😎</p>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* AYRAÇ */}
        <div className="bg-[#f7f0e3] pt-14"><Wave /></div>
        <div className="bg-[#f7f0e3] pb-6 flex justify-center px-6">
          <TrueFocus sentence="iyi bira iyi sohbet" borderColor="#ef7a2d" glowColor="rgba(239,122,45,0.55)" blurAmount={4} animationDuration={0.6} pauseBetweenAnimations={0.9} />
        </div>

        {/* GALERİ — polaroid */}
        <section id="galeri" className="mx-auto max-w-6xl px-6 py-16 md:py-20 scroll-mt-20">
          <AnimatedContent distance={50} duration={0.8}>
            <div className="text-center mb-12">
              <p className="hand text-3xl text-orange-500">albüm</p>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl mt-1">Bir Bitez gecesi</h2>
              <p className="text-[#8a7f6c] text-sm mt-2">büyütmek için tıkla 👆</p>
            </div>
          </AnimatedContent>
          <div className="flex flex-wrap justify-center gap-6">
            {GALLERY.map(([src, cap, rot], i) => (
              <AnimatedContent key={src} distance={40} duration={0.7} delay={i * 0.08}>
                <button onClick={() => setLightbox(src)} className="polaroid rounded-sm cursor-zoom-in transition hover:scale-105 hover:z-10 hover:rotate-0 block"
                  style={{ transform: `rotate(${rot})`, width: "clamp(150px, 40vw, 260px)" }}>
                  <img src={src} alt={cap} className="w-full aspect-square object-cover rounded-sm" />
                  <p className="hand text-2xl text-[#2b2620] text-center mt-1">{cap}</p>
                </button>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* YORUMLAR */}
        <section id="yorumlar" className="relative overflow-hidden bg-[#152420] text-[#fdf6ea] py-24 md:py-28 scroll-mt-20">
          <div className="absolute inset-0 z-0 pointer-events-none opacity-70">
            <Particles particleCount={80} particleColors={["#ffd27f", "#ef7a2d"]} particleBaseSize={60} particleSpread={14} speed={0.08} alphaParticles moveParticlesOnHover particleHoverFactor={1.2} />
          </div>
          <div className="relative z-10 mx-auto max-w-6xl px-6">
            <AnimatedContent distance={50} duration={0.8}>
              <div className="text-center mb-12">
                <p className="hand text-3xl text-amber-300">ne demişler</p>
                <h2 className="font-heading font-semibold text-4xl md:text-5xl mt-1">Google'da 4,5 / 5</h2>
                <p className="text-[#fdf6ea]/50 mt-2"><CountUp to={324} duration={1.6} /> gerçek yorum</p>
              </div>
            </AnimatedContent>
            <div className="grid md:grid-cols-3 gap-6">
              {REVIEWS.map((r, i) => (
                <AnimatedContent key={r.n} distance={50} duration={0.8} delay={i * 0.12}>
                  <SpotlightCard className="!bg-white/5 !border-white/10 h-full" spotlightColor="rgba(239,122,45,0.25)">
                    <div className="text-sm"><Stars n={r.s} /></div>
                    <p className="mt-4 font-heading text-lg leading-relaxed text-[#fdf6ea]/90">"{r.t}"</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="h-11 w-11 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-semibold">{r.n[0]}</div>
                      <div><p className="font-semibold text-sm">{r.n}</p><p className="text-xs text-[#fdf6ea]/50">{r.meta}</p></div>
                    </div>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* İLETİŞİM */}
        <section id="iletisim" className="mx-auto max-w-6xl px-6 py-24 md:py-28 grid md:grid-cols-2 gap-12 items-stretch scroll-mt-20">
          <AnimatedContent distance={70} direction="horizontal" reverse duration={0.9}>
            <div className="flex flex-col justify-center h-full">
              <p className="hand text-3xl text-orange-500">bekleriz</p>
              <h2 className="font-heading font-semibold text-4xl md:text-5xl mt-1">Gel, bir kadeh kaldır</h2>
              <p className="mt-5 text-[#5c5344] text-lg max-w-md">Rezervasyon yok, gösteriş yok. 12 ay açığız — yolun Bitez'e düşerse sokağa sap, ışıkları takip et.</p>
              <div className="mt-8 space-y-4 text-[#2b2620]">
                <p><span className="text-orange-600 font-medium">Adres · </span>Cumhuriyet Cd. No:67, Bitez, 48470 Bodrum / Muğla</p>
                <Separator />
                <p><span className="text-orange-600 font-medium">Saatler · </span>Her gün 17:00 – 01:00 · 12 ay açık</p>
                <Separator />
                <p><span className="text-orange-600 font-medium">Instagram · </span>@manuelbitez</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Magnet padding={70} magnetStrength={3}>
                  <a href={IG} target="_blank" rel="noreferrer"><Button size="lg" className="rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold px-8 h-12">@manuelbitez</Button></a>
                </Magnet>
                <a href={MAPS} target="_blank" rel="noreferrer"><Button size="lg" variant="outline" className="rounded-full px-8 h-12 border-[#2b2620]/20">Yol Tarifi</Button></a>
              </div>
            </div>
          </AnimatedContent>
          <AnimatedContent distance={70} direction="horizontal" duration={0.9} delay={0.1}>
            <div className="rounded-[18px] overflow-hidden shadow-2xl min-h-[380px] h-full ring-1 ring-black/5">
              <iframe title="Manuel Bitez konum" className="w-full h-full min-h-[380px]" loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=27.3745%2C37.0285%2C27.3915%2C37.0385&layer=mapnik&marker=37.0335%2C27.3830" />
            </div>
          </AnimatedContent>
        </section>

        {/* FOOTER */}
        <footer className="bg-[#1c2b26] text-[#fdf6ea]/60">
          <div className="mx-auto max-w-6xl px-6 py-14 flex flex-col md:flex-row justify-between gap-8">
            <div className="max-w-xs">
              <span className="flex items-center gap-2.5 text-[#fdf6ea]">
                <img src="foto/logo.jpg" alt="Manuel" className="h-10 w-10 rounded-full ring-2 ring-amber-400/70 object-cover" />
                <span className="font-heading font-semibold text-xl">Manuel</span>
              </span>
              <p className="mt-4 hand text-2xl text-amber-300">köy birahanesi & napoli pizzacısı</p>
              <p className="mt-1 text-sm">Bitez'in sokağında, 5 yıldır aynı içtenlikte.</p>
            </div>
            <div className="flex gap-14 text-sm">
              <div>
                <p className="text-[#fdf6ea] font-medium mb-3">Keşfet</p>
                {NAV.slice(0, 3).map(([n, href]) => <a key={n} href={href} className="block py-1 hover:text-amber-300">{n}</a>)}
              </div>
              <div>
                <p className="text-[#fdf6ea] font-medium mb-3">İletişim</p>
                <p className="py-1">Cumhuriyet Cd. No:67</p>
                <p className="py-1">Bitez · Bodrum</p>
                <a href={IG} target="_blank" rel="noreferrer" className="py-1 block hover:text-amber-300">@manuelbitez</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 mx-auto max-w-6xl px-6 py-5">
            <p className="text-xs">© 2026 Manuel · Bitez, Bodrum · köy birahanesi 🍺</p>
            <p className="hand text-2xl text-amber-300">paylaştıkça artar 🫶</p>
          </div>
        </footer>
      </div>
    </ClickSpark>
  )
}
