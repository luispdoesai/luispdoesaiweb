'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Results() {
  const heroRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      const words = heroRef.current.innerText.split(' ');
      heroRef.current.innerHTML = '';
      
      words.forEach((word) => {
        const span = document.createElement('span');
        span.innerHTML = word + '&nbsp;';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        heroRef.current?.appendChild(span);
      });

      gsap.to(heroRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      });
    }

    gsap.utils.toArray('.reveal').forEach((element: any) => {
      gsap.fromTo(element, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    gsap.utils.toArray('.stat-num').forEach((stat: any) => {
      const target = parseFloat(stat.getAttribute('data-target'));
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      
      ScrollTrigger.create({
        trigger: stat,
        start: 'top 80%',
        onEnter: () => {
          gsap.to({ val: 0 }, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: function() {
              const currentVal = this.targets()[0].val;
              stat.innerText = prefix + (target % 1 !== 0 ? currentVal.toFixed(1) : Math.floor(currentVal)) + suffix;
            }
          });
        },
        once: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* PAGE HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
          WHAT CHANGES
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8">
          The Gap Is Already Growing.
        </h1>
        <p className="reveal text-[clamp(1rem,1.5vw,1.2rem)] uppercase tracking-[0.1em] text-brand-muted-gray max-w-2xl">
          In 12 months, there will be two types of businesses: those that run on AI, and those that are too expensive to compete.
        </p>
        <div className="reveal mt-10 inline-flex items-start gap-3 bg-black/60 backdrop-blur-md border border-brand-white/30 px-5 py-4 w-fit max-w-xl">
          <span className="text-brand-white mt-0.5">■</span>
          <p className="font-dm text-sm leading-[1.6] text-brand-white">
            <span className="uppercase tracking-[0.1em] font-medium">Live in 14 days or you don&apos;t pay.</span> We build a working AI system in your environment. If it&apos;s not live and running in two weeks, you owe nothing.
          </p>
        </div>
      </section>

      {/* STATS ROW */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center">
          <div className="reveal flex flex-col items-center">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] mb-2.5 font-playfair">
              <span className="stat-num" data-target="65" data-suffix="%">0</span>
            </h2>
            <p className="uppercase tracking-[0.1em] text-[0.85rem] text-brand-muted-gray mb-2">Of organizations now regularly use AI in at least one business function</p>
            <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey State of AI, 2024</p>
          </div>
          <div className="reveal flex flex-col items-center">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] mb-2.5 font-playfair">
              <span className="stat-num" data-target="70" data-prefix="60–" data-suffix="%">0</span>
            </h2>
            <p className="uppercase tracking-[0.1em] text-[0.85rem] text-brand-muted-gray mb-2">Of employee work time could be automated with current AI and related technologies</p>
            <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey Global Institute, 2023</p>
          </div>
          <div className="reveal flex flex-col items-center">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] mb-2.5 font-playfair">
              <span className="stat-num" data-target="75" data-suffix="%">0</span>
            </h2>
            <p className="uppercase tracking-[0.1em] text-[0.85rem] text-brand-muted-gray mb-2">Of knowledge workers now use AI at work — up from 37% just 12 months prior</p>
            <p className="text-xs text-brand-muted-gray/60 font-dm">Source: Microsoft & LinkedIn Work Trend Index, 2024</p>
          </div>
          <div className="reveal flex flex-col items-center">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] mb-2.5 font-playfair">
              $4.4T
            </h2>
            <p className="uppercase tracking-[0.1em] text-[0.85rem] text-brand-muted-gray mb-2">Potential annual value AI could add to the global economy across 63 analyzed use cases</p>
            <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey Global Institute, 2023</p>
          </div>
        </div>
      </section>

      {/* WHAT CHANGES SECTION */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black text-brand-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            WHAT CHANGES
          </div>
          
          <h2 className="reveal text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-20">
            Before AI. After AI.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-brand-white/20">
            {/* BEFORE Column */}
            <div className="reveal p-10 md:p-16 border-b md:border-b-0 md:border-r border-brand-white/20">
              <h3 className="text-2xl font-playfair mb-10 text-brand-muted-gray">Before LuisPDoesAI</h3>
              <ul className="flex flex-col gap-6">
                {[
                  'Leads wait 4+ hours for a response',
                  'Team spends 10+ hours a week on data entry',
                  'Information is buried in messy document folders',
                  'Managers spend half their day answering basic questions',
                  'Manual follow-ups are forgotten or inconsistent'
                ].map((item, i) => (
                  <li key={i} className="font-dm text-brand-muted-gray flex items-start gap-4">
                    <span className="mt-1 text-brand-muted-gray/50">✕</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* AFTER Column */}
            <div className="reveal p-10 md:p-16">
              <h3 className="text-2xl font-playfair mb-10 text-brand-white">After LuisPDoesAI</h3>
              <ul className="flex flex-col gap-6">
                {[
                  'Leads get a personal response in < 60 seconds',
                  'Data entry is eliminated via automated workflows',
                  'Instant answers from your own knowledge base',
                  'Managers focus on growth, not administration',
                  'Follow-ups run on autopilot until they book'
                ].map((item, i) => (
                  <li key={i} className="font-dm text-brand-white flex items-start gap-4">
                    <span className="mt-1 text-brand-white">✓</span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[60vh] flex items-center justify-center text-center py-[120px] px-5 md:px-[5%] bg-brand-dark-gray relative z-10">
        <div className="max-w-[1400px] mx-auto reveal">
          <h2 className="text-[clamp(3rem,6vw,6rem)] mb-10 font-playfair">Your Business Could Look Like This.</h2>
          <Link 
            href="/contact" 
            className="inline-block bg-brand-white text-brand-black px-8 py-4 text-sm uppercase tracking-wider font-medium border border-brand-white transition-colors hover:bg-transparent hover:text-brand-white"
          >
            Book Your Free Call →
          </Link>
        </div>
      </section>
    </main>
  );
}
