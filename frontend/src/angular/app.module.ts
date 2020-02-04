import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapComponent } from './components/map/map.component';
import { GraphComponent } from './components/graph/graph.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RootComponent } from './components/root/root.component';
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { CheckboxSelectorComponent } from './components/checkbox-selector/checkbox-selector.component';
import { MapFilterOptionsComponent } from './components/map-filter-options/map-filter-options.component';
import { SelectorBoxComponent } from './selector-box/selector-box.component';


@NgModule({
  declarations: [
    MapComponent,
    GraphComponent,
    NavbarComponent,
    RootComponent,
    SidePanelComponent,
    CheckboxSelectorComponent,
    MapFilterOptionsComponent,
    SelectorBoxComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
