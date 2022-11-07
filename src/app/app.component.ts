import { Component,OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private formBuilder: FormBuilder){}
  genders = ['male', 'female'];
  signinForm:FormGroup;
  ngOnInit(){
    // this.signupForm = new FormGroup({
    //   // 'userData'  : new FormControl({
    //     'username': new FormControl(null, Validators.required),
    //     'email'   : new FormControl(null, [Validators.required, Validators.email]),
    //   // }),
    //   'gender': new FormControl('male'),
    //   'hobbies': new FormArray([]),
    // })


    this.signinForm = this.formBuilder.group({
       username        : [null,[Validators.required,Validators.minLength(4)]],
       email           : [null,[Validators.required,Validators.email]],
       password        : [null,[Validators.required]],
       conform_password: [null,[Validators.required]],
    }, { validator: this.passwordConfirming('password','conform_password')})

  }


  get f(){
    return this.signinForm.controls;
  }

  get username() { return this.signinForm.get('username') };
  get email() { return this.signinForm.get('email') };
  get password() { return this.signinForm.get('password') };
  get conpassword() { 
    return this.signinForm.get('conform_password') 
  };

  submitForm(){
    let email = this.signinForm.get('email') 
    let pass = this.signinForm.get('password');
    let conPass = this.signinForm.get('conform_password') 
    console.log(email);
    console.log(pass);
    console.log(conPass);
    console.log(this.signinForm)
  }

  passwordConfirming(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control         = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
          return;
      }
      if (control.value !== matchingControl.value) {
          matchingControl.setErrors({ confirmedValidator: true });
      } else {
          matchingControl.setErrors(null);
      }
  }

    // return c.get('password').value === c.get('conform_password').value ? null : { 'mismatch':true }
    // if (c.get('password').value === c.get('confirm_password').value) {
    //   return null
    // }else{
    //   return {'invalid': true};
    // }
  }


//   buildForm(): void {
//     this.userForm = this.formBuilder.group({
//         passwords: this.formBuilder.group({
//             password: ['', [Validators.required]],
//             confirm_password: ['', [Validators.required]],
//         }, {validator: this.passwordConfirming}),

//     });
// }
    
  // onSubmit(){
  //   console.log(this.signupForm)
  // }
  // addHobbies(){
  //   let control = new FormControl(null, Validators.required);
  //   (<FormArray>this.signupForm.get('hobbies')).push(control);
  // }

  // getControls() {
  //   return (<FormArray>this.signupForm.get('hobbies')).controls;
  // }

}
