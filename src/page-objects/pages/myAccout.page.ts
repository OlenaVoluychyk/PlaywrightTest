import { BasePage } from './base.page';
import { Page } from 'playwright';
import { Label } from '../elements';
import { ROUTES } from '../../data/constants';

export class MyAccountPage extends BasePage {

  private readonly titleLocator: string;

  constructor(page: Page) {
    super(page, ROUTES.MY_ACCOUNT_PAGE);
    this.titleLocator = 'h4:has-text("Персональні дані")';
  }

  get title (): Label {
    return new Label({ page: this.page, selector: this.titleLocator });
  }
};