import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'confirmPassword'
})
export class ConfirmPasswordPipe implements PipeTransform {

  transform(password: string, cnpassword): boolean {
    return password === cnpassword;
  }

}
