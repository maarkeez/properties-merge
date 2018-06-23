import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { MergeFilesComponent } from "./mergeFiles/merge.files.component";

//Modules
import { MergeFilesModule } from "./mergeFiles/merge.files.module";

//Services


@NgModule( {
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        MergeFilesModule,
        RouterModule.forRoot( [
            { path: "merge-files", component: MergeFilesComponent },
            { path: "**", redirectTo: "/" }
            
        ] )
    ],
    providers: [],
    bootstrap: [AppComponent]
} )
export class AppModule { }
