import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import tailwindcss from '@tailwindcss/vite'
// import basicSsl from '@vitejs/plugin-basic-ssl';
// import { readFileSync } from 'fs'
// import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.png',
        'favicon.jpg',
        'offline.html',
        'robots.txt',
        '/icons/icon-192x192.png',
        '/icons/icon-256x256.png',
        '/icons/icon-384x384.png',
        '/icons/icon-512x512.png'
      ],
      manifest: {
        name: 'Fox',
        short_name: 'Fox',
        description: "Service d'ingénierie informatique spécialisé en développement web, mobile, desktop et sécurité informatique.",
        theme_color: '#FFFFFF',
        background_color: '#121212',
        display: 'standalone',
        icons: [
          { "src": "/icons/icon-192x192.png", "sizes": "192x192", "type": "image/png", "purpose": "any maskable" },
          { "src": "/icons/icon-256x256.png", "sizes": "256x256", "type": "image/png", "purpose": "any maskable" },
          { "src": "/icons/icon-384x384.png", "sizes": "384x384", "type": "image/png", "purpose": "any maskable" },
          { "src": "/icons/icon-512x512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" }
        ],
        screenshots: [
          {
            "src": "/screenshots/0.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Page d'accueil de Fox Dev"
          },
          {
            "src": "/screenshots/1.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Portfolio de projets Fox"
          },
          {
            "src": "/screenshots/2.png",
            "sizes": "1280x720",
            "type": "image/png",
            "form_factor": "wide",
            "label": "Blog articles Fox Dev"
          }
        ],
        related_applications: [
          {
            "platform": "windows",
            "url": "https://foxy-blue-light.the-fox.tech",
            "id": "FoxyBlueLight"
          },
          {
            "platform": "chrome",
            "url": "https://yt-learn.the-fox.tech",
            "id": "YtLearn"
          }
        ],
        shortcuts: [
          {
            "name": "Blog",
            "short_name": "Blog",
            "description": "Articles et tutoriels de Fox",
            "url": "/blog",
            "icons": [{ "src": "/icons/icon-192x192.png", "sizes": "192x192" }]
          },
          {
            "name": "Projets",
            "short_name": "Projets",
            "description": "Voir le portfolio de Fox",
            "url": "/projects",
            "icons": [{ "src": "/icons/icon-192x192.png", "sizes": "192x192" }]
          },
          {
            "name": "Contact",
            "short_name": "Contact",
            "description": "Contacter Fox",
            "url": "/contact",
            "icons": [{ "src": "/icons/icon-192x192.png", "sizes": "192x192" }]
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg}'],
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024, // 5 MB
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.spotify\.com\/v1\//,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'spotify-api',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60, // 1 heure
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 an
              },
            },
          },
          {
            urlPattern: /^https:\/\/cdnjs\.cloudflare\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'cdn-libraries',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 jours
              },
            },
          },
        ],
      },
    }),
    tailwindcss(),
    // basicSsl(),
  ],

  build: {
    // Ignorer les avertissements comme variables non utilisées
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorer certains types d'avertissements
        if (warning.code === 'UNUSED_EXTERNAL_IMPORT') return;
        // Transmettre les autres avertissements au gestionnaire par défaut
        warn(warning);
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    // Changez ces paramètres
    host: true, // au lieu de true
    port: 5173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',

    },
    // strictPort: true, // Assure que le port 3000 est utilisé
    // https: {
    //   key: readFileSync(resolve(__dirname, 'localhost+2-key.pem')),
    //   cert: readFileSync(resolve(__dirname, 'localhost+2.pem')),
    // },

  },
  preview: {
    port: 5173,
  },
});