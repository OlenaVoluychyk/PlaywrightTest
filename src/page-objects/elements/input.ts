import { BaseElement } from '.';
import { Page, Locator } from 'playwright' 
import { COLORS } from '../../data/constants';

export class Input extends BaseElement {

  constructor(options: {
    page: Page;
    selector?: string; 
    locator?: Locator;
  }) {
    super(options);
  } 
  
  async fill(valueText: string): Promise<void> {
    await this.waitForVisible(5000);
    await this.element.fill(valueText);
  }

  async getValue(): Promise<string | null | undefined> {
    await this.waitForVisible(500);
    return this.element.inputValue();
  }

  async isHighlighted (style = 'borderColor'): Promise<boolean> {
    const styles = await this.getStyles();
    return styles[style].includes(COLORS.HIGHLIGHTED_INPUT);
  }
}