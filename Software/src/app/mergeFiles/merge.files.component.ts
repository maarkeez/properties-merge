import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Property } from "./property.model";


@Component( {
    selector: "merge-files",
    moduleId: module.id,
    templateUrl: "./merge.files.component.html"
} )
export class MergeFilesComponent {

    // MARK: - Local Variables
    leftSideProperties: Property[] = [];
    rightSideProperties: Property[] = [];

    // MARK: - IBActions

    // MARK: - LIFE VC

    // MARK: - Utils
    loadLeftSideProperties() {
        for ( let i = 0; i < 5; i++ ) {
            var property = new Property( i, "property_" + i, "value_" + i );
            this.leftSideProperties[i] = property;
        }
    }
    
    loadRightSideProperties() {
        for ( let i = 0; i < 5; i++ ) {
            var property = new Property( i, "property_" + i, "value_" + i );
            this.rightSideProperties[i] = property;
        }
    }
}