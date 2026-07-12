# Around The U.S.

## Descripción

Este proyecto es una página web interactiva desarrollada como parte del bloque de JavaScript y TypeScript del programa de desarrollo web de TripleTen.

A lo largo del proyecto se trabajó en la construcción de una interfaz dinámica que permite al usuario interactuar con el contenido, manipulando el DOM, gestionando ventanas modales, validando formularios en tiempo real y actualizando información sin recargar la página.

El proyecto se dividió en etapas progresivas: estructura base con JavaScript, interactividad con tarjetas, edición de perfil, validación de formularios, y finalmente una refactorización completa a **TypeScript** aplicando **Programación Orientada a Objetos (POO)**.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con metodología BEM
- TypeScript (tipado estático, interfaces, genéricos, clases)
- JavaScript (ES6+), módulos nativos (import/export)
- Programación Orientada a Objetos: encapsulación, herencia, polimorfismo
- Validación de formularios con la API ValidityState
- Git y GitHub

## Funcionalidades

- Renderizado dinámico de tarjetas a partir de un arreglo de datos tipado (`CardData[]`)
- Creación de elementos del DOM usando `template` y `cloneNode`
- Apertura y cierre de ventanas modales mediante una jerarquía de clases con herencia
- Edición del perfil del usuario mediante formulario, con relleno automático de los datos actuales
- Creación de nuevas tarjetas desde un formulario validado
- Eliminación de tarjetas desde la interfaz
- Sistema de "me gusta" en cada tarjeta con `classList.toggle()`
- Vista ampliada de la imagen de cada tarjeta en una ventana emergente
- Validación de formularios en tiempo real con mensajes de error personalizados y control del estado del botón de envío
- Las ventanas emergentes se cierran al hacer clic en el botón de cierre, al presionar la tecla Esc, o al hacer clic fuera del formulario — cada una con un comportamiento de limpieza de datos ajustado a la experiencia de usuario, controlado mediante un parámetro opcional en el método `close()`

## Arquitectura del proyecto

El proyecto está construido con Programación Orientada a Objetos, dividido en clases con responsabilidad única:

- **`FormValidator`** — encapsula toda la lógica de validación de formularios, configurable mediante un objeto de selectores y clases CSS.
- **`Card`** — construye una tarjeta individual a partir de una plantilla HTML, sin depender de dónde será insertada.
- **`Section<T>`** — clase genérica que renderiza cualquier lista de datos mediante una función `renderer` inyectada, sin conocer qué tipo de elemento maneja (acoplamiento débil).
- **`Popup`** — clase base para todas las ventanas modales, con apertura, cierre y eventos comunes (Esc, clic afuera, botón de cierre).
- **`PopupWithImage`** — hereda de `Popup`, sobrescribe `open()` para mostrar una imagen ampliada.
- **`PopupWithForm`** — hereda de `Popup`, sobrescribe `setEventListeners()` y `close()` para gestionar el envío y limpieza de formularios.
- **`UserInfo`** — encapsula la lectura y escritura de los datos de perfil visibles en pantalla.

Las clases se comunican entre sí mediante **funciones callback** inyectadas por parámetro (por ejemplo, `handleCardClick`, `handleFormSubmit`), evitando que una clase dependa directamente de otra — este acoplamiento débil permite que cada pieza sea reutilizable de forma independiente.

`index.ts` es la única pieza que conoce todas las clases a la vez: se encarga exclusivamente de instanciarlas, conectarlas y agregar los detectores de eventos de nivel superior.

### Estructura de carpetas

project-root/
public/ # HTML, CSS, imágenes y JS compilado (listo para el navegador)
src/
components/ # una clase por archivo (Card.ts, FormValidator.ts, Popup.ts, etc.)
types/
types.ts # interfaces y tipos compartidos del proyecto
utils/
constants.ts # configuración y datos constantes (defaultFormConfig, initialCards)
index.ts # módulo principal: instancia clases y define su interacción
tsconfig.json

## Lo aprendido

- Fundamentos de TypeScript: tipado explícito, interfaces, tipos de unión, genéricos (`<T>`)
- Programación Orientada a Objetos: clases, constructores, encapsulación (`private`/`protected`/`public`)
- Herencia con `extends` y `super()`, y polimorfismo mediante sobrescritura de métodos
- Diseño de acoplamiento débil entre clases mediante funciones callback
- Manipulación del DOM tipada (`querySelector`, casteo de tipos con `as`, aserciones no nulas)
- Migración gradual de un proyecto JavaScript existente a TypeScript sin romper su funcionalidad
- Separación de código en módulos (`src` vs `public`) y compilación con `tsc`
- Organización del código en clases de responsabilidad única, reemplazando funciones globales sueltas

## Estado del proyecto

- Proyecto migrado completamente a TypeScript con arquitectura POO
- Interactividad completa implementada y verificada tras la migración
- Modales funcionando correctamente (perfil, tarjetas e imagen), con herencia entre clases
- Validación de formularios completa y probada mediante la clase `FormValidator`
- Sin recarga de página para actualización de datos
- Compilación sin errores de TypeScript (`tsc`)

## Autor

Dara Rangel
