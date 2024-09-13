import { Routes } from '@angular/router';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';
import { ProductsComponent } from './components/products/products.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AddressComponent } from './components/address/address.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { isLoggedInGuard } from './core/guards/is-logged-in.guard';

export const routes: Routes = 
[
 {
  path:'',
  component:AuthLayoutComponent,
  canActivate:[isLoggedInGuard],
  children:[
   {path:'',redirectTo:'signin',pathMatch:'full'},
   {path:'signin',component:SigninComponent,title:'Signin'},
   {path:'signup',component:SignupComponent,title:'Signup'},
   {path:'forgot',component:ForgotComponent,title:'Forgot Password'},
  ]
 },
 {
  path:'',
  component:MainLayoutComponent,
  canActivate:[authGuard],
  children:[
   {path:'',redirectTo:'home',pathMatch:'full'},
   {path:'home',component:HomeComponent,title:'Home'},
   {path:'brands',component:BrandsComponent,title:'Brands'},
   {path:'categories',component:CategoriesComponent,title:'Categories'},
   {path:'products',component:ProductsComponent,title:'Products'},
   {path:'cart',component:CartComponent,title:'Cart'},
   {path:'wishlist',component:WishlistComponent,title:'Wishlist'},
   {path:'details/:id',component:ProductDetailsComponent,title:'Details'},
   {path:'address/:id',component:AddressComponent,title:'Address'},
   {path:'allorders',component:OrdersComponent,title:'orders'},
  ]
 },
 {path:'**',component:NotFoundComponent,title:'Notfound'}
];
