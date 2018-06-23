import { Component, Input  } from "@angular/core";
import { CommonModule } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Schedule } from './schedule.model';

import { AmazingTimePickerService } from 'amazing-time-picker';


@Component({
    selector: "schedule",
    moduleId: module.id,
    templateUrl: "./schedule.component.html",
    styleUrls: []

})
export class ScheduleComponent {

    @Input()
    schedule : Schedule;

    // MARK: - Local Variables
    public horas : number[] = [];
    public minutos : number[] = [];
    public dias : string[] = ["None","All","Monday","Tuesday","Wednesday","Thursday","Friday","Satuday","Sunday"];
    public selectedTime = "00:00";
    public selectedHour = 0;
    public selectedMinutes = 0;


    // MARK: - Actions


    // MARK: - Outlets
     open() {
            const amazingTimePicker = this.atp.open({
                theme: 'material-green',
            });
            amazingTimePicker.afterClose().subscribe(time => {
                this.selectedTime = time;
                this.selectedHour = +time.substring(0, 2);
                this.selectedMinutes = +time.substring(3, 5);
            });
        }

    // MARK: - LIFE Component
    constructor(private atp: AmazingTimePickerService) {
        for(let i = 0; i < 24; i++){
           this.horas.push(i);
        }

        for(let i = 0; i < 60; i++){
           this.minutos.push(i);
        }


    }

    // MARK: - Utils


}