import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-main-navbar',
  standalone: true,
  imports: [NgClass,RouterLink,RouterLinkActive,TranslateModule],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss'
})
export class MainNavbarComponent implements OnInit{
  private readonly _CartService=inject(CartService);
  private readonly _WishlistService=inject(WishlistService);
  private readonly _TranslationService=inject(TranslationService);
  private readonly _Router=inject(Router);
  readonly _TranslateService=inject(TranslateService);

  isMenuOpen: boolean = false;
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  } 
  toggleLang(): void {
    const newLang = this._TranslateService.currentLang === 'en' ? 'ar' : 'en';
    this.selectLang(newLang);
  }
  selectLang(lang: string): void {
    this._TranslationService.changeLang(lang);
  }

  cartCounter:number=0;
  wishlistCounter:number=0;
  cancelSubscriptions:Subscription=new Subscription();

  getLoggedUserCart(){
    const cancelSubscription=this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this._CartService.carCounter.next(res.numOfCartItems);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }

  getLoggedUserWishlist(){
    const cancelSubscription=this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this._WishlistService.wishlistCounter.next(res.count);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  logout(){
    this._Router.navigate(['/signin']);
    localStorage.removeItem('token');
  }

  ngOnInit(): void {
    this.getLoggedUserCart();
    this.getLoggedUserWishlist();
    this._TranslationService.changeDirection();
    this._CartService.carCounter.subscribe({
      next:(counter)=>{
        this.cartCounter=counter;
      }
    })
    this._WishlistService.wishlistCounter.subscribe({
      next:(counter)=>{
        this.wishlistCounter=counter;
      }
    })
  }
  toggleLangAndMenu() {
    this.toggleLang();
    this.toggleMenu();
  }
  ngOnDestroy():void{
    this.cancelSubscriptions.unsubscribe();
  }

}
