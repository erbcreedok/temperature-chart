import {Component, OnDestroy, OnInit} from '@angular/core';
import * as CanvasJS from '../shared/canvasjs.min.js';
import { TemperatureService } from './temperature.service';
import {Subscription} from 'rxjs/index';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.scss']
})
export class TemperatureComponent implements OnInit, OnDestroy {
  private list = [];
  private subscription: Subscription;
  minDate: Date;
  maxDate: Date;
  dateFrom = new FormControl();
  dateTo = new FormControl();

  constructor(private temperatureService: TemperatureService) { }

  ngOnInit() {
    this.temperatureService.fetchData().then(data => {
      this.minDate = data.firstDate;
      this.maxDate = data.lastDate;
      if (!this.dateTo.value || !this.isBetweenDate(this.dateTo.value, this.maxDate, this.minDate)) {
        this.dateTo.setValue(this.maxDate);
      }
      if (!this.dateFrom.value || !this.isBetweenDate(this.dateFrom.value, this.maxDate, this.minDate)) {
        this.dateFrom.setValue(this.minDate);
      }
    });
    this.subscription = this.temperatureService.listChanged.subscribe(list => {
      this.list = list;
      this.renderChart();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  isBetweenDate(date: Date, to: Date, from: Date) {
    return date.getTime() <= to.getTime() && date.getTime() >= from.getTime();
  }

  get requestState() {
    return this.temperatureService.requestState;
  }

  filterChart() {
    this.temperatureService.filterList(this.dateFrom.value, this.dateTo.value);
  }

  private renderChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Данные о температуре за последние 120 лет'
      },
      subtitles: [{
        text: ''
      }],
      data: [
        {
          type: 'line',
          dataPoints: this.list.slice()
        }]
    });

    chart.render();
  }

}

