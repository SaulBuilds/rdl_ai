// src/components/Footer.tsx
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <footer className="flex gap-6 flex-wrap items-center justify-center">
      <FooterLink
        href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        text="Learn"
        iconSrc="/file.svg"
      />
      <FooterLink
        href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        text="Examples"
        iconSrc="/window.svg"
      />
      <FooterLink
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
        text="Go to nextjs.org →"
        iconSrc="/globe.svg"
      />
    </footer>
  );
}
