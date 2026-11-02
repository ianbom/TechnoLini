import reference from "./reference.json";
import { collections } from "@/lib/routes";

export type Project = { slug: string; title: string; image: string; category: string };
export type Blog = Project & { date: string };
export type Service = { slug: string; title: string; image: string; description: string };
export type Job = { slug: string; title: string; image: string; location: string; openings: string; experience: string; salary: string; jobType: string };
export type Plan = { slug: string; title: string; image: string; price: number; description: string };

const pages = reference.pages as Record<string, { headings: string[]; text: string; images: { local: string; alt: string }[] }>;
const thumbnails = (path: string, alt: string) => pages[path].images.filter(image => image.alt === alt).map(image => image.local);
const projectImages = thumbnails("/project", "Project Thumb Image");
const blogImages = thumbnails("/blog", "Blog Thumb Image");
projectImages.push("/assets/images/hdzXujLeYjF60MtMWmx1p9SXloI.jpg", "/assets/images/EW9lFjXOSJixxtHjzRaAAFRS5c4.jpg");
blogImages.push("/assets/images/cWTCEIBkvmxTCyzCbKnCSKy5Zo.jpg", "/assets/images/J12hobMZFpwkokRayWYVxm7CzU.jpg");

export const projects: Project[] = collections.project.map((slug, index) => {
  const page = pages[`/project/${slug}`];
  return { slug, title: page.headings[0], category: ["Web Design", "Ui Ux", "Mobile App", "Branding", "Animation", "Packaging", "Packaging", "Animation"][index], image: projectImages[index] };
});
const categories = ["Technology", "Marketing", "Business", "Seo", "Web Design", "Productivity", "Business", "Technology"];
const dates = ["October 25, 2023", "November 11, 2023", "November 8, 2023", "April 8, 2023", "March 15, 2023", "February 28, 2023", "February 6, 2023", "January 12, 2023"];
export const blogs: Blog[] = collections.blog.map((slug, index) => ({ slug, title: pages[`/blog/${slug}`].headings[0], image: blogImages[index], category: categories[index], date: dates[index] }));
export const services: Service[] = collections.service.map((slug, index) => ({
  slug, title: pages[`/service/${slug}`].headings[0], image: pages[`/service/${slug}`].images[0].local,
  description: ["Elevating brands through tailored and impactful design solutions.", "Empowering digital innovation through expert Web & Mobile Development services."][index] ?? "Crafting intuitive and visually compelling digital experiences for users.",
}));
export const jobs: Job[] = collections.career.map((slug, index) => {
  const page = pages[`/career/${slug}`];
  const lines = page.text.split("\n");
  const fact = (label: string) => lines[lines.indexOf(label) + 1];
  return { slug, title: page.headings[0], image: "", experience: fact("Experience"), salary: fact("Salary"), jobType: fact("Job Type"), location: fact("Location"), openings: ["02", "01", "04", "02", "02", "01"][index] };
});
export const plans: Plan[] = collections.pricing.map((slug, index) => ({ slug, title: pages[`/pricing/${slug}`].headings[0], image: "", price: [1000, 3000, 5000][index], description: ["Ideal for small businesses or startups", "Suitable for growing businesses", "Best for established enterprises"][index] }));

