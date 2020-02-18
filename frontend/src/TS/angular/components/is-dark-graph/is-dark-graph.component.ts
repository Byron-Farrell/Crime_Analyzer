// --------------- ANGULAR ---------------
import { Component, OnInit } from '@angular/core';

// --------------- ChartsJs ---------------
import Chart from 'chart.js';

// --------------- SERVICES ---------------
import { CrimeService } from '../../services/crime.service';

@Component({
  selector: 'app-is-dark-graph',
  templateUrl: './is-dark-graph.component.html',
  styleUrls: ['./is-dark-graph.component.scss']
})
export class IsDarkGraphComponent implements OnInit {

  private chartLabels: Array<string>;
  private data: Array<number>;


  constructor(private crimeService: CrimeService) {

  }

  ngOnInit() {
    this.chartLabels = ['Yes', 'No']
    this.data = [57, 150];

    this.setup();
  }

  setupChart(crimeTypes: Array<string>): void {
    let canvas = <HTMLCanvasElement> document.getElementById('is-dark-chart')
    let context = canvas.getContext('2d');

    let datasets = [];

    crimeTypes.forEach(type => {
      this.crimeService.loadIsDarkCount(type)
       .then(data => {
         datasets.push({
           label: type,
           data: [data['yes'], data['no']],
           backgroundColor: [
                   'rgba(255, 99, 132, 0.2)',
                   'rgba(54, 162, 235, 0.2)'
           ],
           borderColor: [
                   'rgba(255, 99, 132, 1)',
                   'rgba(54, 162, 235, 1)'
           ],
           borderWidth: 1
         })
       })
    })

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

  private setup(): void {

    let loading = this.crimeService.loadCrimeTypes();
    let _crimeTypes = [];

    loading
      .then(function(json) {
        json.forEach(type => {
          _crimeTypes.push(type);
        });
      })
      .then(() => this.setupChart(_crimeTypes))
      .catch(error => console.log(error));
  }
}
