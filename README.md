# Huerto Medicinal CESFAM Las Condes - Full Stack

Este repositorio contiene la solución tecnológica completa para el Huerto Medicinal del CESFAM Las Condes, compuesta por un frontend en React (Vite) y un backend en Django con Django REST Framework.

---

## Estructura del Repositorio

```txt
raiz/
├── backend/                  # Código del Backend en Django & Django REST Framework
│   ├── huerto/               # Aplicación Django (Modelos, Serializadores y Vistas API)
│   ├── huerto_backend/       # Configuración global del proyecto Django (CORS, Settings)
│   ├── db.sqlite3            # Base de datos local SQLite con 25 plantas y 3 mensajes precargados
│   ├── manage.py             # Entrada de administración de Django
│   └── requirements.txt      # Archivo de dependencias del Backend
│
├── frontend/                 # Código del Frontend en React + Vite + TypeScript (SPA)
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/   # Componentes modulares y reutilizables
│   │   │   ├── pages/        # Vistas principales integradas con la API
│   │   │   ├── api.ts        # Cliente de consumo centralizado de la API REST
│   │   │   └── data.ts       # Datos locales de respaldo (fallback desconectado)
│   │   └── main.tsx          # Punto de entrada React
│   └── package.json          # Archivo de dependencias del Frontend
│
└── docs/                     # Documentación oficial del encargo
    ├── Informe_Tecnico.md    # Informe de desarrollo y fundamentación del proyecto
    └── Manual_Usuario.md     # Manual de usuario con instrucciones detalladas de uso
```

---

## Requisitos Previos

- **Python 3.11** o superior.
- **Node.js 18** o superior y npm.

---

## Instrucciones de Lanzamiento y Ejecución

### 1. Servidor Backend (Django API REST)

Navega a la carpeta `/backend/` e inicia el entorno virtual y el servidor local:

```bash
cd backend

# Activar el entorno virtual (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# (Opcional) Instalar dependencias si es primera ejecución
pip install -r requirements.txt

# (Opcional) Aplicar migraciones y seed de datos si se requiere reiniciar la DB
python manage.py migrate
python manage.py seed_data

# Iniciar servidor local
python manage.py runserver
```
La API REST estará corriendo y disponible en `http://localhost:8000/api/`.

### 2. Servidor Frontend (React SPA)

En un nuevo terminal, navega a la carpeta `/frontend/` e inicia el servidor de desarrollo de Vite:

```bash
cd frontend

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```
La aplicación web estará disponible en `http://localhost:5173`.

---

## Credenciales de Acceso Administrador (Demo)

- **Usuario:** `admin`
- **Contraseña:** `admin`

*Utiliza estas credenciales en la sección **Admin** del menú para acceder al CRUD de gestión de inventario y visualización de mensajes.*
