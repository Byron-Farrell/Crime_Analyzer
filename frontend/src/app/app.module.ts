import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { GraphComponent } from './graph/graph.component';
import { MapRootComponent } from './map-root/map-root.component';
import { GraphRootComponent } from './graph-root/graph-root.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    GraphComponent,
    MapRootComponent,
    GraphRootComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MapComponent]
})
export class AppModule { }
