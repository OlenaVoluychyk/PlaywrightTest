import { BasePage } from './base.page';
import { Page } from 'playwright';
import { Input, Button, Label } from '../elements';
import { Credentials } from '../../data/interfaces'
import { ROUTES } from '../../data/constants';

export class LoginPage extends BasePage {

  private readonly usernameInputLocator: string;
  private readonly passwordInputLocator: string;
  private readonly enterButtonLocator: string;
  private readonly usernameFieldErrorLocator: string;
  private readonly passwordFieldErrorLocator: string;
  
  constructor(page: Page) {
    super(page, ROUTES.LOGIN_PAGE);
    this.usernameInputLocator = '#_username';
    this.passwordInputLocator = '#_password';
    this.enterButtonLocator = 'form button.btn--fluid';
    this.usernameFieldErrorLocator = 'form > div:nth-child(1) > .fieldError';
    this.passwordFieldErrorLocator = 'form > div:nth-child(2) > .fieldError';
  }

  get username(): Input {
    return new Input({ page: this.page, selector: this.usernameInputLocator });
  }

  get password(): Input {
    return new Input({ page: this.page, selector: this.passwordInputLocator });
  }

  get enterButton(): Button {
    return new Button({ page: this.page, selector: this.enterButtonLocator });
  }

  get usernameError(): Label {
    return new Label({ page: this.page, selector: this.usernameFieldErrorLocator });
  }

  get passwordError(): Label {
    return new Label({ page: this.page, selector: this.passwordFieldErrorLocator });
  };

  async login(creds: Credentials): Promise<void> {
    let { username, password } = creds;
    username = username ? username : '';
    password = password ? password : '';
    await this.username.fill(username);
    await this.password.fill(password);
    await this.enterButton.click();
  }
};