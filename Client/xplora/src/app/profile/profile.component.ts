import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  userlist: any;
  user: any;
  // profileUpdateForm!: FormGroup;
  ProfileForm!: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder) {
    // this.profileUpdateForm = this.fb.group({
    //   userName: ['', Validators.required],
    // });
    this.ProfileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUserProfile();
    this.ProfileForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', Validators.required],
    });

  }

  getUserProfile() {
    this.userService.fetchuserProfile()?.subscribe((response) => {
      //console.log(response);
      this.userlist = response;
      console.log(this.userlist.info);
      this.user = this.userlist.info;
      //console.log(this.user);
      this.ProfileForm.patchValue({
        userName: this.userlist.info.userName,
        email: this.userlist.info.email,
      });
    });
  }
  updateProfile() {
    if (this.ProfileForm.valid) { 
      const userDetails = this.ProfileForm.value

      userDetails.userID = this.user.userID

      console.log(userDetails);
      
      this.userService.updateUserProfile(userDetails).subscribe((response) => {
        console.log(response);
        
      })
      this.getUserProfile();
    }
  }
  // showForm = false;
  // hideForm() {
  //   this.showForm = false;
  // }

  // saveChanges(userID: string) {
  //   console.log(userID);
  //   if (this.profileUpdateForm.valid) {
  //     const userData = {
  //       userID: userID,
  //       userName: this.profileUpdateForm.value.userName,
  //     };

  //     this.userService.updateUserProfile(userData).subscribe((response) => {
  //       console.log('User profile updated successfully:', response);
  //       // Add any additional logic or feedback messages as needed
  //     });

  //     this.getUserProfile();
  //   }
  // }
}
