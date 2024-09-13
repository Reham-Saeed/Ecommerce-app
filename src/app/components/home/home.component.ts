import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/product';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CategoriesSliderComponent } from "./categories-slider/categories-slider.component";
import { MainSliderComponent } from "./main-slider/main-slider.component";
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CategoriesSliderComponent, MainSliderComponent,FormsModule,SearchPipe,NgClass,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy{
  searchTitle:string='';
  allProducts:product[]=[];
  wishlistItems: string[] = [];
  cancleSubscriptions:Subscription=new Subscription();

  constructor(
    private _ProductsService:ProductsService, 
    private token:AuthService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private toastr: ToastrService){

    this.token.saveUserData();
  }
  getProducts(){
    const cancleSubscription=this._ProductsService.getProducts().subscribe({
      next:(res)=>
      {
        this.allProducts=res.data;
        console.log(res.data);
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
  }
  addProductToCart(productId:string){
    const cancleSubscription=this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        console.log(res);
        this._CartService.carCounter.next(res.numOfCartItems);
        this.toastr.success('Product added successfully','',{
          timeOut:1000,
        })
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
  }
  addProductToWishlist(productId:string){
    const cancleSubscription=this._WishlistService.addProductToWishlist(productId).subscribe({
      next:(res)=>{
        console.log(res.data.length);
        this.wishlistItems.push(productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this._WishlistService.wishlistCounter.next(res.data.length);
        this.toastr.success('Product added successfully to your wishlist','',{
          timeOut:1000,
        })
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
  }
  removeWishlistItem(productId:string){
    const cancleSubscription=this._WishlistService.removeWishlistItem(productId).subscribe({
      next:(res)=>{
        this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this._WishlistService.wishlistCounter.next(res.data.length);
        console.log(res);
      }
    })
    this.cancleSubscriptions.add(cancleSubscription);
  }
  toggleIcon(productId:string): void {
    if(this.wishlistItems.includes(productId)){
      this.removeWishlistItem(productId);
    }
    else{
      this.addProductToWishlist(productId);
    }
  }
  isProductInWishlist(productId: string): boolean {
    return this.wishlistItems.includes(productId);
  }

  ngOnInit(): void {
    this.getProducts();
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
      this.wishlistItems = JSON.parse(storedWishlist);
    }
  }
  ngOnDestroy():void{
    this.cancleSubscriptions.unsubscribe();
  }
}
