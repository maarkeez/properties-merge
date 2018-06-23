import { Component, Input } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component( {
    selector: "card-content-custom",
    moduleId: module.id,
    templateUrl: "card.content.component.html",
    styleUrls: ['card.component.css']

} )
export class CardContentComponent {

    @Input()
    title: string = "";

    @Input()
    iconList: string[] = [];

    // MARK: - Local Variables

    // MARK: - Actions

    // MARK: - Outlets

    // MARK: - LIFE Component
    constructor() { }

    // MARK: - Utils


}