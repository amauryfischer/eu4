import db from "@/app/db"
import ResourcesService from "@/services/ResourcesService"

const MULTIPLIER = process.env.FAST === "true" ? 10 : 1

const syncDataPlanet = async () => {
	const planets = await db.planet.findMany()
	planets.forEach(async (planet) => {
		const lastPlanetSync = planet.lastSync
		const parsedLastPlanetSync = Date.parse(lastPlanetSync || "0")
		if (Date.now() - parsedLastPlanetSync > 15000) {
			// if last sync is more than 1 minute ago
			// update syncDate
			await db.planet.update({
				where: {
					id: planet.id
				},
				data: {
					lastSync: new Date().toISOString(),
					resources: {
						// add 50k for each minute
						Titane:
							planet.resources.Titane +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Titane * 100 * MULTIPLIER,
								level: planet?.mines?.Titane || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Cuivre:
							planet.resources.Cuivre +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Cuivre * 100 * MULTIPLIER,
								level: planet?.mines?.Cuivre || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Fer:
							planet.resources.Fer +
							(ResourcesService.calculateResourceSpeed({
								percentage: planet?.resourcesMultiplier?.Fer * 100 * MULTIPLIER,
								level: planet?.mines?.Fer || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Aluminium:
							planet.resources.Aluminium +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Aluminium * 100 * MULTIPLIER,
								level: planet?.mines?.Aluminium || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Silicium:
							planet.resources.Silicium +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Silicium * 100 * MULTIPLIER,
								level: planet?.mines?.Silicium || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Uranium:
							planet.resources.Uranium +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Uranium * 100 * MULTIPLIER,
								level: planet?.mines?.Uranium || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Azote:
							planet.resources.Azote +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Azote * 100 * MULTIPLIER,
								level: planet?.mines?.Azote || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000,
						Hydrogène:
							planet.resources.Hydrogène +
							(ResourcesService.calculateResourceSpeed({
								percentage:
									planet?.resourcesMultiplier?.Hydrogène * 100 * MULTIPLIER,
								level: planet?.mines?.Hydrogène || 1
							}) *
								(Date.now() - parsedLastPlanetSync)) /
								60_000
					}
				}
			})
		}
	})
}

export default syncDataPlanet
