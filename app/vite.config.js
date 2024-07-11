// vite.config.js / vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite'
import { SvelteKitPWA } from '@vite-pwa/sveltekit'

export default {
	plugins: [
		sveltekit(),
		SvelteKitPWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.png', 'logo.png', 'favicon.svg', 'logo.svg'],
			manifest: {
				"name": "Docket",
				"short_name": "docket",
				"start_url": "/",
				"display": "standalone",
				"display_override": [
					"window-controls-overlay",
					"standalone",
					"browser"
				],
				"description": "Your personal todo app",
				"lang": " The default language of your application",
				"dir": "auto",
				"theme_color": "#facc15",
				"background_color": "#000000",
				"orientation": "any",
				"icons": [
					{
						"src": "manifest-icon-192.maskable.png",
						"sizes": "192x192",
						"type": "image/png",
						"purpose": "any"
					},
					{
						"src": "manifest-icon-192.maskable.png",
						"sizes": "192x192",
						"type": "image/png",
						"purpose": "maskable"
					},
					{
						"src": "manifest-icon-512.maskable.png",
						"sizes": "512x512",
						"type": "image/png",
						"purpose": "any"
					},
					{
						"src": "manifest-icon-512.maskable.png",
						"sizes": "512x512",
						"type": "image/png",
						"purpose": "maskable"
					}
				],
				"screenshots": [
					{
						"src": "https://www.pwabuilder.com/assets/screenshots/screen1.png",
						"sizes": "2880x1800",
						"type": "image/png",
						"description": "A screenshot of the home page"
					}
				],
				"related_applications": [
					{
						"platform": "windows",
						"url": "https://proud-sky-06bcc9910.5.azurestaticapps.net"
					}
				],
				"prefer_related_applications": false,
				"shortcuts": [
					{
						"name": "The name you would like to be displayed for your shortcut",
						"url": "https://proud-sky-06bcc9910.5.azurestaticapps.net",
						"description": "A description of the functionality of this shortcut"
					}
				]
			}
		}
		)
	]
}