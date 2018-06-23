import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Property } from "./property.model";
import { PropertyDifference } from "./property.difference.model";


@Component( {
    selector: "merge-files",
    moduleId: module.id,
    templateUrl: "./merge.files.component.html"
} )
export class MergeFilesComponent {

    // MARK: - Local Variables
    leftSideMap: Map<string, Property> = new Map<string, Property>();
    rightSideMap: Map<string, Property> = new Map<string, Property>();
    differencesMap: Map<string, PropertyDifference> = new Map<string, PropertyDifference>();

    // MARK: - IBActions

    // MARK: - LIFE VC

    // MARK: - Utils
    loadLeftSideProperties() {
        let firstp = new Property( 0, "property_0", "value_Diferent" );
        this.leftSideMap.set( firstp.name, firstp );

        for ( let i = 1; i < 5; i++ ) {
            let property = new Property( i, "property_" + i, "value_" + i );
            this.leftSideMap.set( property.name, property );

        }

        for ( let i = 5; i < 9; i++ ) {
            let property = new Property( i, "property_" + ( i + 4 ), "value_" + ( i + 4 ) );
            this.leftSideMap.set( property.name, property );
        }
        this.checkDifferences();
    }

    loadRightSideProperties() {
        for ( let i = 0; i < 9; i++ ) {
            let property = new Property( i, "property_" + i, "value_" + i );
            this.rightSideMap.set( property.name, property );
        }
        this.checkDifferences();
    }

    checkDifferences() {
        this.differencesMap = new Map();

        for ( let key of Array.from( this.leftSideMap.keys() ) ) {
            let propertyDifference = new PropertyDifference( key, this.leftSideMap.get( key ), this.rightSideMap.get( key ) );
            this.differencesMap.set( key, propertyDifference );
            if(propertyDifference.equal || propertyDifference.onlyLeft){
                this.choose(this.leftSideMap.get( key ));
            }
        }

        for ( let key of Array.from( this.rightSideMap.keys() ) ) {
            let propertyDifference = new PropertyDifference( key, this.leftSideMap.get( key ), this.rightSideMap.get( key ) );
            this.differencesMap.set( key, propertyDifference );
            if(propertyDifference.equal || propertyDifference.onlyRight){
                this.choose(this.rightSideMap.get( key ));
            }
        }
    }

    getKeys( map ) {
        return Array.from( map.keys() );
    }

    choose( prop: Property ): void {
        if ( this.isChoosed( prop ) ) {
            this.differencesMap.get( prop.name ).choosed = null;
        } else {
            this.differencesMap.get( prop.name ).choosed = prop;
        }
    }

    isChoosed( prop: Property ): boolean {
        return prop == this.differencesMap.get( prop.name ).choosed;
    }
}