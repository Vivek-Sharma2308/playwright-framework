// src/pages/LoginPage.ts
import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async clickSignIn() {
    await this.page.getByRole('link', { name: 'Account & Lists' }).click();
  }

  async login(email: string, password: string) {
    await this.page.fill('#ap_email_login', email);
    await this.page.getByRole('button', { name: /Continue/ }).click();

    await this.page.fill('#ap_password', password);
    await this.page.getByRole('button', { name: /sign in/i }).click();
  }
}