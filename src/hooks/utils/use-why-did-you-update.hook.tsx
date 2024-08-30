import { useEffect, useRef } from "react"
import _ from "lodash"

export default function useWhyDidYouUpdate(name, props) {
	// Get a mutable ref object where we can store props ...
	// ... for comparison next time this hook runs.
	const previousProps = useRef() as any

	useEffect(() => {
		if (previousProps.current) {
			// Get all keys from previous and current props
			const allKeys = Object.keys({ ...previousProps.current, ...props })
			// Use this object to keep track of changed props
			const changesObj = {}
			// Iterate through keys
			allKeys.forEach((key) => {
				// If previous is different from current
				if (previousProps.current[key] !== props[key]) {
					// Add to changesObj
					changesObj[key] = {
						from: previousProps.current[key],
						to: props[key],
						diff: !_.isEqual(previousProps.current[key], props[key]),
					}
				}
			})

			// If changesObj not empty then output to console
			if (Object.keys(changesObj).length) {
				console.log("%c[why-did-you-update]", "color:purple", name, changesObj)
			}
		}

		// Finally update previousProps with current props for next hook call
		previousProps.current = props
	})
}
