// --------------- ANGULAR ---------------
import { Component, OnInit } from '@angular/core';

// -------------- INTERFACES --------------
import { FilterOptionsObject } from '../../../interfaces/filterOptionsObject'

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';


@Component({
  selector: 'app-graph-root',
  templateUrl: './graph-root.component.html',
  styleUrls: ['./graph-root.component.scss']
})
export class GraphRootComponent implements OnInit {

  genericSelectedFilterOptions: FilterOptionsObject;
  hideSidePanel: boolean;

  filtersOptions: FilterOptionsObject;

  constructor() {
    this.hideSidePanel = true;
  }

  ngOnInit() {
    this.calculateContentHeight();
    console.log(this.filtersOptions);

  }

  private loadData(): void {
    //this.crimeService.loadCrimeData(this.genericSelectedFilterOptions);
  }

  onSelect(): void {
    this.loadData();
  }

  genericSelectedFiltersChanged(selectedFilters: FilterOptionsObject): void {
    this.genericSelectedFilterOptions = selectedFilters;
    this.filtersOptions = {
      ...this.genericSelectedFilterOptions,
    };
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
}
