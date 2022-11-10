import { BaseElement, Icon } from '../elements';
import { Page} from 'playwright'


export class HeaderFragment extends BaseElement {
  
  private readonly userIconLocator: string;

  constructor(options: { page: Page; selector?: string}) {
    const headerSelector = options.selector ? options.selector : '.appHeader';
    super({
      page: options.page,
      selector: headerSelector
    })
    this.userIconLocator = '[data-test="answear_club_icon"]';
  }

  get userIcon(): Icon {
    return new Icon({ page: this.page, selector: this.userIconLocator });
  }
}