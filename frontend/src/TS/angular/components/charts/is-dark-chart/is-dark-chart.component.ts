// --------------- ANGULAR ---------------
import { Component, OnInit, Input } from '@angular/core';

// --------------- CHARTS-JS ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../../services/crime.service';


@Component({
  selector: 'app-is-dark-chart',
  templateUrl: './is-dark-chart.component.html',
  styleUrls: ['./is-dark-chart.component.scss']
})
export class IsDarkChartComponent implements OnInit {
  @Input() cities: Array<string>;
  @Input() crimeTypes: Array<string>;
  @Input() dates;

  constructor(private crimeService: CrimeService) { }

  ngOnInit() {
    this.setup();
  }

  setup(): void {
    let canvas = <HTMLCanvasElement> document.getElementById('isDarkChart');
    let context = canvas.getContext('2d');

    let chart = new Chart(context, {
      type: 'bar',
      data: {
      labels: ['Yes', 'No'],
      datasets: [{
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)'
      ],
      borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
      }]
      },
    })
  }

  private loadData() {

  }

}
