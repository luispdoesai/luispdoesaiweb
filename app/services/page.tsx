'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const faqs = [
    {
      q: "How long does it take to see results?",
      a: "Most clients see the system working within the first 48 hours after go-live. The lead response system starts engaging leads immediately. The knowledge assistant starts answering questions the same day. Automations run from the moment they are deployed."
    },
    {
      q: "Do we need to change our existing tools?",
      a: "No. We build on top of what you already use. HubSpot, Salesforce, Notion, Slack, Google Workspace, or any platform with an API — we connect to it, we do not replace it."
    },
    {
      q: "What if our business has unique requirements?",
      a: "Every system we deploy is configured for your business — your prompts, your data, your voice, your tools. The underlying architecture is proven. We handle the configuration and stay by your side to tweak it as you grow."
    },
    {
      q: "How involved does our team need to be?",
      a: "Minimally. We need about 60 minutes of your time upfront and access to your tools. We handle the rest and give you a full walkthrough before we hand anything over."
    },
    {
      q: "What happens after go-live?",
      a: "Two weeks of active monitoring are included. After that we review the results together and decide what to build next. You are never locked into anything."
    }
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* PAGE HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
          WHAT YOU GET
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8">
          Three Problems Solved.
        </h1>
        <p className="reveal text-[clamp(1rem,1.5vw,1.2rem)] uppercase tracking-[0.1em] text-brand-muted-gray max-w-2xl">
          Most businesses have the same problems. Slow lead response. Information buried in documents. Hours lost to manual work. We have a proven system for each one. Pick yours.
        </p>
      </section>

      {/* SERVICE DETAIL — AI Automations */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal">
            <div className="text-[8rem] leading-none font-playfair text-brand-black/10">01</div>
          </div>
          <div className="lg:col-span-8 reveal">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-6">Your Leads Never Wait Again</h2>
            <p className="text-xl text-brand-mid-gray mb-10 leading-relaxed">
              Right now, when a lead comes in, how long does it take your team to respond? If the answer is anything more than two minutes, you are losing deals you never knew you had.<br /><br />We build an AI system that responds to every new lead in under 60 seconds — personalized to their specific inquiry, in your voice, at any hour. It scores them, fills your CRM, and starts a follow-up sequence automatically. Your sales team wakes up to a qualified pipeline, not a list of leads to chase.<br /><br />The businesses winning right now are not the ones with the biggest teams. They are the ones that respond first.
            </p>
            <div className="mb-10">
              <h4 className="text-sm uppercase tracking-wider font-semibold mb-5">What&apos;s included:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Every lead gets a personal response in under 60 seconds',
                  'Automatic scoring so your best leads rise to the top',
                  'CRM populated with zero manual data entry',
                  'Follow-up sequences that run until they respond or book',
                  'You see exactly how many leads the system engaged each month'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-mid-gray">
                    <span className="mt-1 text-xs">■</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="text-sm uppercase tracking-wider font-semibold">Starting from: $2,500</div>
              <Link href="/contact" className="inline-block text-sm uppercase tracking-wider border-b border-brand-black pb-1 transition-opacity hover:opacity-60">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL — Agentic Systems */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal">
            <div className="text-[8rem] leading-none font-playfair text-brand-white/10">02</div>
          </div>
          <div className="lg:col-span-8 reveal">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-6">Your Team Stops Searching. Starts Knowing.</h2>
            <p className="text-xl text-brand-muted-gray mb-10 leading-relaxed">
              The average employee spends nearly two hours a day searching for information. Documents buried in folders. Policies no one can find. Questions that get escalated to managers who have better things to do.<br /><br />We build an AI assistant trained on everything your business knows — contracts, SOPs, policies, product data, anything in your documents. Your team asks questions in plain English and gets accurate answers instantly, pulled directly from your own knowledge base. No guessing. No digging. No waiting.<br /><br />New employees ramp up in days. Your experienced team gets answers in seconds. Your managers stop answering the same questions twice.
            </p>
            <div className="mb-10">
              <h4 className="text-sm uppercase tracking-wider font-semibold mb-5">What&apos;s included:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Plain English questions answered from your actual documents',
                  'Deployed where your team already works — Slack, your website, or internal tools',
                  'Answers sourced only from your documents — never makes things up',
                  'New documents added automatically as your business grows',
                  'Monthly report showing questions answered and hours saved'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-muted-gray">
                    <span className="mt-1 text-xs text-brand-white">■</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="text-sm uppercase tracking-wider font-semibold">Starting from: $15,000</div>
              <Link href="/contact" className="inline-block text-sm uppercase tracking-wider border-b border-brand-white pb-1 transition-opacity hover:opacity-60">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL — Custom AI Builds */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 reveal">
            <div className="text-[8rem] leading-none font-playfair text-brand-black/10">03</div>
          </div>
          <div className="lg:col-span-8 reveal">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-6">Your Team Does Less. Achieves More.</h2>
            <p className="text-xl text-brand-mid-gray mb-10 leading-relaxed">
              Take every task your team does that follows the same pattern — data entry, invoice processing, appointment booking, follow-ups, notifications, report generation. Every one of those is a tax on your most valuable resource: your people.<br /><br />We map your workflows, identify the highest-value automations, and deploy them in your existing tools. No new software to learn. No processes to change. Just the work that was taking hours — now taking seconds. Automatically.<br /><br />Your team stops being expensive administrators and starts being what you hired them to be.
            </p>
            <div className="mb-10">
              <h4 className="text-sm uppercase tracking-wider font-semibold mb-5">What&apos;s included:</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Every repetitive task mapped and eliminated',
                  'Works inside the tools you already use — HubSpot, Slack, Gmail, and more',
                  'Built on our proven systems — configured and maintained by us for you',
                  'Full documentation and team walkthrough on delivery',
                  'Monthly report showing exactly how many hours were saved'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-mid-gray">
                    <span className="mt-1 text-xs">■</span> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="text-sm uppercase tracking-wider font-semibold">Starting from: $8,000</div>
              <Link href="/contact" className="inline-block text-sm uppercase tracking-wider border-b border-brand-black pb-1 transition-opacity hover:opacity-60">
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROCESS SECTION */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            THE PROCESS
          </div>
          <h2 className="reveal text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-16">Simple. Fast. Yours.</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-3xl">
            <div className="reveal text-xl text-brand-muted-gray leading-relaxed flex flex-col gap-8">
              <p>Every system starts with a conversation where we identify exactly what is costing your business the most. From there, the build takes 10 to 14 days. We handle the configuration and stay by your side to keep it running.</p>
              <p>Once it is live, a small monthly fee covers infrastructure and keeps us connected to your account. At 60 days we review the results together — that conversation shapes what we build next.</p>
              <p>No custom scoping sessions. No proposals that go nowhere. No surprises.</p>
              <Link href="/contact" className="inline-block text-brand-white border-b border-brand-white pb-1 w-fit uppercase tracking-wider text-sm hover:opacity-60 transition-opacity">
                Start With a Free 15-Minute Call →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            FAQ
          </div>
          <div className="flex flex-col border-t border-brand-black/10">
            {faqs.map((faq, i) => (
              <div key={i} className="reveal border-b border-brand-black/10">
                <button 
                  className="w-full py-8 flex justify-between items-center text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-lg md:text-xl font-playfair pr-8">{faq.q}</span>
                  <span className="text-2xl font-light transition-transform duration-300" style={{ transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)' }}>+</span>
                </button>
                <div 
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: openFaq === i ? '200px' : '0', opacity: openFaq === i ? 1 : 0 }}
                >
                  <p className="pb-8 text-brand-mid-gray">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
