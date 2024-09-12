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
	const typeCount = {} as Record<string, number>
	const promises = array.map(async (arEl) => {
		const randomType = types[Math.floor(Math.random() * types.length)]
		typeCount[randomType] = (typeCount[randomType] || 0) + 1
		const typeSuffix =
			typeCount[randomType] > 1 ? ` ${romanize(typeCount[randomType])}` : ""
		const planetName =
			randomType.charAt(0).toUpperCase() + randomType.slice(1) + typeSuffix
		console.log("🌍 generating a planet of type", planetName)
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
				name: planetName,
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
				type: randomType
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
	await Promise.all(promises)
}

// Helper function to convert numbers to Roman numerals
function romanize(num: number): string {
	const romanNumerals = [
		{ value: 10, numeral: "X" },
		{ value: 9, numeral: "IX" },
		{ value: 5, numeral: "V" },
		{ value: 4, numeral: "IV" },
		{ value: 1, numeral: "I" }
	]

	let result = ""
	for (const { value, numeral } of romanNumerals) {
		while (num >= value) {
			result += numeral
			num -= value
		}
	}
	return result
}
