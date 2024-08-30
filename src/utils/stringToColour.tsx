const stringToColour2 = (str: string): string => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	const hue = hash % 360
	return `hsl(${hue}, 100%, 30%)`
}

const stringToColour = (str: string): string => {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	const saturation = (hash % 50) + 50
	return `hsl(${hash % 360}, ${saturation}%, 30%)`
}

export default stringToColour
