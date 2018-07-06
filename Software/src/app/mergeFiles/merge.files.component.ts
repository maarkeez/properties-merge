import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Property } from "./property.model";
import { PropertyDifference } from "./property.difference.model";
import { HttpClient } from "@angular/common/http";
import { PropertyLoader } from "./property.loader";
import { PropertyDifferenceFilter } from "./property.difference.filter";


@Component( {
    selector: "merge-files",
    moduleId: module.id,
    templateUrl: "./merge.files.component.html",
    styleUrls: ['merge.files.component.css']

} )
export class MergeFilesComponent {

    // MARK: - Local Variables
    leftSideMap: Map<string, Property> = new Map<string, Property>();
    rightSideMap: Map<string, Property> = new Map<string, Property>();
    differencesMap: Map<string, PropertyDifference> = new Map<string, PropertyDifference>();
    merged: string = "";
    errorMessage: string = "";
    showEquals: boolean = true;
    showDiff: boolean = true;
    showLeft: boolean = true;
    showRight: boolean = true;

    private propDiffFilter: PropertyDifferenceFilter = new PropertyDifferenceFilter();

    // MARK: - IBActions

    // MARK: - LIFE VC
    constructor() { }
    // MARK: - Utils
    loadLeftSideProperties( properties: Property[] ) {
        try {
            for ( let i = 0; i < properties.length; i++ ) {
                let property = properties[i];
                this.leftSideMap.set( property.name, property );
            }
            this.checkDifferences();


        } catch ( e ) {
            this.errorMessage = e;
        }
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
        let keys: string[] = Array.from( map.keys() );
        keys.sort( this.sortDesc );
        return keys;
    }

    getKeysFiltered( side: string, showSideOnly: boolean ): string[] {
        let keys: string[] = Array.from( this.differencesMap.keys() );
        keys.sort( this.sortDesc );

        return this.propDiffFilter.transform( this.differencesMap, keys, this.showEquals, this.showDiff, side, showSideOnly );
    }


    sortDesc( a: string, b: string ) {
        if ( a > b ) {
            return 1;
        }
        return -1;
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

    download() {
        let text = this.merged;
        let blob = new Blob( [text], {
            type: "text/plain"
        } );
        let anchor = document.createElement( "a" );
        let timeStamp = new Date().toLocaleDateString();
        anchor.download = "merged_" + timeStamp  + ".txt";
        anchor.href = window.URL.createObjectURL( blob );
        anchor.target = "_blank";
        anchor.style.display = "none"; // just to be safe!
        document.body.appendChild( anchor );
        anchor.click();
        document.body.removeChild( anchor );
    }
}