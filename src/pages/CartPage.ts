// src/pages/CartPage.ts
import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  async getCartCount(): Promise<number> {
    const cartText = await this.page
      .locator("//a[contains(@aria-label, 'items in cart')]")
      .getAttribute('aria-label');

    let count = cartText?.split(' ')[0] ?? '0';
    return parseInt(count);
  }

  async openCart() {
    await this.page.locator("//a[contains(@aria-label, 'items in cart')]").click();
  }

  async deleteItem() {
    await this.page.locator("//input[@value='Delete']").first().click();
  }
}