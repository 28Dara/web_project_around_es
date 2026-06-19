# Around The U.S.

## Descripción

Este proyecto es una página web interactiva desarrollada como parte del bloque de JavaScript del programa de desarrollo web de TripleTen.

A lo largo del proyecto se trabajó en la construcción de una interfaz dinámica que permite al usuario interactuar con el contenido mediante JavaScript, manipulando el DOM, gestionando ventanas modales, validando formularios en tiempo real y actualizando información sin recargar la página.

El proyecto se dividió en etapas progresivas: estructura base, interactividad con tarjetas, edición de perfil, y validación de formularios.

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con metodología BEM
- JavaScript (ES6+), módulos nativos (import/export)
- Validación de formularios con la API ValidityState
- Git y GitHub

## Funcionalidades

- Renderizado dinámico de tarjetas a partir de un arreglo de objetos (`initialCards`)
- Creación de elementos del DOM usando `template` y `cloneNode`
- Apertura y cierre de ventanas modales con funciones reutilizables
- Edición del perfil del usuario mediante formulario, con relleno automático de los datos actuales
- Creación de nuevas tarjetas desde un formulario validado
- Eliminación de tarjetas desde la interfaz
- Sistema de "me gusta" en cada tarjeta con `classList.toggle()`
- Vista ampliada de la imagen de cada tarjeta en una ventana emergente
- Validación de formularios en tiempo real con mensajes de error personalizados y control del estado del botón de envío
- Las ventanas emergentes se cierran al hacer clic en el botón de cierre, al presionar la tecla Esc, o al hacer clic fuera del formulario — cada una con un comportamiento de limpieza de datos ajustado a la experiencia de usuario

## Arquitectura del proyecto

- Código organizado en: selectores del DOM, funciones reutilizables, y event listeners
- Funciones genéricas para abrir y cerrar modales
- Tarjetas generadas como componentes reutilizables
- Lógica de validación separada en su propio módulo (`validate.js`)
- Flujo de datos desde inputs hacia el DOM

### Estructura de carpetas

- `blocks/` — estilos CSS organizados por bloque BEM
- `images/` — recursos gráficos del proyecto
- `pages/` — archivo CSS principal que importa todos los bloques
- `scripts/` — lógica de JavaScript (`index.js`, `validate.js`)
- `vendor/` — normalize.css y fuentes tipográficas

## Lo aprendido

- Manipulación del DOM en JavaScript
- Creación y clonación de nodos del DOM
- Manejo de eventos del usuario y delegación de comportamiento mediante funciones flecha
- Uso de modales y control de su estado entre distintos puntos de cierre
- Validación de formularios con ValidityState y diseño de UX alrededor de la pérdida de datos
- Prevención de comportamiento por defecto en formularios
- Organización del código en funciones reutilizables de responsabilidad única

## Estado del proyecto

- Proyecto funcional y listo para entrega
- Interactividad completa implementada
- Modales funcionando correctamente (perfil, tarjetas e imagen)
- Validación de formularios completa y probada
- Sin recarga de página para actualización de datos

## Autor

Dara Rangel
