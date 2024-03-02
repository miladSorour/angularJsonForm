import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyjson'
})
export class PrettyJsonPipe implements PipeTransform {

  transform(val: any) {
    return JSON.stringify(val, null, 2)
      .replace(' ', '&nbsp;')
      .replace('\n', '<br/>');
  }
}
