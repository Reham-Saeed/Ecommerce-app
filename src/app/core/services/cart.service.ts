import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  carCounter: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}
  
  addProductToCart(productId: string): Observable<any> {
    return this._HttpClient.post(`${baseUrl}api/v1/cart`, { productId });
  }
  updateCartProductQTY(productId: string, count: number): Observable<any> {
    return this._HttpClient.put(`${baseUrl}api/v1/cart/${productId}`, {count});
  }
  getLoggedUserCart(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}api/v1/cart`);
  }
  removeCartItem(productId: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart/${productId}`);
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}api/v1/cart`);
  }
}
