'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide on mobile/touch devices
    if (window.matchMedia('(max-width: 768px)').matches || ('ontouchstart' in window)) {
      return;
    }

    const dot = dotRef.current;
    const outline = outlineRef.current;
    if (!dot || !outline) return;

    // GSAP quickTo for performant cursor tracking
    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    const xToOutline = gsap.quickTo(outline, 'x', { duration: 0.6, ease: 'power3' });
    const yToOutline = gsap.quickTo(outline, 'y', { duration: 0.6, ease: 'power3' });

    const onMouseMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToOutline(e.clientX);
      yToOutline(e.clientY);
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea');
    
    const onMouseEnter = () => {
      gsap.to(outline, { scale: 1.5, backgroundColor: 'rgba(255,255,255,0.1)', duration: 0.3 });
    };
    
    const onMouseLeave = () => {
      gsap.to(outline, { scale: 1, backgroundColor: 'transparent', duration: 0.3 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-white pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ borderRadius: '50%' }} // Exception for cursor
      />
      <div
        ref={outlineRef}
        className="fixed top-0 left-0 w-10 h-10 border border-brand-white/50 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ borderRadius: '50%' }} // Exception for cursor
      />
    </>
  );
}
