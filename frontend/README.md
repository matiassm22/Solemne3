# Huerto Medicinal CESFAM Las Condes

Sistema de gestión de materiales y plantas del huerto comunitario del CESFAM Las Condes. Proyecto desarrollado como entrega de la Solemne 2 – Desarrollo de Interfaz Frontend.

---

## Tecnologías utilizadas

- **React 18** con componentes funcionales y hooks
- **React Router v7** para navegación SPA
- **TypeScript** para tipado estático
- **SCSS/SASS** con arquitectura modular (variables, mixins, partials)
- **Tailwind CSS** para utilidades de estilo
- **CSS Grid** para el layout principal
- **Flexbox** para menú de navegación y grilla de tarjetas
- **Vite** como bundler y servidor de desarrollo

---

## Instalación y ejecución

### Requisitos previos

- Node.js 18 o superior
- npm 9 o superior

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

### Compilar para producción

```bash
npm run build
```

---

## Estructura del proyecto

```txt
src/
├── app/
│   ├── components/
│   │   ├── Layout.tsx         # Layout global (header, nav, aside, footer)
│   │   ├── MaterialCard.tsx   # Tarjeta reutilizable de material
│   │   ├── MenuNav.tsx        # Barra de navegación reutilizable
│   │   └── Mensaje.tsx        # Componente de alerta reutilizable
│   ├── pages/
│   │   ├── Home.tsx           # Página de inicio con métricas
│   │   ├── Catalog.tsx        # Catálogo con búsqueda y filtros
│   │   ├── PlantDetail.tsx    # Detalle de una planta
│   │   ├── Contact.tsx        # Formulario de contacto
│   │   ├── Login.tsx          # Acceso administrador
│   │   ├── AdminDashboard.tsx # CRUD de materiales
│   │   └── Chatbot.tsx        # Asistente virtual
│   ├── data.ts                # Datos estáticos de plantas
│   └── routes.tsx             # Configuración de React Router
├── styles/
│   ├── main.scss              # Punto de entrada SCSS
│   ├── _variables.scss        # Variables de color, tipografía y espaciado
│   ├── _mixins.scss           # Mixins reutilizables
│   ├── _layout.scss           # CSS Grid del layout principal
│   ├── _header.scss           # Estilos del encabezado
│   ├── _nav.scss              # Flexbox del menú de navegación
│   ├── _cards.scss            # Estilos de tarjetas de material
│   └── _components.scss       # Estilos de componentes menores
└── main.tsx                   # Punto de entrada de la aplicación
```

---

## Rutas disponibles

| Ruta | Componente | Descripción |
|---|---|---|
| `/` | `Home` | Página de inicio con métricas generales |
| `/materiales` | `Catalog` | Listado de materiales con búsqueda y filtros |
| `/materiales/:id` | `PlantDetail` | Detalle de una planta específica |
| `/contacto` | `Contact` | Formulario de contacto |
| `/chatbot` | `Chatbot` | Asistente virtual del huerto |
| `/login` | `Login` | Acceso al panel de administración |
| `/admin` | `AdminDashboard` | Gestión de materiales (CRUD) |

---

## Componentes reutilizables obligatorios

### `<MaterialCard />`

Renderiza la tarjeta de cada material del inventario.

| Prop | Tipo | Descripción |
|---|---|---|
| `nombre` | `string` | Nombre del material |
| `codigo` | `string` | Código de inventario |
| `estado` | `string` | Estado actual (`Bueno` o `Crítico`) |
| `cantidad` | `number` | Unidades disponibles en stock |
| `imagen` | `string` | URL de la imagen representativa |

### `<MenuNav />`

Construye la barra de navegación principal con resaltado del link activo.

| Prop | Tipo | Descripción |
|---|---|---|
| `links` | `{ label: string, path: string }[]` | Array de rutas a renderizar |

### `<Mensaje />`

Muestra alertas de confirmación o error al usuario.

| Prop | Tipo | Descripción |
|---|---|---|
| `tipo` | `'exito' \| 'error'` | Variante visual del mensaje |
| `texto` | `string` | Contenido del mensaje |

---

## Hooks utilizados

| Hook | Dónde | Propósito |
|---|---|---|
| `useState` | Catalog, Contact, Login, AdminDashboard, Chatbot | Manejo de estado de formularios, filtros y visibilidad |
| `useEffect` | Home, Catalog, PlantDetail, Chatbot | Cambio de `document.title` y scroll automático |
| `useParams` | PlantDetail | Lectura del `:id` de la URL para mostrar el detalle |

---

## Credenciales de administrador (demo)

```
Usuario:    admin
Contraseña: admin
```

## Alcance de la entrega

Esta versión corresponde a una interfaz frontend desarrollada como Single Page Application. Los datos utilizados son estáticos y se encuentran definidos dentro del propio proyecto, por lo que no existe conexión a una API externa ni a una base de datos real.

El sistema permite visualizar información general del huerto medicinal, consultar el catálogo de plantas, revisar el detalle de cada especie, enviar mensajes mediante un formulario de contacto, utilizar un asistente virtual básico y acceder a un panel administrativo con operaciones CRUD simuladas sobre el inventario.

La información sobre plantas medicinales tiene un propósito informativo y educativo. No reemplaza la evaluación ni las indicaciones de un profesional de salud.