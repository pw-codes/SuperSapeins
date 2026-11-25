type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className = "" }: BrandProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/assets/super sapien logo.svg"
        alt="SUPER SAPIEN logo"
        className={`rounded-full border border-white/10 bg-[#0B122E] object-cover ${compact ? "h-8 w-8" : "h-10 w-10"}`}
      />
      <span
        className={`font-extrabold tracking-tight text-lime ${compact ? "hidden" : "text-lg"}`}
      >
        SUPER SAPIEN
      </span>
    </span>
  );
}
