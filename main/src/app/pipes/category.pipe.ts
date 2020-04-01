import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  /*transform(value: any, cName: string): any {
    if(cName===""){
      return value;
    }
    else{
      console.log("Value : ",value)
      console.log("cName : ",cName)
      
    const categoryArray:any[]=[];
    for(let i=0;i<=value.length;i++){
      let categoryName: string = value[i].category;
      //console.log("CategoryName : ",categoryName)
      console.log("category ", value[i].category)
      let name: string = value[i].name;
      if(categoryName.startsWith(cName) || name.startsWith(cName)){
        categoryArray.push(value[i])
      }
    }
    console.log("Category Array", categoryArray);
    return categoryArray;
    
  }
}*/

transform(value: any, searchText: string): any {

  if(!value || !searchText ){
    console.log("Value 1", value)
    return value;
  }

  return value.filter(product =>
    product.category.toLowerCase().indexOf(searchText.toLowerCase()) !== -1);
}


}
