import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {
    this.calculateContentHeight();
  }

  ngAfterViewInit() {
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
