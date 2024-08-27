import { Component, inject, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  product!:product;
  private readonly _ActivatedRoute=inject(ActivatedRoute);
  private readonly _ProductsService=inject(ProductsService);
  ngOnInit(): void {
    let id:string|null="";
    this._ActivatedRoute.paramMap.subscribe({
      next:(param)=>{
        id=param.get('id');
      }
    })

    this._ProductsService.getProduct(id).subscribe({
       next:(res)=>{
         this.product=res.data;
       }
    })
  }
}
