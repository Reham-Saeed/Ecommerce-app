import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { baseUrl } from '../../environment/environment.local';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  wishlistCounter:BehaviorSubject<number>=new BehaviorSubject(0);
  
  constructor(private _HttpClient:HttpClient) { }
  addProductToWishlist(productId:string):Observable<any>{
    return this._HttpClient.post(`${baseUrl}api/v1/wishlist`,{productId})
  }
  removeWishlistItem(productId:string):Observable<any>{
    return this._HttpClient.delete(`${baseUrl}api/v1/wishlist/${productId}`)
  }
  getLoggedUserWishlist():Observable<any>{
    return this._HttpClient.get(`${baseUrl}api/v1/wishlist`)
  }
}
