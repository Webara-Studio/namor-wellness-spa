'use client';

import { useEffect, useRef, useState } from 'react';

const instagram = 'https://www.instagram.com/namorwellnessspa/';
const whatsapp = 'https://wa.me/23320994575?text=Hello%20Namor%2C%20I%27d%20like%20to%20enquire%20about%20visiting%20the%20spa.';

export default function Home() {
  const [introOpen, setIntroOpen] = useState(false);
  const [introReplay, setIntroReplay] = useState(0);
  const [floatingContactClear, setFloatingContactClear] = useState(true);
  const introSkipRef = useRef<HTMLButtonElement>(null);
  const introDialogRef = useRef<HTMLDivElement>(null);
  const replayTriggerRef = useRef<HTMLButtonElement>(null);
  const replayInProgressRef = useRef(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = window.sessionStorage.getItem('namor-intro-seen') === 'yes';
      if (!alreadySeen) window.sessionStorage.setItem('namor-intro-seen', 'yes');
    } catch { /* If storage is unavailable, show the intro normally; it remains skippable. */ }
    if (!alreadySeen) setIntroOpen(true);
  }, []);

  useEffect(() => {
    if (!introOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setIntroOpen(false), reducedMotion ? 1100 : 4200);
    const focusTimer = window.setTimeout(() => introSkipRef.current?.focus(), 30);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); setIntroOpen(false); return; }
      if (event.key !== 'Tab' || !introDialogRef.current) return;
      const controls = Array.from(introDialogRef.current.querySelectorAll<HTMLButtonElement>('button:not([disabled])'));
      if (!controls.length) return;
      const first = controls[0]; const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer); window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      window.requestAnimationFrame(() => {
        if (replayInProgressRef.current && replayTriggerRef.current) {
          replayInProgressRef.current = false;
          replayTriggerRef.current.focus();
        } else document.getElementById('hero-title')?.focus();
      });
    };
  }, [introOpen, introReplay]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('reveal-ready');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const floating = document.querySelector<HTMLElement>('.whatsapp-fab');
    if (!floating) return;
    let frame = 0;
    const checkClearance = () => {
      frame = 0;
      const box = floating.getBoundingClientRect();
      const active = document.activeElement === floating;
      const covered = !active && Array.from(document.querySelectorAll<HTMLElement>('a,button,input,select,textarea,[role="button"],h1,h2,h3,p,li,small,.visit-overlay,.hero-note,.hero-scroll,.hero-stamp')).some((target) => {
        if (target === floating || floating.contains(target) || target.contains(floating)) return false;
        const style = window.getComputedStyle(target);
        if (style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) === 0) return false;
        const interactive = target.matches('a,button,input,select,textarea,[role="button"]');
        const rects = (() => {
          if (interactive) return [target.getBoundingClientRect()];
          const range = document.createRange();
          range.selectNodeContents(target);
          const fragments = Array.from(range.getClientRects());
          range.detach();
          return fragments.length ? fragments : [target.getBoundingClientRect()];
        })();
        return rects.some((rect) => rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight && rect.right > 0 && rect.left < window.innerWidth && box.left < rect.right && box.right > rect.left && box.top < rect.bottom && box.bottom > rect.top);
      });
      setFloatingContactClear((current) => current === !covered ? current : !covered);
    };
    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkClearance);
    };
    const resizeObserver = 'ResizeObserver' in window ? new ResizeObserver(scheduleCheck) : null;
    resizeObserver?.observe(document.body);
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);
    window.visualViewport?.addEventListener('resize', scheduleCheck);
    document.fonts?.ready.then(scheduleCheck);
    scheduleCheck();
    return () => {
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      window.visualViewport?.removeEventListener('resize', scheduleCheck);
      resizeObserver?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <>
    {introOpen && <div className="flash-intro" key={introReplay}>
      <div className="flash-intro__veil" />
      <div className="flash-intro__rings" aria-hidden="true"><i/><i/><i/></div>
      <div className="flash-intro__dialog" ref={introDialogRef} role="dialog" aria-modal="true" aria-labelledby="intro-title" aria-describedby="intro-description">
        <button className="flash-intro__skip" ref={introSkipRef} type="button" onClick={() => setIntroOpen(false)}>Skip intro <span aria-hidden="true">×</span></button>
        <span className="flash-intro__mark" aria-hidden="true">✺</span>
        <p className="flash-intro__kicker">AKOSOMBO · GHANA</p>
        <h2 id="intro-title">Find your<br/><em>stillness.</em></h2>
        <p className="flash-intro__description" id="intro-description">A softer pace is waiting by the water.</p>
        <button className="flash-intro__enter" type="button" onClick={() => setIntroOpen(false)}>Enter Namor <span aria-hidden="true">↗</span></button>
        <div className="flash-intro__progress" aria-hidden="true"><span/></div>
        <span className="flash-intro__signoff">NAMOR WELLNESS SPA</span>
      </div>
    </div>}
    <a className="skip" href="#main">Skip to content</a>
    <header className="header">
      <a className="brand" href="#top" aria-label="Namor Wellness Spa home"><span className="brand-mark">✺</span><span>NAMOR<small>WELLNESS SPA</small></span></a>
      <nav aria-label="Main navigation"><a href="#experience">The experience</a><a href="#rituals">Rituals</a><a href="#visit">Find us</a></nav>
      <a className="header-cta" href={whatsapp} target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a>
    </header>
    <main id="main">
      <section className="hero" id="top" aria-label="Namor Wellness Spa by the Volta Lake">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span /> AKOSOMBO · GHANA</p>
          <h1 id="hero-title" tabIndex={-1}>A softer<br/>pace of <em>life.</em></h1>
          <p className="hero-sub">A lakeside sanctuary to breathe deeply, let go<br className="desktop"/> and find your way back to yourself.</p>
          <a className="button button-light" href="#experience">Discover Namor <span>↓</span></a>
        </div>
        <div className="hero-note"><span className="note-line"/> REST · RECONNECT · RENEW</div>
        <div className="hero-scroll">SCROLL TO EXPLORE <span>⌄</span></div>
        <div className="hero-stamp"><span>BY THE</span><b>VOLTA</b><span>RIVERFRONT</span></div>
      </section>
      <div className="ticker"><div>MAKE ROOM FOR STILLNESS <span>✳</span> YOUR MOMENT, YOUR RITUAL <span>✳</span> AKOSOMBO, GHANA <span>✳</span> MAKE ROOM FOR STILLNESS <span>✳</span> YOUR MOMENT, YOUR RITUAL <span>✳</span></div></div>
      <section className="intro section" id="experience">
        <div className="intro-image image-wrap" data-reveal><img src="/images/lakeside-retreat.jpg" alt="A guest in a robe beside the tranquil waters of the Volta"/><span className="image-caption">A MOMENT BESIDE THE WATER</span></div>
        <div className="intro-copy" data-reveal><p className="eyebrow"><span className="dot"/> THE NAMOR EXPERIENCE</p><h2>Where the lake<br/>sets the <em>rhythm.</em></h2><p className="body-copy">Tucked beside the water in Akosombo, Namor invites you to step outside the everyday. Let the lake, the quiet and thoughtful moments of care bring you back to a gentler pace.</p><p className="signature">Come as you are. Leave a little lighter.</p><a className="text-link" href={instagram} target="_blank" rel="noreferrer">Get in touch <span>↗</span></a></div>
      </section>
      <section className="rituals section" id="rituals">
        <div className="section-head" data-reveal><div><p className="eyebrow"><span className="dot"/> A LITTLE TIME FOR YOU</p><h2>Make space for<br/><em>wellbeing.</em></h2></div><p className="section-intro">Every visit is an invitation to slow down. Settle into the stillness, reconnect with your senses and savour the details.</p></div>
        <div className="ritual-grid">
          <article className="ritual-card ritual-feature" data-reveal><div className="card-image"><img src="/images/spa-massage.jpg" alt="A calming massage ritual beside the lake"/><span className="card-number">01</span></div><div className="card-info"><div><p className="eyebrow">RESTORE</p><h3>Time to unwind</h3></div><span className="card-arrow">↗</span></div></article>
          <article className="ritual-card" data-reveal><div className="card-image"><img src="/images/warm-stone-ritual.jpg" alt="Warm stones arranged for a restorative massage ritual"/><span className="card-number">02</span></div><div className="card-info"><div><p className="eyebrow">RECONNECT</p><h3>Warm stone ritual</h3></div><span className="card-arrow">↗</span></div></article>
          <article className="ritual-card ritual-tea" data-reveal><div className="card-image"><img src="/images/lakeside-tea.jpg" alt="Tea served beside the lake, among fresh flowers"/><span className="card-number">03</span></div><div className="card-info"><div><p className="eyebrow">SAVOUR</p><h3>A pause by the water</h3></div><span className="card-arrow">↗</span></div></article>
        </div>
        <p className="ritual-note">For current treatments and availability, please contact the spa directly.</p>
      </section>
      <section className="quote-section"><div className="quote-bg"/><div className="quote-content" data-reveal><span className="quote-mark">“</span><p>You are stronger<br/>than you think.</p><span className="quote-rule"/><small>TAKE A MOMENT TO REMEMBER THAT.</small></div><span className="quote-side">A GENTLE REMINDER · NAMOR WELLNESS SPA</span></section>
      <section className="visit section" id="visit"><div className="visit-copy" data-reveal><p className="eyebrow"><span className="dot"/> YOUR ESCAPE IS CLOSER</p><h2>Meet us by<br/>the <em>water.</em></h2><p className="body-copy">Find Namor Wellness Spa in Akosombo, Ghana. For directions, treatment details and to plan your visit, reach us directly on WhatsApp.</p><a className="button button-dark" href={whatsapp} target="_blank" rel="noreferrer">Message Namor on WhatsApp <span>↗</span></a><p className="visit-footnote">WhatsApp or call <a href="tel:+23320994575">+233 20 994 575</a><br/>Located at Afrikiko River Front Resort, Akosombo.<br/>Please confirm directions and availability when enquiring.</p></div><div className="visit-image image-wrap" data-reveal><img src="/images/lake-sunset.jpg" alt="Sunset settling over the Volta Lake in Akosombo"/><div className="visit-overlay"><span>FIND YOUR STILLNESS</span><b>AKOSOMBO, GHANA</b></div></div></section>
      <section className="final-cta"><span className="final-spark">✳</span><p className="eyebrow">YOUR MOMENT IS WAITING</p><h2>Let the day<br/><em>melt away.</em></h2><a href={whatsapp} target="_blank" rel="noreferrer" className="button button-light">Start a conversation <span>↗</span></a></section>
      </main>
      <footer className="footer"><a className="brand brand-footer" href="#top"><span className="brand-mark">✺</span><span>NAMOR<small>WELLNESS SPA</small></span></a><p>Find your way back to stillness.</p><a className="footer-insta" href={instagram} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><button className="intro-replay" ref={replayTriggerRef} type="button" onClick={(event) => { replayTriggerRef.current = event.currentTarget; replayInProgressRef.current = true; setIntroReplay((count) => count + 1); setIntroOpen(true); }}>Watch the intro again <span aria-hidden="true">↻</span></button><small className="copyright">© {new Date().getFullYear()} NAMOR WELLNESS SPA · AKOSOMBO, GHANA</small><small className="credit">Strategist and Venture Intelligence · <a href="https://webarastudio.com" target="_blank" rel="noreferrer">Webara Studio</a></small></footer>
      <a className="whatsapp-fab" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Contact Namor Wellness Spa on WhatsApp at +233 20 994 575" aria-hidden={!floatingContactClear} tabIndex={floatingContactClear ? 0 : -1}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8a11.7 11.7 0 0 0-3.5-8.3ZM12.2 21.6a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 1 1 8.6 4.8Zm5.4-7.4c-.3-.1-1.8-.9-2.1-1s-.5-.2-.7.2c-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.7l.5-.6c.1-.2.2-.4.3-.6.1-.2 0-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.2-1.2 2.8s1.2 3.2 1.4 3.4c.2.2 2.4 3.6 5.7 5 .8.3 1.4.5 1.9.6.8.3 1.5.2 2 .1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.5-.4Z"/></svg><span>WhatsApp</span></a>
      </>;
}
