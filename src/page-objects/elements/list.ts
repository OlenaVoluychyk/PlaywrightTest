import { BaseElement } from '.';
import { Page, Locator} from 'playwright';

export class List extends BaseElement {

  constructor(options: {
    page: Page;
    selector?: string; 
    locator?: Locator;
  }) {
    super(options);
  }  

  async getItems(): Promise<Locator[]> {
    const elements = this.page.locator(this.selector);
    const items = [];
    const count = await elements.count();
    for(let i = 0; i < count; i++) {
      items.push(elements.nth(i));
    }
    return items;
  };

  async clickItemByName(name: string): Promise<void> {
    let itemToClick: Locator;
    const items = await this.getItems();
    for(const item of items) {
      if((await item.innerText()).trim() === name) {
        itemToClick = item; 
        await itemToClick.click();
      }  
    }
  };
};