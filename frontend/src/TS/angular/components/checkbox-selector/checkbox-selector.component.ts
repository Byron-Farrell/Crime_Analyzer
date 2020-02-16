// --------------- ANGULAR ---------------
import { Component, AfterViewInit, Input, Output, EventEmitter  } from '@angular/core';

// --------------- INTERFACES ---------------
import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'


@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.scss']
})
export class CheckboxSelectorComponent implements AfterViewInit {

  // incremeneted for each instance of this component
  // used to create unique id for collapsable divs
  static count: number = 0;

  private selectedFilters: Array<string>;

  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() filterOptions: Array<CheckboxComponentItem>;

  @Output() selectedFiltersChange: EventEmitter<Array<string>> = new EventEmitter();

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;
  collapseIcon: string;

  constructor() {
    // Setting up default values
    this.selectedFilters = Array();


    // creating unique id for collapsable divs
    CheckboxSelectorComponent.count += 1;
    this.collapseDivId = 'checkbox-collapse-' + CheckboxSelectorComponent.count;
    this.collapseDivHref = '#checkbox-collapse-' + CheckboxSelectorComponent.count;
    this.collapseIcon = 'checkbox-collapse-icon' + CheckboxSelectorComponent.count;
  }

  ngAfterViewInit() {
  }


  updateCheckboxes(filterOption) : void {
    // updating filter options
    filterOption['checked'] = !filterOption['checked'];
    // updating selectedFilters
    this.updateSelectedFilterOptions();
  }

  // This function will iterate through all the selected checkboxes and add
  // their values to the selectedFilters variable;
  updateSelectedFilterOptions() : void {

    this.selectedFilters = Array();

    this.filterOptions.forEach(item => {
      if (item.checked) {
        this.selectedFilters.push(item.value);
      }
    })

    this.selectedFiltersChange.emit([ ...this.selectedFilters ]);
  }
}
