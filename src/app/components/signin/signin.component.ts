import { Component,inject} from '@angular/core';
import { AlertErrorComponent } from "../../shared/ui/alert-error/alert-error.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { confirmPassword } from '../../shared/utils/confirm-password.utils';
import { signupValidators } from '../../shared/validators/register.validators';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [AlertErrorComponent,ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  isButton:boolean=false;
  errorMessage:string="";

  private readonly _FormBuilder= inject(FormBuilder);
  private readonly _AuthService= inject(AuthService);
  private readonly _Router=inject(Router);

  login:FormGroup=this._FormBuilder.group({
    email:[null, signupValidators.email],
    password:[null, signupValidators.password],
  })

  sendData(){
   this.isButton=true;
   if(this.login.valid){
    this._AuthService.signin(this.login.value).subscribe({
      next:(res)=>{
        console.log(res);
        localStorage.setItem('token',res.token);
        this._AuthService.saveUserData();
        this.isButton=false;
        this._Router.navigate(['/home']);
      },
      error:(err:HttpErrorResponse)=>{
        this.errorMessage=err.error.message;
        this.isButton=false;
      }
    })
   }
  }
}

