import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { product } from '../../core/interfaces/product';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { CategoriesSliderComponent } from "./categories-slider/categories-slider.component";
import { MainSliderComponent } from "./main-slider/main-slider.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CategoriesSliderComponent, MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  allProducts:product[]=[];
  constructor(private _ProductsService:ProductsService , private token:AuthService){
    this.token.saveUserData();
  }
  getProducts(){
    this._ProductsService.getProducts().subscribe({
      next:(res)=>
        {
          this.allProducts=res.data;
          console.log(res.data);
        },
        error:(error)=>{
          console.log(error);
        }
    })
  }
  ngOnInit(): void {
    this.getProducts();
  }
}
