import { Component, OnInit, Input } from '@angular/core';

import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'


// FIXME: copy input to private variable and pass a copy back (one way binding) or find a angular one way binding method

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

  // two way binding variables
  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() filterOptions: Array<CheckboxComponentItem>;
  @Input() selectedFilterOptions: Array<string>;

  // local variables to of input variables
  privateTitle: string;
  privateTooltipMessage: string;
  privateFilterOptions: Array<CheckboxComponentItem>;
  privateSelectedFilterOptions: Array<string>

  // unique
  collapseDivId: string
  collapseDivHref: string;

  constructor() {
    // Setting up default values
    this.toggle = false;

    // creating unique id for collapsable divs
    CheckboxSelectorComponent.count += 1;
    this.collapseDivId= 'collapse-' + CheckboxSelectorComponent.count;
    this.collapseDivHref= '#collapse-' + CheckboxSelectorComponent.count;
  }

  ngOnInit() {
    // creating a variable for each input. When one of these variable is
    // changed a copy of the variable will be copied to the input variable
    // which can then be accessed outside the componet by its parent. This adds
    // another layer of encapsulation around the component
    this.privateTitle = this.title;
    this.privateTooltipMessage = this.tooltipMessage;
    this.privateFilterOptions = JSON.parse(JSON.stringify(this.filterOptions));
    this.privateSelectedFilterOptions = [ ...this.selectedFilterOptions ];
  }

  // Switches between two buttons/icons that are used to collapse and
  // expand the filter options section of this component
  toggleIcon() : void {
    // element that displays the icon
    let icon = document.getElementById('collapse-icon');

    if (this.toggle) {
      icon.className = "fas fa-caret-down";
      this.toggle = !this.toggle;
    }
    else {
      icon.className = "fas fa-caret-up";
      this.toggle = !this.toggle;
    }
  }

  // When a user clicks on one of the checkboxes this function will be called.
  // It will update the selectedFilterOptions and send a copy of the new selected
  // filter options input variable selectedFilterOptions which can be accessed
  // by the parent component
  updateCheckboxes(filterOption) : void {
    // updating filter options
    filterOption['checked'] = !filterOption['checked'];
    // updating selectedFilterOptions
    this.updateSelectedFilterOptions();
    // copying privateSelectedFilterOptions to input variable
    this.selectedFilterOptions = [ ...this.privateSelectedFilterOptions ];
  }

  // This function will iterate through all the selected checkboxes and add
  // their values to the privateSelectedFilterOptions variable;
  updateSelectedFilterOptions() : void {
    this.privateFilterOptions.forEach(item => {
      if (item.checked) {
        this.privateSelectedFilterOptions.push(item.value);
      }
    })
  }
}
