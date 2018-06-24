import { PropertyDifference } from "./property.difference.model";

export class PropertyDifferenceFilter {
    constructor() { }

    transform( differencesMap: Map<string, PropertyDifference>,
        keys: string[],
        showEquals: boolean,
        showDifferences: boolean,
        side: string,
        showSideOnly: boolean ): string[] {

        if ( !differencesMap ) return [];

        if ( showEquals && showDifferences && showSideOnly ) return keys;

        let itemsToReturn: string[] = [];
        for ( let i = 0; i < keys.length; i++ ) {
            let propertyDiff: PropertyDifference = differencesMap.get( keys[i] );
            if ( ( showEquals && propertyDiff.equal ) ||
                ( showDifferences && !propertyDiff.equal && propertyDiff.isBoth ) ||
                ( showSideOnly && this.isOnlySide(side,propertyDiff) && this.getPropDiff( side, propertyDiff ) ) ) {
                itemsToReturn.push( keys[i] );
            }

        }
        return itemsToReturn;
    }
    
    isOnlySide(side: string, propertyDiff: PropertyDifference ) : boolean {
        if ( side === "left" ) {
            return propertyDiff.onlyLeft;
        }
        return propertyDiff.onlyRight;
    }

    getPropDiff( side: string, propertyDiff: PropertyDifference ) {
        if ( side === "left" ) {
            return propertyDiff.leftProperty;
        }
        return propertyDiff.rightProperty;
    }
}