import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { signupValidators } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent,TranslateModule,NgClass],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent implements OnInit,OnDestroy{
  errorMessage:string="";
  steps:any=1;
  cancleSubscriptions:Subscription=new Subscription();
  
  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _AuthService= inject(AuthService);
  private readonly _Router=inject(Router);

  forgotPassword:FormGroup=this._FormBuilder.group({
    email:[null, signupValidators.email],
  })
  verifyResetCode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[Validators.required]],
  })
  resetPassword:FormGroup=this._FormBuilder.group({
    email:[null, signupValidators.email],
    newPassword:[null, signupValidators.password],
  })
  passwordType: string = 'password';
  
  togglePasswordVisibility(): void {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
  }
  submitStep1(){
   this.errorMessage="";
   if(this.forgotPassword.valid){
    let email=this.forgotPassword.get('email')?.value;
    const cancleSubscription=this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.steps=2;
        localStorage.setItem('currentStep',this.steps);
        localStorage.setItem('currentEmail',email);
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
   }
  }
  submitStep2(){
   this.errorMessage="";
   if(this.verifyResetCode.valid){
    const cancleSubscription=this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.steps=3;
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
   }
  }
  submitStep3(){
   this.errorMessage="";
   if(this.resetPassword.valid){
    const cancleSubscription=this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this._AuthService.saveUserData();
        localStorage.removeItem('currentStep');
        this._Router.navigate(['/home']);
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
   }
  }

  ngOnInit(): void {
    this.steps=localStorage.getItem('currentStep') || 1;
    this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'));
  }
  ngOnDestroy():void{
    this.cancleSubscriptions.unsubscribe();
  }
}
