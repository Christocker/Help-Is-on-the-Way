import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  imgClassName?: string;
  showText?: boolean;
  textClassName?: string;
  subtitle?: string;
}

export function Logo({
  className,
  imgClassName,
  showText = true,
  textClassName,
  subtitle,
}: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "flex items-center justify-center overflow-hidden rounded-xl bg-white/95 shadow-md",
          imgClassName
        )}
      >
        <Image
          src="/images/logo.png"
          alt="Help Is on the Way logo"
          width={1024}
          height={1024}
          priority
          className="h-full w-full scale-125 object-cover"
        />
      </span>
      {showText && (
        <span className="flex flex-col leading-tight">
          <span className={cn("text-base font-bold text-white", textClassName)}>
            Help Is on the Way
          </span>
          {subtitle && (
            <span className="text-[11px] font-medium text-white/50">
              {subtitle}
            </span>
          )}
        </span>
      )}
    </span>
  );
}
