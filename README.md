# ✨ Polyglow

App para aprender idiomas con sesiones cortas de vocabulario, planes de estudio y rachas de progreso.

🌐 **Demo web:** [juanfeds.com/polyglow](https://juanfeds.com/polyglow/)

## Estructura

```
polyglow/
├── frontend/   # App en Expo / React Native (TypeScript, React Navigation)
├── backend/    # API en FastAPI con Docker
└── .github/workflows/
    ├── frontend.yml   # Lint, type check, export web y deploy a GitHub Pages
    └── backend.yml    # Ruff y build de la imagen Docker (GHCR)
```

Cada workflow se ejecuta solo cuando cambia su carpeta.

## Desarrollo

**Frontend**

```bash
cd frontend
npm install
npx expo start
```

**Backend**

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

## Estado

MVP en construcción: el frontend tiene las pantallas de inicio, plan, sesión y progreso con datos simulados, y el backend expone solo endpoints de salud. Los criterios de aceptación del frontend están en [`frontend/docs/frontend_DoD.md`](frontend/docs/frontend_DoD.md).
