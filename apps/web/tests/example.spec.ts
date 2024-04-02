import { test, expect, Page, Browser } from "@playwright/test";
import playwright from "playwright";
import { playAudit } from "playwright-lighthouse";
import mobileConfig from "lighthouse/core/config/lr-mobile-config.js";


test("should navigate to page", async () => {
  const browser = await playwright["chromium"].launch({
    args: ["--remote-debugging-port=9222"],
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:3000/");
  await playAudit({
    page,
    thresholds: {
      performance: 50,
      accessibility: 50,
      "best-practices": 50,
      seo: 50,
      pwa: 10,
    },
    config: mobileConfig,
    port: 9222,
  });
  await expect(page.getByText("Get started by editing")).toBeVisible();
});



