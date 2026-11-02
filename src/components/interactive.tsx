"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import "./interactive.css";

const MotionLink = motion.create(Link);

export function Card({ children, href, className }: { children: ReactNode; href: string; className: string }) {
  const [scope, animate] = useAnimate<HTMLAnchorElement>();
  const reducedMotion = useReducedMotion();
  function hover(active: boolean) {
    if (reducedMotion) return;
    const image = scope.current?.querySelector(".photo img");
    const arrow = scope.current?.querySelector(".project-card-heading svg");
    const transition = { type: "spring" as const, stiffness: 500, damping: 60, mass: 1 };
    if (image) animate(image, { scale: active ? 1.05 : 1 }, transition);
    if (arrow) animate(arrow, { scale: active ? 1.4 : 1 }, transition);
  }
  return <MotionLink ref={scope} href={href} className={className} onHoverStart={() => hover(true)} onHoverEnd={() => hover(false)}>{children}</MotionLink>;
}

const reviews = [
  {
    "name": "John Smith",
    "company": "XYZ Corporation",
    "quote": "\"Incredible service! The team at Digital Ease transformed our platform, delivering seamless user experiences. Highly recommended for innovative solutions.\"",
    "avatar": "/assets/images/IUkT09Y9M4mXgcX2wQm6J2nB98.jpg"
  },
  {
    "name": "Sarah Johnson",
    "company": "ABC Tech",
    "quote": "\"Outstanding creative work! Digital Ease exceeded our expectations, creating a stunning UI/UX design. Professional, creative, and a pleasure to work with.\"",
    "avatar": "/assets/images/f5qRcO3H9purECa25iRZ1LwuI.jpg"
  },
  {
    "name": "Michael Thompson",
    "company": "MNO Enterprises",
    "quote": "\"Digital Ease truly understood our brand. Their web development expertise brought our vision to life. Impressive results and exceptional service.\"",
    "avatar": "/assets/images/LZe5wOBELPybG2RNqIWJ6epLp8Q.jpg"
  },
  {
    "name": "Michael Chen",
    "company": "Peak Performance Partners",
    "quote": "\"TechNova expertise is unparalleled. Their innovative designs and seamless execution enhanced our user experience, making a substantial impact on our business.\"",
    "avatar": "/assets/images/fSn1MGZ7LZoOyCPNeTjZGQGkuI.jpg"
  },
  {
    "name": "Jennifer Greene",
    "company": "Stellar Brands Ltd.",
    "quote": "\"TechNova Creations truly understood our objectives. Their tailored solutions and prompt support were instrumental in our digital success. Highly recommended!\"",
    "avatar": "/assets/images/ADJ6uUXWueJv1lYR8ZSEElT3EfM.jpg"
  },
  {
    "name": "Robert Foster",
    "company": "BlueSky Ventures",
    "quote": "\"TechNova exceeded our expectations. Their professionalism and dedication in creating our website was outstanding. A fantastic team to collaborate with!\"",
    "avatar": "/assets/images/FfCsg9ofohpYc2SZeDKTWeJu74.jpg"
  }
];

const faqs = [
  {
    "question": "What services does TechNova provide?",
    "answer": "TechNova offers a range of digital services, including website design, development, digital marketing, branding, SEO, content creation, social media management, and more."
  },
  {
    "question": "How do I start working with TechNova?",
    "answer": "You can get in touch with us by filling out the contact form on our website, sending us an email, or giving us a call. Our team will connect with you to discuss your project needs and guide you through the process."
  },
  {
    "question": "What industries does TechNova specialize in?",
    "answer": "We cater to diverse industries, working with clients in sectors such as e-commerce, healthcare, technology, hospitality, education, and more. Our adaptable expertise allows us to serve various fields."
  },
  {
    "question": "Can TechNova help improve our existing website?",
    "answer": "Absolutely! We specialize in website revamping, ensuring your online presence is optimized for performance, aesthetics, and user experience."
  },
  {
    "question": "What sets TechNova apart from other agencies?",
    "answer": "TechNova stands out for its innovative solutions, client-centric approach, a talented team, and a commitment to delivering high-quality results within deadlines."
  },
  {
    "question": "How long does it typically take to complete a project?",
    "answer": "Project timelines vary based on the scope and complexity. We work with each client to establish a timeline that meets their needs while ensuring high-quality results."
  },
  {
    "question": "Is TechNova available for ongoing support after the project is completed?",
    "answer": "Yes, we provide ongoing support post-project completion. We offer maintenance, updates, and support to ensure your digital assets continue to perform effectively."
  },
  {
    "question": "What are the payment terms and methods accepted by TechNova?",
    "answer": "Payment terms and methods are discussed during the initial consultation phase. We accept various payment methods and offer flexible terms tailored to the project."
  }
];

const clientLogos = ["<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 155 40\"><g><path d=\"M 0 0 L 155 0 L 155 40 L 0 40 Z\" fill=\"transparent\"></path><path d=\"M 51.582 10.284 L 48 10.284 L 48 26.447 L 57.916 26.447 L 57.916 23.28 L 51.582 23.28 Z M 58.259 20.965 C 58.259 24.415 60.574 26.709 64.069 26.709 C 67.542 26.709 69.857 24.416 69.857 20.965 C 69.857 17.514 67.542 15.198 64.069 15.198 C 60.574 15.198 58.259 17.514 58.259 20.965 Z M 61.644 20.943 C 61.644 19.305 62.605 18.213 64.069 18.213 C 65.51 18.213 66.472 19.305 66.472 20.943 C 66.472 22.603 65.51 23.695 64.069 23.695 C 62.605 23.695 61.644 22.603 61.644 20.943 Z M 70.398 20.79 C 70.398 24.088 72.538 26.316 75.575 26.316 C 77.038 26.316 78.305 25.791 78.939 24.94 L 78.939 26.447 C 78.939 27.954 77.999 28.959 76.339 28.959 C 74.854 28.959 73.827 28.259 73.762 27.015 L 70.355 27.015 C 70.66 30.007 72.975 32.016 76.143 32.016 C 79.878 32.016 82.237 29.592 82.237 25.748 L 82.237 15.526 L 79.2 15.526 L 79.025 16.64 C 78.413 15.744 77.125 15.154 75.639 15.154 C 72.581 15.154 70.397 17.448 70.397 20.79 Z M 73.806 20.702 C 73.806 19.129 74.854 18.082 76.186 18.082 C 77.737 18.082 78.873 19.108 78.873 20.702 C 78.873 22.297 77.759 23.389 76.208 23.389 C 74.876 23.389 73.806 22.297 73.806 20.702 Z M 83.217 20.965 C 83.217 24.415 85.532 26.709 89.027 26.709 C 92.5 26.709 94.815 24.416 94.815 20.965 C 94.815 17.514 92.5 15.198 89.027 15.198 C 85.532 15.198 83.217 17.514 83.217 20.965 Z M 86.602 20.943 C 86.602 19.305 87.563 18.213 89.027 18.213 C 90.468 18.213 91.429 19.305 91.429 20.943 C 91.429 22.603 90.469 23.695 89.027 23.695 C 87.563 23.695 86.602 22.603 86.602 20.943 Z M 97.715 13.822 C 98.763 13.822 99.615 12.971 99.615 11.9 C 99.615 10.83 98.763 10 97.715 10 C 96.645 10 95.793 10.83 95.793 11.9 C 95.793 12.97 96.645 13.822 97.715 13.822 Z M 96.01 26.447 L 99.396 26.447 L 99.396 15.527 L 96.01 15.527 Z M 101.368 31.69 L 104.688 31.69 L 104.688 25.355 C 105.321 26.185 106.763 26.753 108.27 26.753 C 111.524 26.753 113.49 24.263 113.403 20.812 C 113.315 17.295 111.284 15.177 108.248 15.177 C 106.697 15.177 105.234 15.854 104.622 16.858 L 104.447 15.526 L 101.368 15.526 Z M 104.753 20.987 C 104.753 19.349 105.845 18.257 107.418 18.257 C 109.012 18.257 110.017 19.37 110.017 20.987 C 110.017 22.603 109.012 23.717 107.418 23.717 C 105.845 23.717 104.753 22.625 104.753 20.987 Z M 113.761 22.996 C 113.848 25.202 115.596 26.731 118.348 26.731 C 120.991 26.731 122.826 25.333 122.826 23.083 C 122.826 21.467 121.865 20.397 120.073 19.96 L 118.13 19.48 C 117.431 19.305 116.994 19.13 116.994 18.562 C 116.994 17.994 117.452 17.622 118.13 17.622 C 118.894 17.622 119.396 18.125 119.375 18.868 L 122.411 18.868 C 122.323 16.596 120.598 15.177 118.195 15.177 C 115.771 15.177 113.958 16.618 113.958 18.802 C 113.958 20.266 114.766 21.467 116.928 22.035 L 118.85 22.537 C 119.418 22.69 119.658 22.952 119.658 23.324 C 119.658 23.87 119.156 24.219 118.304 24.219 C 117.321 24.219 116.797 23.761 116.797 22.996 Z M 127.974 26.731 C 129.307 26.731 130.639 26.12 131.316 25.224 L 131.535 26.448 L 134.702 26.448 L 134.702 15.526 L 131.338 15.526 L 131.338 21.206 C 131.338 22.843 130.858 23.739 129.307 23.739 C 128.105 23.739 127.319 23.193 127.319 21.162 L 127.319 15.526 L 123.955 15.526 L 123.955 22.385 C 123.955 24.985 125.397 26.731 127.974 26.731 Z M 140.036 26.447 L 140.036 20.484 C 140.036 18.649 141.019 18.124 141.98 18.124 C 143.05 18.124 143.749 18.78 143.749 20.134 L 143.749 26.447 L 147.069 26.447 L 147.069 20.484 C 147.069 18.627 148.03 18.103 148.991 18.103 C 150.061 18.103 150.782 18.758 150.782 20.134 L 150.782 26.447 L 154.059 26.447 L 154.059 19.304 C 154.059 16.814 152.748 15.154 149.93 15.154 C 148.358 15.154 147.069 15.919 146.501 17.098 C 145.846 15.918 144.71 15.154 142.897 15.154 C 141.696 15.154 140.582 15.7 139.927 16.574 L 139.796 15.526 L 136.65 15.526 L 136.65 26.446 L 140.036 26.446 Z M 0 20 C 0 10.572 0 5.858 2.929 2.929 C 5.858 0 10.572 0 20 0 C 29.428 0 34.142 0 37.071 2.929 C 40 5.858 40 10.572 40 20 C 40 29.428 40 34.142 37.071 37.071 C 34.142 40 29.428 40 20 40 C 10.572 40 5.858 40 2.929 37.071 C 0 34.142 0 29.428 0 20 Z\" fill=\"rgb(255,255,255)\"></path><path d=\"M 24 26 C 24.552 26 25.01 26.452 24.9 26.993 C 24.427 29.323 22.378 30.998 20 30.998 C 17.622 30.998 15.573 29.323 15.1 26.993 C 14.99 26.453 15.447 26 16 26 Z M 26.103 17.776 C 25.569 17.919 25.243 18.477 25.513 18.959 C 26.356 20.461 28.066 21.254 29.758 20.928 C 31.449 20.602 32.741 19.23 32.966 17.522 C 33.191 15.815 32.298 14.155 30.749 13.402 C 29.199 12.65 27.342 12.973 26.139 14.205 C 25.753 14.6 25.924 15.224 26.402 15.5 L 26.91 15.793 C 27.681 16.238 27.53 17.394 26.669 17.625 Z M 13.898 17.776 C 14.431 17.919 14.758 18.477 14.488 18.959 C 13.645 20.461 11.935 21.254 10.243 20.928 C 8.552 20.602 7.26 19.23 7.035 17.522 C 6.81 15.815 7.703 14.155 9.252 13.402 C 10.802 12.65 12.659 12.973 13.862 14.205 C 14.248 14.6 14.076 15.224 13.598 15.5 L 13.091 15.793 C 12.319 16.238 12.471 17.394 13.332 17.625 Z\" fill=\"rgb(0,0,0)\"></path></g></svg>", "<svg fill=\"none\" height=\"42\" width=\"170\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#svg-513902440_2974_a)\" fill=\"#fff\"><path d=\"M51.86 28.639h11.952v-3.6h-7.704v-13.56H51.86v17.16Zm19.033-2.401c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504Zm13.407 3.864c1.824 0 3.432-.408 4.512-1.368.984-.888 1.632-2.232 1.632-4.08V16.35h-3.744v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2h-3.792c.384 2.568 2.616 3.96 6 3.96Zm-.024-7.824c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072Zm13.866 1.176c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504Zm7.694-.385h3.912V16.35h-3.912v12.288Zm0-13.992h3.912v-3.168h-3.912v3.168Zm5.61 18.049h3.912v-5.328h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072V16.35h-3.744v16.344Zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36Zm12.729 3.024c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368Zm10.906-.024c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V16.35h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088V16.35h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584Zm9.189-.36h3.912V21.75c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912V21.75c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-7.992c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072V16.35h-3.744v12.288Z\"></path><path clip-rule=\"evenodd\" d=\"M20.684 40.638c11.045 0 20-8.955 20-20 0-11.046-8.955-20-20-20-11.046 0-20 8.954-20 20 0 11.045 8.954 20 20 20Zm6.239-30.683c.304-1.08-.743-1.717-1.7-1.036l-13.346 9.508c-1.037.739-.874 2.21.245 2.21h3.514v-.027h6.85l-5.581 1.97-2.46 8.74c-.304 1.08.742 1.718 1.699 1.036l13.347-9.508c1.036-.738.873-2.21-.245-2.21h-5.33l3.007-10.683Z\" fill-rule=\"evenodd\"></path></g><defs><clipPath id=\"svg-513902440_2974_a\"><path d=\"M0 0h170v41H0z\" fill=\"#fff\" transform=\"translate(0 .5)\"></path></clipPath></defs></svg>", "<svg fill=\"none\" height=\"42\" width=\"170\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#svg1408808907_3064_a)\" fill=\"#fff\"><path d=\"M51.278 29.823H63.23v-3.6h-7.704v-13.56h-4.248v17.16Zm19.032-2.4c-1.704 0-2.591-1.488-2.591-3.72s.888-3.744 2.592-3.744c1.703 0 2.615 1.512 2.615 3.744s-.912 3.72-2.615 3.72Zm.025 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.593-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504ZM83.74 34.07c1.825 0 3.433-.407 4.513-1.367.984-.888 1.632-2.232 1.632-4.08V17.535H86.14v1.32h-.048c-.72-1.032-1.824-1.68-3.456-1.68-3.048 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.488 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.696 2.352-2.352 2.352-1.296 0-1.944-.552-2.16-1.2H77.74c.384 2.568 2.616 3.96 6 3.96Zm-.023-7.823c-1.464 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.632 0 2.496 1.392 2.496 3.048 0 1.728-.792 3.072-2.496 3.072Zm13.866 1.176c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504Zm7.695-.384h3.912V17.535h-3.912v12.288Zm0-13.992h3.912v-3.168h-3.912v3.168Zm5.609 18.048h3.912V28.55h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744v16.344Zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36Zm12.729 3.024c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368Zm10.906-.024c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V17.535h-3.912V24.4c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088v-7.248h-3.888V25.6c0 2.736 1.488 4.584 4.32 4.584Zm9.19-.36h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912V21.83c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288Z\"></path><path clip-rule=\"evenodd\" d=\"M20.101 40.823c11.046 0 20-8.954 20-20 0-11.045-8.954-20-20-20-11.045 0-20 8.955-20 20 0 11.046 8.955 20 20 20Zm3.087-24.547a4.366 4.366 0 1 0-6.173 0l3.086 3.087 3.087-3.087Zm1.46 7.634a4.366 4.366 0 1 0 0-6.174l-3.086 3.087 3.087 3.087Zm-1.46 7.635a4.366 4.366 0 0 0 0-6.174l-3.087-3.087-3.086 3.087a4.366 4.366 0 0 0 6.173 6.174ZM9.38 23.91a4.366 4.366 0 0 1 6.174-6.174l3.087 3.087-3.087 3.087a4.366 4.366 0 0 1-6.174 0Z\" fill-rule=\"evenodd\"></path></g><defs><clipPath id=\"svg1408808907_3064_a\"><path d=\"M0 0h170v41H0z\" fill=\"#fff\" transform=\"translate(0 .5)\"></path></clipPath></defs></svg>", "<svg fill=\"none\" height=\"42\" width=\"168\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#svg-581419498_3316_a)\" fill=\"#fff\"><path d=\"M49.277 29.452H61.23v-3.6h-7.704v-13.56h-4.248v17.16Zm19.033-2.4c-1.703 0-2.591-1.488-2.591-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.025 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504ZM81.742 33.7c1.823 0 3.431-.407 4.511-1.367.984-.888 1.632-2.232 1.632-4.08V17.165h-3.744v1.32h-.047c-.72-1.032-1.825-1.68-3.456-1.68-3.049 0-5.16 2.544-5.16 6.144 0 3.768 2.568 5.832 5.328 5.832 1.487 0 2.424-.6 3.144-1.416h.096v1.224c0 1.488-.697 2.352-2.353 2.352-1.296 0-1.944-.552-2.16-1.2h-3.791c.383 2.568 2.615 3.96 6 3.96Zm-.025-7.823c-1.463 0-2.424-1.2-2.424-3.048 0-1.872.96-3.072 2.424-3.072 1.633 0 2.496 1.392 2.496 3.048 0 1.728-.791 3.072-2.495 3.072Zm13.866 1.175c-1.704 0-2.592-1.488-2.592-3.72s.888-3.744 2.592-3.744c1.704 0 2.616 1.512 2.616 3.744s-.912 3.72-2.616 3.72Zm.024 2.784c3.96 0 6.552-2.808 6.552-6.504 0-3.696-2.592-6.504-6.552-6.504-3.936 0-6.576 2.808-6.576 6.504 0 3.696 2.64 6.504 6.576 6.504Zm7.695-.384h3.912V17.164h-3.912v12.288Zm0-13.992h3.912v-3.168h-3.912v3.168Zm5.609 18.049h3.912V28.18h.048c.768 1.032 1.896 1.656 3.48 1.656 3.216 0 5.352-2.544 5.352-6.528 0-3.696-1.992-6.504-5.256-6.504-1.68 0-2.88.744-3.72 1.848h-.072v-1.488h-3.744v16.344Zm6.432-6.696c-1.68 0-2.64-1.368-2.64-3.36 0-1.992.864-3.504 2.568-3.504 1.68 0 2.472 1.392 2.472 3.504 0 2.088-.912 3.36-2.4 3.36Zm12.729 3.024c3.216 0 5.592-1.392 5.592-4.08 0-3.144-2.544-3.696-4.704-4.056-1.56-.288-2.952-.408-2.952-1.272 0-.768.744-1.128 1.704-1.128 1.08 0 1.824.336 1.968 1.44h3.6c-.192-2.424-2.064-3.936-5.544-3.936-2.904 0-5.304 1.344-5.304 3.936 0 2.88 2.28 3.456 4.416 3.816 1.632.288 3.12.408 3.12 1.512 0 .792-.744 1.224-1.92 1.224-1.296 0-2.112-.6-2.256-1.824h-3.696c.12 2.712 2.376 4.368 5.976 4.368Zm10.906-.025c1.704 0 2.784-.672 3.672-1.872h.072v1.512h3.744V17.164h-3.912v6.864c0 1.464-.816 2.472-2.16 2.472-1.248 0-1.848-.744-1.848-2.088v-7.248h-3.888v8.064c0 2.736 1.488 4.584 4.32 4.584Zm9.19-.359h3.912v-6.888c0-1.464.72-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912v-6.888c0-1.464.696-2.496 1.944-2.496 1.176 0 1.728.768 1.728 2.088v7.296h3.912V21.46c0-2.76-1.392-4.656-4.176-4.656-1.584 0-2.904.672-3.864 2.16h-.048c-.624-1.32-1.848-2.16-3.456-2.16-1.776 0-2.952.84-3.72 2.112h-.072v-1.752h-3.744v12.288ZM25.41 2.477l-3.933-1.054-3.314 12.37L15.17 2.625 11.237 3.68l3.233 12.066-8.053-8.053-2.879 2.88 8.833 8.832-11-2.948L.317 20.39l12.019 3.22a8.144 8.144 0 1 1 15.869-.011l10.923 2.926 1.053-3.933-12.066-3.233 11-2.948-1.053-3.933-12.066 3.233 8.052-8.052-2.879-2.88-8.71 8.71 2.95-11.012Z\"></path><path d=\"M28.194 23.644a8.127 8.127 0 0 1-2.026 3.733l7.913 7.913 2.88-2.88-8.767-8.766Zm-2.106 3.816a8.137 8.137 0 0 1-3.639 2.151l2.88 10.747 3.933-1.054-3.174-11.844Zm-3.786 2.19a8.157 8.157 0 0 1-2.033.256 8.15 8.15 0 0 1-2.172-.293L15.215 40.37l3.933 1.054 3.154-11.773Zm-4.344-.076a8.142 8.142 0 0 1-3.575-2.183L6.45 35.323l2.88 2.88 8.628-8.63Zm-3.641-2.254a8.125 8.125 0 0 1-1.975-3.686L1.384 26.57l1.054 3.933 11.88-3.183Z\"></path></g><defs><clipPath id=\"svg-581419498_3316_a\"><path d=\"M0 0h168v41H0z\" fill=\"#fff\" transform=\"translate(0 .5)\"></path></clipPath></defs></svg>"];

export function Reveal({ children, className, direction = "up", amount = 0.5, once = true }: { children: ReactNode; className?: string; direction?: "up" | "left" | "right"; amount?: number; once?: boolean }) {
  const reducedMotion = useReducedMotion();
  return <motion.div className={className} initial={reducedMotion ? false : { opacity: 0, x: direction === "left" ? -150 : direction === "right" ? 150 : 0, y: direction === "up" ? 150 : 0 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once, amount }} transition={{ type: "spring", stiffness: 400, damping: 30, mass: 1 }}>{children}</motion.div>;
}

const navigation = [["HOME", "/"], ["ABOUT US", "/about"], ["PROJECTS", "/project"], ["SERVICE", "/service"], ["BLOG", "/blog"]];

export function Header() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuPath(null); menuButton.current?.focus(); }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, []);
  return <header className="site-header"><div className="container header-inner">
    <Link className="wordmark" href="/" aria-label="TechNova home"><Image src="/assets/inline/b7261fb67526792b.svg" alt="TechNova" width={141} height={24} priority /></Link>
    <button ref={menuButton} className={`menu-toggle${open ? " is-open" : ""}`} type="button" aria-expanded={open} aria-controls="main-navigation" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setMenuPath(open ? null : pathname)}><span /><span /><span /></button>
    <nav id="main-navigation" aria-label="Main navigation" className={`main-navigation${open ? " is-open" : ""}`}>
      {navigation.map(([label, href]) => <Link key={href} href={href} className={pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)) ? "is-active" : ""} aria-current={pathname === href ? "page" : undefined} onClick={() => setMenuPath(null)}>{label}</Link>)}
      <Link className="button header-contact" href="/contact" onClick={() => setMenuPath(null)}>Get in Touch <ArrowUpRight size={18} aria-hidden="true" /></Link>
    </nav>
  </div></header>;
}

export function Testimonials() {
  const viewport = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(3);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const observer = new ResizeObserver(() => {
      const count = window.innerWidth <= 809 ? 1 : window.innerWidth < 1200 ? 2 : 3;
      setVisible(count);
      setIndex(current => Math.min(current, reviews.length - count));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <section className="section testimonials-section"><div className="container">
    <Reveal className="testimonials-heading"><div><p className="eyebrow">Testimonials</p><h2>Client Voices: What Our Customers Have to Say</h2></div></Reveal>
    <div className="testimonials-carousel"><div className="carousel-controls"><motion.button type="button" aria-label="Previous testimonials" whileTap={{ scale: 0.9 }} onClick={() => setIndex(current => current === 0 ? reviews.length - visible : current - 1)}><ArrowLeft size={20} /></motion.button><motion.button type="button" aria-label="Next testimonials" whileTap={{ scale: 0.9 }} onClick={() => setIndex(current => current >= reviews.length - visible ? 0 : current + 1)}><ArrowRight size={20} /></motion.button></div><div className="testimonials-viewport" ref={viewport} aria-roledescription="carousel" aria-label="Client testimonials"><motion.div className="testimonials-track" animate={{ x: `calc(-${index * 100 / visible}% - ${index * (visible === 1 ? 20 : 40) / visible}px)` }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 40 }}>
      {reviews.map((review, item) => <article className="testimonial-card" key={review.name} aria-hidden={item < index || item >= index + visible}><blockquote>{review.quote}</blockquote><div className="review-person"><Image src={review.avatar} width={48} height={48} alt="" /><div><h3>{review.name}</h3><p>{review.company}</p></div></div></article>)}
    </motion.div></div></div><p className="visually-hidden" aria-live="polite">Showing testimonials {index + 1} to {index + visible} of {reviews.length}</p>
  </div></section>;
}

export function ClientTicker() {
  return <section className="client-ticker" aria-label="Our clients"><div className="container client-ticker-layout"><p>Trusted by 40+<br />worldwide clients</p><div className="client-ticker-window"><div className="client-ticker-track">{[0, 1].map(copy => <div className="client-logo-group" key={copy} aria-hidden={copy === 1}>{clientLogos.map((logo, index) => <span key={index} role="img" aria-label="Logoipsum" dangerouslySetInnerHTML={{ __html: logo.replaceAll(/id="([^"]+)"/g, `id="$1-${copy}"`).replaceAll(/url\(#([^)]*)\)/g, `url(#$1-${copy})`) }} />)}</div>)}</div></div></div></section>;
}

export function FAQ() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  return <section className="section faq-section"><div className="container faq-layout"><Reveal className="faq-intro" direction="left"><p className="eyebrow">FAQ’S</p><h2>Frequently Asked Questions</h2><Image src="/assets/images/RPCuI8EVmpZS8LJHTgXxHvCKvnA.jpg" alt="Colleagues collaborating in the studio" width={580} height={380} /></Reveal><Reveal direction="right"><Accordion type="multiple" className="faq-list" value={openQuestions} onValueChange={setOpenQuestions}>{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`question-${index}`}><AccordionTrigger open={openQuestions.includes(`question-${index}`)}>{faq.question}</AccordionTrigger><AccordionContent>{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section>;
}

const plans = [
  { slug: "basic-package", description: "Ideal for small businesses or startups", monthly: 1000, yearly: 8000, features: ["Custom website design", "Up to 5 pages", "Basic SEO setup"] },
  { slug: "standard-package", description: "Suitable for growing businesses", monthly: 3000, yearly: 25000, features: ["Enhanced design features", "Up to 10 pages", "Mobile Responsiveness"] },
  { slug: "pro-package", description: "Best for established enterprises", monthly: 5000, yearly: 40000, features: ["Advanced features", "Unlimited pages", "E-Commerce integration"] },
];

export function PricingPlans() {
  const [yearly, setYearly] = useState(false);
  return <section className="pricing-plans container"><div className="billing-toggle" role="group" aria-label="Billing period"><button type="button" aria-pressed={!yearly} onClick={() => setYearly(false)}>Monthly</button><button type="button" aria-pressed={yearly} onClick={() => setYearly(true)}>Yearly<span>Save 30%</span></button></div><div className="pricing-grid">{plans.map((plan, index) => <Reveal key={plan.slug} className={`pricing-card${index === 1 ? " pricing-featured" : ""}`}><div className="pricing-card-title"><h2>Basic Package</h2>{index === 1 && <span className="best-offer">Best Offer</span>}</div><p className="plan-description">{plan.description}</p><div className="plan-price"><p>Start From</p><strong>$ {(yearly ? plan.yearly : plan.monthly).toLocaleString("en-US")}</strong><span>/{yearly ? "yearly" : "month"}</span></div><ul>{[...plan.features, "Fast Delivery", "Cancel anytime"].map(feature => <li key={feature}>{feature}</li>)}</ul><Link className="button" href={`/pricing/${plan.slug}`}>Select This Plan <ArrowUpRight size={18} aria-hidden="true" /></Link></Reveal>)}</div></section>;
}

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSubmitted(true); }
  return <form className="contact-form" onSubmit={submit}><label className="visually-hidden" htmlFor="contact-name">Name</label><input required id="contact-name" name="name" autoComplete="name" placeholder="Name" onChange={() => setSubmitted(false)} /><label className="visually-hidden" htmlFor="contact-email">Email</label><input required id="contact-email" name="email" type="email" autoComplete="email" placeholder="Email" onChange={() => setSubmitted(false)} /><label className="visually-hidden" htmlFor="contact-message">Message</label><textarea required id="contact-message" name="message" placeholder="Message" rows={5} onChange={() => setSubmitted(false)} /><button className="button" type="submit">Submit</button><p role="status" className={submitted ? undefined : "visually-hidden"}>{submitted ? "Your message is ready. Nothing was sent." : ""}</p></form>;
}

const careerImages = [["2QacoP00xf0XrHLJY4TUODIy3g.jpg", "8XDIFgSm7agVk2zwBlKV0dLyqo.png", "4MXtp8az1BR9uwLssTtXjCFbqsI.png"], ["8zfcSHnJMTCrAKwV4V4JpKirNE4.png", "2QacoP00xf0XrHLJY4TUODIy3g.jpg", "R1eGCzWKCwy6aij1rV5ZQILPjog.png"]];

export function CareerTicker() {
  return <div className="career-ticker" aria-label="Life at TechNova">{careerImages.map((images, column) => <div className="career-ticker-window" key={column}><div className={`career-ticker-track${column === 1 ? " career-ticker-reverse" : ""}`}>{[0, 1].map(copy => <div className="career-image-group" key={copy} aria-hidden={copy === 1}>{images.map((image, index) => <Image src={`/assets/images/${image}`} key={`${image}-${index}`} alt={copy === 0 ? "Life and teamwork at TechNova" : ""} width={300} height={300} />)}</div>)}</div></div>)}</div>;
}
