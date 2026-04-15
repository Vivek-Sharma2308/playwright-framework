// src/pages/SearchPage.ts
//import { Page } from '@playwright/test';

import { BasePage } from './BasePage';

export class SearchPage extends BasePage{
  //constructor(private page: Page) {}

  async searchProduct(product: string) {
    await this.page.getByLabel(/Search Amazon.in/).click();
    await this.page.fill('#twotabsearchtextbox', product);
    await this.page.keyboard.press('Enter');
  }

  async openFirstProduct(context: any, product: string) {
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      this.page.locator(product).first().click()
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }
}