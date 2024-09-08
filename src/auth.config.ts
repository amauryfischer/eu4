import GitHub from "next-auth/providers/github"
import type { NextAuthConfig } from "next-auth"

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [GitHub],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth
		}
	}
} satisfies NextAuthConfig
