import { Page, expect } from '@playwright/test';

export class PimPage {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ============================================================
  // NAVEGACIÓN
  // ============================================================

  async goToPim() {
    await this.page.getByRole('link', { name: 'PIM' }).click();

    await expect(this.page).toHaveURL(/pim/);
  }

  async goToAddEmployee() {
    await this.page.getByRole('link', { name: 'Add Employee' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Add Employee' })
    ).toBeVisible({
      timeout: 10000
    });
  }

  async goToEmployeeList() {
    await this.page.getByRole('link', { name: 'Employee List' }).click();

    await expect(
      this.page.getByRole('heading', { name: 'Employee Information' })
    ).toBeVisible({
      timeout: 10000
    });
  }

  // ============================================================
  // CREAR EMPLEADO
  // ============================================================

  async createEmployee(
    firstName: string,
    middleName: string,
    lastName: string
  ) {

    await this.page
      .getByPlaceholder('First Name')
      .fill(firstName);

    await this.page
      .getByPlaceholder('Middle Name')
      .fill(middleName);

    await this.page
      .getByPlaceholder('Last Name')
      .fill(lastName);

    await this.page
      .getByRole('button', { name: 'Save' })
      .click();

    await this.page.waitForURL(
      /\/pim\/viewPersonalDetails\/empNumber\/\d+/,
      {
        timeout: 15000
      }
    );

    await expect(
      this.page.getByRole('heading', { name: 'Personal Details' })
    ).toBeVisible({
      timeout: 10000
    });
  }

  // ============================================================
  // BUSCAR EMPLEADO
  // ============================================================

  async searchEmployeeByName(
    firstName: string,
    lastName: string
  ) {

    const employeeName = this.page
      .locator('input[placeholder="Type for hints..."]')
      .first();

    await employeeName.fill(
      `${firstName} ${lastName}`
    );

    const autocomplete = this.page.locator(
      '.oxd-autocomplete-dropdown'
    );

    await expect(autocomplete).toBeVisible({
      timeout: 10000
    });

    await autocomplete
      .getByText(new RegExp(firstName, 'i'))
      .first()
      .click();

    await this.page
      .getByRole('button', { name: 'Search' })
      .click();

    await this.page.waitForLoadState('networkidle');
  }

  // ============================================================
  // RESULTADOS
  // ============================================================

  getEmployeeRows() {
    return this.page.locator(
      '.oxd-table-body .oxd-table-card'
    );
  }

  async verifyEmployeeInResults(
    firstName: string,
    lastName: string
  ) {

    const rows = this.getEmployeeRows();

    await expect(rows.first()).toBeVisible({
      timeout: 10000
    });

    await expect(rows.first()).toContainText(firstName);
    await expect(rows.first()).toContainText(lastName);
  }

  // ============================================================
  // EDITAR EMPLEADO
  // ============================================================

  async updateMiddleName(
    newMiddleName: string
  ) {

    const firstNameInput =
      this.page.getByPlaceholder('First Name');

    const middleNameInput =
      this.page.getByPlaceholder('Middle Name');

    const personalDetailsForm = this.page
      .locator('.oxd-form')
      .filter({
        has: firstNameInput
      });

    await middleNameInput.fill(newMiddleName);

    await personalDetailsForm
      .getByRole('button', { name: 'Save' })
      .click();

    await expect(
      this.page.getByText('Successfully Updated')
    ).toBeVisible({
      timeout: 10000
    });
  }

  async verifyMiddleName(
    expectedMiddleName: string
  ) {

    await expect(
      this.page.getByPlaceholder('Middle Name')
    ).toHaveValue(expectedMiddleName);
  }

  // ============================================================
  // ELIMINAR EMPLEADO
  // ============================================================

  async deleteFirstEmployeeFromResults() {

    const rows = this.getEmployeeRows();

    await expect(rows.first()).toBeVisible({
      timeout: 10000
    });

    const employeeRow = rows.first();

    await employeeRow
      .getByRole('button')
      .filter({
        has: this.page.locator('i.bi-trash')
      })
      .click();

    const deleteDialog =
      this.page.getByRole('dialog');

    await expect(deleteDialog).toBeVisible({
      timeout: 10000
    });

    await deleteDialog
      .getByRole('button', {
        name: /Yes, Delete/i
      })
      .click();

    await expect(
      this.page.getByText('Successfully Deleted')
    ).toBeVisible({
      timeout: 10000
    });
  }

  // ============================================================
  // RESET DE FILTROS
  // ============================================================

  async resetFilters() {
    await this.page
      .getByRole('button', { name: 'Reset' })
      .click();
  }

  // ============================================================
  // VERIFICAR QUE NO EXISTAN RESULTADOS
  // ============================================================

  async verifyNoEmployeeRows() {

    const rows = this.getEmployeeRows();

    await expect(rows).toHaveCount(0, {
      timeout: 10000
    });
  }
}