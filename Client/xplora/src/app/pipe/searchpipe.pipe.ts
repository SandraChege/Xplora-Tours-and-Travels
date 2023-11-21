import { Pipe, PipeTransform } from '@angular/core';
import { AllUserDetails } from '../interface/getusers';

@Pipe({
  name: 'searchpipe',
})
export class SearchpipePipe implements PipeTransform {
  transform(allUsers: AllUserDetails[], searchtext: string): AllUserDetails[] {
     if (!allUsers || searchtext == '') {
       return allUsers;
     }
     const filtered: AllUserDetails[] = [];
     for (let user of allUsers) {
       if (user.email.toLowerCase().includes(searchtext.toLowerCase())) {
         filtered.push(user);
       }
     }
     return filtered;
  }
}
