import { Component, Input   } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Card } from './card.model';

@Component({
    selector: "card-custom",
    moduleId: module.id,
    templateUrl: "card.component.html",
    styleUrls: ['card.component.css']

})
export class CardComponent {

    @Input()
    card : Card;

    // MARK: - Local Variables

    // MARK: - Actions
    redirect(href: string){
       window.location.href = href;
    }

    // MARK: - Outlets

    // MARK: - LIFE Component
    constructor() { }

    // MARK: - Utils


}