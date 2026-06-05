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

  const stackLayers = [
    {
      num: '01',
      title: 'Core System',
      description: 'The AI backbone of your operation. It handles inbound leads, answers internal questions, processes data, and runs workflows — all from a single layer your team never has to manage.'
    },
    {
      num: '02',
      title: 'Integration Layer',
      description: 'Your stack stays intact. We connect the core to the tools you already use — HubSpot, Salesforce, Slack, Gmail, Notion, or anything with an API. No migrations. No new software to learn.'
    },
    {
      num: '03',
      title: 'Business Brain',
      description: 'We train the system on your documents, your SOPs, your voice, your rules. It knows your business. Answers come from your data, not generic AI knowledge. It stays current as your business grows.'
    },
    {
      num: '04',
      title: 'Reporting',
      description: 'Every month you see exactly what the system did — leads engaged, questions answered, hours recovered, tasks completed. You know the ROI. No black box.'
    },
    {
      num: '05',
      title: 'Managed Hosting',
      description: 'We run the infrastructure. We handle updates, monitor performance, and fix issues before they reach you. Your team sees results. They never touch a server.'
    }
  ];

  const faqs = [
    {
      q: "How long does it take to go live?",
      a: "14 days. That is the guarantee. If your system is not live and working in 14 days, the build is free. We have built this architecture enough times that we know exactly what it takes."
    },
    {
      q: "Do we need to change our existing tools?",
      a: "No. We build on top of what you already use — HubSpot, Salesforce, Notion, Slack, Google Workspace, or any platform with an API. We connect to it. We do not replace it."
    },
    {
      q: "What does the ongoing subscription cover?",
      a: "Everything. Managed hosting, monitoring, updates, system improvements, and direct access to us. Your infrastructure runs. When something needs adjusting, we adjust it. You do not manage any of it."
    },
    {
      q: "How involved does our team need to be?",
      a: "About 60 minutes upfront, plus access to your tools. We handle the rest. We give you a full walkthrough before go-live and stay connected after."
    },
    {
      q: "What is the free automation audit?",
      a: "A working session where we map where your team is losing time. We look at your workflows, find the highest-value opportunities, and tell you exactly what we would build and what it would cost. No obligation. No deposit. You leave with a clear picture either way."
    },
    {
      q: "Is this a project or an ongoing service?",
      a: "Ongoing. You subscribe to have AI infrastructure running inside your business — built, maintained, and improved by us. There is no handoff where you are on your own. We are connected to your account and responsible for results."
    }
  ];

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* PAGE HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
          YOUR AI OPERATING LAYER
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8">
          Infrastructure That Runs Your Business.
        </h1>
        <p className="reveal text-[clamp(1rem,1.5vw,1.2rem)] uppercase tracking-[0.1em] text-brand-muted-gray max-w-2xl">
          We build and run a full AI stack for your business. One layer handles lead response, internal knowledge, workflow automation, and reporting — maintained by us, on a monthly subscription.
        </p>
      </section>

      {/* WHAT IT DOES */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            WHAT YOUR BUSINESS GETS
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl">
            {[
              { outcome: 'Leads responded to in under 60 seconds', detail: 'Every inquiry gets a personalized reply in your voice, at any hour, with your CRM updated automatically.' },
              { outcome: 'Internal questions answered without escalation', detail: 'Your team gets accurate answers from your own documents in plain English — no searching, no waiting, no guessing.' },
              { outcome: 'Repetitive work eliminated', detail: 'Data entry, scheduling, follow-ups, reporting — any task that runs on a pattern gets removed from your team&apos;s plate.' },
              { outcome: 'A monthly report showing exactly what ran', detail: 'Hours recovered. Leads engaged. Tasks completed. You see the output every month in plain numbers.' }
            ].map((item, i) => (
              <div key={i} className="reveal border-t border-brand-black/10 pt-8">
                <p className="text-xl font-playfair mb-3">{item.outcome}</p>
                <p className="text-brand-mid-gray leading-relaxed" dangerouslySetInnerHTML={{ __html: item.detail }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE STACK */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            WHAT WE BUILD AND RUN
          </div>
          <h2 className="reveal text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-16">The Full Stack.</h2>
          <div className="flex flex-col gap-0 max-w-4xl">
            {stackLayers.map((layer, i) => (
              <div key={i} className="reveal border-t border-brand-white/10 py-10 grid grid-cols-12 gap-6">
                <div className="col-span-2 md:col-span-1">
                  <span className="text-brand-muted-gray font-playfair text-sm">{layer.num}</span>
                </div>
                <div className="col-span-10 md:col-span-3">
                  <h3 className="text-lg font-semibold text-brand-white uppercase tracking-wide">{layer.title}</h3>
                </div>
                <div className="col-span-12 md:col-span-8">
                  <p className="text-brand-muted-gray leading-relaxed">{layer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
              HOW IT WORKS
            </div>
            <h2 className="reveal text-[clamp(2.5rem,4vw,4rem)] font-playfair mb-10">Built in 14 days. Running indefinitely.</h2>
            <div className="reveal flex flex-col gap-8 text-lg text-brand-mid-gray leading-relaxed">
              <p>We start with a free automation audit — a working session to find where your business is losing the most time. After that, we scope the build and tell you exactly what it costs.</p>
              <p>Once you are in, the build takes 14 days. If it is not live in 14 days, you pay nothing for the build. That is the guarantee.</p>
              <p>After go-live, you subscribe to have it maintained. We monitor, update, and improve it. Your team runs on it. You never manage infrastructure.</p>
            </div>
          </div>
          <div className="reveal flex flex-col gap-6">
            <div className="bg-brand-near-black text-brand-white p-10 flex flex-col gap-6">
              <h3 className="text-xl font-playfair">The pricing model</h3>
              <p className="text-brand-muted-gray leading-relaxed">There is a one-time build fee to deploy your system. The amount depends on the complexity of what we are building — we cover that in the audit.</p>
              <p className="text-brand-muted-gray leading-relaxed">After go-live, a monthly subscription keeps everything running: hosting, maintenance, monitoring, and ongoing support from us.</p>
              <p className="text-brand-muted-gray leading-relaxed">We discuss both on the call once we understand your situation. The audit is free. No deposit. No commitment.</p>
              <Link href="/contact" className="inline-block text-brand-white border-b border-brand-white pb-1 w-fit uppercase tracking-wider text-sm hover:opacity-60 transition-opacity mt-4">
                Book Your Free Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-[100px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[900px] mx-auto text-center reveal">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-muted-gray mb-6">THE GUARANTEE</p>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-playfair text-brand-white mb-6">Live in 14 days or the build is free.</h2>
          <p className="text-brand-muted-gray text-lg leading-relaxed max-w-2xl mx-auto">
            We have built this system enough times that we can guarantee it. If your AI infrastructure is not live and running in 14 days from the start of the build, you do not pay for the build.
          </p>
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

      {/* BOTTOM CTA */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[900px] mx-auto reveal">
          <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            START HERE
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair text-brand-white mb-8">
            Find out exactly where your business is losing time.
          </h2>
          <p className="text-brand-muted-gray text-lg leading-relaxed mb-10 max-w-2xl">
            The audit is a working session — not a sales call. We map your workflows, identify the highest-value opportunities, and tell you what we would build and what it would cost. You leave with a clear picture. No deposit. No obligation.
          </p>
          <Link href="/contact" className="inline-block text-brand-white border-b border-brand-white pb-1 uppercase tracking-wider text-sm hover:opacity-60 transition-opacity">
            Book Your Free Automation Audit →
          </Link>
        </div>
      </section>
    </main>
  );
}
