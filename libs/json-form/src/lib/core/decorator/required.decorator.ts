export function RequiredDecorator(target: object, propertyKey: string) {
	Object.defineProperty(target, propertyKey, {
		get() {
			throw new Error(`@input() ${propertyKey} is required`);
		},
		set(value) {
			Object.defineProperty(target, propertyKey, {
				value,
				writable: true,
				configurable: true,
			});
		},
		configurable: true
	});
}
