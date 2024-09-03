import db from "@/app/db"

export const generateInitialValues = async () => {
	const types = [
		"atmo",
		"ceres",
		"earth",
		"eris",
		"fictio",
		"haumea",
		"jupiter",
		"mars",
		"mercury",
		"moon",
		"neptune",
		"saturn",
		"uranus",
		"venus"
	]
	const available_resources = [
		"Titane",
		"Cuivre",
		"Fer",
		"Azote",
		"Uranium",
		"Silicium",
		"Hydrogène",
		"Aluminium"
	]

	// 7 random planets
	const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	const promises = array.map(async (arEl) => {
		const randomType = types[Math.floor(Math.random() * types.length)]
		console.log("generating a planet of type", randomType)
		const resourcesMultiplier = {} as Record<string, number>
		// between 0.1 and 1
		available_resources.forEach((el) => {
			resourcesMultiplier[el] =
				Math.floor((Math.random() * 0.9 + 0.1) * 100) / 100
		})

		const generateCoordinatesOnEllipse = (a: number, b: number) => {
			const theta = Math.random() * 2 * Math.PI
			const r = Math.sqrt(Math.random())
			const x = a * r * Math.cos(theta)
			const y = b * r * Math.sin(theta)
			return [Math.floor(x), 0, Math.floor(y)]
		}

		const asteroidResources = {}
		available_resources.forEach((el) => {
			asteroidResources[el] = Math.floor(Math.random() * 100000)
		})
		await db.asteroid.create({
			data: {
				position: {
					system: 1237,
					systemPosition: {
						x: Math.floor(Math.random() * 100) - 50,
						y: Math.floor(Math.random() * 100) - 50,
						z: Math.floor(Math.random() * 100) - 50
					}
				},
				resources: asteroidResources
			}
		})
		const [x, y, z] = generateCoordinatesOnEllipse(50, 50)
		await db.planet.create({
			data: {
				name: randomType.charAt(0).toUpperCase() + randomType.slice(1),
				position: {
					system: 1237,
					systemPosition: {
						x,
						y,
						z
					}
				},
				resources: {},
				resourcesMultiplier,
				mines: Object.fromEntries(available_resources.map((el) => [el, 1])),
				type: randomType,
				userId: arEl === 1 ? "1" : undefined
			}
		})

		await db.pirate.create({
			data: {
				position: {
					system: 1237,
					systemPosition: {
						x: Math.floor(Math.random() * 100) - 50,
						y: Math.floor(Math.random() * 100) - 50,
						z: Math.floor(Math.random() * 100) - 50
					}
				},
				name: `Pirate ${Math.floor(Math.random() * 100).toString()}`,
				level: Math.floor(Math.random() * 100)
			}
		})
	})
	await db.user.create({
		data: {
			username: "admin",
			password: "admin",
			email: "admin@eu4.com",
			research: []
		}
	})
	await Promise.all(promises)
}
