import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';
import { TaskTypeService } from 'src/app/services/task-type/task-type.service';
import { ActivityService } from 'src/app/services/activities/activity.service';
import { Activity } from 'src/app/models/Activity';

interface Weekdays {
  week: string;
  active: boolean;
  date: Date;
  numberDay: number;
  totalHours: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [],
})
export class ReportsComponent implements OnInit {
  weekList: Weekdays[] = [];
  weekDays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  public activities: Activity[] = [];

  constructor(private activityService: ActivityService) {
    this.setActiveDay();
    this.formatActiveDay();
  }

  ngOnInit(): void {
    this.activityService.listAll().subscribe((tasks: Activity[]) => {
      console.log('All tasks', tasks);
      this.activities = tasks;
    });
  }

  setActiveDay() {
    let weekDay = new Date().getDay();
    for (let i = 0; i < 7; i++) {
      this.weekList.push({
        week: this.weekDays[i],
        active: false,
        numberDay: this.getWeekDates()[i].getDate(),
        date: this.getWeekDates()[i],
        totalHours: 0,
      });
    }

    this.weekList[weekDay].active = true;
    this.weekList[weekDay].totalHours = 8;

    console.log(this.weekList);
  }

  getWeekDates() {
    let dates = [];
    const today = new Date();
    // const remDaysCount = 7 - today.getDay();
    const diff =
      today.getDate() - today.getDay() + (today.getDay() == 0 ? -6 : 0);
    dates = [new Date(today.setDate(diff))];

    for (let i = 1; i <= 7; i++) {
      const nextDate = today.setDate(today.getDate() + 1);
      dates.push(new Date(nextDate));
    }

    return dates;
  }

  formatActiveDay() {
    const activeDay = this.weekList.filter((week) => week.active)[0];
    return format(activeDay.date, 'EEEE, do MMMM');
  }
}
