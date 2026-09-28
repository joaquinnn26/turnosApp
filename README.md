# TurnoApp

Proyecto de React Native — Fernandez Joaquin.

App para consultar turnos de la cooperativa. Usa Expo 57, Expo Router, TypeScript y Styled Components.

## Funciones

- Listado con FlatList y tarjetas con servicio, sector, fecha, horario y estado.
- Búsqueda por servicio o sector, sin distinguir tildes ni mayúsculas.
- Filtros «Todos» y «Con disponibilidad».
- Mensaje sin resultados y botón para restablecer los filtros.
- Detalle con imagen y resumen de fecha y hora.
- Formulario con validación del nombre, foco y errores junto al campo.
- Confirmación con resumen y regreso al listado.
- Los turnos no disponibles ofrecen elegir otro horario.

La solicitud es una simulación: no crea reservas ni descuenta cupos. Se muestra un Alert en el dispositivo y una confirmación en pantalla.

## Ejecutar

```bash
npm install
npx expo start
```

Abrí el QR con Expo Go compatible con SDK 57, o presioná `a` para Android y `w` para web. El simulador iOS requiere macOS.

## Archivos

- `src/app/index.tsx`: búsqueda, filtros y listado.
- `src/app/turno/[id].tsx`: detalle, formulario y confirmación.
- `src/app/_layout.tsx`: navegación con Stack.
- `src/components/TurnoCard.tsx`: tarjeta reutilizable.
- `src/components/turno-ui.tsx`: colores y componentes compartidos.
- `src/data/turnos.ts`: tipos y turnos de ejemplo.

## Datos locales

Las fechas se generan entre uno y cinco días después de cargar el módulo, con la hora del dispositivo. El campo `inicio` permite comprobar el vencimiento, también al solicitar.

La búsqueda y el formulario usan estado local. No hay API, autenticación ni persistencia. Las imágenes de Unsplash necesitan conexión.

## Pruebas manuales

1. Buscar `administracion` o `caja` y comprobar las coincidencias.
2. Activar «Con disponibilidad»: «Servicio técnico» no debe aparecer.
3. Buscar `zzz` y tocar «Ver todos los turnos» para restablecer el listado.
4. Abrir una tarjeta y revisar sus datos.
5. Solicitar sin nombre o con espacios: el campo debe recibir el foco y mostrar el error.
6. Completar el nombre y solicitar: debe aparecer el Alert y la confirmación de prueba. El formulario deja de mostrarse para evitar repetir el envío.
7. Abrir «Servicio técnico» desde «Todos»: debe ofrecer «Elegir otro turno», sin formulario.
8. Volver al listado: deben conservarse la búsqueda y el filtro.
9. Abrir `/turno/999`: debe mostrar un mensaje y permitir volver.
10. Comprobar el formulario con teclado abierto y en una pantalla angosta.

## Verificaciones

```bash
npm run lint
npx tsc --noEmit
npx expo export --platform web
```

Si una ruta nueva no aparece en los tipos, ejecutar `npx expo start` para regenerarlos. No hay un runner de tests configurado.

## Pendientes

- API y disponibilidad validada en el servidor.
- Reservas reales y persistencia.
- Mis turnos, cancelaciones y reprogramación.
- Autenticación y perfiles.
- Recordatorios y notificaciones.
- Manejo de carga y errores de red.
- Pruebas automatizadas y revisión en dispositivos.
