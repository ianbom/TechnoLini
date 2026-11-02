import { test, expect } from "@playwright/test";
import { allRoutes } from "../src/lib/routes";

test("all public routes and unknown routes", async ({ request }) => {
  for (const route of allRoutes) {
    const response = await request.get(route);
    expect(response.status(), route).toBe(200);
    expect(await response.text(), route).toContain("<h1");
  }
  expect((await request.get("/missing-page")).status()).toBe(404);
  expect((await request.get("/project/missing-project")).status()).toBe(404);
});

test("home hydrates, assets load, carousel works", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".hero-content")).toHaveCSS("opacity", "1");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("We Are a Digital Design Agency.");
  await page.locator(".testimonials-section").scrollIntoViewIfNeeded();
  const before = await page.locator(".testimonials-track").evaluate(element => getComputedStyle(element).transform);
  await page.getByRole("button", { name: "Next testimonials", exact: true }).click();
  await expect.poll(() => page.locator(".testimonials-track").evaluate(element => getComputedStyle(element).transform)).not.toBe(before);
  expect(await page.evaluate(() => [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src))).toEqual([]);
  expect(errors).toEqual([]);
});

test("pricing changes and independent FAQ panels", async ({ page }) => {
  await page.goto("/pricing");
  await page.getByRole("button", { name: "Yearly", exact: false }).click();
  await expect(page.locator(".plan-price").first()).toContainText("8,000");
  await page.getByRole("button", { name: "Monthly", exact: true }).click();
  await expect(page.locator(".plan-price").first()).toContainText("1,000");
  await page.getByRole("button", { name: "What services does TechNova provide?" }).click();
  await page.getByRole("button", { name: "How do I start working with TechNova?" }).click();
  await expect(page.getByRole("button", { name: "What services does TechNova provide?" })).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByRole("button", { name: "How do I start working with TechNova?" })).toHaveAttribute("aria-expanded", "true");
});

test("mobile navigation and local contact feedback", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: /menu/i });
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page.locator("nav").getByRole("link", { name: "Get in Touch" }).click();
  await expect(page).toHaveURL(/\/contact$/);
  await page.getByRole("textbox", { name: "Name", exact: true }).fill("Local test");
  await page.getByRole("textbox", { name: "Email", exact: true }).fill("test@example.com");
  await page.getByRole("textbox", { name: "Message", exact: true }).fill("Local form validation check.");
  const posts: string[] = [];
  page.on("request", request => { if (request.method() === "POST" && !request.url().includes("_next")) posts.push(request.url()); });
  await page.getByRole("button", { name: "Submit", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Nothing was sent");
  await expect(page.getByRole("textbox", { name: "Name", exact: true })).toHaveValue("Local test");
  expect(posts).toEqual([]);
});

test("every route fits desktop and phone without broken images", async ({ page }) => {
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of allRoutes) {
      await page.goto(route);
      await page.evaluate(() => document.fonts.ready);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width} ${route} overflow`).toBe(true);
      expect(await page.evaluate(() => [...document.images].filter(image => image.complete && image.naturalWidth === 0).map(image => image.src)), `${width} ${route} images`).toEqual([]);
      expect(await page.locator('a[href=""],a[href="#"]').count(), `${route} empty links`).toBe(0);
    }
  }
});
