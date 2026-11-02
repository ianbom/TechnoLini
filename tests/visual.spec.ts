import { test, expect, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const sizes = [[1920, 1080], [1440, 900], [1280, 800], [1024, 768], [768, 1024], [390, 844], [375, 812]];
const mainRoutes = ["/", "/about", "/project", "/service", "/blog", "/contact", "/pricing", "/career"];
const detailRoutes = ["/project/future-landing-page", "/service/branding-design", "/blog/5-key-trends-shaping-e-commerce-in-2023", "/career/web-developer", "/pricing/basic-package"];
const root = path.resolve("artifacts/visual");
const routeName = (route: string) => route === "/" ? "home" : route.slice(1).replaceAll("/", "-");

async function metrics(page: Page) {
  return page.evaluate(() => {
    const measure = (element: Element) => {
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { tag: element.tagName.toLowerCase(), name: element.getAttribute("data-framer-name"), text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 110), x: Math.round(rect.x), y: Math.round(rect.y + scrollY), width: Math.round(rect.width), height: Math.round(rect.height), fontSize: style.fontSize, lineHeight: style.lineHeight, fontWeight: style.fontWeight, opacity: style.opacity, transform: style.transform };
    };
    const headings = Array.from(document.querySelectorAll("h1,h2")).filter(element => {
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0 && getComputedStyle(element).visibility !== "hidden";
    }).map(measure);
    const sections = Array.from(document.querySelectorAll('main>section,main>div>section,header,footer,[data-framer-name="Page Wrapper"]>div')).filter(element => element.getBoundingClientRect().height > 0).map(measure);
    const images = Array.from(document.images).filter(element => element.getBoundingClientRect().width > 100).slice(0, 12).map(element => ({ ...measure(element), alt: element.alt, loaded: element.complete && element.naturalWidth > 0 }));
    return { title: document.title, viewport: { width: innerWidth, height: innerHeight }, documentHeight: document.documentElement.scrollHeight, documentWidth: document.documentElement.scrollWidth, overflow: document.documentElement.scrollWidth > innerWidth, headings, sections, images };
  });
}

async function revealPage(page: Page) {
  await page.evaluate(() => document.fonts.ready);
  for (let position = 0; position < await page.evaluate(() => document.documentElement.scrollHeight); position += 600) {
    await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), position);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(600);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);
}

test.describe("visual evidence", () => {
  test.skip(process.env.VISUAL !== "1", "Set VISUAL=1 to capture reference/local comparisons.");
  for (const side of ["reference", "local"] as const) {
    test(`${side}: responsive pages and motion`, async ({ browser }) => {
      test.skip(side === "reference" && process.env.LOCAL_ONLY === "1", "Reuse saved reference captures.");
      test.setTimeout(15 * 60_000);
      const directory = path.join(root, side);
      await mkdir(directory, { recursive: true });
      const context = await browser.newContext({ reducedMotion: "no-preference", deviceScaleFactor: 1 });
      const page = await context.newPage();
      const pageErrors: string[] = [];
      page.on("pageerror", error => pageErrors.push(error.message));
      const records: { route: string; width: number; height: number; [key: string]: unknown }[] = [];
      const failures: string[] = [];
      const base = side === "reference" ? "https://technova-template.framer.website" : "http://127.0.0.1:3000";
      const targets = [...mainRoutes.flatMap(route => sizes.map(([width, height]) => ({ route, width, height }))), ...detailRoutes.flatMap(route => [[1440, 900], [390, 844]].map(([width, height]) => ({ route, width, height })))];
      const saveManifest = () => {
        const routeCounts = Object.fromEntries([...mainRoutes, ...detailRoutes].map(route => {
          const completed = records.filter(record => record.route === route).length;
          return [route, { viewports: completed, screenshots: completed * 2 }];
        }));
        return writeFile(path.join(directory, "manifest.json"), JSON.stringify({ side, base, capturedAt: new Date().toISOString(), completed: records.length, expected: targets.length, routeCounts, failures, records }, null, 2));
      };
      try {
        for (const { route, width, height } of targets) {
          const prefix = `${routeName(route)}-${width}`;
          pageErrors.length = 0;
          try {
            await page.setViewportSize({ width, height });
            await page.bringToFront();
            const response = await page.goto(`${base}${route}`, { waitUntil: "domcontentloaded", timeout: 45_000 });
            await revealPage(page);
            await page.screenshot({ path: path.join(directory, `${prefix}-top.png`) });
            await page.screenshot({ path: path.join(directory, `${prefix}-full.png`), fullPage: true });
            const measurement = await metrics(page);
            records.push({ route, width, height, status: response?.status(), screenshots: [`${prefix}-top.png`, `${prefix}-full.png`], pageErrors: [...pageErrors], ...measurement });
            console.log(`${side} ${route} ${width}: HTTP ${response?.status()}, overflow=${measurement.overflow}, errors=${pageErrors.length}`);
          } catch (error) {
            failures.push(`${prefix}: ${String(error)}`);
          }
          await saveManifest();
        }
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.bringToFront();
        await page.goto(base, { waitUntil: "domcontentloaded" });
        await page.evaluate(() => document.fonts.ready);
        const start = Date.now();
        const frames = [];
        for (const elapsed of [0, 100, 250, 500, 1000]) {
          await page.waitForTimeout(Math.max(0, elapsed - (Date.now() - start)));
          await page.screenshot({ path: path.join(directory, `home-1440-motion-${elapsed}.png`) });
          frames.push({ elapsed, actualElapsed: Date.now() - start, metrics: await metrics(page) });
        }
        const scrollFrames = [];
        for (const position of [0, 600, 1200, 1800]) {
          await page.evaluate(y => scrollTo({ top: y, behavior: "instant" }), position);
          await page.waitForTimeout(600);
          await page.screenshot({ path: path.join(directory, `home-1440-scroll-${position}.png`) });
          scrollFrames.push({ position, metrics: await metrics(page) });
        }
        await writeFile(path.join(directory, "motion.json"), JSON.stringify({ timeOrigin: "After DOMContentLoaded and document.fonts.ready; actualElapsed includes screenshot time.", frames, scrollFrames }, null, 2));
      } finally {
        await saveManifest();
        await context.close();
      }
      expect(failures, "All requested captures must finish").toEqual([]);
      expect(records).toHaveLength(targets.length);
    });
  }
  test("reference structural probes", async ({ browser }) => {
    test.skip(process.env.LOCAL_ONLY === "1", "Reuse saved reference probes.");
    test.setTimeout(5 * 60_000);
    await mkdir(root, { recursive: true });
    const context = await browser.newContext({ viewport: { width: 768, height: 1024 }, reducedMotion: "no-preference" });
    const page = await context.newPage();
    const records = [];
    try {
      for (const route of [...mainRoutes, ...detailRoutes]) {
        await page.goto(`https://technova-template.framer.website${route}`, { waitUntil: "domcontentloaded" });
        await page.bringToFront();
        await revealPage(page);
        const record = await page.evaluate(() => {
          const visible = (element: Element) => element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0;
          const faq = Array.from(document.querySelectorAll("h1,h2,h3")).find(element => element.textContent?.trim() === "Frequently Asked Questions" && visible(element));
          const ancestors = [];
          for (let element = faq; element && ancestors.length < 10; element = element.parentElement ?? undefined) {
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            ancestors.push({ tag: element.tagName, name: element.getAttribute("data-framer-name"), color: style.color, background: style.backgroundColor, x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height });
          }
          const loadMore = Array.from(document.querySelectorAll("*")).filter(element => element.childElementCount === 0 && element.textContent?.trim() === "Load More" && visible(element)).map(leaf => {
            const chain = [];
            for (let element: Element | null = leaf; element && chain.length < 5; element = element.parentElement) {
              const style = getComputedStyle(element);
              chain.push({ tag: element.tagName, role: element.getAttribute("role"), href: element.getAttribute("href"), disabled: element.getAttribute("disabled"), tabIndex: element.getAttribute("tabindex"), cursor: style.cursor, background: style.backgroundColor, text: element.textContent?.trim().slice(0, 80) });
            }
            return chain;
          });
          const question = Array.from(document.querySelectorAll("*")).find(element => element.childElementCount === 0 && element.textContent?.trim() === "What services does TechNova provide?" && visible(element));
          return { faqAncestors: ancestors, questionColor: question ? getComputedStyle(question).color : null, loadMore, galleryLinks: Array.from(document.querySelectorAll('a[href^="./project/"],a[href^="./blog/"],a[href^="/project/"],a[href^="/blog/"]')).filter(visible).length };
        });
        let afterClick;
        for (const button of await page.getByText("Load More", { exact: true }).all()) {
          if (await button.isVisible()) {
            await button.click();
            await page.waitForTimeout(700);
            afterClick = await page.evaluate(() => ({ text: document.body.innerText.slice(-180), galleryLinks: Array.from(document.querySelectorAll('a[href^="./project/"],a[href^="./blog/"],a[href^="/project/"],a[href^="/blog/"]')).filter(element => element.getBoundingClientRect().width > 0).map(element => ({ href: element.getAttribute("href"), text: element.textContent?.trim().replace(/\s+/g, " ") })), loadMoreVisible: Array.from(document.querySelectorAll("*")).some(element => element.childElementCount === 0 && element.textContent?.trim() === "Load More" && element.getBoundingClientRect().width > 0) }));
            await page.screenshot({ path: path.join(root, `reference-${routeName(route)}-768-after-load-more.png`), fullPage: true });
            break;
          }
        }
        records.push({ route, ...record, afterClick });
      }
      await writeFile(path.join(root, "reference-structural-probes.json"), JSON.stringify(records, null, 2));
    } finally {
      await context.close();
    }
  });
  test("reference geometry probes", async ({ browser }) => {
    test.skip(process.env.LOCAL_ONLY === "1", "Reuse saved reference probes.");
    test.setTimeout(5 * 60_000);
    const context = await browser.newContext({ reducedMotion: "no-preference" });
    const page = await context.newPage();
    const records = [];
    try {
      for (const [route, width] of [["/project", 1440], ["/service", 1440], ["/service", 390], ["/service", 768], ["/career/web-developer", 1440], ["/pricing/basic-package", 1440], ["/service/branding-design", 1440]] as const) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        await page.goto(`https://technova-template.framer.website${route}`, { waitUntil: "domcontentloaded" });
        await page.bringToFront();
        await revealPage(page);
        const record = await page.evaluate(() => {
          const visible = (element: Element) => element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().height > 0;
          const measure = (element: Element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return { name: element.getAttribute("data-framer-name"), tag: element.tagName, text: element.textContent?.trim().replace(/\s+/g, " ").slice(0, 100), x: rect.x, y: rect.y + scrollY, width: rect.width, height: rect.height, padding: style.padding, gap: style.gap, fontSize: style.fontSize, lineHeight: style.lineHeight, fontWeight: style.fontWeight, color: style.color, background: style.backgroundColor };
          };
          const heading = Array.from(document.querySelectorAll("h1")).find(visible);
          const heroAncestors = [];
          for (let element: Element | undefined = heading; element && heroAncestors.length < 6; element = element.parentElement ?? undefined) heroAncestors.push(measure(element));
          const paragraphs = Array.from(document.querySelectorAll("p")).filter(element => visible(element) && (element.textContent?.length ?? 0) > 70).slice(0, 5).map(measure);
          const service = Array.from(document.querySelectorAll("a")).find(element => visible(element) && element.getAttribute("href")?.endsWith("/service/branding-design"));
          const serviceCard = service ? { ...measure(service), children: Array.from(service.querySelectorAll("img,h2,h3,p")).filter(visible).map(measure) } : null;
          const faq = Array.from(document.querySelectorAll('[data-framer-name="FAQ - Mobile"],[data-framer-name="FAQ - Desktop"]')).find(visible);
          const faqImages = Array.from(document.querySelectorAll('img[alt="Faq Image"]')).filter(visible).map(measure);
          const faqTitles = Array.from(document.querySelectorAll("h2,h3")).filter(element => visible(element) && ["Frequently Asked Questions", "What services does TechNova provide?"].includes(element.textContent?.trim() ?? "")).map(measure);
          return { heroAncestors, paragraphs, serviceCard, faq: faq ? measure(faq) : null, faqImages, faqTitles };
        });
        records.push({ route, width, ...record });
      }
      await writeFile(path.join(root, "reference-geometry-probes.json"), JSON.stringify(records, null, 2));
    } finally {
      await context.close();
    }
  });
});
