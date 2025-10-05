# Despliegue (Netlify / Vercel / GitHub Pages)

Este documento explica opciones rápidas para desplegar el sitio `delta.studio` desde esta carpeta local (`c:\delta.studio`). Incluye comandos para PowerShell en Windows.

Pre-requisitos (local):
- Tener una cuenta en GitHub (o Git provider), Netlify o Vercel según prefieras.
- Git instalado y configurado (nombre/email).
- Opcional: Node.js si quieres agregar un build o pipeline.

1) Preparar el repo local (opcional si ya tienes repo remoto)

# Desde PowerShell (ejecutar desde c:\delta.studio)

# Inicializar git y hacer primer commit
git init ; git add . ; git commit -m "Initial site commit"

# Crear repo remoto en GitHub y empujar (reemplaza URL remoto)
# git remote add origin https://github.com/usuario/repo.git ; git branch -M main ; git push -u origin main

2) Netlify (recomendado para sitios estáticos)
- Ve a https://app.netlify.com/ y haz "New site from Git".
- Conecta tu repo (GitHub) y selecciona la rama `main`.
- Build command: (vacío si no hay build) ; Publish directory: `/` o la carpeta donde esté `index.html`.
- Opcional: añade `netlify.toml` para configuración avanzada.
- Netlify provee dominio temporal y HTTPS automático.

3) Vercel
- Ve a https://vercel.com/new y conecta tu repo.
- Framework preset: "Other" si es estático.
- Build & Output settings: vacíos si no hay compilación.
- Despliegue automático con cada push.

4) GitHub Pages (rápido pero menos features)
- En tu repo de GitHub, ve a Settings → Pages.
- Selecciona la rama `main` y la carpeta `/ (root)` y guarda.
- GitHub Pages publica en https://usuario.github.io/repo/.

5) Post-despliegue: SEO y verificación
- Añade tu sitio a Google Search Console (comprueba sitemap.xml).
- Solicita indexación o inspecciona URLs.
- Verifica que `og:image` y meta tags se muestren correctamente.

6) Opcional: configurar dominio propio
- En Netlify/Vercel/GitHub Pages añade tu dominio y sigue las instrucciones de DNS.
- Asegúrate de habilitar HTTPS (Let's Encrypt se configura automáticamente en la mayoría de providers).

7) Notas finales
- Si quieres, preparo un `netlify.toml` y `CNAME` para tu dominio.
- Si me indicas el provider que vas a usar (Netlify, Vercel, GitHub Pages), puedo generar la configuración exacta y los pasos detallados.

---

Flujo recomendado: primero GitHub Pages, luego migrar a Vercel

A) Subir a GitHub y publicar con GitHub Pages

- Inicializar repo (si no lo has hecho):

```powershell
cd C:\delta.studio
git init
git add .
git commit -m "Initial site commit"
git branch -M main
# Crea un repo vacío en GitHub y reemplaza la URL
git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
git push -u origin main
```

- En GitHub: Settings → Pages → Source: `main` branch, carpeta: `/ (root)` → Save.
- GitHub Pages publicará en `https://TU_USUARIO.github.io/TU_REPO/` en unos minutos.

B) Verificar en GitHub Pages

- Revisa que `index.html` cargue, que `sitemap.xml` y `robots.txt` estén accesibles. Ejemplo: 
	- `https://TU_USUARIO.github.io/TU_REPO/sitemap.xml`
	- `https://TU_USUARIO.github.io/TU_REPO/robots.txt`
- Añade el sitio a Google Search Console (usa la URL de GitHub Pages) y envía el sitemap.

C) Migrar a Vercel (importar desde GitHub)

- En Vercel (https://vercel.com), haz "New Project" → Import from GitHub → selecciona el repo.
- Framework: "Other" (sitio estático). Build & Output: deja vacío si no hay build.
- Vercel desplegará inmediatamente la rama `main`.
- Verifica que el sitio en Vercel funcione y que los assets (favicón, sitemap, robots) se sirvan correctamente.

D) Opcional: Apuntar dominio personalizado a Vercel

- En Vercel añade el dominio y sigue las indicaciones de DNS. Vercel provee HTTPS automático.
- Si ya tenías un dominio apuntando a GitHub Pages, cambia los registros DNS hacia Vercel según sus instrucciones.

E) Notas sobre SEO y Search Console

- Después de migrar a Vercel actualiza la URL en Search Console (añade la nueva propiedad) y vuelve a enviar el sitemap.
- Usa Lighthouse para comparar rendimiento antes/después y anota mejoras.

Si quieres puedo:
- Crear el repo en GitHub por ti (necesito que me proporciones la URL o permiso) o te doy los comandos para hacerlo.
- Configurar `vercel.json` básico si luego quieres funciones o rewrites.
