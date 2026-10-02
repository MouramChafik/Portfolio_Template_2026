import Link, { type LinkProps } from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm border type-ui no-underline " +
  "transition-[background-color,border-color,color,transform] duration-200 ease-out active:translate-y-px " +
  "disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:size-[1.1em] [&_svg]:shrink-0";

const variants: Record<Variant, string> = {
  primary: "border-transparent bg-action text-on-action hover:bg-action-hover",
  secondary: "border-line-strong bg-transparent text-ink hover:bg-surface",
};

const sizes: Record<Size, string> = {
  md: "min-h-12 px-5.5",
  sm: "min-h-10 px-4",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
};

export function ButtonLink({ variant = "primary", size = "md", className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...props} />;
}
