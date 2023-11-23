import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../service/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  showSuccessMessage = false;

  constructor(private register: RegisterService, private router: Router) {
    this.registrationForm = new FormGroup({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone_no: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  registerNewUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm);
      this.register.registerNewUser(this.registrationForm.value).then(() => {
        // Show success message
        this.showSuccessMessage = true;

        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigate(['login']);
        }, 3000);
      });
    }
  }
}
