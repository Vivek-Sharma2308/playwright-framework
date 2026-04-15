// src/pages/LoginPage.ts
//import { Page } from '@playwright/test';

import { BasePage } from "./BasePage";
//import { Locators } from '@utils/locators';

export class LoginPage extends BasePage {
  //constructor(private page: Page) {}

  async clickSignIn() {
    await this.page.getByRole('link', { name: 'Account & Lists' }).click();
  }

  async loginWithKey(email: string) {
    await this.page.fill('#ap_email_login', email);
    await this.page.getByRole('button', { name: /Continue/ }).click();

  }

  async loginWithPassword(email: string, password: string) {
    await this.page.fill('#ap_email_login', email);
    await this.page.getByRole('button', { name: /Continue/ }).click();

    await this.page.keyboard.press('Escape');

    await this.page.fill('#ap_password', password);
    await this.page.getByRole('button', { name: /sign in/i }).click();
  }
}