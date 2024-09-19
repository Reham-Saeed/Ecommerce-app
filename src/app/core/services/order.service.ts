import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) {}
  checkoutSession(cartId: string, shippingAddress: object): Observable<any> {
    return this._HttpClient.post(
      `${baseUrl}api/v1/orders/checkout-session/${cartId}?url=https://ecommerce-app-six-flame.vercel.app/`,
      { shippingAddress }
    );
  }
  getUserOrders(userId: string) {
    return this._HttpClient.get(`${baseUrl}api/v1/orders/user/${userId}`);
  }
}
