# language: es
Característica: Gestión de empleados

  Escenario: Registrar un nuevo empleado con datos válidos
    Dado que el administrador se encuentra en la página "Add Employee"
    Cuando ingresa "Edwar" en el campo "First Name"
    Y ingresa "QA" en el campo "Middle Name"
    Y ingresa "Test" en el campo "Last Name"
    Y hace clic en el botón "Save"
    Entonces el sistema debe registrar correctamente al empleado
    Y debe redirigir al administrador a la sección "Personal Details"

  Escenario: Intentar registrar un empleado sin campos obligatorios
    Dado que el administrador se encuentra en la página "Add Employee"
    Cuando ingresa "QA" en el campo "Middle Name"
    Y deja vacíos los campos "First Name" y "Last Name"
    Y hace clic en el botón "Save"
    Entonces el sistema no debe registrar al empleado
    Y debe mostrar "Required" en los campos "First Name" y "Last Name"
