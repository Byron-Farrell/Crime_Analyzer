// --------------- ANGULAR ---------------
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-filter-option-header',
  templateUrl: './filter-option-header.component.html',
  styleUrls: ['./filter-option-header.component.scss']
})
export class FilterOptionHeaderComponent implements OnInit {

  // toggler for switching between icons for the collapse and expand buttons
  private toggle: Boolean;

  @Input() title: string;
  @Input() tooltipMessage: string;
  @Input() collapseDivHref: string;
  @Input() collapseIcon: string;


  constructor() {
    // Setting up default values
    this.toggle = false;
  }

  ngOnInit() {
  }

  // Switches between two buttons/icons that are used to collapse and
  // expand the filter options section of this component
  toggleIcon() : void {
    // element that displays the icon
    let icon = document.getElementById(this.collapseIcon);

    if (this.toggle) {
      icon.className = "far fa-plus-square green-icon";
      this.toggle = !this.toggle;
    }
    else {
      icon.className = "far fa-minus-square red-icon";
      this.toggle = !this.toggle;
    }
  }
}
