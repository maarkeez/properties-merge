import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from '@angular/forms';

//Components
import { AppComponent } from './app.component';
import { MergeFilesComponent } from "./mergeFiles/merge.files.component";

//Modules
import { MergeFilesModule } from "./mergeFiles/merge.files.module";
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';  // replaces previous Http service


//Services


@NgModule( {
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        MergeFilesModule,
        HttpClientModule,
        RouterModule.forRoot( [
            { path: "merge-files", component: MergeFilesComponent },
            { path: "**", redirectTo: "merge-files" }
            
        ] )
    ],
    providers: [],
    bootstrap: [AppComponent]
} )
export class AppModule { }
