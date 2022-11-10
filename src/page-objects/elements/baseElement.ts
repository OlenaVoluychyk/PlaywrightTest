import { Locator, Page } from 'playwright';
import { Css } from '../../data/interfaces';

export abstract class BaseElement {
  page: Page;
  element: Locator;
  selector: string;
  locator: Locator | undefined;

  constructor(options: {
    page: Page;
    selector?: string;
    locator?: Locator;
  }) {
    this.page = options.page;
    this.selector = options.selector ? options.selector : '';
    this.element = this.page.locator(this.selector)
    if(options.selector && options.locator) {
      this.element = options.locator.locator(options.selector);
    } else if(!options.selector && options.locator) {
      this.element = options.locator;
    } else if (options.selector && !options.locator) {
      this.element = this.page.locator(options.selector);
    } 
  }

  async isExist(): Promise<boolean> {
    return await this.element.count() !== 0;
  }

  async isVisible(timeout = 5000): Promise<boolean> {
    if (await this.isExist()) {
      const elementStyles = await this.element.nth(0).evaluate(
        (element) => getComputedStyle(element) as unknown as Css
      );
      const opacity = elementStyles.opacity;
      if (opacity === '0') {
        return false;
      }
      return await this.element.nth(0).isVisible({ timeout });
    } else {
      return false;
    }
  }

  async click(options?: Record<string, unknown>): Promise<void> {
    if(!options) {
      await this.waitForVisible(5000)
    }  
    await this.element.click(options)
  };

  async waitForVisible(timeToWait?: number): Promise<void> {
    await this.element.waitFor({state: 'visible', timeout: timeToWait});
  }

  async getText(): Promise<string> {
    this.waitForVisible(5000);
    return (await this.element.innerText())?.trim();
  }

  async getStyles(pseudoClass?: string): Promise<Css> {
    return await this.element.evaluate(
      (element) => getComputedStyle(element) as unknown as Css,
      pseudoClass
    );
  }

  async isDesabled(): Promise<boolean> {
    return await this.element.isDisabled();
  }

  async waitForAbsance(timeToWait?: number): Promise<void> {
    await this.element.waitFor({state: 'hidden', timeout: timeToWait});
  }
};