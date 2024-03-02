/**
 * Primary Key Annotation
 * ======================
 * @author Soheil_Zhale
 * @date 2022.06.22
 * @description you use this annotation for defining PRIMARY KEY in your model.
 * @usage Object.getPrototypeOf(this.yourEntity)[CV_PRIMARY_KEY]; or you cam use getPK method
 */

export function PK(target: any, propertyKey: string) {
	Object.defineProperty(target, CV_PRIMARY_KEY, {
		get(): string {
			return propertyKey;
		}
	});
}

export const CV_PRIMARY_KEY = '__cv_primary_key__';
export function getPK(entity: any): string {
	return Object.getPrototypeOf(entity)[CV_PRIMARY_KEY];
}
