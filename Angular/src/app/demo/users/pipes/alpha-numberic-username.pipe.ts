import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaNumbericUsername'
})
export class AlphaNumbericUsernamePipe implements PipeTransform {

  alphaNumbericRegex = /(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*[^0-9A-Za-z]).+/;
  transform(value: string): boolean {
    if (value.match(this.alphaNumbericRegex)) {
      return true;
    } else {
      return false;
    }
  }

}
