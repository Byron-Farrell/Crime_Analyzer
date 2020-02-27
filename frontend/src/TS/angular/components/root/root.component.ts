// --------------- ANGULAR ---------------
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
    this.calculateContentHeight();
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
}
