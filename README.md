# OrangeHRM QA Testing

Proyecto de pruebas realizado sobre OrangeHRM Demo, enfocado principalmente en los módulos de Login y PIM.

Trabajé pruebas manuales, revisión de peticiones HTTP, pruebas de API y automatización de los principales flujos de empleados.

## Alcance

En Login probé inicio de sesión correcto e incorrecto, campos obligatorios, credenciales no válidas y algunos escenarios con espacios, mayúsculas y caracteres especiales.

En PIM trabajé los siguientes flujos:

- Registro de empleados
- Búsqueda por nombre e ID
- Edición de información
- Validación de cambios guardados
- Eliminación de empleados
- Validación de campos obligatorios

Los casos de prueba completos están en la carpeta `test-cases`.

## Pruebas manuales

Se ejecutaron 19 casos de prueba:

- Login: 10 casos
- PIM: 9 casos
- Resultado: 19 PASS / 0 FAIL

No registré bugs confirmados durante esta ejecución. Algunos comportamientos encontrados quedaron documentados como observaciones porque no tenía un requisito que permitiera considerarlos defectos.

## API

Primero utilicé DevTools para revisar las peticiones que realiza OrangeHRM en el módulo PIM.

Después probé algunos de esos endpoints manualmente con Postman.

Las pruebas realizadas fueron:

- GET de la lista de empleados → 200 OK
- GET de un empleado existente → 200 OK
- POST para crear un empleado → 200 OK
- POST sin campos obligatorios → 422
- GET con un ID inexistente → 422

También agregué assertions en Postman para comprobar el código de respuesta y algunos datos del JSON.

Para las peticiones utilicé la sesión de OrangeHRM. No se incluyeron cookies de sesión en el repositorio.

## Automatización

La automatización fue realizada con Playwright y TypeScript.

Automatizé estos flujos:

- Login con credenciales válidas
- Crear empleado
- Crear y buscar empleado
- Editar empleado y comprobar que el cambio se guarde
- Eliminar empleado y comprobar que ya no aparezca

Resultado de la última ejecución: **5/5 tests PASS**.

Para organizar el proyecto utilicé Page Object Model, separando las acciones de Login y PIM de los archivos de pruebas. Los datos utilizados por los tests también se encuentran en un archivo independiente.

## Herramientas utilizadas

- Excel
- Gherkin
- Chrome DevTools
- Postman
- Playwright
- TypeScript
- Git
- GitHub

## Estructura del repositorio

`automation/playwright/` contiene la automatización con Playwright.

`test-cases/` contiene los casos de prueba manuales.

`gherkin/` contiene los escenarios escritos en Gherkin.

`evidence/` contiene las capturas de las pruebas manuales, DevTools, Postman y Playwright.

`docs/` contiene el informe final del proyecto.

## Ejecutar las pruebas

Entrar a la carpeta de automatización:

```bash
cd automation/playwright
```

Instalar las dependencias:

```bash
npm install
```

Instalar Chromium:

```bash
npx playwright install chromium
```

Ejecutar los tests:

```bash
npx playwright test
```

Ver el reporte:

```bash
npx playwright show-report
```

## Nota

OrangeHRM Demo es un entorno público compartido. Por este motivo configuré Playwright para ejecutar las pruebas con un solo worker y reducir problemas al realizar varias operaciones al mismo tiempo.
