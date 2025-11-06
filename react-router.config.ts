import type { Config } from '@react-router/dev/config';

export default {
	appDirectory: './src/app',
	ssr: true,
	// Prerendering all routes can cause high CPU usage
	// Only prerender specific routes if needed
	// prerender: ['/'],
	// Ignore API routes - they should be handled by Hono, not React Router
	ignoredRouteFiles: ['**/api/**'],
} satisfies Config;
