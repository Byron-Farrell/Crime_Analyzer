import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { MapComponent } from './components/map/map.component';
import { GraphComponent } from './components/graph/graph.component';
import { MapRootComponent } from './components/map-root/map-root.component';
import { GraphRootComponent } from './components/graph-root/graph-root.component';

@NgModule({
  declarations: [
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
