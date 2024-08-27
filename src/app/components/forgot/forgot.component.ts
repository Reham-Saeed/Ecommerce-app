import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { signupValidators } from '../../shared/validators/register.validators';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";

@Component({
  selector: 'app-forgot',
  standalone: true,
  imports: [ReactiveFormsModule, AlertErrorComponent],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss'
})
export class ForgotComponent implements OnInit{
  isButton:boolean=false;
  errorMessage:string="";
  steps:any=1;
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

  submitStep1(){
   this.isButton=true;
   this.errorMessage="";
   if(this.forgotPassword.valid){
    let email=this.forgotPassword.get('email')?.value;
    this._AuthService.forgotPassword(this.forgotPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.steps=2;
        localStorage.setItem('currentStep',this.steps);
        localStorage.setItem('currentEmail',email);
        this.isButton=false;
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
        this.isButton=false;
      }
    })
   }
  }
  submitStep2(){
   this.isButton=true;
   this.errorMessage="";
   if(this.verifyResetCode.valid){
    this._AuthService.verifyResetCode(this.verifyResetCode.value).subscribe({
      next:(res)=>{
        console.log(res);
        this.steps=3;
        this.isButton=false;
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
        this.isButton=false;
      }
    })
   }
  }
  submitStep3(){
   this.errorMessage="";
   this.isButton=true;
   if(this.resetPassword.valid){
    this._AuthService.resetPassword(this.resetPassword.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this._AuthService.saveUserData();
        localStorage.removeItem('currentStep');
        this._Router.navigate(['/home']);
        this.isButton=false;
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
        this.isButton=false;
      }
    })
   }
  }
  ngOnInit(): void {
    this.steps=localStorage.getItem('currentStep') || 1;
    this.resetPassword.get('email')?.setValue(localStorage.getItem('currentEmail'));
  }
}
