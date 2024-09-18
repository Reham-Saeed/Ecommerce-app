import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order } from '../../core/interfaces/order';
import { DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [DatePipe,TranslateModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
 private readonly _OrderService=inject(OrderService);
 private readonly _AuthService=inject(AuthService);
 
 allOrders:Order[]=[]
 order!: Order;
 userId:string="";
 getUserOrders(){
   this._OrderService.getUserOrders(this.userId).subscribe({
    next:(res)=>{
      console.log(res);
      this.allOrders = res as Order[];
      this.order=this.allOrders[this.allOrders.length-1];
    }
   })
 }
 ngOnInit(): void {
  this._AuthService.saveUserData()
  this._AuthService.userId.subscribe({
   next:(userId)=>{
     this.userId=userId;
   }
 })
 this.getUserOrders();
}
 
}
