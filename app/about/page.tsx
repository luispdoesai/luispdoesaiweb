'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
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

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* PAGE HERO */}
      <section className="min-h-[60vh] flex flex-col justify-center px-5 md:px-[5%] pt-24 bg-transparent relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
          ABOUT
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8">
          We Build AI That Works in the Real World.
        </h1>
      </section>

      {/* ABOUT MAIN */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5 reveal">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair leading-tight mb-8">
              AI That Runs. Not AI That Impresses.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 reveal">
            <div className="text-xl leading-relaxed text-brand-muted-gray flex flex-col gap-8">
              <p>
                Most AI agencies are focused on what is possible. We are focused on what is reliable.
              </p>
              <p>
                LuisPDoesAI was founded on a simple observation: businesses don&apos;t need more chatbots. They need systems that solve specific, expensive problems without needing constant supervision.
              </p>
              <p>
                We don&apos;t build prototypes. We build production-ready systems that integrate with your existing tools and deliver measurable hours back to your team.
              </p>
              <p>
                Our founder, Luis, has spent years shipping AI products at scale — most notably Zalio, an AI-first platform used by thousands. We bring that same level of engineering rigor to every business we work with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            WHY IT WORKS THIS TIME
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                num: '01',
                title: 'Proven Systems',
                desc: 'We don\'t start from scratch. We use a library of proven architectures for lead response, knowledge retrieval, and workflow automation. We spend our time configuring them for your business, not reinventing the wheel.'
              },
              {
                num: '02',
                title: 'Built for Speed',
                desc: 'Our builds take 10 to 14 days, not months. We focus on the 20% of AI that delivers 80% of the results, getting you to ROI as fast as possible.'
              },
              {
                num: '03',
                title: 'Managed Systems',
                desc: 'We deploy systems built on our proven architecture. We handle the infrastructure, updates, and maintenance, staying by your side to tweak and optimize as your business scales.'
              },
              {
                num: '04',
                title: 'Measurable Results',
                desc: 'Every system we deploy comes with a reporting layer. You see exactly how many leads were engaged, how many questions were answered, and how many hours were saved.'
              },
              {
                num: '05',
                title: 'Product Rigor',
                desc: 'We come from a background of shipping products to thousands of users. We bring that same focus on reliability, security, and user experience to your internal tools.'
              }
            ].map((item, i) => (
              <div key={i} className="reveal p-10 border border-brand-white/10 flex flex-col gap-5 bg-transparent">
                <span className="text-sm text-brand-muted-gray font-dm">{item.num}</span>
                <h3 className="text-2xl font-playfair">{item.title}</h3>
                <p className="text-[0.95rem] text-brand-muted-gray">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS & STACK */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            OUR STACK
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="reveal">
              <h3 className="text-2xl font-playfair mb-8 border-b border-brand-black/10 pb-4">Automation & Agents</h3>
              <ul className="flex flex-col gap-4 text-lg text-brand-mid-gray">
                <li>Make.com</li>
                <li>n8n</li>
                <li>Python</li>
                <li>Node.js</li>
                <li>LangChain</li>
                <li>CrewAI</li>
                <li>Claude API</li>
                <li>OpenAI API</li>
              </ul>
            </div>
            
            <div className="reveal">
              <h3 className="text-2xl font-playfair mb-8 border-b border-brand-black/10 pb-4">Integrations & Infrastructure</h3>
              <ul className="flex flex-col gap-4 text-lg text-brand-mid-gray">
                <li>HubSpot</li>
                <li>Salesforce</li>
                <li>Notion</li>
                <li>Slack</li>
                <li>Supabase</li>
                <li>Pinecone</li>
                <li>AWS</li>
                <li>Zapier</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="min-h-[60vh] flex items-center justify-center text-center py-[120px] px-5 md:px-[5%] bg-brand-dark-gray relative z-10">
        <div className="max-w-[1400px] mx-auto reveal">
          <h2 className="text-[clamp(3rem,6vw,6rem)] mb-10 font-playfair">Work With Us</h2>
          <Link 
            href="/contact" 
            className="inline-block bg-brand-white text-brand-black px-8 py-4 text-sm uppercase tracking-wider font-medium border border-brand-white transition-colors hover:bg-transparent hover:text-brand-white"
          >
            Work With Us →
          </Link>
        </div>
      </section>
    </main>
  );
}
