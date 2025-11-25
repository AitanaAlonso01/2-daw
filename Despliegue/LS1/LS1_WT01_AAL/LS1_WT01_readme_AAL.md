# 📌 API de Gestión de Tareas (RAML) - AAL

---

## 🚀 Características

- Listar tareas
- Crear nuevas tareas
- Consultar tareas por ID
- Actualizar tareas existentes
- Eliminar tareas

🔹 Resumen de las funcionalidades principales de la API.
🔹 Da un vistazo rápido de lo que puede hacer.

## 📖 Estructura del Proyecto

api-proyecto/
│── api.raml # Definición principal de la API en RAML
│── [README.md](https://dealsbe.com/) # Documentación del poryecto en Markdown

---

🔹 Muestra cómo está organizado el proyecto y dónde encontrar los archivos principales.

Aquí se listan los **endpoints de la API** con ejemplos de uso y posibles respuestas.
Ejemplo:

## 🔗 Endpoints Principales

### `GET /tareas`

Obtiene todas las tareas registradas.

**Respuesta:**

```json
[
  { "id": 1, "titulo": "Estudiar RAML", "completada": false },
  { "id": 2, "titulo": "Escribir documentación", "completada": true }
]
```

🔹 Es la parte **más consultada** por otros desarrolladores.
🔹 Conviene agregar ejemplos en **JSON** para que se entienda mejor.

---

### `POST /tareas`

Crea una nueva tarea.
**Body de ejemplo:**

```
JSON
{ "id": 3, "titulo": "Probar API", "completada": false }
```

---

### `GET /tareas/{id}`

Obtiene una tarea por su ID.

---

### `PUT /tareas/{id}`

Actualiza una tarea existente.

---

### `DELETE /tareas/{id}`

Elimina una tarea existente.

---

## 🛠️ Requisitos

- [Node.js](https://nodejs.org/) o cualquier herramienta para simular/validar RAML (ej. **API Console** o **Anypoint Studio**).

## 🤝 Contribución

1. Haz un fork del proyecto.
2. Crea una rama (`featurenueva-funcionalidad`).
3. Envía un pull request.

## 📄 Licencia

OpenSource
