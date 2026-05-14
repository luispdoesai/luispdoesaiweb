import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-5 relative z-10 bg-brand-black text-brand-white">
      <h1 className="text-[clamp(4rem,8vw,7rem)] font-playfair mb-4">404</h1>
      <p className="text-xl text-brand-muted-gray mb-8 uppercase tracking-widest">Page Not Found</p>
      <Link 
        href="/" 
        className="inline-block border-b border-brand-white pb-1 transition-opacity hover:opacity-60 uppercase tracking-wider text-sm"
      >
        Return Home
      </Link>
    </main>
  );
}
