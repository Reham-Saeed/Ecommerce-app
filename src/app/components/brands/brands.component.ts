import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Brand } from '../../core/interfaces/product';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink,TranslateModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit,OnDestroy {
  allBrands:Brand[]=[];
  cancelSubscription:Subscription=new Subscription();

  constructor(private _BrandsService:BrandsService){}
  getBrands(){
    this.cancelSubscription=this._BrandsService.getBrands().subscribe({
      next:(res)=>{
         this.allBrands=res.data;
      }
    })
  }
  ngOnInit(): void {
    this.getBrands();
  }
  ngOnDestroy():void{
    this.cancelSubscription.unsubscribe();
  }
}
