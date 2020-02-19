// --------------- ANGULAR ---------------
import { Component, AfterViewInit, Input } from '@angular/core';

// --------------- CHARTS-JS ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../../services/crime.service';


@Component({
  selector: 'app-is-dark-bar-chart',
  templateUrl: './is-dark-bar-chart.component.html',
  styleUrls: ['./is-dark-bar-chart.component.scss']
})
export class IsDarkBarChartComponent implements AfterViewInit {

  static count = 0;
  private chartLabels: Array<string>;
  private data: Array<number>;
  private chart;

  chartId: string;

  constructor(private crimeService: CrimeService) {
    this.chartLabels = ['Yes', 'No'];
    IsDarkBarChartComponent.count += 1;
    this.chartId = 'isDarkBarChart-' + IsDarkBarChartComponent.count;
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
    let canvas = <HTMLCanvasElement> document.getElementById(this.chartId);
    let context = canvas.getContext('2d');

    this.chart = new Chart(context, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: []
      },
      options: {
        maintainAspectRatio : false,
        title: {
          display: true,
          text: 'Distribution of Crime Types Committed During Day/Night',
          fontColor: '#DDD',
          fontSize: 16
        },
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

    this.chart.canvas.parentNode.style.height = '50vh';
  }
}
