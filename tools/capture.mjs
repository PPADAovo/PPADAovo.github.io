import { chromium } from 'playwright';
import fs from 'node:fs';
const targets = [
  ['calendar', 'https://chiikawa-calendar-windows.lwh7310.chatgpt.site'],
  ['laundry', 'https://cju-laundry.vercel.app'],
  ['transit', 'https://subway-lcd-mung-20261028.lwh7310.chatgpt.site'],
  ['weeding', 'https://weeding-exam-paper-1104.lwh7310.chatgpt.site'],
];
fs.mkdirSync('shots', { recursive: true });
const browser = await chromium.launch();
const log = [];
for (const [id, url] of targets) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 }, locale: 'ko-KR', timezoneId: 'Asia/Seoul' });
  const page = await ctx.newPage();
  const entry = { id, url };
  try {
    const res = await page.goto(url, { waitUntil: 'load', timeout: 45000 });
    entry.status = res && res.status();
    await page.waitForLoadState('networkidle', { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(3000);
    entry.finalUrl = page.url();
    entry.title = await page.title();
    entry.text = (await page.evaluate(() => document.body.innerText)).slice(0, 300);
    await page.screenshot({ path: `shots/${id}.jpg`, type: 'jpeg', quality: 84 });
  } catch (e) { entry.error = String(e).slice(0, 300); }
  log.push(entry);
  await ctx.close();
}
fs.writeFileSync('shots/log.json', JSON.stringify(log, null, 1));
await browser.close();
