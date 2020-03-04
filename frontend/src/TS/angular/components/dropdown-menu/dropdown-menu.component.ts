import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss']
})
export class DropdownMenuComponent implements OnInit {

  static count = 0;

  private toggle: boolean;
  public dropdownId: string;
  public dropdownButtonId: string;
  public dropdownMenuContentId: string;
  public selectedMenuItem: string;

  @Input() data: Array<string>;
  @Input() styles: string;

  @Output() selectedMenuItemChange: EventEmitter<string>;

  constructor() {
    DropdownMenuComponent.count += 1;
    this.toggle = true;
    this.selectedMenuItemChange = new EventEmitter<string>();

    this.dropdownId = 'dropdownId-' + DropdownMenuComponent.count;
    this.dropdownButtonId = 'dropdownButtonId-' + DropdownMenuComponent.count;
    this.dropdownMenuContentId = 'dropdownMenuContentId-' + DropdownMenuComponent.count;
}

  ngOnInit() {
    if (this.data) {
      this.selectedMenuItem = this.data[0];
    }
  }

  ngAfterViewInit() {
    this.hideContent();
  }

  public updateSelectedMenuItem(item: string): void {
    this.selectedMenuItem = item;
    this.hideContent();
    this.selectedMenuItemChange.emit(item);
  }

  public toggleDropdown() {
    if (this.toggle) {
      this.toggle = !this.toggle;
      this.showContent();
    }
    else {
      this.toggle = !this.toggle;
      this.hideContent();
    }
  }
  public showContent(): void {
    document.getElementById(this.dropdownMenuContentId).style.display = 'block';
    let button = document.getElementById(this.dropdownButtonId);
    button.classList.remove('ButtonClosed');
    button.classList.add('ButtonOpen');
  }

  public hideContent(): void {
    document.getElementById(this.dropdownMenuContentId).style.display = 'none';
    let button = document.getElementById(this.dropdownButtonId);
    button.classList.remove('ButtonOpen');
    button.classList.add('ButtonClosed');
  }
}
