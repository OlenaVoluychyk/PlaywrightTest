import {Page} from 'playwright';
import { ROUTES } from '../../data/constants';
import { Label } from '../elements';
import { BasePage } from './base.page';

export class CheckoutPage extends BasePage {
  
  private readonly checkoutHeaderLocator: string;

  constructor(page: Page) {
    super(page, ROUTES.CHECKOUT_PAGE);
    this.checkoutHeaderLocator = '.Stepper__stepperHeader__3uftm';
  }

  get checkoutHeader (): Label {
    return new Label({page: this.page, selector:  this.checkoutHeaderLocator });
  }
}