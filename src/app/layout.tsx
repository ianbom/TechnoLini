import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({ src: "../../public/assets/fonts/manrope.woff2", weight: "200 800", variable: "--font-manrope", display: "swap" });
const inter = localFont({ src: "../../public/assets/fonts/inter.woff2", weight: "400", variable: "--font-inter", display: "swap" });
export const metadata: Metadata = { title: { default: "TechNova - Digital Design Agency", template: "%s - TechNova" }, description: "TechNova is a digital design agency creating brands, websites, and digital experiences." };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${inter.variable}`}><body><a className="skip-link" href="#main-content">Skip to content</a>{children}</body></html>;
}
