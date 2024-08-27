import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoriesService } from '../../../core/services/categories.service';
import { Category } from '../../../core/interfaces/product';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.scss'
})
export class CategoriesSliderComponent implements OnInit {
  private readonly _CategoriesService=inject(CategoriesService);
  allCategories:Category[]=[];
  getCategories(){
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.allCategories=res.data;
        console.log(res.data)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
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
