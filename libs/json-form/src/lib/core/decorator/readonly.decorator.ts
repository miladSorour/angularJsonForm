/**
 * ReadOnly Annotation
 * ===================
 * @author Soheil_Zhale
 * @date 2022.06.22
 * @description you use this annotation to make your function readonly (final)
 */

export function ReadOnlyDecorator() {
	return (target: any, key: string, descriptor: PropertyDescriptor) => {
		descriptor.configurable = false;
		descriptor.writable = false;
		descriptor.enumerable = false;
	};
}
