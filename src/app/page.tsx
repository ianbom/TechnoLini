import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Shell, Photo, SectionHeading, ProjectCard, BlogCard, ServiceList, Consultation } from "@/components/shared";
import { ClientTicker, Reveal, Testimonials } from "@/components/interactive";
import { projects, blogs, services } from "@/data/catalog";

const avatars = ["0XXvgHjgnrVzReSwa4z5TU1YIG0", "ZzJviw6yqOn9dTjQorHVsyJjio", "euR5zH0D5J4ygtT3hSlUUaTI", "W5EHRbFmipkESVO38r8Ls1pRSY", "ow57O2l9GngXEHfmT0NhlPyOCo"];

export default function Home() {
  return <Shell>
    <section className="home-hero">
      <div className="container hero-wrap">
        <Reveal direction="left" className="hero-content">
          <div>
            <h1>We Are a Digital Design Agency.</h1>
            <p className="body-large">That&apos;s how fast it goes and I help startups and tech companies develop pixel-perfect designs.</p>
          </div>
          <Link className="button" href="/contact">Let&apos;s Talk <ArrowUpRight size={24} /></Link>
          <div className="hero-rating">
            <div className="avatars">{avatars.map(name => <Image key={name} src={`/assets/images/${name}.jpg`} width={48} height={48} alt="Client Image" />)}</div>
            <div><p>4.5 Stars</p><Image src="/assets/inline/ddff6d0f42f8fbd0.svg" alt="4.5 out of 5 stars" width={116} height={19} /></div>
          </div>
        </Reveal>
        <Reveal direction="right" amount={0} className="hero-visual">
          <Photo className="hero-photo" src="/assets/images/7uJGPW4hN5a0wIPJ8Zv0Jw6AelM.jpg" alt="Hero Image" priority sizes="1024px" />
          <div className="hero-tags">{["Branding", "Web Design", "UI+UX", "Development", "Mobile App", "Webflow"].map(tag => <span key={tag}>{tag}</span>)}</div>
        </Reveal>
      </div>
    </section>
    <section className="home-about section">
      <div className="container">
        <div className="home-about-wrap">
          <Reveal direction="left"><p className="eyebrow">About Us</p><h2>Helping brands and individuals connect on a deeper level.</h2></Reveal>
          <Reveal direction="right"><p>TechNova takes pride in providing the best mobile, web development services over the course of 10+ years. Throughout that time, we have established ourselves as a trusted all partner, completing 915+ projects with our in-house team of 110+ employees.</p><Photo src="/assets/images/7XBht5LEfhxm3XWUqWYzuApDBk.jpg" alt="About Image" /></Reveal>
        </div>
        <Reveal className="home-stats">{[["915+", "Projects Completed"], ["10", "Years of Experience"], ["110+", "Employees"], ["2k+", "Happy Customers"]].map(([number, label]) => <div key={label}><h2>{number}</h2><p>{label}</p></div>)}</Reveal>
      </div>
    </section>
    <section className="section home-portfolio">
      <div className="container">
        <SectionHeading eyebrow="Portfolio" title="The experiences are super innovative and creative." action="View all Works" href="/project" />
        <div className="project-grid">{projects.slice(0, 4).map(project => <ProjectCard key={project.slug} project={project} />)}</div>
      </div>
    </section>
    <section className="section home-services">
      <div className="container">
        <SectionHeading eyebrow="What We Do" title="Our promise is to deliver a service that surpasses all expectations." action="View all Services" href="/service" />
        <ServiceList items={services.slice(0, 3)} />
      </div>
    </section>
    <section className="section home-blogs">
      <div className="container">
        <SectionHeading eyebrow="Latest Blogs" title="Check out our latest news while you're on the go!" action="View all Blogs" href="/blog" />
        <div className="blog-grid">{blogs.slice(0, 2).map(blog => <BlogCard key={blog.slug} blog={blog} />)}</div>
      </div>
    </section>
    <Testimonials />
    <ClientTicker />
    <Consultation />
  </Shell>;
}
