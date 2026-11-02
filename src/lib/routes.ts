export const collections = {
  project: ["future-landing-page", "ai-automation-dashboard", "minimal-portfolio-showcase-application", "clean-show-business-card-mockup", "fade-book-flip-page-wise-animation", "front-page-on-paper-crop"],
  service: ["branding-design", "web-mobile-development", "ui-ux-design", "motion-design", "content-strategy", "social-media-management"],
  blog: ["5-key-trends-shaping-e-commerce-in-2023", "the-power-of-influencer-marketing-a-comprehensive-guide", "cybersecurity-in-the-digital-age-protecting-your-business", "mastering-the-art-of-seo-best-practices-and-strategies", "designing-engaging-user-experiences-the-essentials", "10-tips-for-remote-work-productivity"],
  career: ["web-developer", "graphic-designer", "digital-marketer", "ui-ux-designer", "content-writer", "project-manager"],
  pricing: ["basic-package", "standard-package", "pro-package"],
} as const;
export const staticRoutes = ["/", "/about", "/project", "/service", "/blog", "/contact", "/pricing", "/career", "/privacy-policy", "/terms-conditions", "/template-info/style-guide", "/template-info/license", "/template-info/changelog", "/404"];
export const allRoutes = [...staticRoutes, ...Object.entries(collections).flatMap(([type, slugs]) => slugs.map(slug => `/${type}/${slug}`))];
