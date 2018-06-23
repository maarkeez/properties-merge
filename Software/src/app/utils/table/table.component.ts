import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { TableDataSource } from './table.datasource.model';
import { TableDelegate } from './table.delegate.model';
import { DateHelper } from '../helpers/date-helper';

@Component( {
    selector: "table-custom",
    moduleId: module.id,
    templateUrl: "./table.component.html",
    styleUrls: ['table.component.css']

} )
export class TableComponent {

    @Input()
    table: TableDataSource;

    @Input()
    delegate: TableDelegate;

    filters: string[] = [];
    private _pageSize: number = 5;
    currentPage: number = 1;

    // MARK: - Local Variables

    // MARK: - Actions

    // MARK: - Outlets

    // MARK: - LIFE Component
    constructor( private dateHelper: DateHelper ) { }

    // MARK: - Utils
    get previousPage(): number {
        if ( this.currentPage <= 1 ) {
            return null;
        }
        return this.currentPage - 1;
    }

    get nextPage(): number {
        if ( this.currentPage >= this.lastPage ) {
            return null;
        }
        return this.currentPage + 1;
    }
    
    get lastPage(): number {
        return Math.ceil( this.table.data.length / this.pageSize ) ;
    }
    
    get firstPage() : number {
        return 1;
    }
    
    get pageSize() : number {
        return this._pageSize;
    }
    
    set pageSize(pageSize : number){
        this.currentPage = 1;
        this._pageSize = pageSize;
    }

}