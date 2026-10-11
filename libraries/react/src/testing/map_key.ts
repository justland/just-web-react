export function mapKey<S extends object, R>(subject: S, predicate: (key: keyof S) => R): R[] {
	return (Object.keys(subject) as Array<keyof S>).map(predicate)
}
