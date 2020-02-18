// --------------- ANGULAR ---------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

// -------------- COMPONENTS --------------
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RootComponent } from './components/root/root.component';
import { CheckboxSelectorComponent } from './components/checkbox-selector/checkbox-selector.component';
import { DateSelectorComponent } from './components/date-selector/date-selector.component';
import { GenericFilterOptionsComponent } from './components/generic-filter-options/generic-filter-options.component';
import { MapSelectorComponent } from './components/map-selector/map-selector.component';
import { FilterOptionHeaderComponent } from './components/filter-option-header/filter-option-header.component';
import { SliderSelectorComponent } from './components/slider-selector/slider-selector.component';
import { GraphSelectorComponent } from './components/graph-selector/graph-selector.component';
import { GraphComponent } from './components/graph/graph.component';
import { IsDarkGraphComponent } from './components/is-dark-graph/is-dark-graph.component';
import { GraphFilterOptionsComponent } from './components/graph-filter-options/graph-filter-options.component';

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
    MapSelectorComponent,
    DateSelectorComponent,
    FilterOptionHeaderComponent,
    SliderSelectorComponent,
    GraphSelectorComponent,
    GraphComponent,
    IsDarkGraphComponent,
    GraphFilterOptionsComponent,
  ],
  imports: [
    RouterModule.forRoot(
      [
        { path: '', component: MapSelectorComponent },
        { path: 'map', component: MapSelectorComponent },
        { path: 'graph', component: GraphSelectorComponent },

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
