import { Page, expect } from '@playwright/test';

export class LoginPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
  }

  async login(username: string, password: string) {
    await this.page.getByPlaceholder('Username').fill(username);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async loginAsAdmin() {
    await this.login('Admin', 'admin123');
  }

  async verifySuccessfulLogin() {
    await expect(this.page).toHaveURL(/dashboard/);

    await expect(
      this.page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  }
}