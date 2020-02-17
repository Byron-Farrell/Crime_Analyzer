import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  // incremeneted for each instance of this component
  // used to create unique id for collapsable divs
  static count: number = 0;

  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() dateDefaults;

  @Output() startDateChange: EventEmitter<string> = new EventEmitter();
  @Output() endDateChange: EventEmitter<string> = new EventEmitter();

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  serializedStartDate: FormControl;
  serializedEndDate: FormControl;

  constructor() { }

  ngOnInit() {


    // creating unique id for collapsable divs
    DateSelectorComponent.count += 1;
    this.collapseDivId = 'date-selector-collapse-' + DateSelectorComponent.count;
    this.collapseDivHref = '#date-selector-collapse-' + DateSelectorComponent.count;
    this.collapseIcon = 'date-selector-collapse-icon' + DateSelectorComponent.count;

    this.setupDefaultDates();

  }

  setupDefaultDates() {
    this.serializedStartDate = new FormControl(this.dateDefaults.startDate.toISOString());
    this.serializedEndDate = new FormControl(this.dateDefaults.endDate.toISOString());

    let startDateDay = this.dateDefaults.startDate.getDate();
    let startDateMonth = this.dateDefaults.startDate.getMonth() + 1;
    let startDateYear = this.dateDefaults.startDate.getFullYear();

    let endDateDay = this.dateDefaults.startDate.getDate();
    let endDateMonth = this.dateDefaults.startDate.getMonth() + 1;
    let endDateYear = this.dateDefaults.startDate.getFullYear();

    let startDateString = startDateDay + '-' + startDateMonth + '-' + startDateYear;
    let endDateString = endDateDay + '-' + endDateMonth + '-' + endDateYear;

    this.startDateChange.emit(startDateString);
    this.endDateChange.emit(endDateString);
  }

  startDateInput(event) {
    let day = event.value.getDate();
    let month = event.value.getMonth() + 1;
    let year = event.value.getFullYear();

    let startDateString = day + '-' + month + '-' + year;

    this.startDateChange.emit(startDateString);
  }

  endDateInput(event) {
    let day = event.value.getDate();
    let month = event.value.getMonth() + 1;
    let year = event.value.getFullYear();

    let endDateString = day + '-' + month + '-' + year;

    this.endDateChange.emit(endDateString);
  }

}
