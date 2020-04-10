// --------------- ANGULAR ---------------
import { Component, AfterViewInit } from '@angular/core';

// --------------- CHARTS-JS ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../../services/crime.service';

@Component({
  selector: 'app-time-linear-chart',
  templateUrl: './time-linear-chart.component.html',
  styleUrls: ['./time-linear-chart.component.scss']
})
export class TimeLinearChartComponent implements AfterViewInit {

  static count = 0;
  chartId: string;
  private chart;
  private chartLabels: Array<string>;

  constructor(private crimeService: CrimeService) {
    TimeLinearChartComponent.count += 1;
    this.chartId = 'timeLinearChart-' + TimeLinearChartComponent.count;
  }

  ngAfterViewInit() {
    this.setup();
    this.crimeService.getAnalyticsObservable().subscribe(data => {
      this.removeData(this.chart);
      this.addData(this.chart, data.timeCrimeCount);
    });
  }

  private addData(chart, datasets) {
    let times = Object.keys(datasets);
    console.log(times);
    console.log(datasets);
    console.log(datasets[times[0]]);

    let dataset = []

    times.forEach(time => {
        dataset.push(datasets[time]);
    });

    console.log(dataset);

    let newDataset = {
      data: dataset,
      backgroundColor: [
        'rgba(54, 162, 235, 0)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }
    chart.data.datasets.push(newDataset);
    chart.data.labels = times;

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
      type: 'line',

      data: {
        labels: this.chartLabels,
        datasets: []
      },
      options: {
        maintainAspectRatio : false,
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Crimes Committed at Different Time Periods',
          fontColor: '#222',
          fontSize: 22
        }
      }
    });
    this.chart.canvas.parentNode.style.height = '30vh';
  }

}
