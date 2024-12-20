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

  constructor(private crimeService: CrimeService) {
    this.hideSidePanel = true;
  }

  ngOnInit() {
    this.filtersOptions = {
      crimeTypes: []
    }
  }

  private loadData(): void {
    this.crimeService.loadAnalytics(this.genericSelectedFilterOptions);
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

  toggleSidePanel(event) {
    let sidePanel = document.getElementById('sidePanel');
    let mainContent = document.getElementById('mainContent');
    let expandArrow = document.getElementById('expand');

    if (this.hideSidePanel) {
      sidePanel.className = 'd-none';
      mainContent.className = 'col-sm-12 col-md-12 col-lg-12 p-0';
      expandArrow.className = 'm-2 position-absolute';
      this.hideSidePanel = !this.hideSidePanel;
    }
    else {
      sidePanel.className = 'col-sm-12 col-md-5 col-lg-3 h-100 overflow-auto';
      mainContent.className = 'col-sm-12 col-md-7 col-lg-9 p-0';
      expandArrow.className = 'd-none';
      this.hideSidePanel = !this.hideSidePanel;
    }

    window.dispatchEvent(new Event('resize'));
  }

  showContent() {
    document.getElementById('dropdownMenuContent').style.display = 'block';
  }

  hideContent() {
    document.getElementById('dropdownMenuContent').style.display = 'none';
  }
}
