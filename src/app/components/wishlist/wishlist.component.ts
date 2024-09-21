import { Component, inject } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { Wishlist } from '../../core/interfaces/wishlist';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  wishlistItems: string[]=[];
  wishlist!:Wishlist;
  cancelSubscriptions:Subscription=new Subscription();

  private readonly _WishlistService=inject(WishlistService);
  private readonly _CartService=inject(CartService);
  private readonly toastr=inject(ToastrService);

  addProductToCart(productId:string){
    const cancelSubscription=this._CartService.addProductToCart(productId).subscribe({
      next:(res)=>{
        this.removeWishlistItem(productId);
        this._CartService.carCounter.next(res.numOfCartItems);
        this.toastr.success('Product added successfully','',{
          timeOut:1000,
        })
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  
  getLoggedUserWishlist(){
    const cancelSubscription=this._WishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.wishlist=res;
        this._WishlistService.wishlistCounter.next(res.count);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  removeWishlistItem(productId: string) {
    const cancelSubscription = this._WishlistService.removeWishlistItem(productId).subscribe({
      next: (res) => {
        this.wishlistItems = this.wishlistItems.filter(id => id !== productId);
        localStorage.setItem('wishlistItems', JSON.stringify(this.wishlistItems));
        this.getLoggedUserWishlist();
        this._WishlistService.wishlistCounter.next(res.count);
      }
    });
    this.cancelSubscriptions.add(cancelSubscription);
  }
  
  ngOnInit(): void {
    const storedWishlistItems = localStorage.getItem('wishlistItems');
    this.wishlistItems = storedWishlistItems ? JSON.parse(storedWishlistItems) : [];
    this.getLoggedUserWishlist();
  }
  
  ngOnDestroy():void{
    this.cancelSubscriptions.unsubscribe();
  }
}
