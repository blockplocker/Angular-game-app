import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalenderService } from '../services/calender-service';

@Component({
  selector: 'app-calender',
  imports: [FullCalendarModule],
  templateUrl: './calender.html',
  styleUrl: './calender.scss',
})
export class Calender {
  constructor(private calenderService: CalenderService) {}
  ngOnInit() {
    this.calenderService.getEvents().subscribe((events: any[]) => {
      // Map API events to FullCalendar EventInput format if needed
      this.calendarOptions.events = events.map((e) => ({
        title: e.title,
        start: e.start,
        end: e.end,
        allDay: e.allday,
      }));
    });
  }
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    events: [], // will be populated from API
  };

  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends; 
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect(); // clear date selection
    const title = prompt('Please enter a new title for your event');

    this.calenderService.createEvent({ title: title, start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay }).subscribe();
  }

}
