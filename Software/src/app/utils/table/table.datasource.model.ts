export class TableDataSource {
    
    constructor(public title: string,
                public headers : string[],
                public ids : string[],
                public data: any[],
                public showAllColumns: boolean,
                public showColum : boolean[]
               
                ) { }
}