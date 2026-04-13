import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import { defineConfig, fontProviders } from "astro/config";
import emdash, { local } from "emdash/astro";
import { libsql } from "emdash/db";

export default defineConfig({
	output: "server",
	adapter: vercel(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			database: libsql({
				url: process.env.LIBSQL_DATABASE_URL || "file:./data.db",
				authToken: process.env.LIBSQL_AUTH_TOKEN,
			}),
			storage: local({
				directory: "./uploads",
				baseUrl: "/_emdash/api/media/file",
			}),
		}),
	],
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Inter",
			cssVariable: "--font-sans",
			weights: [400, 500, 600, 700],
			fallbacks: ["sans-serif"],
		},
		{
			provider: fontProviders.google(),
			name: "JetBrains Mono",
			cssVariable: "--font-mono",
			weights: [400, 500],
			fallbacks: ["monospace"],
		},
	],
	devToolbar: { enabled: false },
});
