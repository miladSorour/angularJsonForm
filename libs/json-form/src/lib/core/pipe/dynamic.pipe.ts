import {Injector, Pipe, PipeTransform} from '@angular/core';

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
  name: 'dynamicPipe'
})

export class DynamicPipe implements PipeTransform {

  public constructor(
    private injector: Injector) {
  }

  transform(value: any, pipeToken: any, pipeArgs: any[]): any {
    if (!pipeToken) {
      return value;
    } else {
      const pipe = this.injector.get(pipeToken);
      return pipe.transform(value, ...pipeArgs);
    }
  }
}
