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

  private chartLabels: Array<string>;
  private data: Array<number>;

  constructor(private crimeService: CrimeService) {
    this.chartLabels = ['Yes', 'No'];
  }

  ngOnInit() {
    this.setup();
  }

  private setup(): void {
    let canvas = <HTMLCanvasElement> document.getElementById('isDarkChart');
    let context = canvas.getContext('2d');

    let datasets = [];

    this.crimeTypes.forEach(type => {
      this.crimeService.loadIsDarkCount(type)
       .then(data => {
         datasets.push({
           label: type,
           data: [data['yes'], data['no']],
           backgroundColor: [
                   'rgba(54, 162, 235, 0.2)',
                   'rgba(255, 159, 64, 0.2)'
           ],
           borderColor: [
                   'rgba(54, 162, 235, 1)',
                   'rgba(255, 159, 64, 1)'
           ],
           borderWidth: 1
         })
       })
    });

    let chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: datasets
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
             },
            scaleLabel: {
              display: true,
              labelString: 'Crime Count'
            }
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Is Dark'
            }
          }]
        }
      }
    });
  }
}
