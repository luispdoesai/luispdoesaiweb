'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Text Animation
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

      const tl = gsap.timeline();
      tl.to(heroRef.current.children, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.2
      })
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.8")
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, "-=0.6");
    }

    // Scroll Reveals
    gsap.utils.toArray('.reveal:not(.hero-sub):not(.hero-ctas)').forEach((element: any) => {
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

    // WHY Section Animations
    gsap.to('.why-left-col', {
      scrollTrigger: {
        trigger: '.why-left-col',
        start: 'top 80%',
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out'
    });

    ScrollTrigger.create({
      trigger: '.why-right-col',
      start: 'top 80%',
      onEnter: () => {
        gsap.to('.why-reason-block', {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        });
        gsap.to('.why-border-top', {
          width: '100%',
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.2
        });
      },
      once: true
    });

    // Connecting Divider Animation
    gsap.to('.connecting-divider', {
      scrollTrigger: {
        trigger: '.connecting-divider',
        start: 'top 80%',
      },
      width: '100%',
      duration: 0.8,
      ease: 'power2.inOut'
    });

    // HOW IT WORKS Section Animations
    gsap.utils.toArray('.how-step-row').forEach((row: any) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
        }
      });

      tl.to(row, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      })
      .to(row.querySelector('.how-watermark'), {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
      }, "-=0.4")
      .to(row.querySelector('.how-badge'), {
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.5)'
      }, "-=0.6");
    });

    // Stats Counter
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
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <h1 ref={heroRef} className="text-[clamp(4rem,10vw,9rem)] tracking-tighter leading-[0.9] mb-8">
          Your Business.<br />On Autopilot.
        </h1>
        <p className="hero-sub opacity-0 translate-y-5 text-[clamp(1rem,2vw,1.2rem)] uppercase tracking-[0.1em] mb-12 text-brand-white font-medium bg-black/60 backdrop-blur-md px-4 py-2 w-fit rounded-md border border-white/10 shadow-2xl">
          LuisPDoesAi - Ai Systems and Automation
        </p>
        <div className="hero-ctas opacity-0 translate-y-5 flex items-center gap-8">
          <Link 
            href="/contact" 
            className="inline-block bg-brand-white text-brand-black px-8 py-4 text-sm uppercase tracking-wider font-medium border border-brand-white transition-colors hover:bg-transparent hover:text-brand-white"
          >
            Get Your Business Running on AI
          </Link>
          <Link 
            href="/results" 
            className="inline-block text-sm uppercase tracking-wider border-b border-brand-white pb-1 transition-opacity hover:opacity-60"
          >
            See What We Build →
          </Link>
        </div>
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-10 left-[5%] w-px h-[60px] bg-brand-white/20 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-white animate-[scrollPulse_2s_infinite_ease-in-out]" />
        </div>
      </section>

      {/* WHY SECTION COMPONENT */}
      <section className="py-[120px] px-5 md:px-[5%] bg-[#0a0a0a] text-white relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-24 text-gray-400 after:content-[''] after:block after:w-10 after:h-px after:bg-gray-400">
            WHY US
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
            {/* Left Column */}
            <div className="why-left-col opacity-0 -translate-x-12">
              <h2 className="font-playfair text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.1] mb-10">
                Most AI projects fail.<br />Ours don&apos;t.
              </h2>
              <p className="font-dm text-gray-400 text-[clamp(1rem,1.5vw,1.1rem)] leading-[1.6] max-w-[500px]">
                Most businesses lose 20+ hours a week to work
                AI should be doing. We fix that. We deploy proven
                AI systems that respond to leads, answer questions,
                and eliminate manual work — configured for your
                business and running in under two weeks.
              </p>
            </div>

            {/* Right Column */}
            <div className="why-right-col flex flex-col gap-12">
              {[
                {
                  num: '01',
                  title: 'We Build, We Do Not Just Advise',
                  desc: 'Every engagement ends with a working system live in your business — not a strategy deck. Not a recommendation. A real, deployed AI workflow your team uses from day one.'
                },
                {
                  num: '02',
                  title: 'Transparent, Honest Timelines',
                  desc: 'We give you realistic timelines before we start — not optimistic ones designed to win the deal. Simple automations typically go live in 1–2 weeks. Complex agentic systems take 3–6 weeks. You will always know exactly where your project stands.'
                },
                {
                  num: '03',
                  title: 'Expert Configuration',
                  desc: "We deploy systems built on our proven architecture. While we maintain the core system, we handle all the configuration and technical heavy lifting so you can focus on your business."
                },
                {
                  num: '04',
                  title: "By Your Side",
                  desc: "We don't just deliver and disappear. We stay by your side to configure updates, tweak performance, and ensure your AI systems evolve as your business grows."
                },
                {
                  num: '05',
                  title: "We've Built AI Products Ourselves",
                  desc: "We don't just implement AI for others — we've built and shipped our own AI products. When we say we know how this works, we mean it from every angle."
                }
              ].map((reason) => (
                <div key={reason.num} className="why-reason-block relative pt-6 opacity-0 translate-x-12">
                  <div className="why-border-top absolute top-0 left-0 h-[1px] bg-white/20 w-0" />
                  <div className="flex gap-6">
                    <span className="font-dm text-sm text-gray-500 mt-1">{reason.num}</span>
                    <div>
                      <h3 className="font-playfair text-2xl mb-3">{reason.title}</h3>
                      <p className="font-dm text-gray-400 text-sm leading-[1.6]">{reason.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECTING ELEMENT */}
      <div className="w-full h-[1px] bg-[#0a0a0a] relative z-10">
        <div className="connecting-divider absolute top-0 left-0 h-full bg-white w-0" />
      </div>

      {/* HOW IT WORKS SECTION COMPONENT */}
      <section className="py-[120px] px-5 md:px-[5%] bg-[#FFFFFF] text-black relative z-10 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-24 text-gray-500 after:content-[''] after:block after:w-10 after:h-px after:bg-gray-500">
            FROM ZERO TO RUNNING
          </div>

          <div className="flex flex-col">
            {[
              {
                num: '01',
                title: "We Find What's Costing You the Most",
                duration: 'Day 1',
                bullets: [
                  "A focused 60-minute session where we map your workflows, identify where time and money are being lost, and confirm which system will move the needle fastest."
                ]
              },
              {
                num: '02',
                title: 'We Build It for Your Business',
                duration: 'Day 2–10',
                bullets: [
                  "We take our proven system and configure every detail for your business — your data, your tools, your voice. Built directly in your environment."
                ]
              },
              {
                num: '03',
                title: 'It Goes Live. You See Results.',
                duration: 'Day 10–14',
                bullets: [
                  "Your system goes live. Within days you will see leads responded to, manual work disappearing, and your team freed up to do what only humans can do."
                ]
              },
              {
                num: '04',
                title: 'It Gets Smarter Over Time',
                duration: 'Ongoing',
                bullets: [
                  "As your business grows, your AI grows with it. New automations added, systems optimized, and capabilities expanded — so the gap between you and your competitors keeps widening."
                ]
              }
            ].map((step) => (
              <div 
                key={step.num} 
                className="how-step-row group relative w-full py-16 border-b border-[#333333] hover:border-[#FFFFFF] transition-colors duration-500 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 opacity-0 translate-y-10"
              >
                {/* Watermark Number */}
                <div className="how-watermark absolute left-0 top-1/2 -translate-y-1/2 text-[clamp(6rem,15vw,12rem)] font-playfair font-bold text-gray-100 -z-10 opacity-0 select-none pointer-events-none">
                  {step.num}
                </div>
                
                {/* Title */}
                <div className="lg:w-1/4">
                  <h3 className="font-playfair text-[clamp(2rem,3vw,3rem)] leading-none">{step.title}</h3>
                </div>

                {/* Bullets */}
                <div className="lg:w-1/2">
                  <ul className="flex flex-col gap-4">
                    {step.bullets.map((bullet, idx) => (
                      <li key={idx} className="font-dm text-sm text-gray-700 flex items-start gap-3">
                        <span className="text-black mt-0.5">■</span>
                        <span className="leading-[1.5]">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Badge */}
                <div className="lg:w-1/4 flex lg:justify-end">
                  <div className="how-badge bg-black text-white font-dm text-xs uppercase tracking-wider px-4 py-2 scale-0">
                    Duration: {step.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE SECTION */}
      <section className="py-[120px] px-5 md:px-[5%] bg-[#0a0a0a] text-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-gray-400 after:content-[''] after:block after:w-10 after:h-px after:bg-gray-400">
            THE MODEL
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="reveal font-playfair text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] mb-8">
                This Is Not a One-Time Build.
              </h2>
            </div>
            <div className="reveal">
              <p className="font-dm text-gray-300 text-lg leading-relaxed mb-8">
                Most agencies hand you a chatbot and disappear. We deploy an AI infrastructure that runs your front office, your back office, and your team&apos;s daily operations. It starts on day one with your highest-ROI opportunity. It grows every month after that.
              </p>
              <p className="font-dm text-white text-lg leading-relaxed font-medium">
                Your competitors are getting chatbots. Your business gets the whole system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* UNDER THE HOOD SECTION */}
      <section className="py-[120px] px-5 md:px-[5%] bg-[#111111] text-white relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-gray-400 after:content-[''] after:block after:w-10 after:h-px after:bg-gray-400">
            WHAT CHANGES
          </div>
          <h2 className="reveal font-playfair text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] mb-6">
            One Infrastructure. Activated in Layers.
          </h2>
          <p className="reveal font-dm text-gray-400 text-lg leading-relaxed max-w-[700px] mb-20">
            Your AI infrastructure starts with what moves the needle fastest, then expands as your business grows. Every layer connects. Every layer compounds.
          </p>
          <div className="flex flex-col gap-0">
            {[
              {
                title: 'Your Pipeline Fills Itself',
                tag: '01',
                how: 'Every lead gets a personal response in under 60 seconds — day or night. They get scored, your CRM gets updated, and follow-ups go out automatically until they book. Your team only talks to people ready to buy.',
                example: 'A new lead fills out your contact form. Within 30 seconds they receive a personalized email that references their specific inquiry, books them into your calendar, and creates a CRM record with notes. Your team sees a fully populated lead — ready to close — without touching anything.'
              },
              {
                title: 'Your Team Gets Answers Instantly',
                tag: '02',
                how: 'Stop losing hours to repetitive questions, manual research, and information buried in documents. Your AI assistant knows everything about your business and answers correctly — every time, in seconds.',
                example: 'An employee asks your internal AI assistant: "What is our refund policy for enterprise clients?" The system searches your policy documents, finds the relevant clause, and responds with the exact answer in plain English — in under 3 seconds.'
              },
              {
                title: 'Your Manual Work Disappears',
                tag: '03',
                how: 'Data entry, follow-ups, reporting, booking, notifications — if your team does it the same way more than three times a week, it runs automatically from now on. Hours back. Every week. Forever.',
                example: 'A sales agent receives a list of 50 target companies. For each one it searches the web for recent news, finds the decision maker on LinkedIn, identifies a relevant pain point, writes a personalized outreach message, and adds it to your CRM — all without human involvement. What would take a sales rep two full days takes the agent 90 minutes.'
              }
            ].map((item, i) => (
              <div key={i} className="reveal border-t border-white/10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-3">
                  <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">{item.tag}</div>
                  <h3 className="font-playfair text-3xl mb-6">{item.title}</h3>
                </div>
                <div className="lg:col-span-5">
                  <div className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">How It Works</div>
                  <p className="font-dm text-gray-300 text-sm leading-[1.8]">{item.how}</p>
                </div>
                <div className="lg:col-span-4 bg-black/40 p-8">
                  <div className="text-xs uppercase tracking-[0.15em] text-gray-500 mb-4">Real Example</div>
                  <p className="font-dm text-gray-300 text-sm leading-[1.8] italic">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            THE COST OF WAITING
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center mb-20">
            <div className="reveal flex flex-col items-center">
              <h2 className="text-[clamp(3rem,6vw,5rem)] mb-2.5 font-playfair">
                <span className="stat-num" data-target="20" data-suffix="+">0</span>
              </h2>
              <p className="uppercase tracking-[0.1em] text-[0.85rem] mb-2">Hours lost per week to work AI should be doing</p>
              <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey Global Institute, 2023</p>
            </div>
            <div className="reveal flex flex-col items-center">
              <h2 className="text-[clamp(3rem,6vw,5rem)] mb-2.5 font-playfair">
                <span className="stat-num" data-target="70" data-prefix="60–" data-suffix="%">0</span>
              </h2>
              <p className="uppercase tracking-[0.1em] text-[0.85rem] mb-2">Of employee work activities could be automated with today&apos;s AI technology</p>
              <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey Global Institute, 2023</p>
            </div>
            <div className="reveal flex flex-col items-center">
              <h2 className="text-[clamp(3rem,6vw,5rem)] mb-2.5 font-playfair">
                <span className="stat-num" data-target="65" data-suffix="%">0</span>
              </h2>
              <p className="uppercase tracking-[0.1em] text-[0.85rem] mb-2">Of organizations now use AI in at least one business function — up from 33% last year</p>
              <p className="text-xs text-brand-muted-gray/60 font-dm">Source: McKinsey State of AI, 2024</p>
            </div>
          </div>
          <div className="reveal max-w-[800px] mx-auto text-center">
            <blockquote className="font-playfair text-[clamp(1.5rem,3vw,2.5rem)] italic leading-[1.4] mb-5">
              &quot;Every week you delay is a week your competitors are gaining ground. The businesses that implement AI now are not just saving time — they are building an operational advantage that compounds every month.&quot;
            </blockquote>
            <cite className="text-[0.9rem] uppercase tracking-[0.05em] text-brand-muted-gray not-italic">
              — Luis Padilla, Founder, LuisPDoesAI
            </cite>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="min-h-[80vh] flex items-center justify-center text-center py-[120px] px-5 md:px-[5%] relative z-10">
        {/* Dark gradient overlay for readability against the wireframe */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.6)_40%,transparent_80%)] pointer-events-none -z-10" />
        
        <div className="max-w-[1400px] mx-auto reveal">
          <h2 className="text-[clamp(3rem,6vw,6rem)] mb-5 font-playfair drop-shadow-2xl">Ready to Stop Losing Time?</h2>
          <p className="text-[1.2rem] mb-12 max-w-[600px] mx-auto text-brand-white drop-shadow-lg font-medium tracking-wide">
            One 15-minute call. We will show you exactly what is costing your business the most time — and what an AI system would do about it.
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-brand-white text-brand-black px-8 py-4 text-sm uppercase tracking-wider font-medium border border-brand-white transition-colors hover:bg-transparent hover:text-brand-white"
          >
            Claim Your Free AI Audit Call
          </Link>
        </div>
      </section>
    </main>
  );
}
