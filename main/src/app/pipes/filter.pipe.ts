import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText: string): any {
  
    if(!value || !searchText ){
      console.log("Value 1", value)
      return value;
    }
  
    return value.filter(product =>
      product.categoryControl.toLowerCase().indexOf(searchText.toLowerCase()) !== -1 ||
      product.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
    }
  }