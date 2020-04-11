// --------------- ANGULAR ---------------
import { Component, AfterViewInit } from '@angular/core';

// --------------- CHARTS-JS ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../../services/crime.service';

@Component({
  selector: 'app-is-dark-pie-chart',
  templateUrl: './is-dark-pie-chart.component.html',
  styleUrls: ['./is-dark-pie-chart.component.scss']
})
export class IsDarkPieChartComponent implements AfterViewInit {

  static count = 0;
  chartId: string;
  private chart;
  private chartLabels: Array<string>;

  constructor(private crimeService: CrimeService) {
    this.chartLabels = ['Dark', 'Not Dark'];
    IsDarkPieChartComponent.count += 1;
    this.chartId = 'isDarkPieChart-' + IsDarkPieChartComponent.count;
  }

  ngAfterViewInit() {
    this.setup();
    this.crimeService.getAnalyticsObservable().subscribe(data => {
      this.removeData(this.chart);
      this.addData(this.chart, data.isDarkTotal);
    });

  }

  private addData(chart, dataset) {
    let newDataset = {
      data: [dataset.yes, dataset.no],
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
      type: 'pie',
      data: {
        labels: this.chartLabels,
        datasets: []
      },
      options: {
        maintainAspectRatio : false,
        title: {
          display: true,
          text: 'Total Number of Selected Crimes Committed During Day/Night',
          fontColor: '#EEE',
          fontSize: 17
        },
      }
    });
    this.chart.canvas.parentNode.style.height = '30vh';
  }
}
