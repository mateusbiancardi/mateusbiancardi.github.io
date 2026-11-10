import { useCallback, useEffect, useState, type CSSProperties } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedContent from './components/reactbits/AnimatedContent';
import ClickSpark from './components/reactbits/ClickSpark';
import CountUp from './components/reactbits/CountUp';
import DecryptedText from './components/reactbits/DecryptedText';
import DotGrid from './components/reactbits/DotGrid';
import FlowingMenu from './components/reactbits/FlowingMenu';
import Magnet from './components/reactbits/Magnet';
import ScrollReveal from './components/reactbits/ScrollReveal';
import ScrollVelocity from './components/reactbits/ScrollVelocity';
import SplitText from './components/reactbits/SplitText';
import { CONTENT, EMAIL, GITHUB, LINKEDIN, type Lang } from './content';

const ORANGE = '#ff4d00';
const BLACK = '#000000';
// cor dos pontos do fundo do hero quando parados (os próximos do cursor ficam laranja)
const DOT_COLOR = '#3d3d39';

// efeito de texto "decifrando" (DecryptedText): letras embaralhadas em laranja que se resolvem da esquerda para a direita
const DECRYPT = {
  animateOn: 'view',
  sequential: true,
  revealDirection: 'start',
  characters: 'abcdefghijklmnopqrstuvwxyz0123456789/<>_#',
  scrambleColor: ORANGE
} as const;

// Para colocar sua foto: salve o arquivo como public/foto.jpg (retrato, proporção 4:5 fica melhor)
const PHOTO_SRC = `${import.meta.env.BASE_URL}foto.jpg`;

const FULL_NAME = 'Mateus Biancardi da Silva';
const NAME_LINES = ['Mateus', 'Biancardi', 'da Silva'];
const STACK = ['React', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Next.js', 'Python', 'AWS', 'LLM'];
const LANGS: Lang[] = ['pt', 'en'];

const skipIntro = () => document.documentElement.classList.contains('skip');

/** Idioma inicial: o último escolhido; sem escolha, português para navegador em pt e inglês para o resto. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem('lang');
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {
    /* sem acesso ao armazenamento: segue pelo idioma do navegador */
  }
  return navigator.language?.toLowerCase().startsWith('pt') ? 'pt' : 'en';
}

const clockFormat = new Intl.DateTimeFormat('pt-BR', {
  timeZone: 'America/Sao_Paulo',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

/** Hora atual em Vitória, atualizada sozinha. */
function useClock() {
  const [time, setTime] = useState(() => clockFormat.format(new Date()));
  useEffect(() => {
    const id = setInterval(() => setTime(clockFormat.format(new Date())), 15000);
    return () => clearInterval(id);
  }, []);
  return time.split(':');
}

/** true enquanto a pessoa rola para baixo: a barra do topo some e volta ao subir. */
function useHideOnScroll() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      if (y > 160 && y > last + 4) setHidden(true);
      else if (y < last - 4 || y <= 160) setHidden(false);
      last = y;
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return hidden;
}

/** Moldura da foto: mostra public/foto.jpg; enquanto o arquivo não existe, mostra o espaço reservado. */
function Photo({ placeholder }: { placeholder: string }) {
  const [missing, setMissing] = useState(false);
  return (
    <figure className="photo">
      {missing ? (
        <div className="photo-empty">
          <span>{placeholder}</span>
          <small>public/foto.jpg</small>
        </div>
      ) : (
        <img src={PHOTO_SRC} alt={FULL_NAME} onError={() => setMissing(true)} />
      )}
    </figure>
  );
}

/** Link cujo texto "rola" para cima no hover. */
function Roll({ href, children, className = '' }: { href: string; children: string; className?: string }) {
  return (
    <a className={`roll ${className}`} href={href}>
      <span data-text={children}>{children}</span>
    </a>
  );
}

export default function App() {
  const [skip] = useState(skipIntro);
  const [ready, setReady] = useState(false);
  const [lang, setLang] = useState<Lang>(initialLang);
  const [hours, minutes] = useClock();
  const barHidden = useHideOnScroll();
  const t = CONTENT[lang];

  const open = useCallback(() => setReady(true), []);

  useEffect(() => {
    // espera as fontes para o nome não trocar de forma no meio da animação
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const limit = new Promise(resolve => setTimeout(resolve, 1500));
    let alive = true;
    if (skip) Promise.race([fonts, limit]).then(() => alive && open());
    // garantia: o site abre mesmo se a contagem não terminar (aba em segundo plano, por exemplo)
    const safety = setTimeout(open, 3500);
    return () => {
      alive = false;
      clearTimeout(safety);
    };
  }, [skip, open]);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem('visto', '1');
    } catch {
      /* navegação privada: só não lembra da abertura */
    }
  }, [ready]);

  useEffect(() => {
    document.documentElement.lang = t.htmlLang;
    document.title = `${FULL_NAME} — ${t.role}`.toLowerCase();
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.description);
    try {
      localStorage.setItem('lang', lang);
    } catch {
      /* sem armazenamento: a escolha vale só para esta visita */
    }
    // os textos mudam de tamanho com o idioma: recalcula os gatilhos de rolagem
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang, t]);

  return (
    <ClickSpark sparkColor={ORANGE} sparkSize={12} sparkRadius={26} sparkCount={8} duration={450}>
      <div className={ready ? 'app ready' : 'app'}>
        {!skip && (
          <div className="loader" aria-hidden="true">
            <span>{FULL_NAME}</span>
            <span>{t.loader}</span>
            <CountUp
              className="loader-count"
              to={100}
              duration={1.3}
              easing="expo"
              trigger="load"
              onEnd={() => setTimeout(open, 250)}
            />
          </div>
        )}

        <header className={barHidden ? 'bar hide' : 'bar'}>
          <Roll href="#topo">{FULL_NAME}</Roll>
          <nav aria-label={t.sections}>
            <Roll href="#trabalho">{t.nav.work}</Roll>
            <Roll href="#projetos">{t.nav.projects}</Roll>
            <Roll href="#contato">{t.nav.contact}</Roll>
            <div className="lang" role="group" aria-label={t.language}>
              {LANGS.map(code => (
                <button key={code} type="button" aria-pressed={lang === code} onClick={() => setLang(code)}>
                  {code}
                </button>
              ))}
            </div>
          </nav>
        </header>

        <main>
          <section className="hero" id="topo">
            <div className="hero-bg" aria-hidden="true">
              <DotGrid dotSize={5} gap={24} baseColor={DOT_COLOR} activeColor={ORANGE} proximity={180} />
            </div>
            <div className="hero-side">
              <Photo placeholder={t.photo} />
              <p className="hero-intro">
                {/* só começa a decifrar depois que a cortina de abertura sobe */}
                {ready ? <DecryptedText key={lang} text={t.intro} speed={26} {...DECRYPT} /> : t.intro}
              </p>
            </div>
            <h1 className="name" aria-label={FULL_NAME}>
              {NAME_LINES.map((line, i) => (
                <span className="line" key={line} aria-hidden="true">
                  <span className="line-in">
                    {/* mesmo efeito "decifrando" dos outros textos; mais lento por ser o título */}
                    {ready ? <DecryptedText text={line} speed={130} {...DECRYPT} /> : line}
                    {i === NAME_LINES.length - 1 && <span className="dot">.</span>}
                  </span>
                </span>
              ))}
            </h1>
            <div className="hero-foot">
              <a className="cue" href="#sobre">
                {t.cue} <span aria-hidden="true">↓</span>
              </a>
              <span>
                {t.place}{' '}
                <time className="clock">
                  {hours}
                  <i>:</i>
                  {minutes}
                </time>
              </span>
            </div>
          </section>

          <div className="marquee" aria-hidden="true">
            <ScrollVelocity
              texts={[
                STACK.map(item => (
                  <span className="marquee-item" key={item}>
                    {item}
                  </span>
                ))
              ]}
              velocity={55}
              numCopies={4}
              skewWithVelocity={0}
              parallaxClassName="marquee-row"
              scrollerClassName="marquee-scroller"
            />
          </div>

          <section className="sec" id="sobre">
            <h2 className="label">
              <DecryptedText key={lang} text={t.aboutLabel} speed={45} {...DECRYPT} />
            </h2>
            <div className="about-body">
              <ScrollReveal
                containerClassName="about"
                textClassName="big"
                baseOpacity={0.14}
                baseRotation={0}
                enableBlur={false}
                highlightColor={ORANGE}
                wordAnimationEnd="bottom 62%"
              >
                {t.about}
              </ScrollReveal>

              <ul className="stats">
                {t.stats.map((stat, i) => (
                  <li key={i}>
                    <span className="stat-n">
                      <CountUp to={stat.value} duration={1.6} easing="expo" delay={i * 0.12} />
                      {stat.suffix && <span className="suffix">{stat.suffix}</span>}
                    </span>
                    <p>{stat.label}</p>
                  </li>
                ))}
              </ul>

              <dl className="facts">
                {t.facts.map((fact, i) => (
                  <AnimatedContent
                    className="fact"
                    key={i}
                    distance={28}
                    duration={0.9}
                    ease="expo.out"
                    delay={i * 0.05}
                  >
                    <dt>{fact.term}</dt>
                    <dd>
                      <DecryptedText key={lang} text={fact.detail} speed={16} {...DECRYPT} />
                    </dd>
                  </AnimatedContent>
                ))}
              </dl>
            </div>
          </section>

          <section className="sec" id="trabalho">
            <h2 className="label">
              <DecryptedText key={lang} text={t.workLabel} speed={45} {...DECRYPT} />
            </h2>
            <ol className="jobs">
              {t.jobs.map((job, i) => (
                <li key={i}>
                  <AnimatedContent className="job" distance={36} duration={1} ease="expo.out" delay={i * 0.06}>
                    <span className="when">{job.when}</span>
                    <div>
                      <h3>{job.role}</h3>
                      <p className="where">{job.where}</p>
                      <p className="what">{job.what}</p>
                      {job.highlights && (
                        <ul className="wins">
                          {job.highlights.map(item => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <span className="stack">{job.stack}</span>
                  </AnimatedContent>
                </li>
              ))}
            </ol>
          </section>

          <section className="sec" id="projetos">
            <h2 className="label">
              <DecryptedText key={lang} text={t.projectsLabel} speed={45} {...DECRYPT} />
            </h2>
            <Roll className="all" href={GITHUB}>
              {t.seeAll}
            </Roll>
            {/* --n: quantidade de projetos, usada no CSS para calcular a altura da lista */}
            <div className="projs" style={{ '--n': t.projects.length } as CSSProperties}>
              <FlowingMenu
                items={t.projects}
                ariaLabel={t.projectsLabel}
                align="left"
                showIndex
                showArrow
                dimInactive
                intro={false}
                speed={70}
                textColor="var(--ink)"
                bgColor="transparent"
                borderColor="var(--line)"
                marqueeBgColor={ORANGE}
                marqueeTextColor={BLACK}
              />
            </div>
          </section>

          <section className="contact" id="contato">
            <p className="label">
              <DecryptedText key={lang} text={t.contactLabel} speed={45} {...DECRYPT} scrambleColor={BLACK} />
            </p>
            <h2 className="shout" aria-label={t.shout.join(' ')}>
              {t.shout.map(line => (
                <span className="shout-line" key={line} aria-hidden="true">
                  <SplitText
                    tag="span"
                    text={line}
                    splitType="chars"
                    effect="rise"
                    mask
                    textAlign="left"
                    delay={28}
                    duration={1.1}
                    ease="expo.out"
                    rootMargin="-60px"
                  />
                </span>
              ))}
            </h2>
            <div className="links">
              <Magnet padding={50} magnetStrength={5} wrapperClassName="mail-wrap">
                <Roll className="mail" href={`mailto:${EMAIL}`}>
                  {EMAIL}
                </Roll>
              </Magnet>
              <Roll href={GITHUB}>GitHub ↗</Roll>
              <Roll href={LINKEDIN}>LinkedIn ↗</Roll>
            </div>
            <div className="foot">
              <span>© 2026 {FULL_NAME}</span>
              <Roll href="#topo">{t.backToTop}</Roll>
            </div>
          </section>
        </main>
      </div>
    </ClickSpark>
  );
}
