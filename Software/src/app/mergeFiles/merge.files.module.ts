import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { DelimiterComponent } from "../utils/delimiter/delimiter.component";

//Components
import { MergeFilesComponent } from "./merge.files.component";
import { HttpClient } from "@angular/common/http";


@NgModule({
    imports: [CommonModule, HttpModule, FormsModule],
    exports: [MergeFilesComponent],
    declarations: [MergeFilesComponent,DelimiterComponent],
    providers: [HttpClient]
})
export class MergeFilesModule { }