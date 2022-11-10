import { chromium, Browser, BrowserContext, Page } from 'playwright';
import { LoginHelper } from './loginHelper';
import { Credentials } from '../data/interfaces';

const browsers: {browser: Browser; context: BrowserContext}[] = []
let page: Page;

export class Initializer {

  async initPage(headless = false): Promise<Page> {
    const browser = await chromium.launch({ headless });
    const context =  await browser.newContext({
      viewport: {
        width: 1920,
        height: 1080
      },
      acceptDownloads: true
    });
    browsers.push({browser, context}); 
    page = await context.newPage();
    return page; 
  }

  async closeAllPages(): Promise<void> {
    await Promise.all(
      browsers.map(async (target) => {
        await target.context.close();
        await target.browser.close();
      })
    );
  };

  async login(creds: Credentials): Promise<void> { 
    const loginHelper = new LoginHelper();
    const token = await loginHelper.getToken(creds);
    process.env.TOKEN = token;
    await page.addInitScript((authtoken: string) => {
      window.localStorage.setItem('access_token', authtoken);
    }, token);
  };
}