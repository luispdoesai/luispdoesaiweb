export default function Footer() {
  return (
    <footer className="border-t border-brand-white/10 py-10 px-5 md:px-[5%] flex flex-col md:flex-row justify-between items-center text-[0.85rem] text-brand-muted-gray uppercase tracking-[0.05em] gap-5 md:gap-0 relative z-10 bg-brand-black">
      <div>LuisPDoesAI</div>
      <div>luispdoesai.com</div>
      <div>© {new Date().getFullYear()}</div>
    </footer>
  );
}
