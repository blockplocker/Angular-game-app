import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalenderService } from '../services/calender-service';
import { DatePipe } from '@angular/common';
import { CalenderModal } from '../components/calender-modal/calender-modal';

@Component({
  selector: 'app-calender',
  imports: [FullCalendarModule, CalenderModal],
  providers: [DatePipe],
  templateUrl: './calender.html',
  styleUrl: './calender.scss',
})
export class Calender {
  constructor(private calenderService: CalenderService, private datePipe: DatePipe) {}
  ngOnInit() {
    this.calenderService.getEvents().subscribe((events: any[]) => {
      this.calendarOptions.events = events.map((e) => ({
        id: String(e.id),
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
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    },
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    events: [], // will be populated from API
  };

  // Modal state
  modalOpen = false;
  modalMode: 'create' | 'delete' = 'create';
  modalTitle = '';
  modalEventDate = '';
  modalEventId = '';
  modalSelectInfo: DateSelectArg | null = null;
  modalClickInfo: any = null;

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;
    calendarApi.unselect();
    this.modalMode = 'create';
    this.modalTitle = 'Create Event';
    this.modalOpen = true;
    this.modalSelectInfo = selectInfo;
  }

  handleEventClick(clickInfo: any) {
    this.modalMode = 'delete';
    this.modalTitle = `Delete Event ${clickInfo.event.title}`;
    this.modalEventDate = this.datePipe.transform(clickInfo.event.start, 'mediumDate') || '';
    this.modalEventId = String(clickInfo.event.id);
    this.modalOpen = true;
    this.modalClickInfo = clickInfo;
  }

  refreshEvents() {
    this.calenderService.getEvents().subscribe((events: any[]) => {
      this.calendarOptions.events = events.map((e) => ({
        id: String(e.id),
        title: e.title,
        start: e.start,
        end: e.end,
        allDay: e.allday,
      }));
    });
  }

  // Modal event handlers
  onModalConfirm(value: string) {
    if (this.modalMode === 'create' && this.modalSelectInfo) {
      const selectInfo = this.modalSelectInfo;
      const calendarApi = selectInfo.view.calendar;
      const title = value.trim();
      if (!title || title.length > 30) {
        alert('Invalid title. Please enter a title up to 30 characters.');
        return;
      }
      this.calenderService
        .createEvent({
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        })
        .subscribe((Response) => {
          calendarApi.addEvent({
            id: String((Response as any).id),
            title,
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay,
          });
        });
    } else if (this.modalMode === 'delete' && this.modalClickInfo && this.modalClickInfo.event) {
      this.calenderService.deleteEvent(Number(this.modalEventId)).subscribe(() => {
        this.modalClickInfo.event.remove();
      });
    }
    this.closeModal();
  }

  onModalCancel() {
    this.closeModal();
  }

  closeModal() {
    this.modalOpen = false;
    this.modalSelectInfo = null;
    this.modalEventId = '';
    this.modalEventDate = '';
  }

  openModal() {
    this.modalOpen = true;
  }
}
