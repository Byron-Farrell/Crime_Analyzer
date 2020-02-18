// --------------- ANGULAR ---------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// -------------- COMPONENTS --------------
import { RootComponent } from './components/root/root.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { MapRootComponent } from './components/map-root/map-root.component';
import { MapComponent } from './components/map/map.component';

import { GraphRootComponent } from './components/graph-root/graph-root.component';

import { GenericFilterOptionsComponent } from './components/generic-filter-options/generic-filter-options.component';
import { MapFilterOptionsComponent } from './components/map-filter-options/map-filter-options.component';

import { FilterOptionHeaderComponent } from './components/filter-option-header/filter-option-header.component';

import { CheckboxSelectorComponent } from './components/selectors/checkbox-selector/checkbox-selector.component';
import { DateSelectorComponent } from './components/selectors/date-selector/date-selector.component';
import { SliderSelectorComponent } from './components/selectors/slider-selector/slider-selector.component';

import { IsDarkChartComponent } from './components/charts/is-dark-chart/is-dark-chart.component';



// ----------- ANGULAR MATERIAL -----------
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';



@NgModule({
  declarations: [
    MapComponent,
    NavbarComponent,
    RootComponent,
    CheckboxSelectorComponent,
    GenericFilterOptionsComponent,
    MapRootComponent,
    DateSelectorComponent,
    FilterOptionHeaderComponent,
    SliderSelectorComponent,
    GraphRootComponent,
    MapFilterOptionsComponent,
    IsDarkChartComponent,
  ],
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: MapRootComponent },
        { path: 'map', component: MapRootComponent },
        { path: 'graph', component: GraphRootComponent },

      ],
    ),

    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSliderModule,
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '/'
    }
  ],
  bootstrap: [RootComponent]
})
export class AppModule { }
