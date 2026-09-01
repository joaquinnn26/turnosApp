# TurnoApp

TurnoApp es una aplicación móvil desarrollada con React Native y Expo para mostrar turnos disponibles de distintos servicios.


## Objetivo

Presentar una pantalla principal profesional y sencilla donde se puedan consultar turnos disponibles para servicios como atención al cliente, consultas administrativas, reclamos, servicio técnico y pagos.

## Integrantes

- Nombre y apellido: Fernandez Joaquin

## Tecnologías utilizadas

- React Native
- Expo
- TypeScript
- Styled Components

## Instalación de dependencias

```bash
npm install
```

El proyecto incluye `styled-components` como dependencia para definir los estilos de la interfaz.

## Ejecutar el proyecto

```bash
npx expo start
```

En la salida de Expo se pueden elegir las opciones para abrir la app en Android, iOS, web o Expo Go.

## Datos estáticos

Los turnos se encuentran en `src/data/turnos.ts`.

Cada turno tiene:

- `id`
- `servicio`
- `sector`
- `fecha`
- `hora`
- `estado`
- `imagen`

Los datos se escriben directamente en el proyecto y no se obtienen desde una API ni desde una base de datos.

## Componente reutilizable TurnoCard

El componente `TurnoCard` está en `src/components/TurnoCard.tsx`.

Recibe por props los datos de cada turno:

- `servicio`
- `sector`
- `fecha`
- `hora`
- `estado`
- `imagen`

El componente muestra la imagen del servicio, el nombre, el sector, la fecha, el horario y el estado. El color del estado cambia según su valor:

- Verde para `Disponible`
- Naranja para `Pocos lugares`
- Gris para `No disponible`

## Comunicación mediante props

La pantalla principal en `src/app/index.tsx` funciona como componente padre. Recorre el arreglo de turnos con `map()` y crea un `TurnoCard` por cada elemento, enviando los datos mediante props.

## Features completadas

- Pantalla principal
- Uso de `View`, `Text`, `Image` y `ScrollView`
- Datos estáticos
- Listado de turnos
- Componente reutilizable `TurnoCard`
- Comunicación mediante props
- Diseño con Styled Components

## Features pendientes

- Solicitar turno
- Cancelar turno
- Consultar mis turnos
- Inicio de sesión
- Notificaciones
- Conexión con API
- Base de datos

## Información de Expo

Este proyecto fue creado con Expo y usa Expo Router como punto de entrada (`expo-router/entry`).

La estructura generada por Expo se conserva. Para iniciar la app se utiliza:

```bash
npx expo start
```

Otros comandos disponibles:

```bash
npm run android
npm run ios
npm run web
npm run lint
```


