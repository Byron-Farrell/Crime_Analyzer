// --------------- ANGULAR ---------------
import { Component, OnInit } from '@angular/core';

// -------------- INTERFACES --------------
import { FilterOptionsObject } from '../../../interfaces/filterOptionsObject'

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-map-root',
  templateUrl: './map-root.component.html',
  styleUrls: ['./map-root.component.scss']
})
export class MapRootComponent implements OnInit {

  genericSelectedFilterOptions: FilterOptionsObject;
  mapSelectedFiltersOptions: FilterOptionsObject;

  filtersOptions: FilterOptionsObject;
  hideSidePanel: boolean;

  constructor(private crimeService: CrimeService) {
    this.hideSidePanel = true;
    this.genericSelectedFilterOptions = {};
    this.mapSelectedFiltersOptions = {};
    this.filtersOptions = {};
  }

  ngOnInit() {
  }

  private loadData(): void {
    this.crimeService.loadCrimeData(this.filtersOptions);
  }

  onSelect(): void {
    this.loadData();
  }

  genericSelectedFiltersChanged(selectedFilters: FilterOptionsObject): void {
    this.genericSelectedFilterOptions = selectedFilters;
    this.filtersOptions = {
      ...this.genericSelectedFilterOptions,
      ...this.mapSelectedFiltersOptions,
    };
  }

  mapSelectedFiltersChanged(selectedFilters: FilterOptionsObject): void {
    this.mapSelectedFiltersOptions = selectedFilters;
    this.filtersOptions = {
      ...this.genericSelectedFilterOptions,
      ...this.mapSelectedFiltersOptions,
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
}
