# Deploy instrucctions on GitHub Pages

## File vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/BOE-chatbot-react/", // Añadir esta linea
});
```

## Git y npm commands

```sh
npm installgit add .
npm run build

git add .
git commit -m "message"
git push

npm run deploy

```

# Deploy instrucctions on Render

## File vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/BOE-chatbot-react/", // !¡ quitar esta linea si existe [eso es para una libreria de javascript para gestionar el deploy on gh-pages]
});
```

## Git y npm commands

```sh
npm install
npm run build

git add .
git commit -m "message"
git push


```
