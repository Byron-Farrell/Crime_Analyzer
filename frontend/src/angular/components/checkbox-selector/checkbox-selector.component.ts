import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkbox-selector',
  templateUrl: './checkbox-selector.component.html',
  styleUrls: ['./checkbox-selector.component.scss']
})
export class CheckboxSelectorComponent implements OnInit {

  private toggle: Boolean;

  constructor() {
    this.toggle = false;
  }

  ngOnInit() {
  }

  toggleIcon(event) : void {
    let icon = document.getElementById('collapse-icon');

    if (this.toggle) {
      icon.className = "fas fa-caret-down";
      this.toggle = false;
    }
    else {
      icon.className = "fas fa-caret-up";
      this.toggle = true;
    }

  }
}
