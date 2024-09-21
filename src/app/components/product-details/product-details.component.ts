import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/product';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [NgClass,TranslateModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!:product;
  wishlistItems: string[]=[];
  cancleSubscriptions:Subscription=new Subscription();

  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  private readonly _CartService=inject(CartService);
  private _WishlistService=inject(WishlistService);
  private readonly  toastr=inject(ToastrService);

  addProductToCart(productId:string){
    const cancleSubscription=this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
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
    this.cancleSubscriptions.add(cancleSubscription);
  }
  removeWishlistItem(productId:string){
    const cancleSubscription=this._WishlistService.removeWishlistItem(productId).subscribe({
      next:(res)=>{
        this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this._WishlistService.wishlistCounter.next(res.data.length);
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
    let id:string|null="";
    const cancleSubscription1=this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        id=param.get('id');
      }
    })
    this.cancleSubscriptions.add(cancleSubscription1);

    const cancleSubscription2=this._ProductsService.getProduct(id).subscribe({
       next:(res)=>{
         this.product=res.data;
       }
    })
    this.cancleSubscriptions.add(cancleSubscription2);
    const storedWishlist = localStorage.getItem('wishlistItems');
    if (storedWishlist) {
      this.wishlistItems = JSON.parse(storedWishlist);
    }
  }
  ngOnDestroy():void{
    this.cancleSubscriptions.unsubscribe();
  }

  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots:true,
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
