import Link from "next/link";
import reference from "@/data/reference.json";
import { blogs, jobs, plans, projects, services } from "@/data/catalog";
import { BlogCard, Consultation, NotFoundView, PageHeading, Photo, ProjectCard, SectionHeading, ServiceList, Shell } from "./shared";
import { CareerTicker, ContactForm, FAQ, PricingPlans, Reveal, Testimonials } from "./interactive";
import "./inner-pages.css";

type ReferencePage = { title: string; headings: string[]; text: string; images: { src: string; local: string; alt: string; width?: number; height?: number }[]; richText: string[]; links: { text: string; href: string }[] };
const pages = reference.pages as Record<string, ReferencePage>;
const intro = "TechNova is a Framer template showcasing our digital excellence.";
const image = (path: string, alt: string) => pages[path].images.find(item => item.alt === alt)?.local ?? "";

function RichText({ page, omitIntro = false }: { page: ReferencePage; omitIntro?: boolean }) {
  const html = page.richText.join("").replaceAll("https://framerusercontent.com/images/", "/assets/images/");
  return <div className="rich-text" dangerouslySetInnerHTML={{ __html: omitIntro ? html.replace(/^<p>[\s\S]*?<\/p>/, "") : html }} />;
}

function EndSections({ faq = true }: { faq?: boolean }) {
  return <>{faq && <FAQ />}<Consultation /></>;
}

function About() {
  const page = pages["/about"];
  const teamImages = page.images.filter(item => item.alt === "Team Image" || item.local.includes("r66t7Ly"));
  const names = ["Abram Culhane", "Abram Kenter", "Justin Philips", "Cristofer Curtis", "Emerson Dokidis", "Gustavo Baptista", "Madelyn Kenter", "Maren Culhane"];
  return <><PageHeading title="About us" description="TechNova is a Framer template built for digital marketing agencies." />
    <section className="about-photo-banner"><Reveal direction="left" amount={0} className="about-first-photo"><Photo src="/assets/images/USIjSSlZtKP2T4B11A6bEH3wyFQ.jpg" alt="About Image" className="about-wide-image" /><span className="about-year">FROM<strong>2012</strong></span></Reveal><Reveal direction="right" amount={0} once={false}><Photo src="/assets/images/Wt4RgXQZVAowq459mU3cGNXYyI.png" alt="Our studio" className="about-wide-image" /></Reveal></section>
    <section className="section container about-story-layout"><div><p className="eyebrow">Our Story</p><h2>In 2012, an exciting journey began with a daring vision.</h2><div className="about-ceo-message"><p className="eyebrow">MESSAGE FROM OUR CEO.</p><h3>“A successful team requires members with complementary skill sets.”</h3><div className="ceo-signature"><Photo src={image("/about", "Review Image")} alt="James Washington" className="ceo-avatar" /><div><h4>James Washington</h4><p>CEO @ TechNova</p></div></div></div></div><div className="values-grid">{[
      ["Who We Are", "We are an innovative digital agency that specializes in transforming brands. a forward-thinking digital agency that redefines brand transformations."],
      ["Our Vision", "Empowering advancement with state-of-the-art solutions and facilitating development through advanced solutions."],
      ["Core Value", "Our core values are centered around integrity, creativity, and a client-centric approach."],
    ].map(([title, text]) => <Reveal key={title}><h3>{title}</h3><p>{text}</p></Reveal>)}</div></section>
    <section className="section about-stats-band"><div className="container about-stats">{[
      ["10y +", "Agency Experience", "We've had quite a run in our 10+ years of operation with successful project launches across all over the world"],
      ["915+", "Projects have achieved success", "We are thrilled to announce that our product has been launched with great success, received prestigious awards in the market."],
      ["$200M+", "Let's raise some funds!", "Our design work has helped our clients raise a fund of over $200M."],
    ].map(([value, title, text]) => <div key={value}><strong>{value}</strong><h4>{title}</h4><p>{text}</p></div>)}</div></section>
    <section className="section team-section"><div className="container"><div className="team-heading"><SectionHeading eyebrow="Team" title="Meet our dream team" /><div className="team-intro"><p>We prioritize great people for great products, selecting individuals with professional skills and embodying our core values for our company&apos;s success.</p><Link href="/career" className="text-link">See open positions <span>↗</span></Link></div></div><div className="team-grid">{names.map((name, index) => <Reveal key={name}><Photo src={teamImages[index].local} alt={name} className="team-image" /><h4>{name}</h4><p>Founder &amp; CEO</p></Reveal>)}</div></div></section>
    <section className="section awards-section"><div className="container"><SectionHeading eyebrow="Awards" title="We create award winning websites." /><div className="award-row award-header"><span>AWARD</span><span>PLATFORM</span><span /></div>{[["Creative Excellence", "2023", "Behance"], ["Mobile of the week", "2022", "Awwwards"], ["Site of the day", "2021", "CSSDA"], ["UI UX Innovation", "2021", "CSSDA"], ["Brand Identity", "2020", "Behance"]].map(([title, year, platform]) => <div className="award-row" key={title}><div><h4>{title}</h4><small>{year}</small></div><span>{platform}</span><span aria-hidden>↗</span></div>)}</div></section><Testimonials /><EndSections faq={false} /></>;
}

function Listing({ type }: { type: "project" | "blog" | "service" }) {
  return <><PageHeading title={{ project: "Our Projects", blog: "Our Blogs", service: "Our Services" }[type]} description={intro} /><section className="container listing-section">{type === "service" ? <ServiceList detailed /> : <><div className={`inner-card-grid ${type}-listing`}>{type === "project" ? projects.map(project => <ProjectCard project={project} key={project.slug} />) : blogs.map(blog => <BlogCard blog={blog} key={blog.slug} />)}</div></>}</section><EndSections /></>;
}

function Contact() {
  return <><PageHeading title="Get in touch" description={intro} /><section className="container contact-pair"><Photo src={image("/contact", "Contact Image")} alt="Contact Image" className="contact-photo" /><ContactForm /></section><section className="section container contact-details"><div><h3>Address</h3><p>1234 Main Street, Anytown, ABC123,<br />Imaginary Country</p></div><div><h3>Email</h3><p>General Inquiries: <a href="mailto:info@yourdomain.com">info@yourdomain.com</a></p><p>Support: <a href="mailto:support@yourdomain.com">support@yourdomain.com</a></p><p>Sales: <a href="mailto:sales@yourdomain.com">sales@yourdomain.com</a></p></div><div><h3>Call us</h3><p>Main Office: <a href="tel:+15551234567">+1 (555) 123-4567</a></p><p>Sales Department: <a href="tel:+15559876543">+1 (555) 987-6543</a></p><p>Support Line: <a href="tel:+15552223333">+1 (555) 222-3333</a></p></div></section><EndSections /></>;
}

function Careers() {
  return <><section className="container career-hero"><div className="career-heading"><h1>Join our fast growing team</h1><p className="body-large">Join our squad and mould a vibrant and booming career with us</p><a href="#open-positions" className="button">See Open Positions <span>↗</span></a></div><CareerTicker /></section><section className="section career-benefits"><div className="container career-benefits-layout"><SectionHeading eyebrow="We Care" title="A healthy work-life balance for our employees." /><div className="benefits-grid">{["5-Days Working", "Paid Leaves", "Health Insurance", "Overtime Pay", "Positive Work Environment", "Personal Loan", "Fun Activities"].map(text => <div key={text}><h4>{text}</h4></div>)}</div></div></section><section className="section career-jobs" id="open-positions"><div className="container"><SectionHeading eyebrow="Jobs" title="Current Job Openings" /><div className="job-row job-table-heading"><span>POST</span><span>OPEN</span><span>LOCATION</span><span /></div>{jobs.map(job => <Link className="job-row" key={job.slug} href={`/career/${job.slug}`}><h4>{job.title}</h4><span>{job.openings}</span><span>{job.location}</span><span aria-hidden>↗</span></Link>)}</div></section><EndSections faq={false} /></>;
}

function Detail({ type, slug }: { type: string; slug: string }) {
  const page = pages[`/${type}/${slug}`];
  const project = projects.find(item => item.slug === slug);
  const blog = blogs.find(item => item.slug === slug);
  const job = jobs.find(item => item.slug === slug);
  const plan = plans.find(item => item.slug === slug);
  const mainImage = page.images.find(item => ["Project Main Image", "Blog Main Image", "Service Image"].includes(item.alt));
  const projectFacts = project ? page.text.split("\n") : [];
  const fact = (label: string) => projectFacts[projectFacts.indexOf(label) + 1];
  return <><div className="detail-page-heading"><PageHeading title={page.headings[0]} description="" /></div>{blog && <div className="container blog-detail-meta"><span>{blog.category}</span><span>{blog.date}</span></div>}
    {project && <section className="container project-introduction"><div><div className="rich-text" dangerouslySetInnerHTML={{ __html: page.richText[0].match(/^<p>[\s\S]*?<\/p>/)?.[0] ?? "" }} /><a className="text-link" href="https://framer.com" target="_blank" rel="noreferrer">View live website <span>↗</span></a></div><aside>{[["Service’s", project.category], ["Client", fact("Client")], ["Year", fact("Year")]].map(([label, value]) => <div className="detail-fact" key={label}><p>{label}</p><h4>{value}</h4></div>)}</aside></section>}
    {mainImage && <div className={type === "service" ? "detail-image-wrap service-image-wrap" : "container detail-image-wrap"}><Photo src={mainImage.local} alt={mainImage.alt} className={`detail-main-image ${type}-main-image`} priority /></div>}
    <section className={`section container detail-layout ${type}-detail`}><div><RichText page={page} omitIntro={!!project} />{job && <Link className="button" href="/contact">Apply Now <span>↗</span></Link>}</div>{job && <aside className="detail-sidebar">{[["Experience", job.experience], ["Salary", job.salary], ["Job Type", job.jobType], ["Location", job.location]].map(([label, value]) => <div className="detail-fact" key={label}><p>{label}</p><h4>{value}</h4></div>)}</aside>}{plan && <aside className="detail-sidebar package-sidebar"><p>Package Price</p><h2>$ {plan.price.toLocaleString("en-US")}</h2><p>/month</p><div className="detail-fact"><h4>Ideal for</h4><p>Additional features and functionalities can be included based on specific project requirements.</p></div><div className="detail-fact"><h4>Add-Ons:</h4><p>Mid-sized businesses, service providers, and organizations seeking a professional online presence.</p></div><Link className="button" href="/contact">Buy Now <span>↗</span></Link></aside>}</section>
    {type === "project" && <section className="section container"><SectionHeading eyebrow="Other Work" title="Related Works" /><div className="inner-card-grid">{projects.slice(0, 2).map(item => <ProjectCard project={item} key={item.slug} />)}</div></section>}
    {type === "blog" && <section className="section container"><SectionHeading eyebrow="Other Blogs" title="Related Blogs" /><div className="inner-card-grid">{blogs.slice(0, 2).map(item => <BlogCard blog={item} key={item.slug} />)}</div></section>}
    {type === "service" && <section className="section container"><SectionHeading eyebrow="Other Services" title="More Services" /><ServiceList detailed items={services.slice(0, 2).map(item => ({ ...item, title: "Content Strategy", description: "Crafting intuitive and visually compelling digital experiences for users." }))} /></section>}<EndSections /></>;
}

function TextPage({ path }: { path: string }) {
  const page = pages[path];
  const lines = page.text.split("\n");
  const start = lines.indexOf(page.headings[0]);
  const end = lines.findIndex((line, index) => index > start && line === "Made Onmix. Powered by Framer.");
  const body = lines.slice(start + 1, end < 0 ? undefined : end);
  const hasDescription = path.endsWith("license") || path === "/privacy-policy" || path === "/terms-conditions";
  const description = hasDescription ? body.shift() : "";
  const licenseHeadings = ["Fonts", "Images", "Icons"];
  const resources: Record<string, string> = { Manrope: "fonts.google.com", "Unsplash License": "unsplash.com", "Pexels License": "pexels.com", "Feather icons": "feathericons.com" };
  return <><PageHeading title={page.headings[0]} description={description} /><section className={`container text-page rich-text ${path.startsWith("/template-info") ? "template-text" : "legal-text"}`}>{body.map((line, index) => {
    if (path.endsWith("license") && licenseHeadings.includes(line)) return <p className="license-category" key={index}>{line}</p>;
    if (page.headings.includes(line) || line === "Release template") return <h3 key={index}>{line}</h3>;
    if (line === "V1") return <p className="changelog-version" key={index}>{line}</p>;
    const sourceLink = page.links.find(link => (link.text === line || (resources[line] && link.href.includes(resources[line]))) && /^https?:/.test(link.href));
    return <p key={index}>{sourceLink ? <a href={sourceLink.href} target="_blank" rel="noreferrer">{line}</a> : line}</p>;
  })}</section></>;
}

function StyleGuide() {
  const colors = [["Primary", "#FCB900"], ["Primary Light", "#FDD566"], ["Secondary", "#00D084"], ["Black", "#000000"], ["Dim Grey", "#4F4F4F"], ["Border", "#E9E2DA"], ["Off White", "#F7F3EF"], ["White", "#FFFFFF"]];
  return <><PageHeading title="Style Guide" description="" /><section className="container style-guide"><h3>Typography</h3><div className="type-samples"><h1>Heading 01</h1><h2>Heading 02</h2><h3>Heading 03</h3><h4>Heading 04</h4><h5>Heading 05</h5><h6>Heading 06</h6><p className="body-large">Body Large</p><p>Body Regular</p><p><strong>Body 600</strong></p><small>Body Small</small><small>Caption</small></div><h3>Color</h3><div className="color-grid">{colors.map(([name, hex]) => <div key={name}><div style={{ background: hex }} className="color-swatch" /><h4>{name}</h4><p>{hex}</p></div>)}</div><h3>Buttons</h3><div className="style-buttons"><Link href="/contact" className="button">Btn Primary <span>↗</span></Link><Link href="/contact" className="button button-light">Default</Link><Link href="/contact">Btn Link ↗</Link></div></section></>;
}

export function InnerPage({ path }: { path: string }) {
  if (path === "/404") return <NotFoundView />;
  const legal = path === "/privacy-policy" || path === "/terms-conditions";
  const [type, slug] = path.slice(1).split("/");
  let content;
  if (path === "/about") content = <About />;
  else if (path === "/contact") content = <Contact />;
  else if (path === "/career") content = <Careers />;
  else if (path === "/pricing") content = <><PageHeading title="Our Packages" description={intro} /><PricingPlans /><EndSections /></>;
  else if (["project", "service", "blog"].includes(type) && !slug) content = <Listing type={type as "project" | "service" | "blog"} />;
  else if (path === "/template-info/style-guide") content = <StyleGuide />;
  else if (legal || type === "template-info") content = <TextPage path={path} />;
  else content = <Detail type={type} slug={slug} />;
  return <Shell header={!legal}>{content}</Shell>;
}


