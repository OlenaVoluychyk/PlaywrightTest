import { Locator, Page } from 'playwright';
import { BaseElement, Button, Icon, Label } from '../elements';

export class CartItemFragment extends BaseElement {

  private readonly titleLocator: string;
  private readonly totalPriceLocator: string;
  private readonly colorLocator: string; 
  private readonly sizeLocator: string; 
  private readonly priceLocator: string;
  private readonly countLocator: string;
  private readonly increaseButtonLocator: string;
  private readonly derceaseButtonLocator: string;
  private readonly deleteButtonLocator: string; 
  private readonly iconLocator: string;

  constructor(options: {page: Page; selector?: string; locator: Locator}) {
    super(options);

    this.locator = options.locator;
    this.titleLocator = `.CartItem__headerName__TZ09F`;
    this.totalPriceLocator = '.CartItem__headerPrice__3b3Ju';
    this.colorLocator = 'p:has-text("Колір") ~ p';
    this.sizeLocator = 'p:has-text("Розмір") ~ p';
    this.priceLocator = '.CartPrice__regularPrice__1c9hh';
    this.countLocator = '.QuantitySelectorTemplate__quantityValue__yu8oR';
    this.derceaseButtonLocator = 'button[aria-label="Зменшити кількість"]';
    this.increaseButtonLocator = 'button[aria-label="Змінити кількість"]';
    this.deleteButtonLocator = '.CartButtons__cartButtons__1r8A7 button:nth-child(1)';
    this.iconLocator = '.Image__cardImage__3eRwk';
  }

  get title(): Label {
    return new Label({page: this.page, selector: this.titleLocator, locator: this.locator });
  }

  get totalPrice(): Label {
    return new Label({page: this.page, selector:  this.totalPriceLocator, locator: this.locator });
  }

  get color(): Label {
    return new Label({page: this.page, selector: this.colorLocator, locator: this.locator });
  }

  get size(): Label {
    return new Label({page: this.page, selector: this.sizeLocator, locator: this.locator });
  }

  get price(): Label {
    return new Label({page: this.page, selector: this.priceLocator, locator: this.locator });
  }

  get count(): Label {
    return new Label({page: this.page, selector: this.countLocator, locator: this.locator });
  }

  get icon(): Icon {
    return new Icon({page: this.page, selector: this.iconLocator, locator: this.locator });
  }

  get increaseCount(): Button {
    return new Button({page: this.page, selector: this.increaseButtonLocator, locator: this.locator });
  }
  
  get decreaseCount(): Button {
    return new Button({page: this.page, selector: this.derceaseButtonLocator, locator: this.locator });
  }

  get delete(): Button {
    return new Button({page: this.page, selector: this.deleteButtonLocator, locator: this.locator });
  }
};