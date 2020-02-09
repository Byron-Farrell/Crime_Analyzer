// --------------- ANGULAR ---------------
import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';

// --------------- INTERFACES ---------------
import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'


@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.scss']
})
export class CheckboxSelectorComponent implements OnInit {

  // incremeneted for each instance of this component
  // used to create unique id for collapsable divs
  static count: number = 0;

  // toggler for switching between icons for the collapse and expand buttons
  private toggle: Boolean;
  private selectedFilters: Array<string>;

  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() filterOptions: Array<CheckboxComponentItem>;

  @Output() selectedFiltersChange: EventEmitter<Array<string>> = new EventEmitter();

  // unique id for divs
  collapseDivId: string
  collapseDivHref: string;

  constructor() {
    // Setting up default values
    this.toggle = false;
    this.selectedFilters = Array();


    // creating unique id for collapsable divs
    CheckboxSelectorComponent.count += 1;
    this.collapseDivId= 'collapse-' + CheckboxSelectorComponent.count;
    this.collapseDivHref= '#collapse-' + CheckboxSelectorComponent.count;
  }

  ngOnInit() {
  }

  // Switches between two buttons/icons that are used to collapse and
  // expand the filter options section of this component
  toggleIcon() : void {
    // element that displays the icon
    let icon = document.getElementById('collapse-icon');

    if (this.toggle) {
      icon.className = "far fa-plus-square";
      this.toggle = !this.toggle;
    }
    else {
      icon.className = "far fa-minus-square";
      this.toggle = !this.toggle;
    }
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
