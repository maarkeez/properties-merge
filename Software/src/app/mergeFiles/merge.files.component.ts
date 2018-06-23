import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Property } from "./property.model";
import { PropertyDifference } from "./property.difference.model";
import { HttpClient } from "@angular/common/http";
import { PropertyLoader } from "./property.loader";


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
    merged: string = "";
    // MARK: - IBActions

    // MARK: - LIFE VC
    constructor() { }
    // MARK: - Utils
    loadLeftSideProperties( properties: Property[] ) {
        for ( let i = 0; i < properties.length; i++ ) {
            let property = properties[i];
            this.leftSideMap.set( property.name, property );
        }
        this.checkDifferences();
    }

    loadRightSideProperties( properties: Property[] ) {
        for ( let i = 0; i < properties.length; i++ ) {
            let property = properties[i];
            this.rightSideMap.set( property.name, property );
        }
        this.checkDifferences();
    }

    checkDifferences() {
        this.differencesMap = new Map();

        for ( let key of Array.from( this.leftSideMap.keys() ) ) {
            let propertyDifference = new PropertyDifference( key, this.leftSideMap.get( key ), this.rightSideMap.get( key ) );
            this.differencesMap.set( key, propertyDifference );
            if ( propertyDifference.equal || propertyDifference.onlyLeft ) {
                this.choose( this.leftSideMap.get( key ) );
            }
        }

        for ( let key of Array.from( this.rightSideMap.keys() ) ) {
            let propertyDifference = new PropertyDifference( key, this.leftSideMap.get( key ), this.rightSideMap.get( key ) );
            this.differencesMap.set( key, propertyDifference );
            if ( propertyDifference.equal || propertyDifference.onlyRight ) {
                this.choose( this.rightSideMap.get( key ) );
            }
        }
    }

    getKeys( map ): string[] {
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

    handleLeftFileInput( files: FileList ) {
        let fileToUpload = files.item( 0 );

        let reader = new FileReader();
        reader.onload = ( function( f ) {
            return function( e ) {
                let text = reader.result as string;
                let textLines: string[] = text.split( "\n" );
                let lines: string[] = [];
                for ( let line of textLines ) {
                    lines.push( line );
                }
                let loader = new PropertyLoader( lines );
                let properties: Property[] = loader.build();
                f.loadLeftSideProperties( properties );
            };
        } )( this );
        reader.readAsText( fileToUpload );
    }

    handleRightFileInput( files: FileList ) {
        let fileToUpload = files.item( 0 );

        let reader = new FileReader();
        reader.onload = ( function( f ) {
            return function( e ) {
                let text = reader.result as string;
                let textLines: string[] = text.split( "\n" );
                let lines: string[] = [];
                for ( let line of textLines ) {
                    lines.push( line );
                }
                let loader = new PropertyLoader( lines );
                let properties: Property[] = loader.build();
                f.loadRightSideProperties( properties );
            };
        } )( this );
        reader.readAsText( fileToUpload );
    }

    merge(): void {
        this.merged = "";
        let properties: Property[] = [];
        for ( let key of this.getKeys( this.differencesMap ) ) {
            let property = this.differencesMap.get( key ).choosed;
            if ( property ) {
                properties.push( property );
                this.merged += property.name + " = " + property.value + "\n";
            }
        }
    }
}