import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseUrl } from '../../environment/environment.local';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private _HttpClient:HttpClient) { }
  getBrands():Observable<any>{
    return this._HttpClient.get(baseUrl+'api/v1/brands');
  }
}
