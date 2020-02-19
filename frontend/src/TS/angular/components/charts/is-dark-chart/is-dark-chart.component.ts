// --------------- ANGULAR ---------------
import { Component, AfterViewInit, Input, SimpleChanges } from '@angular/core';

// --------------- CHARTS-JS ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../../services/crime.service';


@Component({
  selector: 'app-is-dark-chart',
  templateUrl: './is-dark-chart.component.html',
  styleUrls: ['./is-dark-chart.component.scss']
})
export class IsDarkChartComponent implements AfterViewInit {
  // @Input() cities: Array<string>;
  @Input() crimeTypes: Array<string>;
  // @Input() dates;

  private chartLabels: Array<string>;
  private data: Array<number>;
  private chart;

  constructor(private crimeService: CrimeService) {
    this.chartLabels = ['Yes', 'No'];

  }

  ngAfterViewInit() {
    this.setup();
    this.crimeService.getAnalyticsObservable().subscribe(data => {
      this.removeData(this.chart);
      this.addData(this.chart, data.isDark)

    });
  }

  private addData(chart, datasets) {
    let crimeTypes = Object.keys(datasets);

    crimeTypes.forEach((crimeType) => {
      let newDataset = {
        label: crimeType,
        data: [datasets[crimeType].yes, datasets[crimeType].no],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
      chart.data.datasets.push(newDataset);
    });
    chart.update();
  }

  private removeData(chart) {

    chart.data.datasets = [];
    chart.update();
  }

  private setup(): void {
    let canvas = <HTMLCanvasElement> document.getElementById('isDarkChart');
    let context = canvas.getContext('2d');

    this.chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: []
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
