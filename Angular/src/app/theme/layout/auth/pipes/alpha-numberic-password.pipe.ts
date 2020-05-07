import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alphaNumbericPassword'
})
export class AlphaNumbericPasswordPipe implements PipeTransform {

  protected regexPass = /(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
  transform(value: string): boolean {
    if (value.match(this.regexPass)) {
      return true;
    } else {
      return false;
    }
  }

}
