import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/interfaces/product';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  allCategories:Category[]=[]
  constructor(private _CategoriesService:CategoriesService){}
  getCategories(){
    this._CategoriesService.getCategories().subscribe({
      next:(res)=>{
        this.allCategories=res.data;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
  ngOnInit(): void {
    this.getCategories();
  }

}
