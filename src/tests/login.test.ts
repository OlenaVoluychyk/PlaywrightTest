import { Page } from 'playwright';
import { Initializer } from '../helpers';
import { LoginPage, MyAccountPage } from '../page-objects/pages';
import { CREDS, INVALID_CREDS, MESSAGES, ROUTES } from '../data/constants'; 


describe('Login suite', () => {
  const initialazer = new Initializer();
  let page: Page;
  let loginPage: LoginPage;
  let myAccountPage: MyAccountPage;

  beforeAll(async() => {
    page = await initialazer.initPage();
    loginPage = new LoginPage(page);
    await loginPage.navigateTo();
  });

  afterAll(async () => {
    await initialazer.closeAllPages();
  });
  
  describe('Test #1: Login with invalid username', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: INVALID_CREDS.username,
        password: CREDS.password
      });
      await loginPage.notification.waitForVisible(); 
    });

    test('verify that error message is visible', async () => {
      expect(await loginPage.notification.isVisible()).toBe(true);
    });

    test('verify error message text', async () => {
      expect(await loginPage.notification.getText()).toEqual(MESSAGES.LOGIN_ERROR);
    });

    test('verify username input error message', async () => {
      expect(await loginPage.usernameError.getText()).toEqual(MESSAGES.LOGIN_INPUT_ERROR);
    });

    test('verify password input error message', async () => {
      expect(await loginPage.passwordError.getText()).toEqual(MESSAGES.LOGIN_INPUT_ERROR);
    });

    test('verify my account page is not opened', async () => {
      expect(await loginPage.getCurrentUrl()).toContain(ROUTES.LOGIN_PAGE);
    })
  });

  describe('Test #2: Login with invalid password', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: CREDS.username,
        password: INVALID_CREDS.password
      });
      await loginPage.notification.waitForVisible(); 
    });

    test('verify that error message is visible', async () => {
      expect(await loginPage.notification.isVisible()).toBe(true);
    });

    test('verify error message text', async () => {
      expect(await loginPage.notification.getText()).toEqual(MESSAGES.LOGIN_ERROR);
    })

    test('verify username input error message', async () => {
      expect(await loginPage.usernameError.getText()).toEqual(MESSAGES.LOGIN_INPUT_ERROR);
    });

    test('verify password input error message', async () => {
      expect(await loginPage.passwordError.getText()).toEqual(MESSAGES.LOGIN_INPUT_ERROR);
    });
  }); 

  describe('Test #3: Login with empty username', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: '',
        password: CREDS.password
      });
      await loginPage.password.click({ force: true })
    });

    test('verify that username input is highlighted', async () => {
      expect(await loginPage.username.isHighlighted()).toBe(true);
    })

    test('verify username input error message', async () => {
      expect(await loginPage.usernameError.getText()).toEqual(MESSAGES.LOGIN_EMPTY_INPUT);
    });
  }); 

  describe('Test #4: Login with empty password', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: CREDS.username,
        password: ''
      });
      await loginPage.username.click({ force: true })
    });

    test('verify that username input is highlighted', async () => {
      expect(await loginPage.password.isHighlighted()).toBe(true);
    })

    test('verify password input error message', async () => {
      expect(await loginPage.passwordError.getText()).toEqual(MESSAGES.LOGIN_EMPTY_INPUT);
    });
  }); 

  describe('Test #5: Login with empty password', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: CREDS.username,
        password: ''
      });
      await loginPage.username.click({ force: true })
    });

    test('verify that username input is highlighted', async () => {
      expect(await loginPage.password.isHighlighted()).toBe(true);
    })
  }); 
  
  describe('Test #6: Login with valid credentials', () => {

    beforeAll(async() => {
      await loginPage.login({
        username: CREDS.username,
        password: CREDS.password
      });
      myAccountPage = new MyAccountPage(page);
      await myAccountPage.title.waitForVisible();
    });

    test('verify My Account page is opened', async () => {
      expect(await myAccountPage.getCurrentUrl()).toContain(ROUTES.MY_ACCOUNT_PAGE);
    });

    test('verify My Accout Title', async () => {
      expect(await myAccountPage.title.getText()).toBe('Персональні дані');
    })
  }); 
});
