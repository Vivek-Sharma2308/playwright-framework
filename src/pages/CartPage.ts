// src/pages/CartPage.ts
//import { Page } from '@playwright/test';

import { Locators } from '@utils/selectors';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  //constructor(private page: Page) {}

  async getCartCount(): Promise<number> {
    const cartText = await this.page
      .locator(Locators.cartItemsNumber)
      .getAttribute('aria-label');

    console.log("The new cart value is : ", cartText);

    let count = cartText?.split(' ')[0] ?? '0';
    return parseInt(count);
  }

   async waitForCartUpdate(initialCount: number, maxRetries = 5): Promise<number> {

    let currentCount = initialCount;

    for (let i = 0; i < maxRetries; i++) {

      await this.page.reload({ waitUntil: 'domcontentloaded' });

      currentCount = await this.getCartCount();

      console.log(`Retry ${i + 1}: Cart count = ${currentCount}`);

      if (currentCount > initialCount) {
        return currentCount;
      }
    }

    throw new Error('Cart count did not update after retries');
  }

  async openCart() {
    await this.page.locator(Locators.cartItemsNumber).click();
  }

  async deleteItem() {
    await this.page.locator(Locators.deleteButton).first().click();
  }
}