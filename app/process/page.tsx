'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Process() {
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

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Discover',
      desc: "We start with a 60-minute discovery session. We map your current workflows, find where time is being wasted, and identify the 3 highest-ROI opportunities for AI in your business. You leave with clarity on exactly what's possible.",
      duration: '1-2 days',
      theme: 'dark'
    },
    {
      num: '02',
      title: 'Design',
      desc: "We architect the solution. Every tool, every integration, every data flow is mapped before we write a single line of code. You review and approve the full plan. No surprises mid-build.",
      duration: '2-3 days',
      theme: 'light'
    },
    {
      num: '03',
      title: 'Build',
      desc: "We build. Automations go live in your environment. Agents are trained on your data. Everything is tested against real scenarios before it touches your live systems.",
      duration: '5-10 days',
      theme: 'dark'
    },
    {
      num: '04',
      title: 'Test',
      desc: "You test it. We run it through every edge case. Your team gets hands-on time before go-live. We fix anything that doesn't feel right.",
      duration: '2-3 days',
      theme: 'light'
    },
    {
      num: '05',
      title: 'Deploy',
      desc: "We go live. Two weeks of hypercare — we monitor everything closely and respond to any issues within 4 hours.",
      duration: '2 weeks post-launch',
      theme: 'dark'
    },
    {
      num: '06',
      title: 'Optimize',
      desc: "Monthly review sessions. Performance data reviewed. New automations added. Models tuned. Your AI gets smarter every month.",
      duration: 'Ongoing',
      theme: 'light'
    }
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* PAGE HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
          PROCESS
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8">
          How We Work
        </h1>
        <p className="reveal text-[clamp(1rem,1.5vw,1.2rem)] uppercase tracking-[0.1em] text-brand-muted-gray max-w-2xl">
          Six phases. Two weeks to first results. No surprises.
        </p>
      </section>

      {/* PROCESS STEPS */}
      {steps.map((step, index) => (
        <section 
          key={step.num} 
          className={`py-[120px] px-5 md:px-[5%] relative z-10 overflow-hidden ${step.theme === 'dark' ? 'bg-brand-near-black text-brand-white' : 'bg-brand-white text-brand-black'}`}
        >
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative">
            <div className={`absolute -top-10 -left-10 text-[20rem] leading-none font-playfair opacity-5 pointer-events-none select-none ${step.theme === 'dark' ? 'text-brand-white' : 'text-brand-black'}`}>
              {step.num}
            </div>
            <div className="lg:col-span-4 reveal relative z-10">
              <div className="text-[clamp(4rem,8vw,6rem)] leading-none font-playfair mb-4">{step.num}</div>
              <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair">{step.title}</h2>
            </div>
            <div className="lg:col-span-8 reveal relative z-10">
              <p className={`text-xl mb-10 leading-relaxed ${step.theme === 'dark' ? 'text-brand-muted-gray' : 'text-brand-mid-gray'}`}>
                {step.desc}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-8 h-px bg-current opacity-30"></div>
                <div className="text-sm uppercase tracking-wider font-semibold">Duration: {step.duration}</div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* TIMELINE VISUAL */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-dark-gray relative z-10">
        <div className="max-w-[1400px] mx-auto reveal">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            TIMELINE
          </div>
          
          <div className="relative mt-20">
            {/* Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-brand-white/20 -translate-y-1/2 hidden md:block"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 relative z-10">
              {[
                { week: 'Week 1', phase: 'Discover & Design' },
                { week: 'Week 2', phase: 'Build & Test' },
                { week: 'Week 3', phase: 'Deploy & Hypercare' },
                { week: 'Week 4+', phase: 'Optimize & Scale' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col md:items-center text-left md:text-center">
                  <div className="w-3 h-3 bg-brand-white rounded-full mb-6 hidden md:block"></div>
                  <div className="font-playfair text-2xl mb-2">{item.week}</div>
                  <div className="text-sm uppercase tracking-wider text-brand-muted-gray">{item.phase}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[60vh] flex items-center justify-center text-center py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto reveal">
          <h2 className="text-[clamp(3rem,6vw,6rem)] mb-10 font-playfair">Ready to start?</h2>
          <Link 
            href="/contact" 
            className="inline-block bg-brand-white text-brand-black px-8 py-4 text-sm uppercase tracking-wider font-medium border border-brand-white transition-colors hover:bg-transparent hover:text-brand-white"
          >
            Start the Process →
          </Link>
        </div>
      </section>
    </main>
  );
}
