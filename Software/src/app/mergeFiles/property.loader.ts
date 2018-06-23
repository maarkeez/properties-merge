import { Property } from "./property.model";
import {Observable} from 'rxjs/Observable';


export class PropertyLoader {

    commentCharacter: string = "#";
    propertySeparator: string = "=";

    constructor( private lines: string[] ) { }

    build(): Property[] {
        let filteredLines = this.filterLines( this.lines );

        let properties: Property[] = [];
        let lineNumber = 1;
        for ( let line of filteredLines ) {
            properties.push( this.buildProperty( lineNumber, line ) );
            lineNumber += 1;
        }
        return properties;
    }

    


    private buildProperty( lineNumber: number, line: string ): Property {

        let splitted: string[] = line.split( this.propertySeparator );
        let name = splitted[0].trim();

        let value = "";
        for ( let i = 1; i < splitted.length; i++ ) {
            value += splitted[i];
        }
        value = value.trim()


        return new Property( lineNumber, name, value );
    }


    private filterLines( lines: string[] ): string[] {
        let filteredLines: string[] = [];

        for ( let line of lines ) {
            if ( line.trim() === "" ) {
                continue;
            }

            if ( line.startsWith( this.commentCharacter ) ) {
                continue;
            }

            filteredLines.push( line );
        }

        return filteredLines;

    }

}
