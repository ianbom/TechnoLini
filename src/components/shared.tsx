import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { Card, Header, Reveal } from "./interactive";
import { services, type projects, type blogs } from "@/data/catalog";

export function Photo({ src, alt, className = "", width, height, priority = false, sizes = "(max-width:809px) 100vw, 1280px" }: { src: string; alt: string; className?: string; width?: number; height?: number; priority?: boolean; sizes?: string }) {
  const local = src.startsWith("http") ? `/assets/images/${new URL(src).pathname.split("/").pop()}` : src;
  return <div className={`photo ${className}`} style={width && height ? { aspectRatio: `${width}/${height}` } : undefined}><Image src={local} alt={alt} fill sizes={sizes} preload={priority} /></div>;
}
export function Shell({ children, header = true, footer = true }: { children: React.ReactNode; header?: boolean; footer?: boolean }) {
  return <>{header && <Header />}<main id="main-content">{children}</main>{footer && <Footer />}</>;
}
export function PageHeading({ title, description = "TechNova is a Framer template showcasing our digital excellence.", spacious = false }: { title: string; description?: string; spacious?: boolean }) {
  return <section className={`page-heading${spacious ? " page-heading-spacious" : ""}`}><Reveal className="container"><h1>{title}</h1>{description && <p className="body-large">{description}</p>}</Reveal></section>;
}
export function SectionHeading({ eyebrow, title, action, href }: { eyebrow: string; title: string; action?: string; href?: string }) {
  return <Reveal className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{action && href && <Link className="text-link" href={href}>{action}<ArrowUpRight size={16} /></Link>}</Reveal>;
}
export function ProjectCard({ project }: { project: typeof projects[number] }) {
  return <Card className="project-card" href={`/project/${project.slug}`}><Photo src={project.image} alt="Project Thumb Image" /><div className="project-card-heading"><h3>{project.title}</h3><ArrowUpRight size={18} /></div><p className="eyebrow">{project.category}</p></Card>;
}
export function BlogCard({ blog }: { blog: typeof blogs[number] }) {
  return <Card className="blog-card" href={`/blog/${blog.slug}`}><Photo src={blog.image} alt="Blog Thumb Image" /><div className="blog-meta"><span className="eyebrow">{blog.category}</span><span>{blog.date}</span></div><h3>{blog.title}</h3></Card>;
}
export function ServiceList({ items = services, detailed = false }: { items?: typeof services; detailed?: boolean }) {
  const icons = ["0XxlTH4GiOXSfcNtbu8RjLfww4", "uLYSoutk9in9ISIS1cNkActFgFg", "itU81F2HL2OUJLI53evPG6xM2s8", "BS3eKI3CnKBJqXVmx8byBInG80", "nvfnpeoQsPyeSEms5iByeapGxfw", "oKWBtRTvHJ9jrbP1nktqigNjsM"];
  const cards = items.map((service, i) => <Link href={`/service/${service.slug}`} className="service-row" key={service.slug}><Image src={`/assets/images/${icons[i % icons.length]}.svg`} alt="" className="service-icon" width={64} height={64} /><div><h3>{service.title}</h3><p>{service.description}</p></div>{detailed && <span className="text-link">Read More <ArrowUpRight size={16} /></span>}</Link>);
  return detailed ? <div className="service-list detailed-services">{cards.map(card => <Reveal key={card.key} amount={0.2}>{card}</Reveal>)}</div> : <Reveal className="service-list">{cards}</Reveal>;
}
export function Consultation() {
  return <section className="consultation-section"><div className="container"><Reveal className="consultation"><div><h3>Book your free consultation now</h3><p>This is a placeholder text for the consultation call to action that can be a few lines in length.</p><Link className="button button-black" href="/contact">Book Now <Image src="/assets/images/u8GMSqSNmcdCetAwR3pcCzYLmAs.svg" alt="" width={24} height={24} /></Link></div><Photo src="/assets/images/oExiiY4rhLCyrCsjIZgYxLZqg.svg" alt="Cta Image" /></Reveal></div></section>;
}
export function Footer() {
  const pages = [["Home", "/"], ["About us", "/about"], ["Packages", "/pricing"], ["Contact Us", "/contact"], ["Careers", "/career"], ["Projects", "/project"], ["Blogs", "/blog"], ["Services", "/service"], ["Privacy Policy", "/privacy-policy"], ["Terms & Conditions", "/terms-conditions"]];
  return <footer className="footer"><div className="container"><div className="footer-grid"><div className="footer-brand"><Link href="/" aria-label="TechNova home"><Image src="/assets/inline/7c60e1ad379ab724.svg" alt="TechNova" width={141} height={24} /></Link><Link href="/" className="footer-credit">Made Onmix. Powered by Framer.</Link><p className="copyright">© 2023 TechNova. All rights reserved</p></div><div className="footer-pages"><p className="eyebrow">Pages</p><div>{pages.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div></div><div className="footer-utility"><p className="eyebrow">Utility</p>{[["Style Guide", "/template-info/style-guide"], ["License", "/template-info/license"], ["Changelog", "/template-info/changelog"], ["404 Not Found", "/404"]].map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div><div className="footer-contact"><p className="eyebrow">Contact Info</p><a href="mailto:mail@example.io">mail@example.io</a><a href="tel:+12345678900">US: +1 234 567 8900</a><div className="socials"><a href="https://www.instagram.com/" aria-label="Instagram"><Instagram size={18} strokeWidth={1.4} /></a><a href="https://www.linkedin.com/" aria-label="LinkedIn"><Linkedin size={18} strokeWidth={1.4} /></a><a href="https://www.x.com/" aria-label="X"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path d="m4 3 16 18M20 3 4 21M3 3h5l13 18h-5z" fill="none" stroke="currentColor" /></svg></a></div></div></div></div></footer>;
}
export function NotFoundView() {
  return <main id="main-content" className="not-found"><h1>404</h1><h2>Page Not Found</h2><p>The page you are looking for doesn&apos;t exist or has been moved</p><Link className="button" href="/">Back to home <ArrowUpRight size={18} /></Link></main>;
}
