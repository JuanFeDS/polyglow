# 🎧 Documento Técnico – Módulo Listening  

## 1️⃣ Propósito  
El módulo de **Listening** tiene como objetivo principal mejorar la **capacidad de comprensión auditiva en inglés** del usuario.  
Se enfoca en exponer al estudiante a diferentes audios y evaluarlo mediante ejercicios de:  
- 📝 Comprensión.  
- 🔑 Detección de palabras clave.  
- 🌍 Análisis del contexto.  

Todo de forma **adaptada a su nivel de inglés** y a la **duración de la sesión de estudio**.  

---

## 2️⃣ Parámetros de Entrada  
El agente recibe los siguientes parámetros:  
- 📊 **Nivel del usuario**: Principiante, Intermedio, Avanzado.  
- ⏱️ **Duración de la sesión**: tiempo total asignado (ejemplo: 15, 30 o 60 minutos).  
- 🎯 **Preferencias del usuario** *(opcional, para personalización futura)*: temas de interés, acento preferido, velocidad del audio.  

---

## 3️⃣ Funcionalidades Principales  

### 3.1 🔊 Ejercicios de Audio con Preguntas de Comprensión  
- Generación de audios adaptados al nivel:  
  - Principiante → frases simples.  
  - Intermedio → diálogos cortos.  
  - Avanzado → entrevistas o noticias.  

- Preguntas posteriores:  
  - 🌍 Contexto general: *¿Dónde ocurre la escena? ¿Quién habla?*  
  - 🔑 Palabras clave: *¿Qué palabra escuchaste relacionada con “viaje”?*  
  - 📅 Detalle específico: *¿Qué número, fecha o acción se mencionó?*  

---

### 3.2 🔑 Ejercicios de Detección de Palabras Clave  
- Presentación de lista de palabras antes del audio.  
- El usuario debe identificar cuáles escuchó y en qué contexto.  

---

### 3.3 🎧 Recomendación de Recursos Externos *(futuro)*  
- Conexión con APIs externas (Spotify, Apple Podcasts, YouTube).  
- Recomendación automática de episodios relevantes según:  
  - Nivel del usuario.  
  - Preferencias temáticas.  

---

### 3.4 📚 Ejercicios Complementarios Sugeridos  
- 🧩 **Ordenar oraciones**: escuchar un audio y reconstruir frases en orden.  
- ✍️ **Rellenar huecos** (*fill in the blanks*): completar palabras faltantes en transcripción incompleta.  
- ✅ **Selección múltiple**: responder preguntas sobre el contenido.  

---

## 4️⃣ Flujo General del Módulo Listening  
1. El agente recibe **nivel** y **duración** de la sesión.  
2. Genera un **plan de listening** con ejercicios proporcionales al tiempo disponible.  
3. Ejecuta ejercicios de audio + preguntas de comprensión.  
4. Presenta **retroalimentación inmediata** y explicación de errores.  
5. *(Futuro)* Recomienda recursos externos al final de la sesión.  

---

## 5️⃣ Tecnologías y Herramientas Recomendadas  
- 🗣️ **Generación de audio**: API de TTS (OpenAI TTS, ElevenLabs).  
- 🤖 **Preguntas y ejercicios**: LLM para generar dinámicamente preguntas de comprensión.  
- 📊 **Evaluación automática**: LLM + NLP para verificar respuestas del usuario.  
- 🎧 **Integración futura**: APIs de Spotify o Apple Podcasts.  

---
