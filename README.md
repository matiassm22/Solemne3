# Huerto Medicinal CESFAM Las Condes - Full Stack

Este repositorio contiene la solución tecnológica completa para el **Huerto Medicinal del CESFAM Las Condes**, compuesta por un **Frontend moderno en React** (Vite + TypeScript) y un **Backend RESTful en Django** con Django REST Framework. 

La aplicación cuenta con un catálogo interactivo de plantas medicinales, un asistente virtual educativo (chatbot) por palabras clave y una consola de administración privada para el control de stock e inventario en tiempo real.

---

## Estructura del Repositorio

```txt
raiz/
├── backend/                  # Código del Backend en Django & Django REST Framework
│   ├── huerto/               # Aplicación Django (Modelos, Serializadores y Vistas API)
│   ├── huerto_backend/       # Configuración global del proyecto Django (CORS, Settings)
│   ├── db.sqlite3            # Base de datos local SQLite con 25 plantas y mensajes precargados
│   ├── manage.py             # Entrada de administración de Django
│   └── requirements.txt      # Archivo de dependencias del Backend
│
├── frontend/                 # Código del Frontend en React + Vite + TypeScript (SPA)
    ├── src/
    │   ├── app/
    │   │   ├── components/   # Componentes modulares y reutilizables
    │   │   │   ├── Layout.tsx
    │   │   │   ├── MenuNav.tsx
    │   │   │   ├── Mensaje.tsx
    │   │   │   └── ConfirmModal.tsx  # Modal personalizado de confirmación de borrado
    │   │   ├── pages/        # Vistas principales integradas con la API
    │   │   ├── api.ts        # Cliente de consumo centralizado de la API REST
    │   │   └── data.ts       # Datos locales de respaldo (fallback desconectado)
    │   │   └── routes.tsx    # Enrutamiento jerárquico React Router (aliases)
    │   └── main.tsx          # Punto de entrada React
    └── package.json          # Archivo de dependencias del Frontend

---

## Requisitos Previos

* **Python 3.11** o superior.
* **Node.js 18** o superior y npm.

---

## Enrutamiento y Aliases 
Para garantizar la compatibilidad con los requerimientos estipulados por el profesor en la pauta de evaluación de la **Solemne 2**, el enrutador del frontend está configurado para responder de manera idéntica tanto a las rutas con nombre de negocio (`/plantas`) como a las exigidas en el enunciado original (`/materiales`):
* **Catálogo**: `/plantas` o `/materiales`
* **Detalle de Ficha**: `/plantas/:id` o `/materiales/:id`

---

## Características de la Aplicación

1. **Modo Resiliente (Offline Fallback)**: El frontend se comunica con el servidor Django. Si el backend está apagado o hay un fallo de red, captura el error de forma asíncrona mediante un bloque `.catch()`, muestra una alerta informativa y carga de forma transparente los datos estáticos desde `data.ts` sin integrar la experiencia.
2. **Chatbot Educativo por Síntomas**: Implementa un motor interactivo basado en palabras clave que analiza síntomas de pacientes y recomienda plantas según su dolencia (digestiva, respiratoria, insomnio, heridas de piel, dolores articulares, diuréticos, hipertensión, fiebre, estreñimiento, dolor menstrual, defensas y problemas biliares/hepáticos).
3. **UX de Eliminación Mejorada**: Reemplaza el cuadro nativo `confirm()` del navegador en la consola de administración por el componente interactivo `<ConfirmModal />`, el cual puede cerrarse con la tecla `Escape` y enfoca de forma accesible el botón para responder por teclado.

---

## Instrucciones de Lanzamiento y Ejecución (gitbash)(powershell)

### 1. Servidor Backend (Django API REST)
Navega a la carpeta `/backend/` e inicia el entorno virtual y el servidor local:
```bash
cd backend

# Activar el entorno virtual (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Instalar dependencias
pip install -r requirements.txt

# Aplicar migraciones y seed de datos si se requiere reiniciar la DB
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

* **Usuario:** `admin`
* **Contraseña:** `admin`

*Utiliza estas credenciales en la sección **Admin** del menú para acceder al CRUD de gestión de inventario y visualización de mensajes.*
