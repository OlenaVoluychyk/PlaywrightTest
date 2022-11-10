import { Page } from 'playwright';
import { CartPage, CheckoutPage } from '../page-objects/pages';
import { CREDS, MESSAGES, ROUTES } from '../data/constants'; 
import { Initializer, CartHelper, ProductHelper } from '../helpers';
import { CartItemFragment } from '../page-objects/fragments';
import { CartItemResponse } from '../data/interfaces'


describe('Check the cart suite', () => {
  const initialazer = new Initializer();
  const cartHelper = new CartHelper();
  const productHelper = new ProductHelper();
  const productCount = 2;

  let page: Page;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;
  let items: CartItemResponse[];
  let firstItem: CartItemFragment;
  let secondItem: CartItemFragment;
  let notificationMessage: string;

  beforeAll(async() => {
    // initialize
    page = await initialazer.initPage();
    await initialazer.login(CREDS);
    const productsId = await productHelper.getProductsIdByCount(productCount);
    for(const prodId of productsId) {
      await cartHelper.AddToCart({productVariationId: prodId});
    }
    items = (await cartHelper.getCartItems()).data.cart.items;
    // Act 
    cartPage = new CartPage(page); 
    await cartPage.navigateTo();
    await cartPage.title.waitForVisible();
    firstItem = await cartPage.getCartItemByIndex(0);
    
  });

  afterAll(async () => {
    await cartHelper.clearCart();
    await initialazer.closeAllPages();
  });
  
  test('Step #1 verify that Cart page is opened', async () => {
      expect(await cartPage.title.isVisible()).toBe(true);
    });

  test('Step #1 verify that items is added to the cart', async () => {
    const itemsCount = (await cartPage.itemsFragments()).length;
    expect(itemsCount).toEqual(productCount);
  });

  test('Step #1 Step #1 verify that item title is correct',async () => {
    expect(await firstItem.title.getText()).toEqual(items[1].name);
  });

  test('Step #1 verify that item price is correct', async () => {
    expect(await firstItem.price.getText()).toEqual(`${items[1].price} грн`);
  })

  test('Step #1 verify that item color value is correct', async () => {
    expect(await firstItem.color.getText()).toEqual(items[1].color.name);
  });

  test('Step #1 verify that item size is correct', async() => {
    expect(await firstItem.size.getText()).toEqual(items[1].size);
  });

  test('Step #1 verify that item total price is correct', async () => {
    expect(await firstItem.totalPrice.getText()).toEqual(`${items[1].totalPrice} грн`);
  });

  test('Step #1 verify that item quantity is correct', async () => {
    expect(await firstItem.count.getText()).toEqual(`${items[1].quantity}`);
  });

  test('Step #1 verify that delete button is displayed', async() => {
    expect(await firstItem.delete.isVisible()).toBe(true);
  })

  test('Step #1 verify that item icon is displayed', async() => {
      expect(await firstItem.icon.isVisible()).toBe(true);
  });

  test('Step #2 verify that success natification is displayed', async() => {
    secondItem = await cartPage.getCartItemByIndex(1);
    await secondItem.delete.click();
    await cartPage.notification.waitForVisible();
    notificationMessage = await cartPage.notification.getText();
    expect(await cartPage.notification.isVisible()).toBe(true);
  });
  
  test('Step #2 verify success message text', async() => {
    expect(notificationMessage).toEqual(MESSAGES.DELETED_ITEM);
  });
  
  test('Step #2 verify the amount of items in the cart', async() => {
    expect((await cartPage.itemsFragments()).length).toEqual(1);
  });

  test('Step #3 verify that success notification is displayed', async() => {
    await cartPage.notification.waitForAbsance();
    await firstItem.increaseCount.click();
    await cartPage.notification.waitForVisible();
    notificationMessage = await cartPage.notification.getText();
    expect(await cartPage.notification.isVisible()).toBe(true);
  });

  test('Step #3 verify that success notification text', async() => {
    expect(notificationMessage).toEqual(MESSAGES.UPDATE_COUNT);
  });

  test('Step #3 verify that quantity is increased', async() => {
    const expectedQuantity = items[1].quantity + 1;
    expect(await firstItem.count.getText()).toEqual(`${expectedQuantity}`);
  });

  test('Step #3 verify that "-" button is enebled', async() => {
    expect(await firstItem.decreaseCount.isDesabled()).toBe(false);
  });

  test('Step #3 verify that total price is updated', async() => {
    expect(await firstItem.totalPrice.getText()).toEqual(`${items[1].totalPrice * 2} грн`);
  })

  test('Step #4 verify that checkout page is opened', async() => {
    await cartPage.buyButton.click();
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.checkoutHeader.waitForVisible();
    expect(await cartPage.getCurrentUrl()).toContain(ROUTES.CHECKOUT_PAGE);
  });
});
