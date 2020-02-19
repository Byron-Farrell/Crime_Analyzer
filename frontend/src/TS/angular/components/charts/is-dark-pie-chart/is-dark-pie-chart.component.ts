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
  private chart;  private chartLabels: Array<string>;

  constructor(private crimeService: CrimeService) {
    IsDarkPieChartComponent.count += 1;
    this.chartId = 'isDarkPieChart-' + IsDarkPieChartComponent.count;
  }

  ngAfterViewInit() {
    this.setup();
  }

  private addData(chart, datasets) {
    this.chartLabels = ['Yes', 'No'];
    chart.update();
  }

  private removeData(chart) {

    chart.data = [];
    chart.update();
  }

  private setup(): void {
    let canvas = <HTMLCanvasElement> document.getElementById(this.chartId);
    let context = canvas.getContext('2d');

    this.chart = new Chart(context, {
      type: 'pie',

      data: {
        labels: this.chartLabels,
        datasets: [{
          data: [10, 20],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 159, 64, 1)'
          ],
        }]
      }
    });
  }
}
