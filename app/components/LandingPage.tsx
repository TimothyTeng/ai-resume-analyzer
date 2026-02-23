import { useEffect, useRef } from 'react';
import { usePuterStore } from '~/lib/puter';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    number: '01',
    title: 'Resume Analysis',
    description:
      'Deep AI evaluation across tone, structure, content, and skills with precision-graded feedback.',
  },
  {
    number: '02',
    title: 'ATS Scoring',
    description:
      'Know exactly how your resume performs against automated employer screening systems before you apply.',
  },
  {
    number: '03',
    title: 'Project Suggestions',
    description:
      'Personalised project ideas that close skill gaps and make you the undeniable candidate.',
  },
  {
    number: '04',
    title: 'Cover Letters',
    description:
      'Tailored, role-specific cover letters generated in seconds — not boilerplate templates.',
  },
  {
    number: '05',
    title: 'Email Drafts',
    description:
      'Professional outreach and follow-up emails that leave a lasting impression on recruiters.',
  },
  {
    number: '06',
    title: 'Application Tracker',
    description:
      'Every submission, every score, every piece of feedback — centralised and always clear.',
  },
];

const steps = [
  {
    index: '01',
    label: 'Upload',
    description: 'Drop your PDF resume into ResuBench.',
  },
  {
    index: '02',
    label: 'Target',
    description: 'Enter the role, company, and job description.',
  },
  {
    index: '03',
    label: 'Analyse',
    description: 'Receive your full scored report instantly.',
  },
];

export default function LandingPage() {
  const { auth } = usePuterStore();

  const rootRef = useRef<HTMLDivElement>(null);
  const heroHeadingRef = useRef<HTMLDivElement>(null);
  const heroSubRef = useRef<HTMLParagraphElement>(null);
  const heroBtnsRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance — staggered
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl
        .fromTo(
          heroHeadingRef.current?.querySelectorAll('[data-line]') ?? [],
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 1 },
        )
        .fromTo(
          heroSubRef.current,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5',
        )
        .fromTo(
          heroBtnsRef.current?.querySelectorAll('button') ?? [],
          { y: 16, opacity: 0, scale: 0.97 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.08, duration: 0.6 },
          '-=0.4',
        );

      // Feature cards — scroll triggered
      gsap.fromTo(
        featuresRef.current?.querySelectorAll('[data-card]') ?? [],
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
          },
        },
      );

      // Steps — scroll triggered
      gsap.fromTo(
        stepsRef.current?.querySelectorAll('[data-step]') ?? [],
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stepsRef.current,
            start: 'top 80%',
          },
        },
      );

      // CTA — scroll triggered
      gsap.fromTo(
        ctaRef.current,
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 85%',
          },
        },
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Noise overlay */}
      <div className="lp-noise" aria-hidden="true" />

      <div className="lp" ref={rootRef}>
        {/* Ambient blobs */}
        <div
          className="lp-blob"
          style={{
            width: 600,
            height: 600,
            top: -200,
            left: -200,
            background: 'rgba(201,168,76,0.07)',
          }}
        />
        <div
          className="lp-blob"
          style={{
            width: 500,
            height: 500,
            top: 100,
            right: -150,
            background: 'rgba(201,168,76,0.05)',
          }}
        />
        <div
          className="lp-blob"
          style={{
            width: 700,
            height: 700,
            top: '60vh',
            left: '30%',
            background: 'rgba(42,42,53,0.6)',
          }}
        />

        {/* ─── HERO ─── */}
        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '120px 24px 80px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div ref={heroHeadingRef}>
            <div className="lp-hero-tag" data-line>
              <span className="lp-hero-tag-dot" />
              AI-Powered Career Intelligence
            </div>

            <h1
              data-line
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2.8rem, 7vw, 6.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#FAF8F5',
                margin: 0,
                marginBottom: '0.2em',
              }}
            >
              Ambition meets
            </h1>

            <div
              data-line
              className="lp-serif"
              style={{
                fontStyle: 'italic',
                fontSize: 'clamp(3rem, 8vw, 7.5rem)',
                lineHeight: 1,
                color: '#C9A84C',
                marginBottom: '2rem',
              }}
            >
              Precision.
            </div>
          </div>

          <p
            ref={heroSubRef}
            style={{
              maxWidth: 520,
              color: 'rgba(250,248,245,0.55)',
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              lineHeight: 1.7,
              fontWeight: 300,
              marginBottom: '3rem',
            }}
          >
            Upload your resume. Target the role. Receive a complete AI-scored
            report with feedback, ATS analysis, cover letters, and more.
          </p>

          <div
            ref={heroBtnsRef}
            style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button className="lp-btn lp-btn-gold" onClick={auth.signIn}>
              <span className="lp-slide" />
              <span className="lp-label">Get Started Free</span>
            </button>
            <button className="lp-btn lp-btn-ghost" onClick={auth.signIn}>
              <span className="lp-slide" />
              <span className="lp-label">Sign In</span>
            </button>
          </div>

          {/* Scroll indicator */}
          <div
            className="lp-scroll"
            style={{
              position: 'absolute',
              bottom: 40,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <div className="lp-scroll-bar" />
            <span>Scroll</span>
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ─── FEATURES ─── */}
        <section
          style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 24px' }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '4rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <p
                className="lp-mono"
                style={{
                  color: '#C9A84C',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  marginBottom: '0.75rem',
                }}
              >
                Capabilities
              </p>
              <h2
                style={{
                  fontFamily: 'Outfit, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(2rem, 4vw, 3rem)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  lineHeight: 1.1,
                }}
              >
                Everything you need
                <br />
                to land the role.
              </h2>
            </div>
            <p
              style={{
                color: 'rgba(250,248,245,0.45)',
                maxWidth: 320,
                fontSize: '0.95rem',
                lineHeight: 1.7,
                fontWeight: 300,
              }}
            >
              A complete intelligence suite built for serious job seekers who
              refuse to leave anything to chance.
            </p>
          </div>

          <div
            ref={featuresRef}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {features.map((f) => (
              <div className="lp-card" data-card key={f.number}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.25rem',
                  }}
                >
                  <span
                    className="lp-mono"
                    style={{
                      color: '#C9A84C',
                      fontSize: '0.72rem',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {f.number}
                  </span>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '1px solid rgba(201,168,76,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="#C9A84C"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: 'Outfit, sans-serif',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    marginBottom: '0.6rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {f.title}
                </h3>
                <p
                  style={{
                    color: 'rgba(250,248,245,0.45)',
                    fontSize: '0.875rem',
                    lineHeight: 1.7,
                    fontWeight: 300,
                    margin: 0,
                  }}
                >
                  {f.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ─── HOW IT WORKS ─── */}
        <section
          style={{ maxWidth: 860, margin: '0 auto', padding: '120px 24px' }}
        >
          <p
            className="lp-mono"
            style={{
              color: '#C9A84C',
              fontSize: '0.72rem',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            Process
          </p>
          <h2
            style={{
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '-0.02em',
              marginBottom: '4rem',
              lineHeight: 1.1,
            }}
          >
            Three steps.
            <br />
            <span
              className="lp-serif"
              style={{ fontStyle: 'italic', color: '#C9A84C' }}
            >
              Zero guesswork.
            </span>
          </h2>

          <div ref={stepsRef}>
            {steps.map((s) => (
              <div className="lp-step" data-step key={s.index}>
                <span
                  className="lp-mono"
                  style={{
                    color: 'rgba(201,168,76,0.4)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    minWidth: 28,
                  }}
                >
                  {s.index}
                </span>
                <div
                  style={{
                    width: 1,
                    height: 48,
                    background: 'rgba(201,168,76,0.2)',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <h3
                    style={{
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: 600,
                      fontSize: '1.3rem',
                      marginBottom: '0.3rem',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {s.label}
                  </h3>
                  <p
                    style={{
                      color: 'rgba(250,248,245,0.45)',
                      fontSize: '0.9rem',
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr className="lp-divider" />

        {/* ─── CTA ─── */}
        <section
          style={{
            padding: '120px 24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            ref={ctaRef}
            style={{
              maxWidth: 900,
              width: '100%',
              background: 'linear-gradient(135deg, #1A1A24 0%, #0D0D12 100%)',
              border: '1px solid rgba(201,168,76,0.2)',
              borderRadius: '3rem',
              padding: 'clamp(3rem, 6vw, 5rem)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glow inside CTA */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <p
              className="lp-mono"
              style={{
                color: '#C9A84C',
                fontSize: '0.72rem',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                position: 'relative',
              }}
            >
              Ready when you are
            </p>

            <h2
              style={{
                fontFamily: 'Outfit, sans-serif',
                fontWeight: 700,
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                letterSpacing: '-0.025em',
                marginBottom: '1rem',
                lineHeight: 1.1,
                position: 'relative',
              }}
            >
              Your next role is
              <br />
              <span
                className="lp-serif"
                style={{ fontStyle: 'italic', color: '#C9A84C' }}
              >
                closer than you think.
              </span>
            </h2>

            <p
              style={{
                color: 'rgba(250,248,245,0.45)',
                fontSize: '1rem',
                fontWeight: 300,
                lineHeight: 1.7,
                maxWidth: 480,
                margin: '0 auto 2.5rem',
                position: 'relative',
              }}
            >
              Join thousands of job seekers using ResuBench to sharpen their
              resumes, ace ATS filters, and land more interviews.
            </p>

            <button
              className="lp-btn lp-btn-gold"
              style={{
                padding: '16px 48px',
                fontSize: '0.85rem',
                position: 'relative',
              }}
              onClick={auth.signIn}
            >
              <span className="lp-slide" />
              <span className="lp-label">Start for Free</span>
            </button>
          </div>
        </section>

        {/* Footer line */}
        <div
          style={{
            textAlign: 'center',
            padding: '2rem 24px 3rem',
            color: 'rgba(250,248,245,0.2)',
            fontSize: '0.75rem',
            fontWeight: 300,
            letterSpacing: '0.05em',
          }}
        >
          © {new Date().getFullYear()} ResuBench — AI Career Intelligence
        </div>
      </div>
    </>
  );
}