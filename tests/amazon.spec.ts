// tests/amazon.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { SearchPage } from '../src/pages/SearchPage';
import { CartPage } from '../src/pages/CartPage';
import { user } from '../src/test-data/userData';

test('Amazon E2E Flow', async ({ page, context }) => {

  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const cartPage = new CartPage(page);

  await page.goto('https://www.amazon.in');

  // Login
  await loginPage.clickSignIn();
  await loginPage.login(user.email, user.password);

  await expect(page).toHaveTitle(/Amazon/);

  // Cart count before
  const initialCount = await cartPage.getCartCount();

  console.log("Initial cart count : ", initialCount);

  // Search & open product
  await searchPage.searchProduct('iphone 17 pro max 256gb');
  const productPage = await searchPage.openFirstProduct(context, "//h2[contains(@aria-label, '" + "Sponsored Ad - iPhone 17 Pro Max 256 GB: 17.42 cm (6.9″) Display with Promotion" + "')]");

  await productPage.bringToFront();
  
  await productPage.getByRole('button', { name: 'Add to cart'}).first().click();

  await page.waitForTimeout(5000);


  // Back to main page
  await page.bringToFront();

  await page.reload();

  //await page.waitForTimeout(5000);

  const newCount = await cartPage.getCartCount();

  console.log("new cart count : ", initialCount);

  expect(newCount).toBeGreaterThan(initialCount);

  // Cleanup
  await cartPage.openCart();
  await cartPage.deleteItem();
});