import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit,OnDestroy {
  allCategories:Category[]=[]
  cancleSubscription:Subscription=new Subscription();
 
  constructor(private _CategoriesService:CategoriesService){}
  getCategories(){
    this.cancleSubscription=this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.allCategories=res.data;
      }
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }
  ngOnDestroy():void{
    this.cancleSubscription.unsubscribe();
  }
}
