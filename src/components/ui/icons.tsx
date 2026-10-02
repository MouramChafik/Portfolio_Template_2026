import type { SVGProps } from "react";

/* Icônes au trait (24 × 24), décoratives par défaut : le texte voisin porte le sens. */

type IconProps = SVGProps<SVGSVGElement>;

function Icon({ children, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (props: IconProps) => (
  <Icon {...props}><path d="M7 17 17 7M8 7h9v9" /></Icon>
);

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}><path d="M4 12h15M13 6l6 6-6 6" /></Icon>
);

export const ArrowLeft = (props: IconProps) => (
  <Icon {...props}><path d="M20 12H5M11 6l-6 6 6 6" /></Icon>
);

export const Sun = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </Icon>
);

export const Moon = (props: IconProps) => (
  <Icon {...props}><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7Z" /></Icon>
);

export const Copy = (props: IconProps) => (
  <Icon {...props}>
    <rect x="8.5" y="8.5" width="12" height="12" rx="2" />
    <path d="M15.5 8.5V5.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3" />
  </Icon>
);

export const Check = (props: IconProps) => (
  <Icon {...props}><path d="m5 12.5 4.5 4.5L19 7.5" /></Icon>
);

export const Close = (props: IconProps) => (
  <Icon {...props}><path d="M6 6l12 12M18 6 6 18" /></Icon>
);

export const Alert = (props: IconProps) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.01" />
  </Icon>
);
