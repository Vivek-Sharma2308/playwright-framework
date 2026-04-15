import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '@pages/LoginPage';
import { SearchPage } from '@pages/SearchPage';
import { CartPage } from '@pages/CartPage';
import { BasePage } from '@pages/BasePage';
import { user } from '@data/userData';
import { Locators } from '@utils/selectors';  // Use Object Repository

let basePage: BasePage;
let loginPage: LoginPage;
let searchPage: SearchPage;
let cartPage: CartPage;
let initialCount: number;

Given('I am logged into Amazon', async function () {
  const page = this.page; // Access Playwright's page object from the Cucumber context  
  basePage = new BasePage(page);
  loginPage = new LoginPage(page);
  searchPage = new SearchPage(page);
  cartPage = new CartPage(page);

  await basePage.navigate(user.user.url);
  await loginPage.clickSignIn();
  await loginPage.loginWithPassword(user.user.email, user.user.password);
  await expect(page).toHaveTitle(/Amazon/);
});

When('I search for {string}', async function (product: string) {
  await searchPage.searchProduct(product);
});

When('I open the first product matching {string}', async function (productPath: string) {
  const page = this.page;
  const context = page.context();  
  const productPage = await searchPage.openFirstProduct(context, Locators.productLink(productPath));
  await productPage.bringToFront();
});

When('I add the product to cart', async function () {
  const page = this.page;  
  initialCount = await cartPage.getCartCount();
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await page.bringToFront();
});

Then('the cart count should increase', async function () {
  const newCount = await cartPage.waitForCartUpdate(initialCount);
  expect(newCount).toBeGreaterThan(initialCount);
  // Cleanup
  await cartPage.openCart();
  await cartPage.deleteItem();
});