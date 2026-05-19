# Briced — Landing Page

**Jenny Cuán | Briced · Estratega Administrativa y Digital**

## Estructura de archivos

```
briced/
├── index.html      → Estructura y contenido
├── style.css       → Diseño visual completo
├── script.js       → Interactividad y animaciones
├── vercel.json     → Configuración para despliegue
└── README.md       → Este archivo
```

## Despliegue en Vercel

### Opción 1 — Arrastrar y soltar
1. Ir a [vercel.com](https://vercel.com) e iniciar sesión
2. Hacer clic en "Add New → Project"
3. Arrastrar la carpeta `briced/` completa al área de upload
4. Vercel detecta automáticamente que es un sitio estático
5. Clic en "Deploy" — listo en segundos

### Opción 2 — GitHub
1. Subir la carpeta a un repositorio GitHub
2. Conectar el repo en Vercel
3. Deploy automático con cada push

## Personalización

### Agregar foto de perfil
En `index.html`, busca:
```html
<div class="photo-placeholder">
  <i class="fa-solid fa-user"></i>
</div>
```
Reemplazar con:
```html
<img src="tu-foto.jpg" alt="Jenny Cuán" style="width:100%;height:100%;object-fit:cover;" />
```
Subir la foto a la misma carpeta.

### Actualizar links de contacto
En `index.html`, cambiar:
- `https://wa.me/1234567890` → tu número de WhatsApp real
- `https://linkedin.com/in/jennycuan` → tu perfil de LinkedIn
- `jenny@briced.co` → tu email real
- `https://instagram.com/briced` → tu Instagram

### Cambiar colores
En `style.css`, sección `:root`:
- `--teal` → color de acento principal
- `--navy-deep` → fondo principal

## Créditos
Diseñado con estrategia e inteligencia para la marca Briced.
