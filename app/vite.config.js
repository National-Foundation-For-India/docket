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
			"display_override":  "window-controls-overlay",
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
					"url": " The URL to your app in that app store"
				}
			],
			"prefer_related_applications": false,
			"shortcuts": [
				{
					"name": "The name you would like to be displayed for your shortcut",
					"url": "The url you would like to open when the user chooses this shortcut. This must be a URL local to your PWA. For example: If my start_url is /, this URL must be something like /shortcut",
					"description": "A description of the functionality of this shortcut"
				}
			]
		}
	}
	)
  ]
}