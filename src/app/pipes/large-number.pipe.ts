import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeNumber'
})
export class LargeNumberPipe implements PipeTransform {

  transform(value: number): string {
  
      if (value > 999999) {
          return (value / 1000000).toFixed(1) + "M";
        }
        if (value > 9999) {
          return (value / 1000).toFixed(1) + "K";
        }
        else {
          return value+"";
        }
    
  }

}
