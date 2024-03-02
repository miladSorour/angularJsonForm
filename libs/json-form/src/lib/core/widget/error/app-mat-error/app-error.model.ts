/**
 * //TODO explain Functionality of this class
 * Revision History:
 *    Date            Author           Task ID                         Notes
 * ==========   =================   ==============  ===============================================
 * 2021.12.15   m.sorour
 */
export class AppErrorModel {
	name?: string;
	requiredLength?: number;
	actualLength?: number;
}

export class BizErrorModel {
	attrError: FieldErrorVM[];
	bizError: FieldErrorVM;
}

export class FieldErrorVM {
	entityName: string;
	field: string;
	message: string;
	entity = 'FieldErrorVM';
}
