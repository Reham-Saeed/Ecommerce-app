import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Cart } from '../../core/interfaces/cart';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cart!:Cart;
  cancelSubscriptions:Subscription=new Subscription();

  private readonly _CartService=inject(CartService);
  private readonly toastr=inject(ToastrService);

  getLoggedUserCart(){
    const cancelSubscription=this._CartService.getLoggedUserCart().subscribe({
      next:(res)=>{
        this.cart=res;
        console.log(res);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  removeCartItem(productId:string){
    const cancelSubscription=this._CartService.removeCartItem(productId).subscribe({
      next:(res)=>{
        this.cart=res;
        this._CartService.carCounter.next(res.numOfCartItems);
        this.toastr.success('Product deleted successfully','',{
          progressBar:true,
          progressAnimation:'increasing',
          timeOut:1000,
        })
        console.log(res);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  updateCartProductQTY(productId:string,count:number){
    const cancelSubscription=this._CartService.updateCartProductQTY(productId,count).subscribe({
      next:(res)=>{
        this.cart=res;
        this._CartService.carCounter.next(res.numOfCartItems);
        this.toastr.success('Product updated successfully','',{
          timeOut:1000,
        })
        console.log(res);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }
  clearUserCart(){
    const cancelSubscription=this._CartService.clearUserCart().subscribe({
      next:(res)=>{
        this.cart=res;
        this._CartService.carCounter.next(0);
        this.toastr.success('Cart cleared successfully','',{
          timeOut:1000,
        })
        console.log(res);
      }
    })
    this.cancelSubscriptions.add(cancelSubscription);
  }

  ngOnInit(): void {
    this.getLoggedUserCart();
  }
  ngOnDestroy():void{
    this.cancelSubscriptions.unsubscribe();
  }
}
