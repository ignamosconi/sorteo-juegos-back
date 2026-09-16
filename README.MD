# Sistema de Sorteos - Backend

API REST desarrollada con **NestJS** que proporciona la arquitectura de persistencia, lógica de sorteos en vivo y autenticación segura con doble factor (2FA/TOTP) para la gestión de sorteos deportivos.

Si bien fue pensado para los Juegos Deportivos Tecnológicos, la aplicación fue planteada de forma genérica, lo que permite utilizarla en cualquier entorno.

## Repositorios
- **Back-end:** https://github.com/ignamosconi/sorteo-juegos-back
- **Front-end:** https://github.com/ignamosconi/sorteo-juegos-front

---

## Funcionalidades Principales

- **Gestión Integral de Sorteos (`raffle`)**
  - Creación, edición y ciclo de vida de sorteos (`draft`, `configured`, `in_progress`, `finished`).
  - Generación de slugs únicos para la sala de sorteo pública (`publicSlug`) y el panel de ejecución en vivo (`drawSlug`).

- **Estructura Deportiva Multinivel (`sport`)**
  - Administración de **Deportes**, **Categorías** (opcionales por deporte) y **Grupos** con capacidad máxima personalizable.
  - Asignación de equipos a categorías de deporte (`SportCategoryTeam`).

- **Catálogos por Defecto (`default-sport`, `default-category`)**
  - Plantillas maestrías de deportes y categorías para precargar rápidamente nuevos sorteos.

- **Catálogo de Equipos Globales y Locales (`global-team`, `raffle-team`)**
  - Registro centralizado de instituciones/facultades con nombre, abreviatura e insignia (`global-team`).
  - Importación y personalización de equipos participantes dentro de cada sorteo específico (`raffle-team`).

- **Motor de Sorteo en Vivo (`draw`)**
  - **Selección de Contexto**: Sorteo focalizado por combinación de Deporte + Categoría.
  - **Sorteo Aleatorio de Equipos y Grupos**: Selección transparente de participantes y asignación a vacantes disponibles.
  - **Asignación Automática**: Detección inteligente para categorías que cuentan con un único grupo.
  - **Deshacer por Contexto (`undo`)**: Reversión precisa del último resultado sorteado dentro del deporte y categoría activos, sin afectar el progreso de otras disciplinas.

- **Portal Público y Sincronización**
  - Endpoint de consulta pública (`/public/:publicSlug`) protegido y optimizado para la transmisión en vivo de resultados agrupados por deporte.

- **Configuración Global del Sistema (`system-config`)**
  - Personalización de la marca pública: título del portal, banner de encabezado, favicon dinámico y nombre de la pestaña del navegador.

- **Carga de Archivos (`file-upload`)**
  - Módulo centralizado para subida y eliminación de escudos de equipos, banners corporativos e íconos.

- **Autenticación Segura y 2FA Obligatorio (`admin-auth`)**
  - Autenticación TOTP (Google Authenticator / Authy) en dos pasos.
  - Tokens **JWT** (Access Token de corta duración + Refresh Token rotativo con detección de reutilización).
  - Cifrado **AES-256-GCM** para las claves secretas TOTP en la base de datos.
  - Almacenamiento de retos temporales (*challenges*) en **Redis** con TTL e intentos limitados.
  - Contraseñas hasheadas mediante **bcrypt**.

---

## Stack Tecnológico

| Tecnología | Descripción |
|---|---|
| **NestJS** | Framework principal para Node.js |
| **TypeORM + PostgreSQL** | ORM y base de datos relacional |
| **Redis** | Gestión de sesiones 2FA temporales |
| **JWT (`@nestjs/jwt`)** | Autenticación basada en tokens |
| **otplib + qrcode** | Generación y validación de código TOTP / QR |
| **bcrypt** | Hash seguro de contraseñas |
| **AES-256-GCM** | Cifrado simétrico para secrets 2FA |
| **Class Validator / Transformer** | Validación y transformación de DTOs |

---

## Estructura del Proyecto


```

src/
┣ admin/            # CRUD de administradores
┣ admin-auth/       # Autenticación, 2FA (setup, confirm, validate, reset), JWT y guards
┣ default-category/ # Catálogo maestro de categorías por defecto
┣ default-sport/    # Catálogo maestro de deportes por defecto
┣ draw/             # Motor del sorteo (estado, selección de equipo/grupo, undo, resultados públicos)
┣ file-upload/      # Subida y eliminación de imágenes
┣ global-team/      # Registro global de instituciones/equipos
┣ raffle/           # Gestión de sorteos y estado del torneo
┣ raffle-team/      # Equipos asignados a un sorteo específico
┣ refresh-token/    # Persistencia y rotación de refresh tokens
┣ redis/            # Conexión y almacenamiento en Redis
┣ sport/            # Entidades e interfaces de Deportes, Categorías y Grupos
┣ system-config/    # Configuración de marca del portal público
┗ database/         # Migraciones TypeORM y Seeders iniciales

```

---

## Variables de Entorno

Copiá el archivo `.env.example` a `.env` y configurá las variables:

```bash
cp .env.example .env

```

```env
NODE_ENV=development
PORT=3000
ADMIN_PANEL_URL=http://localhost:5173

# Base de datos PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sorteo_juegos

# JWT Secrets
JWT_ADMIN_ACCESS_SECRET=tu_access_secret_super_seguro
JWT_ADMIN_REFRESH_SECRET=tu_refresh_secret_super_seguro
JWT_ADMIN_ACCESS_EXPIRES_IN=15m
JWT_ADMIN_REFRESH_EXPIRES_IN=1d

# Cifrado 2FA TOTP (64 caracteres hexadecimales)
TOTP_ENCRYPTION_KEY=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
PENDING_2FA_TTL_MS=300000
PENDING_2FA_MAX_ATTEMPTS=5

# Seeder Admin Inicial
ADMIN_USERNAME_SEEDER=admin
ADMIN_PASSWORD_SEEDER=admin123

```

Para generar una clave hexadecimal de 64 caracteres para `TOTP_ENCRYPTION_KEY`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

```

---

## Instalación y Comandos

```bash
# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run start:dev

# Compilar para producción
npm run build

# Iniciar en producción
npm run start:prod

```

### Migraciones de Base de Datos (TypeORM)

```bash
# Ejecutar migraciones pendientes
npm run migration:run

# Revertir última migración
npm run migration:revert

# Generar nueva migración
npm run migration:generate -- src/database/migrations/NombreDeMigracion

