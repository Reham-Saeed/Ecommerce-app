import { Component, inject, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertErrorComponent } from '../../shared/ui/alert-error/alert-error.component';
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,AlertErrorComponent,NgClass,TranslateModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnDestroy{
  errorMessage:string="";
  cancleSubscription:Subscription=new Subscription();

  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _AuthService=inject(AuthService);
  private readonly _Router=inject(Router);

  register:FormGroup=this._FormBuilder.group({
    name:[null, signupValidators.name],
    email:[null, signupValidators.email],
    password:[null, signupValidators.password],
    rePassword:[null],
  },{validators:[confirmPassword]})
  passwordType: string = 'password';
  
  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  sendData(){
   if(this.register.valid){
    this.cancleSubscription=this._AuthService.signup(this.register.value).subscribe({
      next:(res)=>{
        this._Router.navigate(['/signin']);
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err?.error?.message;
      }
    })
   }
  }
  ngOnDestroy():void{
    this.cancleSubscription.unsubscribe();
  }
}
