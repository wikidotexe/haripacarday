export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-rose-100 py-10 text-center">
      <p className="text-xs font-semibold text-ink/45">
        Dibuat oleh wiki pacarnya rahma 💖 · {new Date().getFullYear()}
      </p>
    </footer>
  );
}
