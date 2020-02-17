import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';

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

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  serializedStartDate: FormControl;
  serializedEndDate: FormControl;

  constructor() { }

  ngOnInit() {

    this.serializedStartDate = new FormControl(this.dateDefaults.startDate.toISOString());
    this.serializedEndDate = new FormControl(this.dateDefaults.endDate.toISOString());

    // creating unique id for collapsable divs
    DateSelectorComponent.count += 1;
    this.collapseDivId = 'date-selector-collapse-' + DateSelectorComponent.count;
    this.collapseDivHref = '#date-selector-collapse-' + DateSelectorComponent.count;
    this.collapseIcon = 'date-selector-collapse-icon' + DateSelectorComponent.count;

  }


  startDateInput(event) {
    console.log(event.value);
  }

  endDateInput(event) {
    console.log(event.value);
  }

}
