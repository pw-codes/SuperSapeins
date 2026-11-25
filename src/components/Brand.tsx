type BrandProps = {
  compact?: boolean;
  className?: string;
};

export function Brand({ compact = false, className = "" }: BrandProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <img
        src="/assets/logo-mark-placeholder.svg"
        alt="SUPER SAPIEN logo"
        className={`w-auto object-contain ${compact ? "h-8 max-w-8" : "h-10 max-w-10"}`}
      />
      <span
        className={`font-extrabold tracking-tight text-lime ${compact ? "hidden" : "text-lg"}`}
      >
        SUPER SAPIEN
      </span>
    </span>
  );
}
