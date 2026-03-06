# SOP: Traducción Multilingüe con Optimización SEO

## Objetivo
Crear traducciones de archivos JSON de idiomas (en.json → [idioma].json) que incorporen palabras clave objetivo de manera natural mientras mantienen la calidad de traducción nativa.

---

## Paso 1: Preparación de Palabras Clave

### 1.1 Identificar Palabras Clave Objetivo
- **Palabra clave principal (Primary)**: 1 palabra clave de alto volumen
- **Palabra clave secundaria (Secondary)**: 1-2 palabras clave relacionadas o long-tail

### 1.2 Clasificar Intención de Búsqueda
- **Informacional**: "cómo descargar...", "qué es..."
- **Transaccional**: "descargar...", "comprar...", "obtener..."
- **Navegacional**: "herramienta de...", "sitio para..."

**Ejemplo (Español):**
```
Primary: "descargar subtitulos de youtube"
Secondary: "descargar videos de youtube con subtitulos"
Intención: Transaccional
```

---

## Paso 2: Mapeo de Ubicaciones Estratégicas

### 2.1 Ubicaciones Obligatorias (H1/H2/Meta)

| Ubicación JSON | Tipo | Palabra Clave a Usar | Prioridad |
|---|---|---|---|
| `metadata.title` | Meta Title | Primary | ⭐⭐⭐ |
| `metadata.description` | Meta Desc | Primary + Secondary | ⭐⭐⭐ |
| `hero.title` | H1 | Primary | ⭐⭐⭐ |
| `hero.subtitle` | Subtítulo H1 | Secondary (natural) | ⭐⭐ |
| `comparisonSlider.title` | H2 | Secondary | ⭐⭐ |
| `featuresGrid.title` | H2 | Primary | ⭐⭐ |
| `coreCapabilities.title` | H2 | Secondary | ⭐⭐ |
| `howItWorks.title` | H2 | Primary o Secondary | ⭐ |

### 2.2 Ubicaciones Secundarias (Contenido de Apoyo)
- `hero.ticker.*` - Variaciones naturales de las palabras clave
- `faq.questions.*.question` - Preguntas con palabras clave
- `testimonials.reviews[].content` - Menciones orgánicas
- `schema.faq.*` - Structured data con palabras clave

---

## Paso 3: Proceso de Traducción

### 3.1 Leer Archivo Original
```bash
# Leer en.json completo
Read: src/messages/en.json
```

### 3.2 Verificar Archivo de Destino Existente
```bash
# Verificar si [idioma].json ya existe
Glob: src/messages/[idioma].json
Read: src/messages/[idioma].json (si existe)
```

### 3.3 Traducir con Incorporación de Palabras Clave

**Reglas de Traducción:**
1. **Mantener estructura JSON idéntica** - Todos los keys deben coincidir exactamente
2. **Traducción nativa** - Evitar traducciones literales o robóticas
3. **Incorporación natural** - Las palabras clave deben fluir naturalmente en el contexto
4. **Consistencia terminológica** - Usar los mismos términos en todo el archivo

**Ejemplo de Incorporación Natural:**

❌ **Incorrecto (forzado):**
```json
"title": "Descargar subtitulos de youtube descargar videos de youtube con subtitulos herramienta"
```

✅ **Correcto (natural):**
```json
"title": "Descargar Subtítulos de YouTube",
"description": "Descarga videos de YouTube con subtítulos en formato SRT, VTT, TXT..."
```

---

## Paso 4: Ediciones Estratégicas

### 4.1 Priorizar Ediciones por Impacto SEO

**Orden de edición recomendado:**
1. `metadata.*` (Mayor impacto SEO)
2. `hero.title` y `hero.subtitle` (H1 principal)
3. Títulos H2 principales (`featuresGrid.title`, `coreCapabilities.title`, `comparisonSlider.title`)
4. Contenido de apoyo (`faq`, `testimonials`, `schema`)
5. Sección `support` (si falta)

### 4.2 Comando de Edición
```javascript
Edit({
  file_path: "src/messages/[idioma].json",
  old_string: "[texto original]",
  new_string: "[texto optimizado con palabra clave]"
})
```

---

## Paso 5: Validación de Calidad

### 5.1 Checklist de Validación

- [ ] **Estructura JSON**: Todos los keys coinciden con en.json
- [ ] **Palabra clave primary**: Aparece en metadata.title, hero.title, y al menos 2 H2
- [ ] **Palabra clave secondary**: Aparece en metadata.description y al menos 1 H2
- [ ] **Naturalidad**: Las traducciones suenan nativas, no robóticas
- [ ] **Densidad de palabras clave**: No más de 3-4 menciones exactas por sección
- [ ] **Variaciones**: Se usan sinónimos y variaciones naturales
- [ ] **Sección support**: Está completa y traducida

### 5.2 Verificar Distribución de Palabras Clave

**Distribución ideal:**
- Metadata: 2 menciones (title + description)
- H1 (hero): 1 mención
- H2 (secciones): 2-3 menciones
- Contenido: 3-5 menciones naturales

---

## Paso 6: Documentación de Cambios

### 6.1 Resumen para el Usuario

Proporcionar un resumen conciso que incluya:
1. Ubicaciones donde se incorporaron las palabras clave
2. Secciones añadidas (si aplica)
3. Confirmación de que la estructura JSON se mantiene intacta

**Ejemplo:**
```
✅ Optimización completada para es.json

Palabras clave incorporadas:
- Primary: "descargar subtitulos de youtube"
  → metadata.title, hero.title, featuresGrid.title

- Secondary: "descargar videos de youtube con subtitulos"
  → metadata.description, comparisonSlider.title, coreCapabilities.title

Secciones añadidas:
- support (líneas 575-648)

Estructura JSON: ✓ Intacta
```

---

## Plantilla de Prompt para Futuras Traducciones

```
Necesito traducir en.json a [IDIOMA] con las siguientes palabras clave:

**Palabra clave principal**: [keyword 1]
**Palabra clave secundaria**: [keyword 2]

Requisitos:
1. Mantener estructura JSON idéntica (todos los keys sin cambios)
2. Incorporar ambas palabras clave naturalmente en:
   - metadata.title y metadata.description
   - hero.title (H1)
   - Al menos 2-3 títulos H2 (comparisonSlider, featuresGrid, coreCapabilities)
3. Traducción nativa y natural, evitar traducciones robóticas
4. Añadir sección "support" si falta en el archivo de destino
5. Usar acentos y ortografía correcta del idioma objetivo

Por favor, optimiza el archivo [idioma].json siguiendo el SOP de traducción multilingüe.
```

---

## Notas Importantes

### Errores Comunes a Evitar
1. ❌ Keyword stuffing (repetir palabras clave excesivamente)
2. ❌ Traducciones literales que suenan artificiales
3. ❌ Cambiar la estructura de keys del JSON
4. ❌ Olvidar añadir secciones faltantes (como "support")
5. ❌ No usar acentos o caracteres especiales del idioma

### Mejores Prácticas
1. ✅ Leer el archivo existente antes de editar
2. ✅ Hacer ediciones incrementales (5-6 ediciones estratégicas)
3. ✅ Priorizar ubicaciones de alto impacto SEO primero
4. ✅ Verificar que las palabras clave fluyan naturalmente
5. ✅ Mantener consistencia terminológica en todo el archivo

---

## Referencias
- [2026 单页面内容生产与关键词布局 SOP](./2026%20单页面内容生产与关键词布局%20SOP%20(Content%20SOP).md)
- Google E-E-A-T Guidelines
- Next.js i18n Documentation
