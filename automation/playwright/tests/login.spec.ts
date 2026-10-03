import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM - Login', () => {

  test('AUTO-001 - Login con credenciales válidas', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.loginAsAdmin();

    await loginPage.verifySuccessfulLogin();

  });

});