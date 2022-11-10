import { Page } from 'playwright'
import {HeaderFragment} from '../fragments'
import { Button, Label } from '../elements'
require('dotenv').config();

export abstract class BasePage {
  protected readonly page: Page;
  private readonly url: string;
  private readonly acceptCookiesButtonLocator: string;
  private readonly notificationLocator: string;
  
  constructor(page: Page, url?: string) {
    const pageUrl = url ? `${process.env.BASE_URL}${url}` : `${process.env.BASE_URL}`
    this.page = page; 
    this.url = pageUrl;
    this.acceptCookiesButtonLocator = 'div.CookiesInfo__cookiesInfoBtnWrapper__lBgE7 button'
    this.notificationLocator = '.notificationsList';
  }

  get header(): HeaderFragment {
    return new HeaderFragment({page: this.page});
  };

  get acceptCookieButton (): Button {
    return new Button({page: this.page, selector: this.acceptCookiesButtonLocator });
  }

  get notification(): Label {
    return new Label({ page: this.page, selector: this.notificationLocator });
  }

  async navigateTo (acceptCookie = true, waitType = 'load' as 'load' | 'domcontentloaded' | 'networkidle'): Promise<void> {
    await this.page.goto(this.url, {waitUntil: waitType});
    if(acceptCookie) {
      await this.acceptCookie();
    }
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async acceptCookie (): Promise<void> {
    await this.acceptCookieButton.waitForVisible(5000);
    await this.acceptCookieButton.click();
  }
};