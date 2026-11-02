"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const Accordion = AccordionPrimitive.Root;

export function AccordionItem({ className, ...props }: ComponentProps<typeof AccordionPrimitive.Item>) {
  return <AccordionPrimitive.Item className={cn("faq-item", className)} {...props} />;
}

export function AccordionTrigger({ className, children, open = false, ...props }: ComponentProps<typeof AccordionPrimitive.Trigger> & { open?: boolean }) {
  const reducedMotion = useReducedMotion();
  return <AccordionPrimitive.Header className="faq-item-heading"><AccordionPrimitive.Trigger className={cn("faq-trigger", className)} {...props}>{children}<motion.span className="faq-plus" animate={{ rotate: open ? 45 : 0 }} transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 60, mass: 1 }}><Plus size={24} aria-hidden="true" /></motion.span></AccordionPrimitive.Trigger></AccordionPrimitive.Header>;
}

export function AccordionContent({ className, children, ...props }: ComponentProps<typeof AccordionPrimitive.Content>) {
  return <AccordionPrimitive.Content className={cn("faq-content", className)} {...props}><div>{children}</div></AccordionPrimitive.Content>;
}
