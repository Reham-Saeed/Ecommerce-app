import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../../core/interfaces/product';

@Pipe({
  name: 'search',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(allProducts: product[], word: string): product[] {
    return allProducts.filter(function (product) {
      return product.title.includes(word);
    });
  }
}
