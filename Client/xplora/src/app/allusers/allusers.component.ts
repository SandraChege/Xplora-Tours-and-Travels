import { Component } from '@angular/core';
import { AllUserDetails } from '../interface/getusers';
import { AdminService } from '../service/admin/admin.service';
// import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css'],
})
export class AllusersComponent {
  allUsers: AllUserDetails[] = [];
  appuser: any;

  constructor(private adminservice: AdminService) {}
  ngOnInit() {
    this.getAllUserDetails();
    //this.deleteUser(userID);
  }

  getAllUserDetails() {
    let res = this.adminservice.fetchAllUsers()?.subscribe((response: any) => {
      //console.log(response);
      //console.log(typeof(response));
      this.allUsers = response.users;
      console.log(this.allUsers);
    });
  }

  deleteUser(userID: string) {
    this.adminservice.deleteuser(userID).subscribe(
      (response: any) => {
        console.log(response);
        this.getAllUserDetails();
      },
      (error:Error) => {
        console.log(error);
      }
    )
  }
}
