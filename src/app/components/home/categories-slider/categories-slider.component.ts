import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule,TranslateModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent implements OnInit,OnDestroy {
  allCategories:Category[]=[];
  cancleSubscription:Subscription=new Subscription();

  private readonly _CategoriesService=inject(CategoriesService);
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


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots:false,
    rtl:true,
    navSpeed: 700,
    navText: ['', ''],
    autoplay:true,
    autoplayTimeout:4000,
    autoplaySpeed:1000,
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  }

}
