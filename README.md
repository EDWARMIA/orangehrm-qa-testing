\# OrangeHRM QA Testing



Proyecto de pruebas realizado sobre OrangeHRM Demo, trabajando principalmente los módulos de Login y PIM (gestión de empleados).



Durante el proyecto realicé pruebas manuales, pruebas de API y automatización de algunos de los principales flujos del sistema.



\## Pruebas realizadas



\### Login



Se probaron escenarios como:



\- Inicio de sesión correcto e incorrecto.

\- Campos obligatorios.

\- Usuario no registrado.

\- Uso de espacios y caracteres especiales.

\- Comportamiento del username con mayúsculas y minúsculas.



\### PIM



Las pruebas se enfocaron en el flujo de empleados:



\- Crear empleado.

\- Buscar empleado por nombre e ID.

\- Editar información.

\- Verificar que los cambios se guarden.

\- Eliminar empleado.

\- Validar campos obligatorios.



Los casos completos se encuentran en `test-cases/`.



\## API



Utilicé DevTools para revisar las peticiones que realiza OrangeHRM y Postman para probar algunos endpoints del módulo PIM.



Se probaron:



| Método | Prueba | Respuesta |

|---|---|---|

| GET | Lista de empleados | 200 |

| GET | Empleado por ID | 200 |

| POST | Crear empleado | 200 |

| POST | Crear sin campos obligatorios | 422 |

| GET | ID de empleado inexistente | 422 |



En Postman también se agregaron validaciones para comprobar el status code y algunos datos de las respuestas JSON.



Las pruebas utilizaron la sesión de OrangeHRM, por lo que no se guardaron cookies en el repositorio.



\## Automatización



Para la automatización utilicé Playwright con TypeScript.



Se automatizaron 5 casos:



\- Login correcto.

\- Crear empleado.

\- Crear y buscar empleado.

\- Editar empleado y comprobar el cambio.

\- Eliminar empleado y comprobar que ya no aparezca.



Resultado de la última ejecución:



\*\*5 tests ejecutados - 5 PASS\*\*



Para organizar el código utilicé Page Object Model, separando las páginas, los datos de prueba y los tests.



\## Herramientas



\- Excel

\- Gherkin

\- Chrome DevTools

\- Postman

\- Playwright

\- TypeScript

\- Git y GitHub



\## Estructura



```text

OrangeHRM-QA-Testing/

│

├── automation/

│   └── playwright/

│       ├── pages/

│       ├── test-data/

│       ├── tests/

│       ├── package.json

│       ├── package-lock.json

│       └── playwright.config.ts

│

├── docs/

├── evidence/

│   ├── pim-manual/

│   ├── devtools/

│   ├── postman/

│   └── playwright/

│

├── gherkin/

│   ├── login.feature

│   └── pim.feature

│

├── test-cases/

├── .gitignore

└── README.md

```



\## Ejecutar la automatización



Entrar a la carpeta:



```bash

cd automation/playwright

```



Instalar dependencias:



```bash

npm install

```



Instalar Chromium:



```bash

npx playwright install chromium

```



Ejecutar:



```bash

npx playwright test

```



Ver reporte:



```bash

npx playwright show-report

```



> OrangeHRM Demo es un entorno público. Los tests están configurados con un solo worker para evitar problemas al realizar varias operaciones al mismo tiempo sobre la demo.



\## Resultado



En las pruebas manuales se ejecutaron 19 casos de Login y PIM, todos con resultado PASS.



En la automatización se ejecutaron 5 casos E2E, también con resultado PASS.



No se registraron bugs confirmados durante esta ejecución. Las evidencias de las pruebas están disponibles en la carpeta `evidence/`.
Autor:Edwar Mia Aguirre

