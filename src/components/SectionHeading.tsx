type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export default function SectionHeading({ eyebrow, title, subtitle }: SectionHeadingProps) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <p className="eyebrow">✦ {eyebrow} ✦</p>
      <h2 className="mt-3 font-display text-[clamp(1.7rem,4vw,2.7rem)] font-black leading-tight text-ink">
        {title}
      </h2>
      {subtitle ? <p className="mt-3 text-sm leading-relaxed text-ink/60">{subtitle}</p> : null}
    </div>
  );
}
