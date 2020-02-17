import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-slider-selector',
  templateUrl: './slider-selector.component.html',
  styleUrls: ['./slider-selector.component.scss']
})
export class SliderSelectorComponent implements OnInit {

  // incremeneted for each instance of this component
  // used to create unique id for collapsable divs
  static count: number = 0;

  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() min: number;
  @Input() max: number;
  @Input() suffix: string;

  @Output() selectedFiltersChange: EventEmitter<any> = new EventEmitter();

  minValue: number;
  maxValue: number;

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  private selectedValues;

  constructor() {

  }

  ngOnInit() {
    // setting up default for minValue and maxValue variables
    this.selectedValues = {
      min: this.min,
      max: this.max
    }

    // Sending back default values
    this.selectedFiltersChange.emit({ ...this.selectedValues });
    
    // creating unique id for collapsable divs
    SliderSelectorComponent.count += 1;
    this.collapseDivId = 'slider-selector-collapse-' + SliderSelectorComponent.count;
    this.collapseDivHref = '#slider-selector-collapse-' + SliderSelectorComponent.count;
    this.collapseIcon = 'slider-selector-collapse-icon' + SliderSelectorComponent.count;
  }

  minValueChange(event) {
    this.selectedValues.min = event.value;
    this.selectedFiltersChange.emit({ ...this.selectedValues })
  }

  maxValueChange(event) {
    this.selectedValues.max = event.value;
    this.selectedFiltersChange.emit({ ...this.selectedValues })
  }

}
