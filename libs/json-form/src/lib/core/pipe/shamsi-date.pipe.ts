import { Pipe, PipeTransform } from '@angular/core';
import moment from 'jalali-moment';

/**
 * Information:
 * 		If you want use a pipe like number pipe (DecimalPipe) dynamically you can use DynamicPipe to do that
 * How do that:
 * 		1. you should declare your pipe and your pipe arguments in your component
 * 				import {DecimalPipe} from '@angular/common';
 * 				myPipe = DecimalPipe;
 * 				myPipeArgs = ['3.3', 'en_US'];
 * 		2. you should add DecimalPipe in providers in core.module.ts
 * 				providers: [
 * 					DecimalPipe
 * 					]
 * 		3. your html should be like this
 * 				{{entity.number | dynamicPipe: myPipe: myPipeArgs}}
 */

@Pipe({
  name: 'shamsiDate'
})

export class ShamsiDatePipe implements PipeTransform {

  transform(value: any): any {
    return moment(value, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD');
  }
}
