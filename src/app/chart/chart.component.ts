import {Component, Input, OnInit} from '@angular/core';
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartType} from "chart.js";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];

  @Input()
  labels!: string[];

  lineChartLabels: Label[] = [];
  lineChartOptions: any;

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  ngOnInit(): void {
    console.log(this.labels);
    for (let i = this.labels.length - 1; i > 0; i--) {
      this.lineChartLabels.push(this.labels[i]);
    }
  }

  chartHovered($event: { event: MouseEvent; active: {}[] }) {

  }

  chartClicked($event: { event?: MouseEvent; active?: {}[] }) {

  }

  randomize() {

  }

  pushOne() {

  }

  changeColor() {

  }

  hideOne() {

  }

  changeLabel() {

  }
}
