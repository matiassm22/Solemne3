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

### Requisitos Previos e Instalación

Para ejecutar este proyecto de forma local, necesitas tener instalado lo siguiente:

### 1. Python (Para el Backend en Django)
* **Descarga**: Descarga el instalador oficial de [Python 3.11 o superior](https://www.python.org/downloads/).
* **IMPORTANTE (Windows)**: Durante la instalación, asegúrate de marcar la casilla **"Add Python to PATH"** en la primera ventana del asistente. Si omites este paso, tu sistema no reconocerá los comandos `python` o `pip` y redirigirá erróneamente a la tienda de Windows.
* **Verificación**: Abre una nueva terminal y escribe:
  ```bash
  python --version
  ```
  *(Debe mostrar la versión instalada de Python).*

### 2. Node.js (Para el Frontend en React)
* **Descarga**: Descarga e instala [Node.js 18 o superior](https://nodejs.org/) (se recomienda la versión LTS).
* **Verificación**: Confirma la instalación en tu terminal ejecutando:
  ```bash
  node -v
  npm -v
  ```

### 3. Habilitación de Scripts (Solo si utilizas PowerShell en Windows)
Por defecto, Windows tiene deshabilitada la ejecución de scripts locales en PowerShell. Para poder activar el entorno virtual (`.ps1`) en esa terminal, abre PowerShell y ejecuta el siguiente comando:
```powershell
Set-ExecutionPolicy -ExecutionPolicy Bypass -Scope Process
```
*(Esto habilitará la ejecución de scripts únicamente en la ventana de terminal actual, de forma segura sin alterar permanentemente las políticas de tu sistema).*

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

## Instrucciones de Lanzamiento y Ejecución

### 1. Servidor Backend (Django API REST)

Navega a la carpeta `/backend/` en tu terminal preferida y ejecuta los comandos correspondientes:

#### Opción A: Git Bash (MINGW64)
```bash
cd backend

# 1. Activar el entorno virtual en Git Bash
source venv/Scripts/activate

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Aplicar migraciones y seed de datos
python manage.py migrate
python manage.py seed_data

# 4. Iniciar el servidor local
python manage.py runserver
```

#### Opción B: Windows PowerShell
*(Si las políticas de seguridad de Windows bloquean la activación de scripts .ps1, puedes llamar a Python directamente)*
```powershell
cd backend

# 1. Instalar dependencias
.\venv\Scripts\python.exe -m pip install -r requirements.txt

# 2. Aplicar migraciones y seed de datos
.\venv\Scripts\python.exe manage.py migrate
.\venv\Scripts\python.exe manage.py seed_data

# 3. Iniciar el servidor local
.\venv\Scripts\python.exe manage.py runserver
```

#### Opción C: Símbolo del Sistema (CMD)
```cmd
cd backend

# 1. Activar el entorno virtual
call venv\Scripts\activate.bat

# 2. Instalar dependencias
pip install -r requirements.txt

# 3. Aplicar migraciones y seed de datos
python manage.py migrate
python manage.py seed_data

# 4. Iniciar el servidor local
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

