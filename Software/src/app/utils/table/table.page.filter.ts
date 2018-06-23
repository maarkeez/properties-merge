import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateHelper } from '../helpers/date-helper';

@Pipe({
    name: 'tablefilter',
    pure: false
})
export class PageFilter implements PipeTransform {
    
    private datePipe: DatePipe = new DatePipe('en-EN');

    
    constructor(private dateHelper: DateHelper) {}

    transform(items: any[], filters: string[], identifiers: string[]): any[] {
//        console.log("Filtering");
//        console.log(items);
//        console.log(filters);
//        console.log(identifiers);

        if (!items) return [];

        if (!filters) return items;

        return items.filter(it => {
            return this.hasToBeReturned(it,filters,identifiers);
        });
    }
    
    private hasToBeReturned(item: any,  filters: string[], identifiers: string[] ) : boolean {
        //Recorrer las claves y comprobar que para cada campo se cumple el filtro actual
        for(let i = 0; i < identifiers.length; i++){
            
            // Recuperar el campo como cadena de texto.
            let fieldStr = "";
            let itemField = item[identifiers[i]];
            
            if(this.dateHelper.isDate(itemField)) {
                //Si es fecha, convertir a String con el formato de la tabla.
                fieldStr = this.datePipe.transform(itemField, this.dateHelper.dateFormat);
            }else{
                //Si no es fecha, convertir a string 
                fieldStr = itemField + "";
            }
            
            // Convertir el filtro a minúsculas
            let filter = ( filters[i] )? filters[i].toLowerCase() : "";
            
            // Si el campo en minúsculas NO contiene el filtro
            if(!fieldStr.toLowerCase().includes(filter)){
                //No se muestra
                return false;
            }
        }
        
        //Si se han cumplido todos los filtros, se muestra el campo.
        return true;
    }
}