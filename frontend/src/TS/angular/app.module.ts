import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RootComponent } from './components/root/root.component';
import { CheckboxSelectorComponent } from './components/checkbox-selector/checkbox-selector.component';
import { GenericFilterOptionsComponent } from './components/generic-filter-options/generic-filter-options.component';
import { MapSelectorComponent } from './components/map-selector/map-selector.component';


@NgModule({
  declarations: [
    MapComponent,
    NavbarComponent,
    RootComponent,
    CheckboxSelectorComponent,
    GenericFilterOptionsComponent,
    MapSelectorComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
