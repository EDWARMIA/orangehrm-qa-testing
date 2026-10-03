import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { PimPage } from '../pages/PimPage';
import { employees } from '../test-data/employees';


test.describe('OrangeHRM - PIM', () => {

  // ============================================================
  // AUTO-002 - CREAR EMPLEADO
  // ============================================================

  test('AUTO-002 - Crear empleado con datos válidos', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    const employee = employees.create;

    // Login
    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await loginPage.verifySuccessfulLogin();

    // PIM
    await pimPage.goToPim();

    // Add Employee
    await pimPage.goToAddEmployee();

    // Crear empleado
    await pimPage.createEmployee(
      employee.firstName,
      employee.middleName,
      employee.lastName
    );

  });


  // ============================================================
  // AUTO-003 - CREAR Y BUSCAR EMPLEADO
  // ============================================================

  test('AUTO-003 - Crear y buscar empleado registrado', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    const employee = employees.search;

    // Login
    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await loginPage.verifySuccessfulLogin();

    // PIM
    await pimPage.goToPim();

    // Crear empleado
    await pimPage.goToAddEmployee();

    await pimPage.createEmployee(
      employee.firstName,
      employee.middleName,
      employee.lastName
    );

    // Employee List
    await pimPage.goToEmployeeList();

    // Buscar empleado
    await pimPage.searchEmployeeByName(
      employee.firstName,
      employee.lastName
    );

    // Verificar resultado
    await pimPage.verifyEmployeeInResults(
      employee.firstName,
      employee.lastName
    );

  });


  // ============================================================
  // AUTO-004 - EDITAR EMPLEADO
  // ============================================================

  test('AUTO-004 - Editar empleado y verificar cambios', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    const employee = employees.update;

    // Login
    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await loginPage.verifySuccessfulLogin();

    // PIM
    await pimPage.goToPim();

    // Crear empleado
    await pimPage.goToAddEmployee();

    await pimPage.createEmployee(
      employee.firstName,
      employee.middleName,
      employee.lastName
    );

    // Validar datos originales
    await expect(
      page.getByPlaceholder('First Name')
    ).toHaveValue(employee.firstName);

    await expect(
      page.getByPlaceholder('Middle Name')
    ).toHaveValue(employee.middleName);

    await expect(
      page.getByPlaceholder('Last Name')
    ).toHaveValue(employee.lastName);

    // Modificar Middle Name
    await pimPage.updateMiddleName(
      employee.newMiddleName
    );

    // Recargar página
    await page.reload();

    await expect(
      page.getByRole('heading', {
        name: 'Personal Details'
      })
    ).toBeVisible({
      timeout: 10000
    });

    // Verificar persistencia
    await pimPage.verifyMiddleName(
      employee.newMiddleName
    );

  });


  // ============================================================
  // AUTO-005 - ELIMINAR EMPLEADO
  // ============================================================

  test('AUTO-005 - Eliminar empleado y verificar eliminación', async ({ page }) => {

    test.setTimeout(60000);

    const loginPage = new LoginPage(page);
    const pimPage = new PimPage(page);

    const employee = employees.delete;

    // Login
    await loginPage.goto();
    await loginPage.loginAsAdmin();
    await loginPage.verifySuccessfulLogin();

    // PIM
    await pimPage.goToPim();

    // Crear empleado
    await pimPage.goToAddEmployee();

    await pimPage.createEmployee(
      employee.firstName,
      employee.middleName,
      employee.lastName
    );

    // Employee List
    await pimPage.goToEmployeeList();

    // Buscar empleado
    await pimPage.searchEmployeeByName(
      employee.firstName,
      employee.lastName
    );

    // Verificar que existe
    await pimPage.verifyEmployeeInResults(
      employee.firstName,
      employee.lastName
    );

    // Eliminar empleado
    await pimPage.deleteFirstEmployeeFromResults();

    // Resetear filtros
    await pimPage.resetFilters();

    // Volver a escribir el empleado eliminado
    const employeeName = page
      .locator('input[placeholder="Type for hints..."]')
      .first();

    await employeeName.fill(
      `${employee.firstName} ${employee.lastName}`
    );

    await page.waitForTimeout(1500);

    // Buscar nuevamente
    await page
      .getByRole('button', { name: 'Search' })
      .click();

    await page.waitForLoadState('networkidle');

    // Confirmar que ya no existe
    await pimPage.verifyNoEmployeeRows();

  });

});