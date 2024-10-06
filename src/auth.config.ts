import db from "@/app/db"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Authentik from "next-auth/providers/authentik"
import type { NextAuthConfig } from "next-auth"
import { IPlanet } from "./type/data/IPlanet"
import { generateInitialValues } from "./server/initialData"

// Notice this is only an object, not a full Auth.js instance
export default {
	providers: [
		GitHub,
		Google({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET
		})
		// Authentik({
		// 	name: "EU4 registration portal",
		// 	style: {
		// 		logo: "/favicon.ico"
		// 	}
		// })
	],
	callbacks: {
		authorized: async ({ auth }) => {
			// Logged in users are authenticated, otherwise redirect to login page
			return !!auth
		}
	},
	events: {
		createUser: async ({ user }) => {
			console.log("👤 New user created:", user.id)
			let allPlanets = await db.planet.findMany()
			if (allPlanets.length === 0) {
				// if no planets are found, initialize the game
				console.log("🌍 No planets found, initializing game")
				await generateInitialValues()
				allPlanets = await db.planet.findMany()
			}
			// Find a random planet without a user
			const randomPlanet = allPlanets.find(
				(planet: IPlanet) => planet.userId === null
			)
			if (!randomPlanet) {
				console.log(allPlanets)
				throw new Error("No planet without user found")
			}
			console.log("🌍 Setting user to planet", randomPlanet.id)

			await db.planet.update({
				where: {
					id: randomPlanet.id
				},
				data: {
					userId: user.id
				}
			})
		}
	}
} satisfies NextAuthConfig
