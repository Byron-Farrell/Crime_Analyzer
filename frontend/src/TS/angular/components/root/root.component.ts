import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, AfterViewInit {

  hideSidePanel: boolean;

  constructor() {
    this.hideSidePanel = true;
  }

  ngOnInit() {
    this.calculateContentHeight();
  }

  ngAfterViewInit() {
  }

  calculateContentHeight() : void {
    let navbar = document.getElementById('mainNav');
    let content = document.getElementById('content');

    let navbarHeight = navbar.clientHeight;
    let windowHeight = window.innerHeight;
    let contentHeight = windowHeight - navbarHeight;

    content.style.height = contentHeight + 'px';
  }

  onResize(event) : void {
    this.calculateContentHeight();


  }

  toggleSidePanel(event) {
    let sidePanel = document.getElementById('sidePanel');
    let mainContent = document.getElementById('mainContent');
    let expandArrow = document.getElementById('expand');

    if (this.hideSidePanel) {
      sidePanel.className = 'd-none';
      mainContent.className = 'col-sm-12 col-md-12 col-lg-12';
      expandArrow.className = 'm-2 position-absolute';
      this.hideSidePanel = !this.hideSidePanel;
    }
    else {
      sidePanel.className = 'col-sm-12 col-md-5 col-lg-3 h-100 overflow-auto';
      mainContent.className = 'col-sm-12 col-md-7 col-lg-9';
      expandArrow.className = 'd-none';
      this.hideSidePanel = !this.hideSidePanel;
    }

    window.dispatchEvent(new Event('resize'));
  }

  onSelect(): void {

  }
}
