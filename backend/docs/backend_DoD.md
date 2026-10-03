# Definition of Done - Backend (API/FastAPI)

## Alcance
Este documento define los criterios de aceptación para considerar completada una tarea en el backend (API/FastAPI).

---

## Criterios Generales
- Código revisado y aprobado en Pull Request (PR).
- Cumple con estándares de estilo (black/flake8).
- Endpoint probado con respuestas correctas (200 OK, 400/500 controlados).
- Documentación automática generada en Swagger/OpenAPI.
- Variables de entorno gestionadas correctamente (sin credenciales hardcodeadas).
- Tests unitarios básicos incluidos (pytest).

---

## Criterios Específicos
- CRUD básico para sesiones, usuarios y progreso implementado.
- Validaciones de entrada de datos (pydantic models).
- Manejo de errores estandarizado (mensajes JSON consistentes).
- Logs de errores básicos implementados.

---

## Métricas Iniciales
- **Tiempo de respuesta de API:** < 300ms en promedio (local).
- **Vocabulario disponible:** mínimo 20 palabras iniciales en la BD de prueba.
- **Rachas calculadas:** backend devuelve al menos 3 días consecutivos de progreso simulado.
