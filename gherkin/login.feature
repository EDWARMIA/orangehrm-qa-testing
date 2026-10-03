# language: es
Característica: Inicio de sesión

  Escenario: Inicio de sesión con credenciales válidas
    Dado que el usuario se encuentra en la página de inicio de sesión de OrangeHRM
    Y existe un usuario administrador activo
    Cuando ingresa "Admin" en el campo "Username"
    Y ingresa "admin123" en el campo "Password"
    Y hace clic en el botón "Login"
    Entonces el sistema debe autenticar al usuario correctamente
    Y debe redirigirlo al Dashboard principal

  Escenario: Inicio de sesión con credenciales inválidas
    Dado que el usuario se encuentra en la página de inicio de sesión de OrangeHRM
    Cuando ingresa "Admin99" en el campo "Username"
    Y ingresa "contra" en el campo "Password"
    Y hace clic en el botón "Login"
    Entonces el sistema debe impedir el inicio de sesión
    Y debe mostrar el mensaje "Invalid credentials"
    Y debe mantener al usuario en la página de inicio de sesión
