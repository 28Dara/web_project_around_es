# Around The U.S.

## Descripción

Este proyecto es una página web interactiva desarrollada como parte del bloque de JavaScript y TypeScript del programa de desarrollo web de TripleTen.

La aplicación permite al usuario interactuar con contenido dinámico: crear, dar "me gusta" y eliminar tarjetas de lugares, editar su perfil y cambiar su foto de avatar — todo esto sincronizado en tiempo real con un servidor remoto, sin recargar la página.

El proyecto se dividió en etapas progresivas: estructura base con JavaScript, interactividad con tarjetas, edición de perfil, validación de formularios, refactorización completa a **TypeScript** con **Programación Orientada a Objetos (POO)**, y finalmente **integración con una API REST** para persistir todos los datos en un servidor.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con metodología BEM
- TypeScript (tipado estático, interfaces, genéricos, clases)
- JavaScript (ES6+), módulos nativos (import/export)
- Programación Orientada a Objetos: encapsulación, herencia, polimorfismo
- Validación de formularios con la API ValidityState
- API REST (fetch, async/await, manejo de respuestas y errores)
- Git y GitHub

## Funcionalidades

- Carga de la información del usuario y de las tarjetas desde el servidor al iniciar la página
- Renderizado dinámico de tarjetas a partir de un arreglo de datos tipado (`CardData[]`), solo después de recibir la id del usuario
- Creación de elementos del DOM usando `template` y `cloneNode`
- Creación de nuevas tarjetas mediante un formulario validado, persistida en el servidor
- Eliminación de tarjetas con ventana emergente de confirmación previa
- El ícono de eliminar solo aparece en las tarjetas que pertenecen al usuario actual
- Sistema de "me gusta" funcional y sincronizado con el servidor (`isLiked` real)
- Edición del perfil del usuario (nombre y descripción), guardada en el servidor
- Cambio de foto de perfil (avatar) mediante formulario, con overlay de edición al pasar el cursor
- Texto del botón cambia a "Guardando..." (o "Creando...") mientras la solicitud está en curso
- Vista ampliada de la imagen de cada tarjeta en una ventana emergente
- Validación de formularios en tiempo real con mensajes de error personalizados y control del estado del botón de envío
- Las ventanas emergentes se cierran al hacer clic en el botón de cierre, al presionar la tecla Esc, o al hacer clic fuera del formulario — cada una con un comportamiento de limpieza de datos ajustado a la experiencia de usuario, controlado mediante un parámetro opcional en el método `close()`
- Manejo de errores de red con bloques `try...catch` en todas las solicitudes al servidor

## Arquitectura del proyecto

El proyecto está construido con Programación Orientada a Objetos, dividido en clases con responsabilidad única:

- **`Api`** — encapsula todas las solicitudes al servidor (obtener usuario y tarjetas, editar perfil, agregar/eliminar tarjetas, dar/quitar "me gusta", actualizar avatar). Ninguna otra clase realiza solicitudes HTTP directamente.
- **`FormValidator`** — encapsula toda la lógica de validación de formularios, configurable mediante un objeto de selectores y clases CSS.
- **`Card`** — construye una tarjeta individual a partir de una plantilla HTML, determina si el usuario actual es el dueño (para mostrar/ocultar el botón de eliminar) y refleja su estado real de "me gusta".
- **`Section<T>`** — clase genérica que renderiza cualquier lista de datos mediante una función `renderer` inyectada, sin conocer qué tipo de elemento maneja (acoplamiento débil).
- **`Popup`** — clase base para todas las ventanas modales, con apertura, cierre y eventos comunes (Esc, clic afuera, botón de cierre).
- **`PopupWithImage`** — hereda de `Popup`, sobrescribe `open()` para mostrar una imagen ampliada.
- **`PopupWithForm`** — hereda de `Popup`, sobrescribe `setEventListeners()` y `close()` para gestionar el envío y limpieza de formularios.
- **`PopupWithConfirmation`** — hereda de `Popup`, muestra un cuadro de confirmación reutilizable antes de eliminar una tarjeta; su acción de confirmación se asigna dinámicamente mediante `setSubmitAction()`.
- **`UserInfo`** — encapsula la lectura y escritura de los datos de perfil (nombre, descripción y avatar) visibles en pantalla.

Las clases se comunican entre sí mediante **funciones callback** inyectadas por parámetro (por ejemplo, `handleCardClick`, `handleCardDelete`, `handleCardLike`, `handleFormSubmit`), evitando que una clase dependa directamente de otra — este acoplamiento débil permite que cada pieza sea reutilizable de forma independiente.

`index.ts` es la única pieza que conoce todas las clases a la vez: se encarga de instanciar la `Api`, cargar los datos iniciales del servidor, conectar las clases entre sí y agregar los detectores de eventos de nivel superior.

### Estructura de carpetas

project-root/
public/ # HTML, CSS, imágenes y JS compilado (listo para el navegador)
src/
components/ # una clase por archivo (Api.ts, Card.ts, FormValidator.ts, Popup.ts, etc.)
types/
types.ts # interfaces y tipos compartidos del proyecto
utils/
constants.ts # configuración y datos constantes (defaultFormConfig, apiConfig)
index.ts # módulo principal: instancia clases, carga datos del servidor y define su interacción
tsconfig.json

## Lo aprendido

- Consumo de una API REST con `fetch`, `async/await` y manejo de respuestas (`res.ok`, `throw new Error`)
- Separación de tipos entre datos enviados (formularios) y datos recibidos (respuestas del servidor)
- Centralización de solicitudes HTTP en un método reutilizable (`sendRequest`) para evitar código duplicado
- Sincronización de estado local con datos remotos (likes, avatar, perfil) sin recargar la página
- Fundamentos de TypeScript: tipado explícito, interfaces, tipos de unión, genéricos (`<T>`)
- Programación Orientada a Objetos: clases, constructores, encapsulación (`private`/`protected`/`public`)
- Herencia con `extends` y `super()`, y polimorfismo mediante sobrescritura de métodos
- Diseño de acoplamiento débil entre clases mediante funciones callback
- Manipulación del DOM tipada (`querySelector`, casteo de tipos con `as`, aserciones no nulas)
- Organización del código en clases de responsabilidad única, reemplazando funciones globales sueltas

## Estado del proyecto

- Integración completa con la API REST (`https://around-api.es.tripleten-services.com/v1`)
- Carga inicial de usuario y tarjetas desde el servidor mediante `Promise.all()`
- Creación, eliminación y "me gusta" de tarjetas sincronizados con el servidor
- Edición de perfil y actualización de avatar persistidas en el servidor
- Ventana de confirmación antes de eliminar una tarjeta
- Validación de formularios completa y probada mediante la clase `FormValidator`
- Manejo de errores de red en todas las solicitudes (`try...catch`)
- Compilación sin errores de TypeScript (`tsc`)

## Autor

Dara Rangel
