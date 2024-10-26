// src/components/FooterLink.tsx
import Image from "next/image";

interface FooterLinkProps {
  href: string;
  text: string;
  iconSrc: string;
}

export default function FooterLink({ href, text, iconSrc }: FooterLinkProps) {
  return (
    <a
      className="flex items-center gap-2 hover:underline hover:underline-offset-4"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Image aria-hidden src={iconSrc} alt={`${text} icon`} width={16} height={16} />
      {text}
    </a>
  );
}
