import { Component, OnInit, Input } from '@angular/core';

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

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  constructor() { }

  ngOnInit() {

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
