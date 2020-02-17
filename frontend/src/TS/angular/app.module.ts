// --------------- ANGULAR ---------------
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

// ----------- ANGULAR MATERIAL -----------
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


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
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
