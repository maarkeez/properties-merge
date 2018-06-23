import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateHelper } from '../helpers/date-helper';

@Pipe({
    name: 'pagefilter',
    pure: false
})
export class PageFilter implements PipeTransform {
    

    
    constructor(private dateHelper: DateHelper) {}

    transform(items: any[], currentPage: number, pageSize: number): any[] {
//        console.log("Filtering");
//        console.log(items);
//        console.log(filters);
//        console.log(identifiers);

        if (!items) return [];

        if (!currentPage || !pageSize) return items;
        
        
        //Calculate paged item index
        let maxIndexForItems = items.length;
        
        let firstItemIndex = ( currentPage * pageSize ) - pageSize ;
        if(firstItemIndex < 0 ){
            firstItemIndex = 0;
        }
        
        let lastItemIndex = ( currentPage * pageSize );
        if(lastItemIndex > maxIndexForItems ){
            lastItemIndex = maxIndexForItems;
        }
        
        console.log("firstItemIndex:" + firstItemIndex + ", lastItemIndex: " + lastItemIndex );
        let itemsToReturn : any[] = [];
        for(let i = firstItemIndex; i<lastItemIndex; i++){
            itemsToReturn.push(items[i]);
        }

        return itemsToReturn;
    }
}