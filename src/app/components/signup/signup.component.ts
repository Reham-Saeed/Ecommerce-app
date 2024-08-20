import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,AlertErrorComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm:FormGroup=new FormGroup({
    name:new FormControl(null,[Validators.required,Validators.minLength(2),Validators.maxLength(20)]),
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
    rePassword:new FormControl(null),
  },this.confirmPasswoed)

  confirmPasswoed(g:AbstractControl){
    return g.get('password')?.value==g.get('password')?.value? null:{mismatch:true};
  }
  
  sendData(){
   if(this.registerForm.valid){
    console.log(this.registerForm.value)
   }
  }
}
