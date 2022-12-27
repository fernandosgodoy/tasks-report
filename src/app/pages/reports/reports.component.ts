import { Component, OnInit } from '@angular/core';

interface Weekdays {
  week: string;
  active: boolean;
  date: Date;
  numberDay: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
  weekList: Weekdays[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  constructor() {
    this.setActiveDay();
  }

  ngOnInit(): void {}

  setActiveDay() {
    let weekDay = new Date().getDay();
    for (let i = 0; i < 7; i++) {
      this.weekList.push({
        week: this.weekDays[i],
        active: false,
        numberDay: this.getWeekDates()[i].getDate(),
        date: this.getWeekDates()[i],
      });
    }

    this.weekList[weekDay].active = true;

    console.log(this.weekList);
  }

  getWeekDates() {
    let dates = [];
    const today = new Date();
    const remDaysCount = 7 - today.getDay();
    const diff =
      today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 0);
    dates = [new Date(today.setDate(diff))];

    for (let i = 1; i <= remDaysCount + 1; i++) {
      const nextDate = today.setDate(today.getDate() + 1);
      dates.push(new Date(nextDate));
    }

    return dates;
  }
}
