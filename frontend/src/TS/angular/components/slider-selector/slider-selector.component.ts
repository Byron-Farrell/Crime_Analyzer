import { Component, OnInit, Input } from '@angular/core';

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
  min = 0
  max = 100
  minValue = this.min
  maxValue = this.max
  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  constructor() { }

  ngOnInit() {
    // creating unique id for collapsable divs
    SliderSelectorComponent.count += 1;
    this.collapseDivId = 'slider-selector-collapse-' + SliderSelectorComponent.count;
    this.collapseDivHref = '#slider-selector-collapse-' + SliderSelectorComponent.count;
    this.collapseIcon = 'slider-selector-collapse-icon' + SliderSelectorComponent.count;
  }

}
