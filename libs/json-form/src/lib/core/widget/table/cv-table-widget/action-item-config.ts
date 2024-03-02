export class ActionItemConfig {
  id?: any
	tooltip?: string;
	icon?: any;
	onClick: any;
	disabled?: any;
	color?: 'primary' | 'accent' | 'warn' | any;
	src?: string;
	hide?: any;
	type?: ActionType;
  class?: any = '';
  title?: string;
  hasAuthority?:()=> string | string[] | undefined;
}

export enum ActionType {
	normal,
	image,
  inlineTableButton,
  dropDownButton
}
