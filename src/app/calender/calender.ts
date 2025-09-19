import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalenderService } from '../services/calender-service';
import { DatePipe } from '@angular/common';
import { CalenderModal } from '../components/calender-modal/calender-modal';
import { Ievent } from '../interfaces/ievent';

@Component({
  selector: 'app-calender',
  imports: [FullCalendarModule, CalenderModal],
  providers: [DatePipe],
  templateUrl: './calender.html',
  styleUrl: './calender.scss',
})
export class Calender {
  useLocalStorage = false;
  private eventsSubscription: any = null;

  constructor(private calenderService: CalenderService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    if (!this.useLocalStorage) {
      this.getEventsWithAPI();
    } else {
      this.getEventsWithLocalStorage();
    }
  }

  ngOnDestroy(): void {
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
  }

  getEventsWithAPI() {    
    this.eventsSubscription = this.calenderService.getEvents().subscribe({
      next: (events: any[]) => {
        this.calendarOptions.events = events.map((e) => ({
          id: String(e.id),
          title: e.title,
          start: e.start,
          end: e.end,
          allDay: e.allDay ?? e.allday,
        }));
      },
      error: () => {
        if (!this.useLocalStorage) {
          this.showLocalStorageErrorModal();
          return;
        }
        this.showErrorModal('Failed to fetch events. Please try again later.');
      },
    });
  }

  getEventsWithLocalStorage() {
    const events = this.calenderService.getEventsFromLocalStorage();
    this.calendarOptions.events = events.map((e: any) => ({
      id: String(e.id),
      title: e.title,
      start: e.start,
      end: e.end,
      allDay: e.allDay ?? e.allday,
    }));
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
    eventDrop: this.handleEventUpdate.bind(this),
    eventResize: this.handleEventUpdate.bind(this),
    events: [], // will be populated from API
  };

  // Modal state
  modalOpen = false;
  modalMode: 'create' | 'delete' | 'error' | 'localStorageError' = 'create';
  modalTitle = '';
  modalEventDate = '';
  modalEventId = '';
  modalSelectInfo: DateSelectArg | null = null;
  modalClickInfo: any = null;

  // Handlers for calendar interactions
  handleDateSelect(selectInfo: DateSelectArg): void {
    const calendarApi = selectInfo.view.calendar;
    if (calendarApi) {
      calendarApi.unselect();
    }
    this.modalMode = 'create';
    this.modalTitle = 'Create Event';
    this.modalOpen = true;
    this.modalSelectInfo = selectInfo;
  }

  handleEventClick(clickInfo: any): void {
    if (!clickInfo || !clickInfo.event) {
      this.showErrorModal('Invalid event click info.');
      return;
    }
    this.modalMode = 'delete';
    this.modalTitle = `Delete Event ${clickInfo.event.title}`;
    this.modalEventDate = this.datePipe.transform(clickInfo.event.start, 'mediumDate') || '';
    this.modalEventId = String(clickInfo.event.id);
    this.modalOpen = true;
    this.modalClickInfo = clickInfo;
  }

  handleEventUpdate(info: any): void {
    if (!info || !info.event) {
      this.showErrorModal('Invalid event update info.');
      return;
    }
    const toLocalISOString = (date: Date | null): string => {
      if (!date) return '';
      const local = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return local.toISOString().slice(0, 19); // 'YYYY-MM-DDTHH:mm:ss'
    };

    const updatedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: toLocalISOString(info.event.start),
      end: toLocalISOString(info.event.end),
      allDay: info.event.allDay,
    };

    if (!this.useLocalStorage) {
      this.updateEventWithApi(info, updatedEvent);
    } else {
      this.updateEventWithLocalstorage(updatedEvent);
    }
  }

  updateEventWithApi(info: any, updatedEvent: any): void {
    this.calenderService.updateEvent(Number(updatedEvent.id), updatedEvent).subscribe({
      error: () => {
        this.showErrorModal('Failed to update event. Please try again.');
        if (info.revert) info.revert();
      },
    });
  }

  updateEventWithLocalstorage(updatedEvent: any): void {
    this.calenderService.updateEventLocal(updatedEvent.id, updatedEvent);
  }

  // Modal event handlers
  onModalConfirm(value: string): void {
    if (this.modalMode === 'create' && this.modalSelectInfo) {
      const selectInfo = this.modalSelectInfo;
      const calendarApi = selectInfo.view.calendar;
      const title = value.trim();
      if (!title || title.length > 20) {
        this.showErrorModal('Event title is required and must be 20 characters or less.');
        return;
      }

      const Event: Ievent = {
        id: 0, // Placeholder, actual ID will be set by backend or local storage function
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      if (!this.useLocalStorage) {
        this.createEventWithApi(Event, calendarApi);
      } else {
        this.createEventWithLocalstorage(Event, calendarApi);
      }
    } else if (this.modalMode === 'delete' && this.modalClickInfo && this.modalClickInfo.event) {
      if (!this.useLocalStorage) {
        this.deleteEventWithApi(this.modalEventId);
      } else {
        this.deleteEventWithLocalstorage(this.modalEventId);
      }
    }
    this.closeModal();
  }

  createEventWithApi(event: Ievent, calendarApi: any): void {
    this.calenderService
      .createEvent({
        title: event.title,
        start: event.start,
        end: event.end,
        allDay: event.allDay,
      })
      .subscribe({
        next: (Response: any) => {
          if (calendarApi) {
            calendarApi.addEvent({
              id: String(Response?.id),
              title: event.title,
              start: event.start,
              end: event.end,
              allDay: event.allDay,
            });
          }
        },
        error: () => {
          this.showErrorModal('Failed to create event. Please try again.');
        },
      });
  }

  createEventWithLocalstorage(event: any, calendarApi: any): void {
    event.id = crypto.randomUUID();
    const createdEvent = this.calenderService.createEventLocal(event);
    if (calendarApi) {
      calendarApi.addEvent({
        id: createdEvent.id,
        title: createdEvent.title,
        start: createdEvent.start,
        end: createdEvent.end,
        allDay: createdEvent.allDay,
      });
    }
  }

  deleteEventWithApi(eventId: string): void {
    this.calenderService.deleteEvent(Number(eventId)).subscribe({
      next: () => {
        this.modalClickInfo.event.remove();
      },
      error: () => {
        this.showErrorModal('Failed to delete event. Please try again.');
      },
    });
  }

  deleteEventWithLocalstorage(eventId: string): void {
    this.calenderService.deleteEventLocal(eventId);
    if (this.modalClickInfo && this.modalClickInfo.event) {
      this.modalClickInfo.event.remove();
    }
  }

  showErrorModal(message: string): void {
    this.modalMode = 'error';
    this.modalTitle = message;
    this.modalOpen = true;
  }

  showLocalStorageErrorModal(): void {
    this.modalMode = 'localStorageError';
    this.modalTitle = 'API Error - try using Local Storage';
    this.modalOpen = true;
  }

  closeModal(): void {
    this.modalOpen = false;
    this.modalSelectInfo = null;
    this.modalEventId = '';
    this.modalEventDate = '';
  }

  storage = 'Backend Server';
  toggleLocalStorage() {
    this.useLocalStorage = !this.useLocalStorage;    
    this.storage = this.useLocalStorage ? 'Local Storage' : 'Backend Server';
    this.calendarOptions.events = [];
    if (this.eventsSubscription) {
      this.eventsSubscription.unsubscribe();
    }
    this.ngOnInit();
  }
}
