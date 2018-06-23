import { Injectable }  from "@angular/core";


@Injectable()
export class DateHelper {
    
    public isDate(obj: any): boolean {
        if (obj === null || obj === undefined) {
            return false;
        }
        
        return obj instanceof Date;
    }
    
    get dateFormat() : string {
        return 'yyyy-MM-dd';
    }
    
    
}
