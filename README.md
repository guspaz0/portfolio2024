<h1 align="center">Portfolio</h1>

<p align="center">
    <img src="https://img.shields.io/badge/git-latest-lightgrey">
    <img src="https://img.shields.io/badge/github-latest-darkblue">
    <img src="https://img.shields.io/badge/github actions CI/CD-latest-lightgrey">
    <img src="https://img.shields.io/badge/Vue-3-green">
    <img src="https://img.shields.io/badge/Nuxt-4-darkgreen">
    <img src="https://img.shields.io/badge/Prisma-latest-darkgreen">
    <img src="https://img.shields.io/badge/TypeScript-blue">

</p>

## 📋 Descripción

Aplicación de portafolio profesional construida con **Nuxt 4** y **Prisma ORM**. Una plataforma moderna e interactiva para presentar múltiples perfiles profesionales, proyectos, certificaciones, aptitudes y experiencia laboral.

Con autenticación segura, dashboard administrativo y gestión completa de contenido, esta aplicación ofrece una forma elegante y profesional de mostrar tu carrera tecnológica.

---

## ✨ Funcionalidades Principales

### 🔐 **Autenticación y Seguridad**
- Sistema de login seguro
- Protección de rutas mediante middleware
- Control de acceso a dashboard administrativo
- Logout seguro con cierre de sesión

### 📊 **Dashboard Administrativo**
- Panel completo de gestión de contenido
- Interfaz intuitiva y responsiva
- Validación de formularios en tiempo real
- Tema oscuro/claro toggleable

### 📁 **Gestión de Contenido**
- **Perfiles Tecnológicos**: Crea y administra múltiples perfiles profesionales
- **Proyectos**: Documenta tus proyectos con descripción, tecnologías y enlaces
- **Certificados**: Organiza tus certificaciones y credenciales
- **Aptitudes**: Catálogo de habilidades técnicas con categorización
- **Experiencia**: Historial laboral con timeline visual
- **Escuelas**: Información académica y formación

### 🎨 **Componentes Reutilizables**
- Botones personalizados (CustomButton, SubmitButton)
- Inputs materiales y validados
- Carousels para mostrar aptitudes
- Timeline visual para experiencia laboral
- Tablas de comandos interactivas

### 💾 **Gestión de Base de Datos**
- Prisma ORM para operaciones de BD seguras
- Migraciones versionadas
- Esquema tipado
- Operaciones CRUD completas

### 📤 **Carga de Archivos**
- Soporte para cargar imágenes y archivos
- Integración con Cloudinary
- Validación de tipos de archivo

### 🔍 **Validación**
- Validación en cliente con composables reutilizables
- Validación en servidor
- Manejo de errores personalizados
- Mensajes de error claros

### 🌙 **Experiencia de Usuario**
- Tema oscuro/claro personalizable
- Diseño responsive y moderno
- Interfaz intuitiva
- Cargas optimizadas

---

## 🛠️ Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| **Nuxt** | 3 | Framework fullstack |
| **Vue** | 3 | Framework frontend |
| **Prisma** | Latest | ORM y gestión BD |
| **TypeScript** | 5 | Tipado estático |
| **Pinia** | Latest | State management |
| **ESLint** | Latest | Linting |

---


## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm, yarn o pnpm
- Base de datos (SQLite o PostgreSQL)

### Instalación

Clona el repositorio e instala las dependencias:

```bash
# Clonar el repositorio
git clone https://github.com/guspaz0/portfolio2024.git
cd portfolio2024

# Instalar dependencias (usando pnpm)
pnpm install

# O si usas npm
npm install
```

### Configuración de Base de Datos

```bash
# Ejecutar migraciones
npx prisma migrate dev

# Generar cliente Prisma
npx prisma generate
```

---

## 💻 Desarrollo

### Servidor de Desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
pnpm run dev
```

El servidor se reiniciará automáticamente con los cambios.

### Comandos Disponibles

```bash
# Desarrollo
pnpm run dev

# Build para producción
pnpm run build

# Preview de producción local
pnpm run preview

# Linting
pnpm run lint

# Generar cliente Prisma
pnpm run prisma:generate

# Abrir Prisma Studio
pnpm run prisma:studio
```

---

## 📦 Estructura del Proyecto

```
portfolio2024/
├── components/          # Componentes Vue reutilizables
│   ├── aptitudes/      # Componentes de aptitudes
│   ├── certificados/   # Componentes de certificados
│   ├── escuelas/       # Componentes de educación
│   ├── proyectos/      # Componentes de proyectos
│   └── composables/    # Componentes base y utilities
├── pages/              # Páginas y rutas (Nuxt)
│   ├── index.vue       # Página de inicio
│   ├── login.vue       # Página de login
│   └── dashboard/      # Rutas protegidas
├── server/             # APIs serverless (Nitro)
│   ├── api/           # Endpoints REST
│   ├── entities/      # Entidades de BD
│   ├── exceptions/    # Excepciones personalizadas
│   └── utils/         # Utilities del servidor
├── prisma/            # Configuración de BD
│   └── schema.prisma  # Esquema de datos
├── lib/               # Utilities compartidas
├── stores/            # Estado global (Pinia)
├── layouts/           # Layouts base
└── assets/            # Recursos estáticos
```

---

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL="file:./dev.db"

# Cloudinary (opcional, para carga de imágenes)
CLOUDINARY_CLOUD_NAME=tu_cloud_name
CLOUDINARY_API_KEY=tu_api_key
CLOUDINARY_API_SECRET=tu_api_secret

# Auth (opcional)
JWT_SECRET=tu_secret_key
```

---

## 📚 Características Técnicas Avanzadas

### Validación
- Validación en cliente con composables reutilizables
- Validación en servidor en todos los endpoints
- Manejo robusto de errores

### Middleware
- Protección de rutas públicas
- Control de acceso a dashboard
- Validación de tokens

### Typesafety
- TypeScript en todo el proyecto
- Tipos generados desde Prisma
- Tipos compartidos entre cliente y servidor

### Optimización
- Code splitting automático
- Lazy loading de componentes
- Optimización de imágenes
- Caché inteligente

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo LICENSE para más detalles.

---

## 👤 Autor

**Gustavo Paz** - Desarrollador Full Stack

- GitHub: [@guspaz0](https://github.com/guspaz0)
- Portfolio: [Tu Portafolio](https://guspaz0.github.io/portfolio2024)

---

## 🙏 Agradecimientos

- [Nuxt.js](https://nuxt.com) - Framework fullstack
- [Prisma](https://www.prisma.io/) - ORM moderno
- [Vue.js](https://vuejs.org) - Framework progresivo


Para más información, revisa la [documentación oficial de Nuxt](https://nuxt.com/docs).
