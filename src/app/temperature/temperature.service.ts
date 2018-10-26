import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Subject} from 'rxjs/index';

@Injectable()
export class TemperatureService {
  allData = [];
  list = [];
  listChanged = new Subject<any[]>();
  requestState = 'clear';
  err: string[] = [];
  firstDate: Date;
  lastDate: Date;

  constructor(private httpClient: HttpClient) { }

  public fetchData(): Promise<any> {
    this.requestState = 'loading';
    return (this.httpClient.get('https://api.npoint.io/7744ba09a781e3899581').toPromise() as Promise<any>)
      .then(
        (data: any[])  => {
          data.forEach(d => {
            d.x = new Date(d.t);
            d.y = d.v;
          });
          this.firstDate = data[0].x;
          this.lastDate = data[data.length - 1].x;
          this.requestState = 'success';
          this.allData = data;
          this.filterList(this.firstDate, this.lastDate);
          return {firstDate: this.firstDate, lastDate: this.lastDate};
        }
      ).catch(err => {
        this.err.push(err);
        this.requestState = 'error';
      });
  }

  public filterList(from: Date, to: Date): void {
    this.list = this.allData.filter(d => (d.x.getTime() >= from.getTime()) && (d.x.getTime() <= to.getTime()));
    this.listChanged.next(this.getList());
  }

  public getList(): any[] {
    return this.list.slice();
  }
}