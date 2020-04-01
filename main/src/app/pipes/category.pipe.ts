import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

transform(value: any, searchText: string): any {
  
  if(!value || !searchText ){
    console.log("Value 1", value)
    return value;
  }

  return value.filter(product =>
    product.category.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
    product.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
  }
}
