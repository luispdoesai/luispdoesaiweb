'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { InlineWidget } from 'react-calendly';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
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
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(0,0,0,0.8)_0%,transparent_70%)] pointer-events-none -z-10" />
        <div className="text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-8 text-brand-white drop-shadow-md after:content-[''] after:block after:w-10 after:h-px after:bg-brand-white">
          LET&apos;S FIX IT
        </div>
        <h1 ref={heroRef} className="text-[clamp(4rem,8vw,7rem)] tracking-tighter leading-[0.9] mb-8 drop-shadow-2xl">
          Find Out What AI Can Do for Your Business.
        </h1>
        <p className="reveal text-[clamp(1rem,1.5vw,1.2rem)] uppercase tracking-[0.1em] text-brand-white drop-shadow-lg font-medium max-w-2xl">
          Every business is losing hours to manual work. We will help you find where yours are going — and how to get them back.
        </p>
      </section>

      {/* CONTACT SPLIT */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-white text-brand-black relative z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Info */}
          <div className="lg:col-span-5 reveal">
            <h2 className="text-[clamp(2.5rem,4vw,4rem)] font-playfair leading-tight mb-8">
              Book a Call
            </h2>
            <div className="text-xl text-brand-muted-gray leading-relaxed space-y-6 mb-10">
              <p>
                This is not a sales pitch. It is a 15-minute working session.
              </p>
              <p>
                We will look at your current processes, identify where your team is spending the most manual time, and tell you exactly which AI systems would solve it.
              </p>
              <p>
                If we are not a fit, we will tell you. If we are, we will show you the path to go-live in 14 days.
              </p>
            </div>
            
            <div className="flex flex-col gap-8 mt-12">
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold mb-4 text-brand-muted-gray">Book a Free Call</h3>
                <a 
                  href="https://calendly.com/luispdoesai/new-meeting" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-2xl font-playfair border-b border-brand-black pb-1 hover:opacity-60 transition-opacity text-brand-black"
                >
                  calendly.com/luispdoesai/new-meeting
                </a>
              </div>
              
              <div>
                <h3 className="text-sm uppercase tracking-wider font-semibold mb-4 text-brand-muted-gray">Email</h3>
                <a 
                  href="mailto:hello@luispdoesai.com" 
                  className="text-2xl font-playfair border-b border-brand-black pb-1 hover:opacity-60 transition-opacity text-brand-black"
                >
                  hello@luispdoesai.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Calendly */}
          <div className="reveal w-full min-h-[700px]">
            <InlineWidget 
              url="https://calendly.com/luispdoesai/new-meeting" 
              styles={{ height: '700px' }} 
            />
          </div>
          
        </div>
      </section>

      {/* WHAT TO EXPECT SECTION */}
      <section className="py-[120px] px-5 md:px-[5%] bg-brand-near-black relative z-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="reveal text-xs uppercase tracking-[0.2em] flex items-center gap-4 mb-16 text-brand-muted-gray after:content-[''] after:block after:w-10 after:h-px after:bg-brand-muted-gray">
            What To Expect
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="reveal">
              <div className="text-sm text-brand-muted-gray mb-4">01</div>
              <div className="text-2xl font-playfair mb-4">The Audit</div>
              <p className="text-brand-muted-gray leading-relaxed">
                A 15-minute call to identify your biggest manual bottlenecks.
              </p>
            </div>
            
            <div className="reveal">
              <div className="text-sm text-brand-muted-gray mb-4">02</div>
              <div className="text-2xl font-playfair mb-4">The Build</div>
              <p className="text-brand-muted-gray leading-relaxed">
                We deploy your custom AI system in 10 to 14 days.
              </p>
            </div>
            
            <div className="reveal">
              <div className="text-sm text-brand-muted-gray mb-4">03</div>
              <div className="text-2xl font-playfair mb-4">The Results</div>
              <p className="text-brand-muted-gray leading-relaxed">
                Your team gets their hours back. Your business runs on autopilot.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
