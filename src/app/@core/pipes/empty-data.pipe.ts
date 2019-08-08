import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyData'
})
export class EmptyDataPipe implements PipeTransform {

  transform(value: any, replace: any = '-'): any {
    if(value === undefined || value == null || value === ''){
      return replace;
    }
    return value;
  }

}
