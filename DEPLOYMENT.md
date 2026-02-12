# Deployment Guide

This guide covers deploying Finance Mentor AI to various platforms.

## Table of Contents
- [Vercel](#vercel)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Docker](#docker)

---

## Vercel

Vercel is the recommended platform for deploying this React + Vite application.

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click "Deploy"

### Environment Variables (if needed)

Add in Vercel dashboard under Settings → Environment Variables:
```
VITE_APP_NAME=Finance Mentor AI
VITE_APP_VERSION=1.0.0
```

---

## Netlify

### Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Build the project
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Choose your repository
5. Configure:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Click "Deploy site"

### netlify.toml Configuration

Create a `netlify.toml` file in the root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## GitHub Pages

### Using gh-pages package

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts
"predeploy": "npm run build",
"deploy": "gh-pages -d dist"

# Update vite.config.ts
export default defineConfig({
  base: '/finance-mentor-ai/',
  // ... rest of config
})

# Deploy
npm run deploy
```

### Manual Deployment

```bash
# Build the project
npm run build

# Navigate to dist folder
cd dist

# Initialize git
git init
git add -A
git commit -m 'Deploy'

# Push to gh-pages branch
git push -f git@github.com:username/finance-mentor-ai.git main:gh-pages
```

---

## Docker

### Dockerfile

Create a `Dockerfile` in the root:

```dockerfile
# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf

Create `nginx.conf`:

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run

```bash
# Build Docker image
docker build -t finance-mentor-ai .

# Run container
docker run -p 8080:80 finance-mentor-ai
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

Run with:
```bash
docker-compose up -d
```

---

## Environment Variables

For production deployments, set these environment variables:

```bash
VITE_APP_NAME=Finance Mentor AI
VITE_APP_VERSION=1.0.0
# Add any API keys or configuration here
```

---

## Performance Optimization

### Before Deployment

1. **Optimize Images**: Compress all images
2. **Code Splitting**: Already handled by Vite
3. **Tree Shaking**: Enabled by default in production build
4. **Minification**: Automatic in production build

### After Deployment

1. **Enable Gzip/Brotli compression** on your server
2. **Set up CDN** for static assets
3. **Configure caching headers**
4. **Monitor performance** with Lighthouse

---

## Troubleshooting

### Blank Page After Deployment

- Check browser console for errors
- Verify `base` path in `vite.config.ts`
- Ensure all routes redirect to `index.html`

### 404 on Refresh

- Configure server to redirect all routes to `index.html`
- For Netlify: Use `_redirects` file or `netlify.toml`
- For Vercel: Use `vercel.json` with rewrites

### Build Fails

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)
- Review build logs for specific errors

---

## Post-Deployment Checklist

- [ ] Test all pages and features
- [ ] Verify responsive design on mobile
- [ ] Check browser console for errors
- [ ] Test in multiple browsers
- [ ] Verify all links work
- [ ] Check loading performance
- [ ] Test data persistence (localStorage)
- [ ] Verify all animations work smoothly

---

## Support

For deployment issues, please open an issue on GitHub.
