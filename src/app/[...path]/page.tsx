import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { InnerPage } from "@/components/inner-pages";
import reference from "@/data/reference.json";
import { collections, staticRoutes } from "@/lib/routes";

const routes = [...staticRoutes.filter(path => path !== "/"), ...Object.entries(collections).flatMap(([type, slugs]) => slugs.map(slug => `/${type}/${slug}`))];
export function generateStaticParams() {
  return routes.map(path => ({ path: path.slice(1).split("/") }));
}
type Props = { params: Promise<{ path: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const path = `/${(await params).path.join("/")}`;
  const page = (reference.pages as Record<string, { title: string }>)[path];
  return { title: page?.title ?? "404 Not Found — TechNova" };
}
export default async function Page({ params }: Props) {
  const path = `/${(await params).path.join("/")}`;
  if (!routes.includes(path)) notFound();
  return <InnerPage path={path} />;
}
