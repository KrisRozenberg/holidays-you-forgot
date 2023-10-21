import { Component, OnInit, ViewChild } from '@angular/core';
import { HolidayForRender, allData } from './data';
import * as moment from 'moment';
import { Moment } from 'moment';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'date',
    'weekday',
    'present',
    'days',
    'years'
  ];
  allData = allData;
  weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  dataForRender: MatTableDataSource<HolidayForRender>;
  today: Moment;
  showUpdateDatesMessage = !new Date().getMonth();

  ngOnInit(): void {
    const todayDate = new Date();
    this.today = moment(new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate()));
    this.getRadonitsaDate();
    this.getDataForRender();
  }

  ngAfterViewInit() {
    this.dataForRender.paginator = this.paginator;
  }

  getRadonitsaDate() {
    let radonitsaElement = this.allData.find((el) => el.name === 'Radonitsa');
    let easterElement = this.allData.find((el) => el.name === 'Easter');

    if (radonitsaElement && easterElement) {
      let radonitsaDate = moment(easterElement.date).add(9, 'days');
      radonitsaElement.date = radonitsaDate.toDate();
      this.allData[radonitsaElement.id - 1] = radonitsaElement;
    }
  }

  getDataForRender() {
    let data = this.allData
    .map((el) => {
      return <HolidayForRender>{
        ...el,
        startYear: el.date?.getFullYear(),
        isPassed: false
      }
    });

    // the upcoming filtering is used for getting only this month's +- 1 month holidays

    // data
    // .filter((el) => {
    //   let holidayMonth = el.date?.getMonth();

    //   if (this.today.month() === 11) {
    //     return (holidayMonth === 10) || (holidayMonth === 11) || (holidayMonth === 0);
    //   }
    //   else if (this.today.month() === 0) {
    //     return (holidayMonth === 11) || (holidayMonth === 0) || (holidayMonth === 1);
    //   }
    //   else {
    //     return (holidayMonth === this.today.month()) || 
    //     (holidayMonth === this.today.month() + 1) || 
    //     (holidayMonth === this.today.month() - 1);
    //   }
    // });
    
    data = this.sortDataForRender(data);
    this.dataForRender = new MatTableDataSource(data);
  }

  sortDataForRender(holidays: HolidayForRender[]) {
    holidays = holidays.map((el) => {      
      if (this.today.month() === 11) {
        el.date?.getMonth() === 0
          ? el.date.setFullYear(this.today.year() + 1)
          : el.date!.setFullYear(this.today.year())
      }
      else if (this.today.month() === 0) {
        el.date?.getMonth() === 11
          ? el.date.setFullYear(this.today.year() - 1)
          : el.date!.setFullYear(this.today.year())
      }
      else {
        el.date!.setFullYear(this.today.year())
      }
      return el;
    });

    let notPassedHolidays = holidays
      .filter((el) => (this.today.isSameOrBefore(moment(el.date))))
      .sort((a, b) => (this.today.diff(moment(b.date)) - this.today.diff(moment(a.date))));
    let passedHolidays = holidays
      .filter((el) => (this.today.isAfter(moment(el.date))))
      .map((el) => {
        el.isPassed = true;
        return el;
      })
      .sort((a, b) => (this.today.diff(moment(a.date)) - this.today.diff(moment(b.date))));

    return [...notPassedHolidays, ...passedHolidays];
  }

  getDaysLeft(date: Date) {
    return Math.abs(this.today.diff(moment(date), 'days'));
  }

  getYearsOld(date: Date, startYear: number) {
    return startYear 
      ? date.getFullYear() - startYear
      : 'INFINITY'
  }
}
