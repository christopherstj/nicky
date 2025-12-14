type Props = {
  eyebrow?: string;
  title: string;
  kicker?: string;
};

export default function SectionHeading({ eyebrow, title, kicker }: Props) {
  return (
    <div className="mb-8 space-y-2">
      {eyebrow ? (
        <p className="text-sm uppercase tracking-[0.3em] text-primary/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow">
        {title}
      </h2>
      {kicker ? <p className="text-muted-foreground max-w-2xl">{kicker}</p> : null}
    </div>
  );
}

