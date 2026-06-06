# Around The U.S.

## Descripción

Este proyecto es una página web interactiva desarrollada como parte del Sprint 6 del programa de desarrollo web.

A lo largo del sprint se trabajó en la construcción de una interfaz dinámica que permite al usuario interactuar con el contenido mediante JavaScript, manipulando el DOM, gestionando ventanas modales y actualizando información en tiempo real sin recargar la página.

El proyecto se dividió en tres etapas progresivas: estructura base, interactividad con tarjetas y edición de perfil.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- Metodología BEM
- Git y GitHub

## Funcionalidades

- Renderizado dinámico de tarjetas a partir de un array de objetos (`initialCards`)
- Creación de elementos del DOM usando `template` y `cloneNode`
- Uso de `forEach()` para generar tarjetas iniciales
- Apertura y cierre de ventanas modales con funciones reutilizables
- Edición del perfil del usuario mediante formulario
- Relleno automático del formulario con datos actuales del perfil
- Creación de nuevas tarjetas desde un formulario
- Eliminación de tarjetas desde la interfaz
- Sistema de “like” en tarjetas con `classList.toggle()`
- Visualización de imágenes en popup (preview)
- Manejo de eventos con `addEventListener()`
- Manejo de formularios con `submit`
- Prevención de recarga con `preventDefault()`
- Actualización del DOM con `textContent` y `value`

## Arquitectura del proyecto

- Código organizado en:
  - Selectores del DOM
  - Funciones reutilizables
  - Event listeners
- Funciones genéricas para abrir y cerrar modales
- Tarjetas generadas como componentes reutilizables
- Flujo de datos desde inputs hacia el DOM

## Lo aprendido

- Manipulación del DOM en JavaScript
- Trabajo con arrays y objetos
- Iteración con `forEach()`
- Creación y clonación de nodos del DOM
- Manejo de eventos del usuario
- Uso de modales y control de su estado
- Prevención de comportamiento por defecto en formularios
- Actualización dinámica de contenido sin recargar la página
- Organización del código en funciones reutilizables

## Estado del proyecto

- Proyecto funcional y listo para entrega
- Interactividad completa implementada
- Modales funcionando correctamente (perfil, tarjetas e imagen)
- Sin recarga de página para actualización de datos

## Autor

Dara Rangel
