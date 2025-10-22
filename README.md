# OMBIA Parking

Prueba técnica para OMBIA

## Instalación y Ejecución

### Prerrequisitos

- Docker
- Docker Compose
- pnpm (o npm)

### Pasos para ejecutar

1. Clonar el repositorio

   ```bash
   git clone https://github.com/yepes1201/ombia-parking
   cd ombia-parking
   ```

2. Instalar dependencias y crear datos de prueba

   ```bash
   cd backend
   pnpm install
   cd ../frontend
   pnpm install
   cd ..
   ```

   Estando en la raíz ejecutar:

   ```bash
   pnpm db:push
   pnpm db:seed
   ```

3. Levantar los servicios con Docker Compose

   ```bash
   docker-compose up --build
   ```

   Esto iniciará:

   - PostgreSQL en el puerto `5432`
   - Backend en `http://localhost:3000`
   - Frontend en `http://localhost:5173`

4. Acceder a la aplicación

   Abre el navegador en: `http://localhost:5173`

### Configuración inicial de datos

Los datos ya se encuentran cargados dentro de la carpeta de `data` en la raíz del proyecto.

Si desea reiniciar los datos desde la app (front) puede presionar "Reset Parking".

## Instrucciones de ejecución

```bash
docker-compose up
```
