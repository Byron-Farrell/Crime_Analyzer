import { Component, OnInit, Input } from '@angular/core';

import { CheckboxComponentItem } from '../../../interfaces/checkboxComponentItem'

@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.scss']
})
export class CheckboxSelectorComponent implements OnInit {

  static count: number = 0;

  private toggle: Boolean;

  collapseDivId: String
  collapseDivHref: String;

  @Input() title: String;
  @Input() tooltipMessage: String;
  @Input() items: Array<CheckboxComponentItem>;

  constructor() {
    this.toggle = false;
    CheckboxSelectorComponent.count += 1;
    this.collapseDivId= 'collapse-' + CheckboxSelectorComponent.count;
    this.collapseDivHref= '#collapse-' + CheckboxSelectorComponent.count;
  }

  ngOnInit() {
  }

  toggleIcon(event) : void {
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

  updateCheckboxes(item) : void {
    item['checked'] = !item['checked'];
    console.log(this.items);
  }
}
