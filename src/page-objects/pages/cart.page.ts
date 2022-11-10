import {Page} from 'playwright';
import { ROUTES } from '../../data/constants';
import { Button, Label, List } from '../elements';
import { BasePage } from './base.page';
import { CartItemFragment } from '../fragments';

export class CartPage extends BasePage {
  
  private readonly titleLocator: string;
  private readonly buyButtonLocator: string;
  private readonly itemLocator: string;

  constructor(page: Page) {
    super(page, ROUTES.CART_PAGE);
    this.titleLocator = '.CartHeader__header__2UE4z';
    this.buyButtonLocator = '.Summary__btnContainer__wLFCH a';
    this.itemLocator = '.CartItem__cartItem__1AFCV';
  }

  get title (): Label {
    return new Label({page: this.page, selector:  this.titleLocator });
  }

  get buyButton(): Button {
    return new Button({ page: this.page, selector: this.buyButtonLocator });
  }

  get items (): List {
    return new List({page: this.page, selector: this.itemLocator })
  }

  async itemsFragments(): Promise<CartItemFragment[]> {
    const itemFragments = await this.items.getItems();
    return itemFragments.map(locators => new CartItemFragment(
      {page: this.page, locator: locators }
    ));
  }

  async getCartItemByIndex(index: number): Promise<CartItemFragment> {
    const items = await this.itemsFragments();
    return items[index];
  }
}