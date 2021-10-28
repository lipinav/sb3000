export function merge<O extends object>(obj: O) {
	return <T extends object>(obj2: T) => ({
		...obj,
		...obj2,
	})
}
