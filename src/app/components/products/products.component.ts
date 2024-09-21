import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { product } from '../../core/interfaces/product';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { ProductsService } from '../../core/services/products.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,FormsModule,SearchPipe,TranslateModule,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit,OnDestroy{
  searchTitle:string='';
  allProducts:product[]=[];
  wishlistItems: string[] = [];
  cancelSubscriptions:Subscription=new Subscription();

  
  constructor(
    private _ProductsService:ProductsService, 
    private token:AuthService,
    private _CartService:CartService,
    private _WishlistService:WishlistService,
    private toastr: ToastrService){

    this.token.saveUserData();
  }

  getProducts(){
    const cancel22Subscription=this._ProductsService.getProducts().subscribe({
      next:(res)=>
      {
        this.allProducts=res.data;
      }
    })
    this.cancelSubscriptions.add(cancel22Subscription);
  }

  addProductToCart(productId:string){
    const cancelSubscription=this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        this._CartService.carCounter.next(res.numOfCartItems);
        this.toastr.success('Product added successfully','',{
          timeOut:1000,
        })
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }

  addProductToWishlist(productId:string){
    const cancelSubscription=this._WishlistService.addProductToWishlist(productId).subscribe({
      next:(res)=>{
        this.wishlistItems.push(productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this._WishlistService.wishlistCounter.next(res.data.length);
        this.toastr.success('Product added successfully to your wishlist','',{
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:1000,
        })
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }

  removeWishlistItem(productId:string){
    const cancelSubscription=this._WishlistService.removeWishlistItem(productId).subscribe({
      next:(res)=>{
        this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this._WishlistService.wishlistCounter.next(res.data.length);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
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
    this.cancelSubscriptions.unsubscribe();
  }
}
