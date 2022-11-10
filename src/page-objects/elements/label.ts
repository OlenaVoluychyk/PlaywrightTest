import { BaseElement } from '.';
import { Page, Locator } from 'playwright'

export class Label extends BaseElement {

  constructor(options: {
    page: Page;
    selector?: string;  
    locator?: Locator;
  }) {
    super(options);
  }  

}